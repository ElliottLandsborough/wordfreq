#!/usr/bin/env node

import * as fs from 'fs';
import yargs from 'yargs/yargs';
import { wordFreq } from "./wordfreq";

const argv = yargs(process.argv.slice(2)).options({
  file: { type: 'string', demandOption: true, alias: 'f', description: 'Path to plain text file' },
}).parseSync();

if (argv.file.length === 0) {
  console.log("No file path was specified.");
  process.exit(-1);
}

const filePath = argv.file;

fs.stat(filePath, (exists: any) => {
  if (exists == null) {
    wordFreq(filePath);
  } else if (exists.code === "ENOENT") {
    console.log("File does not exist.");
    process.exit(-1);
  }
});
