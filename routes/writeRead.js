'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.use(express.json());

wrRoute.post('/Students', async (req, res, next) => {
    try {
        let mypass = crypto.createHash('md5').update(req.body.password).digest('hex');
        await connection.execute(`INSERT INTO Students
            (Std_ID, Std_Name, Std_Surname, Faculty, Major, year_class, password)
            VALUES (?, ?, ?, ?, ?, ?, ?);`, 
            [req.body.Std_ID, req.body.Std_Name, req.body.Std_Surname, req.body.Faculty, req.body.Major, req.body.year_class, mypass]);
        
        console.log('Insert Students Successful!');
        res.status(201).send('Insert Students Successful!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error inserting student data');
    }
});

wrRoute.post('/Homework', async (req, res, next) => {
    try {
        await connection.execute(`INSERT INTO Homework
            (HW_Name, HW_Details, Deadline, HW_Level)
            VALUES (?, ?, ?, ?);`, 
            [req.body.HW_Name, req.body.HW_Details, new Date(req.body.Deadline), req.body.HW_Level]);
        
        console.log('Insert Homework Successful!');
        res.status(201).send('Insert Homework Successful!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error inserting homework data');
    }
});

//-----------------------------read--------------------------------------
wrRoute.get('/Students', async (req, res, next) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM Students;');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching student data');
    }
});

wrRoute.post('/checkstd', async (req, res, next) => {
    try {
        let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
        const [rows] = await connection.execute('SELECT * FROM Students WHERE Std_ID = ? AND password = ?;', 
        [req.body.Std_ID, mypass]);

        if (rows.length === 0) {
            res.sendStatus(200);  // No matching student found
        } else {
            res.sendStatus(400);  // Matching student found
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

wrRoute.post('/checkhw', async (req, res, next) => {
    try {
        let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
        const [rows] = await connection.execute('SELECT * FROM Homework WHERE HW_Name = ? AND HW_Level = ?;', 
        [req.body.HW_Name, req.body.HW_Level]);

        if (rows.length === 0) {
            res.sendStatus(200);  // No matching homework found
        } else {
            res.sendStatus(400);  // Matching homework found
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

// Default route for undefined paths
wrRoute.use((req, res, next) => {
    res.sendStatus(404);
});

module.exports = wrRoute;
