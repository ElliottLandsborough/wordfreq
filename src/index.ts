#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('books/lipsum.medium.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var wordFreqs: Map<string, number> = new Map<string, number>();

  for await (const line of rl) {
    const words = line.split(" ");

    if (words.length > 0) {
        for await (const word of words) {
            if (word.length) {
                const punctuationless = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                const finalWord = punctuationless.replace(/\s{2,}/g," ");

                if (finalWord.length) {
                    let count = wordFreqs.get(finalWord) || 0;
                    count++;
                    wordFreqs.set(finalWord, count);
                }
            }
        }
    }
  }

  const mostCommonWords = new Map([...wordFreqs.entries()].sort((a, b) => b[1] - a[1]));

  for await (let [word, count] of mostCommonWords) {
    console.log(word, count);
  }
}

processLineByLine();