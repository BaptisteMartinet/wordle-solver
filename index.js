const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const words = require('./words');

const denieds = '';

(async () => {
  while (true) {
    const validLetters = await prompt('Valid letters:\n');
    const misplacedLetters = await prompt('Misplaced letters:\n');
    const deniedLetters = await prompt('Denied letters:\n');

    denieds.concat(deniedLetters);
  
    const posibilities = [];
    let i;
    for (const word of words) {
      // check for valid letters
      for (i = 0; i < validLetters.length; ++i) {
        const letter = validLetters[i];
        if (letter === '_')
          continue;
        else if (letter === word[i].toLowerCase())
          continue;
        else
          break;
      }
      if (i !== validLetters.length)
        continue;
      //check for misplaced letters
      let run = true;
      let j = 0;
      for (const misplacedLetter of misplacedLetters) {
        if (misplacedLetter === '_')
          continue;
        if (!word.includes(misplacedLetter.toUpperCase())) {
          run = false;
          break;
        }
        if (word[j].toLowerCase() === misplacedLetter) {
          run = false;
          break;
        }
        j++;
      }
      if (!run)
        continue;
      // check for denied letters
      run = true;
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
