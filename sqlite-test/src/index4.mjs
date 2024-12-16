import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: 'data.db',
        driver: sqlite3.Database
    });

    const person = await db.get('select * from student WHERE name = :name', {
        ':name': '张三'
    })
    console.log(person);

    const allData = await db.all('SELECT * FROM student');
    console.log(allData);
}

main();
