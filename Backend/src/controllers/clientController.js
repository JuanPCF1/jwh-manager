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
            'DELETE FROM client WHERE ID = ?',
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

export const getAllClientController = async (req, res) => {
    try {
      const [rows] = await pool.execute(`
        SELECT 
            Client_Name,
            Referred_by,
            ID
        FROM client
      `);
  
      res.json(rows);
    } catch (err) {
      console.error("Error fetching clients:", err);
      res.status(500).json({ error: "Failed to fetch client data" });
    }
  };

  export const filterClientController = async (req, res) => {
    try {
        const { Client_Name, Referred_by, ID } = req.query;

        // Start building the query
        let query = `
            SELECT 
                ID,
                Client_Name, 
                Referred_by
            FROM client
            WHERE 1=1
        `;
        const params = [];

        // Add filters if they are provided
        if (Client_Name) {
            query += ' AND Client_Name = ?';
            params.push(Client_Name);
        }

        if (Referred_by) {
            query += ' AND Referred_by = ?';
            params.push(Referred_by);
        }
        if (ID) {
            query += ' AND ID = ?';
            params.push(ID);
        }
        const [rows] = await pool.query(query, params);
        res.json(rows);

    } catch (err) {
        console.error("Error fetching client:", err);
        res.status(500).json({ error: "Failed to fetch client data" });
    }
};