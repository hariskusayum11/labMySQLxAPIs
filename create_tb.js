var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "workloaddb",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // Create Students table
    var sqlStudents = 'CREATE TABLE IF NOT EXISTS Students ( ' +
                       'id INT AUTO_INCREMENT PRIMARY KEY, ' +
                       'Std_ID CHAR(9) NOT NULL, ' +
                       'Std_Name VARCHAR(100) NOT NULL, ' +
                       'Std_Surname VARCHAR(100) NOT NULL, ' +
                       'Faculty VARCHAR(1) NOT NULL, ' +
                       'Major VARCHAR(200) NOT NULL, ' +
                       'year_class VARCHAR(1) NOT NULL, ' +
                       'password VARCHAR(255) NOT NULL )';
    con.query(sqlStudents, function(err, result) {
        if (err) throw err;
        console.log("Table 'Students' created");
    });

    // Create Homework table
    var sqlHomework = 'CREATE TABLE IF NOT EXISTS Homework ( ' +
                      'id INT AUTO_INCREMENT PRIMARY KEY, ' +
                      'HW_Name VARCHAR(100) NOT NULL, ' +
                      'HW_Details VARCHAR(255) NOT NULL, ' +
                      'Deadline DATETIME, ' +
                      'HW_Level VARCHAR(1) NOT NULL )';
    con.query(sqlHomework, function(err, result) {
        if (err) throw err;
        console.log("Table 'Homework' created");
    });
});