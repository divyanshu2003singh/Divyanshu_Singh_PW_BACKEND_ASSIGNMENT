// routes/recordRoutes.js

const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// Add a new record
router.post('/', recordController.addRecord);

// Delete a record
router.delete('/:name', recordController.deleteRecord);

// Fetch summary statistics for salary over the entire dataset
router.get('/summary', recordController.getSummaryStatistics);

// Fetch summary statistics for salary for records with "on_contract" true
router.get('/summary/on-contract', recordController.getOnContractSummaryStatistics);

// Fetch summary statistics for salary for each department
router.get('/summary/by-department', recordController.getSummaryByDepartment);

// Fetch summary statistics for salary for each department and sub-department combination
router.get('/summary/by-department-sub-department', recordController.getSummaryByDepartmentSubDepartment);

module.exports = router;
