#!/usr/bin/env python3
"""Persistent supervisor for wordIzy dev server.

Restarts `bun run dev` if it dies. Survives parent-shell exit via double-fork
daemon pattern. Writes a pidfile so callers can stop it cleanly.

Usage:
  python3 scripts/dev-supervisor.py start   # launch & detach
  python3 scripts/dev-supervisor.py stop    # kill supervisor + dev server
  python3 scripts/dev-supervisor.py status  # check if running
"""
import os
import sys
import time
import subprocess
import signal
import socket
from pathlib import Path

PROJECT_DIR = Path("/home/z/my-project")
LOG_FILE = Path("/tmp/wordizy-dev.log")
PID_FILE = Path("/tmp/wordizy-dev-supervisor.pid")
PORT = 3000
HEALTH_PATH = "/"  # any 200 path


def _is_port_open(host: str = "127.0.0.1", port: int = PORT) -> bool:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    try:
        s.connect((host, port))
        s.close()
        return True
    except OSError:
        return False


def _wait_ready(timeout: int = 60) -> bool:
    """Wait for dev server to respond with 200 on /."""
    deadline = time.time() + timeout
    while time.time() < deadline:
        if _is_port_open():
            # Give next-server a moment to actually serve HTTP (not just open socket)
            try:
                with subprocess.Popen(
                    ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}",
                     "--max-time", "5", f"http://localhost:{PORT}{HEALTH_PATH}"],
                    stdout=subprocess.PIPE,
                ) as p:
                    out, _ = p.communicate()
                    code = out.decode().strip()
                    if code == "200":
                        return True
            except Exception:
                pass
        time.sleep(2)
    return False


def _read_pid() -> int | None:
    try:
        return int(PID_FILE.read_text().strip())
    except (FileNotFoundError, ValueError):
        return None


def _alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


def _detach() -> None:
    """Double-fork to fully detach from controlling terminal."""
    pid = os.fork()
    if pid > 0:
        # Parent waits for first child to exit
        sys.exit(0)
    os.setsid()
    pid = os.fork()
    if pid > 0:
        sys.exit(0)
    # Daemon process
    os.chdir("/")
    os.umask(0)


def start() -> int:
    existing = _read_pid()
    if existing and _alive(existing):
        print(f"supervisor already running (pid {existing})")
        return 0

    # Truncate log
    LOG_FILE.touch()

    # Detach
    _detach()

    # Write pidfile
    PID_FILE.write_text(str(os.getpid()))

    # Register signal handler for clean shutdown
    def _shutdown(_signo, _frame):
        # Kill any bun/next children
        subprocess.run(["pkill", "-9", "-f", "bun run dev"],
                       capture_output=True)
        subprocess.run(["pkill", "-9", "-f", "next-server"],
                       capture_output=True)
        try:
            PID_FILE.unlink()
        except FileNotFoundError:
            pass
        sys.exit(0)

    signal.signal(signal.SIGTERM, _shutdown)
    signal.signal(signal.SIGINT, _shutdown)

    # Supervisor loop
    while True:
        try:
            with open(LOG_FILE, "a") as logf:
                proc = subprocess.Popen(
                    ["bun", "run", "dev"],
                    cwd=str(PROJECT_DIR),
                    stdout=logf,
                    stderr=subprocess.STDOUT,
                    stdin=subprocess.DEVNULL,
                )
                proc.wait()
        except Exception as e:
            with open(LOG_FILE, "a") as logf:
                logf.write(f"\n[supervisor] error: {e}\n")
        # Restart cooldown
        time.sleep(3)


def stop() -> int:
    pid = _read_pid()
    if not pid:
        print("supervisor not running")
        return 0
    if not _alive(pid):
        try:
            PID_FILE.unlink()
        except FileNotFoundError:
            pass
        print("supervisor was dead (stale pidfile removed)")
        return 0
    # Kill supervisor (signal handler will reap children)
    os.kill(pid, signal.SIGTERM)
    # Give it a moment
    time.sleep(2)
    # Force-clean any stragglers
    subprocess.run(["pkill", "-9", "-f", "bun run dev"], capture_output=True)
    subprocess.run(["pkill", "-9", "-f", "next-server"], capture_output=True)
    try:
        PID_FILE.unlink()
    except FileNotFoundError:
        pass
    print("supervisor stopped")
    return 0


def status() -> int:
    pid = _read_pid()
    if pid and _alive(pid):
        print(f"supervisor running (pid {pid})")
        if _wait_ready(timeout=5):
            print(f"dev server healthy on :{PORT}")
        else:
            print(f"dev server unhealthy (port not responding)")
        return 0
    print("supervisor not running")
    return 1


def restart() -> int:
    stop()
    time.sleep(1)
    # Start in background (the daemon forks itself)
    subprocess.Popen(
        ["python3", __file__, "start"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        stdin=subprocess.DEVNULL,
    )
    # Wait for ready
    if _wait_ready(timeout=90):
        print(f"dev server ready on :{PORT}")
        return 0
    print("dev server failed to become ready in 90s")
    return 1


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: dev-supervisor.py {start|stop|status|restart}")
        sys.exit(2)
    cmd = sys.argv[1]
    if cmd == "start":
        # Fork off the supervisor
        subprocess.Popen(
            ["python3", __file__, "_daemon"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            stdin=subprocess.DEVNULL,
        )
        # Wait for ready
        print("starting supervisor...")
        if _wait_ready(timeout=90):
            print(f"dev server ready on :{PORT}")
            sys.exit(0)
        print("dev server failed to become ready in 90s")
        sys.exit(1)
    elif cmd == "_daemon":
        start()
    elif cmd == "stop":
        sys.exit(stop())
    elif cmd == "status":
        sys.exit(status())
    elif cmd == "restart":
        sys.exit(restart())
    else:
        print(f"unknown command: {cmd}")
        sys.exit(2)
