import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createAdminController = async (req, res) => {
    try {
        const { Username, Password, Employee_ID, EnteredPin } = req.body;
        const hashedPassword = hashPassword(Password);

        // Check if an employee exists with the given Employee_ID
        const [employee] = await pool.query(
            'SELECT * FROM employee WHERE Employee_ID = ?',
            [Employee_ID]
        );

        if (employee.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        if (EnteredPin !== 456852) {
            return res.status(401).json({ message: 'Invalid PIN' });
        }

        const [result] = await pool.query(
            'INSERT INTO admin (Username, Password, Employee_ID) VALUES (?, ?, ?)',
            [Username, hashedPassword, Employee_ID]
        );

        res.status(201).json({
            message: 'Admin created successfully',
            adminId: result.insertId
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Failed to create admin' });
    }
}

export const deleteAdminController = async (req, res) => {
    try {
        const { Username } = req.params;

        const [result] = await pool.query(
            'DELETE FROM admin WHERE Username = ?',
            [Username]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ error: 'Failed to delete admin' });
    }
}

export const getAllAdminController = async (req, res) => {
    try {
      const [rows] = await pool.execute(`
        SELECT 
            Username,
            Employee_ID
        FROM admin
      `);
  
      res.json(rows);
    } catch (err) {
      console.error("Error fetching admins:", err);
      res.status(500).json({ error: "Failed to fetch admin data" });
    }
  };