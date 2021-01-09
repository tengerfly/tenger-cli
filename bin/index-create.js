#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)

// vue create demo
program.usage('[project-name]')
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()

// 获取项目名称
let projectName = program.args[0]

// 小小校验一下参数
if (!projectName) {
  console.log(chalk.red('\n 项目名称不能为空 \n '))
  return
}

url = tplObj.cli.url

console.log(projectName,url)

console.log(chalk.white('\n Start generating... \n'))
// 出现加载图标
const spinner = ora("Downloading...");
spinner.start();

const downOptions = {
  clone: true
}
// 执行下载方法并传入参数
download(
  url,
  projectName,
  downOptions,
  err => {
    if (err) {
      console.log(err)
      spinner.fail();
      console.log(chalk.red(`Generation failed. ${err}`))
      return
    }
    // 结束加载图标
    spinner.succeed();
    console.log(chalk.green('\n 下载完成!'))
    console.log(chalk.yellow('\n 打工人，开始干饭了!'))
    console.log(`\n    cd ${projectName} \n`)
  }
)

// export const projectName = projectName