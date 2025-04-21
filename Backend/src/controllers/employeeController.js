import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createEmployeeController = async (req, res) => {
    try {
        const {Employee_Name, Username, Password } = req.body;
        const hashedPassword = hashPassword(Password);

        // Insert the new employee into the database
        const [result] = await pool.query(
            'INSERT INTO employee (Employee_Name, Username, Password) VALUES (?,?,?)',
            [Employee_Name, Username, hashedPassword]
        );

        res.status(201).json({
            message: 'Employee created successfully',
            employeeId: result.insertId
        });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Failed to create employee' });
    }
}

export const deleteEmployeeController = async (req, res) => {
    try {
        const { Employee_ID } = req.params;

        // Delete the employee from the database
        const [result] = await pool.query(
            'DELETE FROM employee WHERE Employee_ID = ?',
            [Employee_ID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
}