#!/usr/bin/env node

import { wordFreq } from "./wordfreq";

const fs = require("fs");

if (process.argv[2] === undefined || process.argv[2].length === 0) {
  console.log("No file path was specified.");
  process.exit(-1);
}

const filePath = process.argv[2];

fs.stat(filePath, (exists: any) => {
  if (exists == null) {
    wordFreq(filePath);
  } else if (exists.code === "ENOENT") {
    console.log("File does not exist.");
    process.exit(-1);
  }
});
