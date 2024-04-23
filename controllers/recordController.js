// controllers/recordController.js

const records = require('../data/dataset.json');
const fs = require('fs'); 
// Add a new record
exports.addRecord = (req, res) => {
    const newRecord = req.body;
    records.push(newRecord);
    res.status(201).json({ message: 'Record added successfully', record: newRecord });
};

// Delete a record
exports.deleteRecord = (req, res) => {
    const recordName = req.params.name; 
    console.log("Deleting record with name:", recordName);
    const index = records.findIndex(record => record.name === recordName);
    if (index !== -1) {
        records.splice(index, 1);
        fs.writeFileSync('./data/dataset.json', JSON.stringify(records, null, 2));
        res.status(200).json({ message: 'Record deleted successfully' });
    } else {
        console.log(recordName);
        res.status(404).json({ message: 'Record not found' });
    }
};
// Fetch summary statistics for salary over the entire dataset
exports.getSummaryStatistics = (req, res) => {
    const salaries = records.map(record => parseFloat(record.salary));
    const mean = calculateMean(salaries);
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    res.status(200).json({ mean, min, max });
};

// Fetch summary statistics for salary for records with "on_contract" true
exports.getOnContractSummaryStatistics = (req, res) => {
    const onContractRecords = records.filter(record => record.on_contract === true);
    const salaries = onContractRecords.map(record => parseFloat(record.salary));
    const mean = calculateMean(salaries);
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    res.status(200).json({ mean, min, max });
};

// Fetch summary statistics for salary for each department
exports.getSummaryByDepartment = (req, res) => {
    const departmentSummary = {};
    records.forEach(record => {
        if (!departmentSummary[record.department]) {
            departmentSummary[record.department] = [];
        }
        departmentSummary[record.department].push(parseFloat(record.salary));
    });
    for (const department in departmentSummary) {
        const salaries = departmentSummary[department];
        departmentSummary[department] = {
            mean: calculateMean(salaries),
            min: Math.min(...salaries),
            max: Math.max(...salaries)
        };
    }
    res.status(200).json(departmentSummary);
};

// Fetch summary statistics for salary for each department and sub-department combination
exports.getSummaryByDepartmentSubDepartment = (req, res) => {
    const departmentSubDepartmentSummary = {};
    records.forEach(record => {
        const key = `${record.department}_${record.sub_department}`;
        if (!departmentSubDepartmentSummary[key]) {
            departmentSubDepartmentSummary[key] = [];
        }
        departmentSubDepartmentSummary[key].push(parseFloat(record.salary));
    });
    for (const key in departmentSubDepartmentSummary) {
        const salaries = departmentSubDepartmentSummary[key];
        departmentSubDepartmentSummary[key] = {
            mean: calculateMean(salaries),
            min: Math.min(...salaries),
            max: Math.max(...salaries)
        };
    }
    res.status(200).json(departmentSubDepartmentSummary);
};

// Function to calculate mean
function calculateMean(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
}
