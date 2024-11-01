import { input, select, password } from '@inquirer/prompts';

const name = await input({ message: '请输入你的名字' });

const job = await select({
    message: '选择你的职业',
    choices: [
      {
        name: '教师',
        value: '教师',
        description: '11111',
      },
      {
        name: '医生',
        value: '医生',
        description: '22222',
      }
    ],
});

const pass = await password({ message: '请输入密码' });

console.log({
    name,
    job,
    pass
})

