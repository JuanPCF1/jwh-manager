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

export const getAllEmployeeController = async (req, res) => {
    try {
      const [rows] = await pool.execute(`
        SELECT 
          Employee_ID,
          Employee_Name,
          Username
        FROM employee
      `);
  
      res.json(rows);
    } catch (err) {
      console.error("Error fetching employees:", err);
      res.status(500).json({ error: "Failed to fetch employee data" });
    }
  };

  export const updateEmployeeController = async (req, res) => {
    try {
        const { Employee_ID } = req.params;
        const fieldsToUpdate = req.body;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
        }

        const setClauses = [];
        const values = [];

        for (const key in fieldsToUpdate) {
            if (key === "Password") {
                setClauses.push(`${key} = ?`);
                values.push(hashPassword(fieldsToUpdate[key])); // hash password if being updated
            } else {
                setClauses.push(`${key} = ?`);
                values.push(fieldsToUpdate[key]);
            }
        }

        const query = `
            UPDATE employee
            SET ${setClauses.join(', ')}
            WHERE Employee_ID = ?
        `;

        values.push(Employee_ID); // Add WHERE clause parameter

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Failed to update employee' });
    }
};