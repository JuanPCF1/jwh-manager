import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createAdminController = async (req, res) => {
    try {
        const { Username, Password, Employee_ID, EnteredPin } = req.body;
        const hashedPassword = hashPassword(Password);

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