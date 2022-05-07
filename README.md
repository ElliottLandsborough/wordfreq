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

I started off thinking that I could strip out all punctuation. This approach does not work if you have bad input (see blns.txt). A better approach is to assume that we only want to count English words. It would be possible to add more characters to the allow list down the line (e.g some french accents â, ê, î, ô, û). I also forgot to convert to lower case until the last minute. I considered using regex word boundaries but numbers are counted as words so I'd have to do as much processing on the result as I already am.

I think there could be issues if I tried to scan a massive file all on the same line. I'm pretty sure the file would be streamed from the hard drive optimally but I'm not sure if the whole line needs to be in memory before it can be parsed in regex. So one of my presumptions is that all the files coming through will be on multiple lines instead of one big one.

I also think I could have split wordfreq.ts into smaller methods. In this case I think it would become less readable if I was do do that. If asked to add more to it I would think about separating into functions.

 - It processes the file line-by-line instead of opening the whole thing
 - I tried to remove all punctuation but it was a bad approach
 - Better to have an 'allow list' of characters - e.g I chose English letters only for this
 - Replace dashes with spaces
 - Convert all words to lowercase
 - Store results in a map, sort the map alphabetically, then sort by word counts, output to console
 