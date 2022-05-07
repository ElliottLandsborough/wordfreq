# Word Frequency Counter

How many times does each word appear in a plain text file? Run this script to find out.

## How to run it

It takes one argument - a path to the file to be read. It has only been tested with plaintext files.

Install node on your machine, you should have npx now:

```bash
npm install
npx ts-node src/index.ts -f ./text/hello.small.txt
```

Some larger files:

```bash
npx ts-node src/index.ts -f ./text/lipsum.medium.txt
npx ts-node src/index.ts -f ./text/omnidoxy.huge.txt
npx ts-node src/index.ts -f ./text/blns.txt
```

Or to compile the typescript into something node compatible:

```bash
npm install
npm run create
node . -f text/hello.small.txt
```

## Tests

```bash
npm t
```

# Notes

There are various files in the text directory to choose from.

I started off thinking that I could strip out all punctuation. This approach does not work if you have bad input (see blns.txt). A better approach is to assume that we only want to count English words. It would be possible to add more characters to the allow list in the future (e.g some french accents â, ê, î, ô, û). I also forgot to convert to lowercase until the last minute. I considered using regex word boundaries but numbers are counted as words so I'd have to do as much processing on the result as I already have to with the current solution.

I think there could be issues if I tried to scan a massive file that is all on one line. I -think- the file would be streamed from the hard drive optimally but I'm not sure if the whole line needs to be in memory before it can be parsed by the internal regex functions. Another presumption is that the files we want to process won't have any extremely long lines. An easy fix for this issue might be to increase RAM.

I could have split `wordfreq.ts` into smaller methods. In this case I think it would become less readable. If asked to add more to it I would think about separating into functions. Maybe a text processing utility class or even a text processing npm package. I bet there is already a package that does what this challenge needs but it would have been a boring solution if i just pulled a package in and ran it in two lines.

I don't like how I am checking the console output with the tests. A better way might be to buffer the entire output into a string and then outputting that entire string with `console.log`. Then, I could store the full output of all of the wordcounts of the text files in this repository which would make the tests much more precise. The drawback of course being that the tests might be too brittle and therefore annoying to maintain when we make small changes to the code.

 - It processes the file line-by-line instead of opening the whole thing
 - I tried to remove all punctuation but it was a bad approach
 - Better to have an 'allow list' of characters - e.g I chose English letters only for this
 - Replace dashes with spaces - in english when there is a dash it is joining two single words together
 - Convert all words to lowercase to avoid counting twice
 - Store results in a map
 - Sort the map alphabetically first
 - Sort by word counts second
 - Output to console
 