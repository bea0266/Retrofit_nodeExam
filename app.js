const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3307",
    user: "root",
    password: "password",
    database: "test"
})

//connection.connect();



app.get('/', (req, res) => {

    res.send(`유저 데이터 저장 예제`);

});

app.get('/posts', (req, res) => {

    connection.query(`SELECT * FROM userinfo`, function(error, result, fields) {
        //connection.end();
        if (error) {
            console.log(error);
            res.send(error);
        }
        console.log(result);
        res.send(result);
    })

});
app.get("/send", (req, res) => {
    var userId = req.query.userId;
    var userPw = req.query.userPw;

    connection.query(`INSERT INTO userinfo(userId, userPw) VALUES('${userId}', '${userPw}')`,
        function(error, result) {

            if (error) {

                console.log(error);
                res.send(error);
                throw error;

            }
            res.send(result);
            console.log(`userId: ${ userId }, userPw: ${ userPw }`);
        });

});

app.listen(8000, () => {
    console.log("127.0.0.1:8000 is open");
});
