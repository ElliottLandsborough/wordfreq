# Word Frequency Counter

How many times do all of the words in a text appear in a plain text file? Run this script to find out.

# How to run it

It takes one argument - a path to the file to be read. It has only been tested with plaintext files.

If you already have node set up on your machine:

```bash
npx ts-node src/index.ts ./books/hello.small.txt
```

If you don't, install node (e.g with NVM) and then these commands should work:

```bash
npm install
npx ts-node src/index.ts ./books/hello.small.txt
```

Or to compile the typescript into something node compatible:

```bash
npm install
npm create
node . books/hello.small.txt
```

There are various texts in the books directory to choose from.

I started off thinking that I could strip out all punctuation. This approach does not work if you have bad input (see blns.txt). A better approach is to assume that we only want to count english words. It would be possible to add more characters to the allow list down the line (e.g some french accents â, ê, î, ô, û). I also forgot to convert to lower case until the last minute. 

# Notes

 - It processes the file line-by-line instead of opening the whole thing
 - I opted not to include the 'built' files in the lib folder
 - I tried to remove all punctuation but it was a bad approach
 - Better to have an 'allow list' of characters - e.g I chose french/spanish/english letters
 