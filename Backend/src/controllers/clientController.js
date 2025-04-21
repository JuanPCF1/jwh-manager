import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createClientController = async (req, res) => {
    try {
        const { ID, Client_Name, Referred_by } = req.body;

        const [result] = await pool.query(
            'INSERT INTO client (ID, Client_Name, Referred_by) VALUES (?, ?, ?)',
            [ID, Client_Name, Referred_by]
        );

        res.status(201).json({
            message: 'Client created successfully',
            adminId: result.insertId
        });
    } catch (error) {
        console.error('Error creating Client:', error);
        res.status(500).json({ error: 'Failed to create Client' });
    }
}

export const deleteClientController = async (req, res) => {
    try {
        const { ID } = req.params;

        const [result] = await pool.query(
            'DELETE FROM admin WHERE Username = ?',
            [ID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ error: 'Failed to delete client' });
    }
}