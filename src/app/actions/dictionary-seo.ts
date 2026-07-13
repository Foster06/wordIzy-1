"use server";

import { db } from "@/lib/db";

export interface ProgrammaticWordsResult {
  title: string;
  words: string[];
}

export async function getProgrammaticWordList(
  type: "length" | "starts" | "ends", 
  value: string, 
  lang = "en"
): Promise<ProgrammaticWordsResult | null> {
  try {
    let wordsData: any[] = [];
    let dynamicTitle = "";

    // 🎯 FILTER CONFIGURATION: Finds exact long-tail vocabulary lists based on URL requests
    if (type === "length") {
      const targetLength = parseInt(value, 10);
      dynamicTitle = `${targetLength}-Letter Words`;
      
      wordsData = await db.word.findMany({
        where: { length: targetLength, lang },
        take: 250,
        orderBy: { score: "desc" } // Places the highest scoring plays on top for maximum utility
      });
    } 
    
    else if (type === "starts") {
      dynamicTitle = `Words Starting With "${value.toUpperCase()}"`;
      
      wordsData = await db.word.findMany({
        where: { word: { startsWith: value.toLowerCase() }, lang },
        take: 250,
        orderBy: { length: "asc" }
      });
    } 
    
    else if (type === "ends") {
      dynamicTitle = `Words Ending In "${value.toUpperCase()}"`;
      
      wordsData = await db.word.findMany({
        where: { word: { endsWith: value.toLowerCase() }, lang },
        take: 250,
        orderBy: { length: "asc" }
      });
    }

    return {
      title: dynamicTitle,
      words: wordsData.map((w) => w.word)
    };
  } catch (err) {
    console.error("Programmatic SEO database query failure:", err);
    return null;
  }
}
