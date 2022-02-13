const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const words = require('./words');

let denieds = ''; // Memory of all denied letters

(async () => {
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
        const validLetter = validLetters[i].toUpperCase();
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
        const misplacedLetter = misplacedLetters[j].toUpperCase();
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
        if (word.includes(deniedLetter.toUpperCase())) {
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
