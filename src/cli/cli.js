const inquirer = require('inquirer');
const fs = require('fs');
const format = require('date-format');
const { spawnSync} = require('child_process');
var execSync = require('child_process').execSync;


const child = spawnSync('git', ['add', '.']);

console.log('error', child.error);
console.log('stdout ', child.stdout);
console.log('stderr ', child.stderr);

console.log(execSync('git add .'))

const currentDate = format('dd/MM/yyyy', new Date());

inquirer
  .prompt([
    {
        type: 'input',
        name: 'category',
        message: 'Category: '
    },
    {
        type: 'editor',
        name: 'question',
        message: 'Questions & Answer',
        default: `---
date: ${currentDate}
---
## Question

## Answer
`
    },
    {
        type: 'confirm',
        name: 'commit',
        message: 'do you want to do a commit + push',
        default: false
    }
  ])
  .then(answers => {
    // 1. create folder if category doesn't exist
    const dir = `${__dirname}/../../questions/${answers.category}`
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // 2. Create file (which filename? uuid for the timestamp?)
    const ts = new Date().getTime()
    const filename = `${ts}.md`
    const filepath = `${dir}/${filename}`

    fs.writeFileSync(filepath, answers.question)



  });

  