import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: '1-many.db',
        driver: sqlite3.Database
    });

    const insert = await db.prepare('INSERT INTO article (id, title, content) VALUES (?, ?, ?)');
    insert.run(1, '文章1', '这是文章1的内容。');
    insert.run(2, '文章2', '这是文章2的内容。');
    insert.run(3, '文章3', '这是文章3的内容。');
    insert.run(4, '文章4', '这是文章4的内容。');
    insert.run(5, '文章5', '这是文章5的内容。');
    insert.finalize();

    const insert2 = await db.prepare('INSERT INTO tag (id, name) VALUES (?, ?)');
    insert2.run(1, '标签一');
    insert2.run(2, '标签二'),
    insert2.run(3, '标签三'),
    insert2.run(4, '标签四'),
    insert2.run(5, '标签五'),
    insert2.finalize()

    const insert3 = await db.prepare('INSERT INTO article_tag(article_id, tag_id) VALUES (?, ?)');
    [
        [1,1], [1,2], [1,3],
        [2,2], [2,3], [2,4],
        [3,3], [3,4], [3,5],
        [4,4], [4,5], [4,1],
        [5,5], [5,1], [5,2]
    ].forEach(item => {
        insert3.run(item[0], item[1]);
    })
    insert3.finalize();
} 

main();
