const fs = require("fs");
const readline = require("readline");

export async function wordFreq(filePath: string) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  var wordFreqs: Map<string, number> = new Map<string, number>();

  for await (const line of rl) {
    const lineWithDashesReplaced = line.replace(/-/g, " ");
    const words = lineWithDashesReplaced.split(" ");

    if (words.length > 0) {
      for await (const word of words) {
        if (word.length) {
          const englishWord = word.replace(/[^a-z]/gi, "").toLowerCase();
          if (englishWord.length) {
            let count = wordFreqs.get(englishWord) || 0;
            count++;
            wordFreqs.set(englishWord, count);
          }
        }
      }
    }
  }

  if (wordFreqs.size === 0) {
    console.log("No words found.");
    return;
  }

  const sortAlphabetically = new Map(
    [...wordFreqs].sort((a, b) => String(a[0]).localeCompare(b[0]))
  );

  const mostCommonWords = new Map(
    [...sortAlphabetically.entries()].sort((a, b) => b[1] - a[1])
  );

  for await (let [word, count] of mostCommonWords) {
    console.log(word + ":", count);
  }
}
