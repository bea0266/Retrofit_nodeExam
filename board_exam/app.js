const express = require('express');
const app = express();
const mysql = require('mysql');


const connection = mysql.createConnection({

    host: "localhost",
    port: "3307",
    user: "root",
    password: "password",
    database: "board"

})

connection.connect(() => {
    console.log("mysql connected!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get('/', (req, res) => {

    res.send(`게시판 저장 예제`);

});

app.post('/inserts', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var hits = req.body.hits;
    var write_date = req.body.write_date;
    var writer = req.body.writer;
    console.log(`title: ${ title }, writer: ${ writer }, hits: ${ hits }, description: ${ description }, write_date: ${ write_date }`);


    connection.query(`INSERT INTO post(title, writer, hits, description, write_date) VALUES('${title}', '${writer}', ${ hits }, '${description}', '${write_date}')`,
        function(error, result) {

            if (error) {

                console.log(error);
                res.send(error);
                throw error;

            }
            res.send(result);
            console.log(`title: ${ title }, writer: ${ writer }, hits: ${ hits }, description: ${ description }, write_date: ${ write_date }`);
        });
});


app.listen(3005, () => {
    console.log('node-server 3005 port open');
});