const inquirer = require('inquirer');
const fs = require('fs');
const format = require('date-format');
const { execSync} = require('child_process');

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

    // 3. if commit is allowed do it!
    if (answers.commit) {
        try {
            execSync(`git add ${filepath}`)
            execSync(`git commit -m 'added question ${filepath}'`)
            execSync(`git push`)
        } catch (error) {
            console.log(`could not make the commit ${error}`)
        }
    }
    

    console.log('error', child.error);
    console.log('stdout ', child.stdout);
    console.log('stderr ', child.stderr);
    
    console.log(execSync('git add .'))
    

  });

  