const express = require('express');
const app = express();
const mysql = require('mysql');


const connection = mysql.createConnection({

    host: "127.0.0.1",
    port: "3307",
    user: "root",
    password: "password",
    database: "board"

})

//connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get('/', (req, res) => {

    res.send(`게시판 저장 예제`);

});

app.put('/addHits', (req,res) => {

    let position = req.body.position;
    position++;
    
    let hits = req.body.hits;
    
    let sql = `UPDATE post SET hits=${hits} WHERE postNum=${position} `
    connection.query(sql,function(error, result){

        if (error) {

            console.log(error);
            res.send(error);
            throw error;

        }
        console.log(`id: ${position}, hits: ${hits}`);
        res.send(result);

    });
    

});

app.post('/inserts', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let hits = req.body.hits;
    let write_date = req.body.write_date;
    let writer = req.body.writer;
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