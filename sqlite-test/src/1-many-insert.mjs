import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: '1-many.db',
        driver: sqlite3.Database
    });

    const insert = await db.prepare('INSERT INTO department (id, name) VALUES (?, ?)');
    insert.run(1, '人事部');
    insert.run(2, '财务部'),
    insert.run(3, '市场部'),
    insert.run(4, '技术部'),
    insert.run(5, '销售部'),
    insert.run(6, '客服部'),
    insert.run(7, '采购部'),
    insert.run(8, '行政部'),
    insert.run(9, '品控部'),
    insert.run(10, '研发部');
    insert.finalize()

    const insert2 = await db.prepare('INSERT INTO employee(id, name, department_id) VALUES (?, ?, ?)');
    insert2.run(1, '张三', 1);
    insert2.run(2, '李四', 2); 
    insert2.run(3, '王五', 3);
    insert2.run(4, '赵六', 4);
    insert2.run(5, '钱七', 5);
    insert2.run(6, '孙八', 5);
    insert2.run(7, '周九', 5);
    insert2.run(8, '吴十', 8);
    insert2.run(9, '郑十一', 9);
    insert2.run(10, '王十二', 10);
    insert2.finalize();
} 

main();
