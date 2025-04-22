import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createContentController = async (req, res) => {
    try { 
        // Grabs the JSON conents from front end can be seen in Thunder client. 
        // Making variable names for each one of the request bodies.
        const { Section_ID, Location_Name, Store_Date, 
            Type, Monthly_Cost, Status, Invoice_Code, Client_ID, Company_Name} = req.body;

        const Job_Number = req.body['Job#'];


        // Query into SQL
        const [result] = await pool.query(
            'INSERT INTO content (Section_ID, Location_Name, Store_Date, Type, Monthly_Cost, Status, Invoice_Code, Client_ID, Company_Name, `Job#\`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Section_ID, Location_Name, Store_Date, Type, Monthly_Cost, Status, Invoice_Code, Client_ID, Company_Name, Job_Number]
        );

        // Return statment to front end. Gives message on good things or bad and passes json.
        // Return whatever is requested. IE all of users, one crate, etc.
        // HTTP codes for the res.status(xxx)
        res.status(201).json({
            message: 'Content created successfully',
            adminId: result.insertId
        });
      // Error handleing  
    } catch (error) {
        console.error('Error creating content:', error);

        // Return status on error be sure its right.
        res.status(500).json({ error: 'Failed to create content' });
    }
}

export const deleteContentController = async (req, res) => {
    try {
        const { Container_ID } = req.params;

        const [result] = await pool.query(
            'DELETE FROM content WHERE Container_ID = ?',
            [Container_ID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ error: 'Failed to delete content' });
    }
}

// Counts which contents have stuff in them
export const countContentsController = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT COUNT(*) AS Filled_Contents FROM CONTENT WHERE `Job#` IS NOT NULL AND `Job#` != \'\';'
        );

        res.status(200).json({
            message: 'Content count retrieved successfully',
            total: result[0].Filled_Contents
        });
    } catch (error) {
        console.error('Error counting contents:', error);
        res.status(500).json({ error: 'Failed to count contents' });
    }
}
export const getAllContentController = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                Section_ID,
                Location_Name,
                Store_Date,
                Type,
                Monthly_Cost,
                Status,
                Invoice_Code,
                Client_ID,
                Company_Name,
                \`Job#\`,
                Container_ID
            FROM content
        `);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching content:", err);
        res.status(500).json({ error: "Failed to fetch content data" });
    }
};


export const filterContentController = async (req, res) => {
    try {
        const { Client_ID, Section_ID, Job, Status, Container_ID } = req.query;

        let query = `
            SELECT 
                Section_ID,
                Location_Name,
                Store_Date,
                Type,
                Monthly_Cost,
                Status,
                Invoice_Code,
                Client_ID,
                Company_Name,
                \`Job#\`,
                Container_ID
            FROM content
            WHERE 1=1
        `;
        const params = [];

        // Add filters if they are provided
        if (Container_ID) {
            query += ' AND Container_ID = ?';
            params.push(Container_ID);
        }
        if (Client_ID) {
            query += ' AND Client_ID = ?';
            params.push(Client_ID);
        }
        if (Section_ID) {
            query += ' AND Section_ID = ?';
            params.push(Section_ID);
        }
        if (Job) {
            query += ' AND \`Job#\` = ?';
            params.push(Job);
        }
        if (Status) {
            query += ' AND Status = ?';
            params.push(Status);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);

    } catch (err) {
        console.error("Error fetching content:", err);
        res.status(500).json({ error: "Failed to fetch content data" });
    }
};


export const updateContentController = async (req, res) => {
    try {
        const { Container_ID } = req.params;
        const fieldsToUpdate = req.body;

        // If nothing is provided to update
        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
        }

        // Build SET clause dynamically
        const setClauses = [];
        const values = [];

        for (const key in fieldsToUpdate) {
            if (key === 'Job#') {
                setClauses.push('`Job#` = ?');
            } else {
                setClauses.push(`${key} = ?`);
            }
            values.push(fieldsToUpdate[key]);
        }

        // Final query
        const query = `
            UPDATE content
            SET ${setClauses.join(', ')}
            WHERE Container_ID = ?
        `;

        values.push(Container_ID); // Add WHERE clause value at the end

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Content not found' });
        }

        res.status(200).json({ message: 'Content updated successfully' });
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ error: 'Failed to update content' });
    }
};
