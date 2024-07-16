const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())//ส่งข้อมูลแบบjson ไปอย่าลืม2บรรทัดนี้
app.use(express.urlencoded({ extended: true }))

const writeRead = require('./routes/writeRead.js');
const updateDelete = require('./routes/updateDelete.js');

app.use('/wr', writeRead);//การเรียกใช้หน้า writeRead

app.use('/ud', updateDelete);//การเรียกใช้หน้า updateDelete

app.use('/', function (req, res, next) { //ถ้าไม่ใส่
    res.sendStatus(404);
});

app.listen(PORT, () =>
    console.log('Server running on port: ' + PORT)

);