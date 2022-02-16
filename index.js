const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const wordsFrench = require('./words_fr');
const wordsEnglish = require('./words_en');

let denieds = ''; // Memory of all denied letters

(async () => {
  console.info(`
How does it works:
  The program will ask you for valid, misplaced and denied letters.
  It will remember all the denied letters you've added word after word.
  If you know the first and third letter of a word you can set it like so:
  'o_t' == 'o_t__'
  Underscores will be ignored.
  The program will output you a list of posible words. Enjoy!
`);

  const language = await prompt('Choose language (fr|en):\n');
  console.log(`Running with language: ${language === 'fr' ? 'French' : 'English'}\n`);
  const words = (language === 'fr' ? wordsFrench : wordsEnglish);

  while (true) {
    const validLetters = await prompt('Valid letters:\n');
    const misplacedLetters = await prompt('Misplaced letters:\n');
    const deniedLetters = await prompt('Denied letters:\n');

    denieds += deniedLetters;

    let run = true;
    const posibilities = [];
    for (const word of words) {
      run = true;
      // check for valid letters
      for (let i = 0; i < validLetters.length; ++i) {
        const validLetter = validLetters[i];
        if (validLetter === '_')
          continue;
        if (validLetter !== word[i]) {
          run = false;
          break;
        }
      }
      if (!run)
        continue;
      //check for misplaced letters
      for (let j = 0; j < misplacedLetters.length; ++j) {
        const misplacedLetter = misplacedLetters[j];
        if (misplacedLetter === '_')
          continue;
        if (!word.includes(misplacedLetter)) {
          run = false;
          break;
        }
        if (word[j] === misplacedLetter) {
          run = false;
          break;
        }
      }
      if (!run)
        continue;
      // check for denied letters
      for (const deniedLetter of denieds) {
        if (word.includes(deniedLetter)) {
          run = false;
          break;
        }
      }
      if (!run)
        continue;
      posibilities.push(word);
    }
    console.table(posibilities);
  }
})();
