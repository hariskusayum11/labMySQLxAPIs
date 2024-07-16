'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

udRoute.use(express.json()); // Middleware to parse JSON body

// Update Students record
udRoute.put('/Students/:uid', async (req, res, next) => {
    try {
        await connection.execute("UPDATE Students SET Std_Name=?, Std_Surname=?, Faculty=?, Major=?, year_class=?, password=? WHERE id=?;", 
            [req.body.Std_Name, req.body.Std_Surname, req.body.Faculty, req.body.Major, req.body.year_class, req.body.password, req.params.uid]);
        console.log('Update successful');
        res.status(200).send("Update Successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update.");
    }
});

// Delete Students record
udRoute.delete('/Students/:uid', async (req, res, next) => {
    try {
        await connection.execute("DELETE FROM Students WHERE id=?;", [req.params.uid]);
        console.log('Delete successful');
        res.status(200).send("Delete Successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete.");
    }
});

// Update Homework record
udRoute.put('/Homework/:uid', async (req, res, next) => {
    try {
        await connection.execute("UPDATE Homework SET HW_Name=?, HW_Details=?, Deadline=?, HW_Level=? WHERE id=?;", 
            [req.body.HW_Name, req.body.HW_Details, new Date(req.body.Deadline), req.body.HW_Level, req.params.uid]);
        console.log('Update successful');
        res.status(200).send("Update Successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update.");
    }
});

// Delete Homework record
udRoute.delete('/Homework/:uid', async (req, res, next) => {
    try {
        await connection.execute("DELETE FROM Homework WHERE id=?;", [req.params.uid]);
        console.log('Delete successful');
        res.status(200).send("Delete Successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete.");
    }
});

// Default route for undefined paths
udRoute.use((req, res, next) => {
    res.sendStatus(404);
});

module.exports = udRoute;
