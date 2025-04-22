import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createContractController = async (req, res) => {
    try {
        const { Start_Date, Company_Name, Client_ID } = req.body;

        const Job_Number = req.body['Job#'];

        const [result] = await pool.query(
            'INSERT INTO contract (`Job#\`, Start_Date, Company_Name, Client_ID) VALUES (?, ?, ?, ?)',
            [Job_Number, Start_Date, Company_Name, Client_ID]
        );

        res.status(201).json({
            message: 'Contract created successfully',
            adminId: result.insertId
        });
    } catch (error) {
        console.error('Error creating Contract:', error);
        res.status(500).json({ error: 'Failed to create Contract' });
    }
}

export const deleteContractController = async (req, res) => {
    try {

        const { Job_Number } = req.params;

        const [result] = await pool.query(
            'DELETE FROM contract WHERE `Job#\` = ?',
            [Job_Number]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        res.status(200).json({ message: 'Contract deleted successfully' });
    } catch (error) {
        console.error('Error deleting Contract:', error);
        res.status(500).json({ error: 'Failed to delete Contract' });
    }
}

export const getAllContractsController = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM contract'
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
}

export const getContractByIdController = async (req, res) => {
    try {
        const { Job_Number } = req.params;
        if (!Job_Number) {
            // Call on the getAllContractsController if no Job_Number is provided
            return await getAllContractsController(req, res);
        }

        const [result] = await pool.query(
            'SELECT * FROM contract WHERE `Job#` = ?',
            [Job_Number]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching contract:', error);
        res.status(500).json({ error: 'Failed to fetch contract' });
    }
}