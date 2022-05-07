#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  if (process.argv[2] === undefined) {
    console.log('No file path was specified.');
    process.exit(1);
  }

  let filePath = process.argv[2];

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var wordFreqs: Map<string, number> = new Map<string, number>();

  for await (const line of rl) {
    const lineWithDashesReplaced = line.replace(/-/g, ' ')
    const words = lineWithDashesReplaced.split(" ");

    if (words.length > 0) {
        for await (const word of words) {
            if (word.length) {
                const englishWord = word.replace(/[^a-z]/gi, '').toLowerCase();
                if (englishWord.length) {
                    let count = wordFreqs.get(englishWord) || 0;
                    count++;
                    wordFreqs.set(englishWord, count);
                }
            }
        }
    }
  }

  const mostCommonWords = new Map([...wordFreqs.entries()].sort((a, b) => b[1] - a[1]));

  for await (let [word, count] of mostCommonWords) {
    console.log(word + ':', count);
  }
}

processLineByLine();