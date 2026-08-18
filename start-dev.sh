#!/bin/bash
# Dev server startup script — fully daemonizes itself
cd /home/z/my-project

# Redirect all I/O and detach from parent process
exec > dev.log 2>&1 < /dev/null

# Create a new session, detaching from any terminal
exec setsid node_modules/.bin/next dev --webpack -p 3000
