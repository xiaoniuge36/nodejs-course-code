import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
    CREATE TABLE student(
        id INTEGER PRIMARY KEY,
        name TEXT,
        age INT
    ) STRICT
    `);

    const stmt = db.prepare('INSERT INTO student (id, name, age) VALUES (?, ?, ?)');
    stmt.run(1, '张三', 20);
    stmt.run(2, '李四', 21);
    stmt.run(3, '王五', 22);
    stmt.finalize();

    db.each('SELECT * FROM student ORDER BY id', (err, row) => {
        console.log(row.id, row.name, row.age);
    });
});

db.close();
