import {pool} from '../db/database.js';

export const createSectionController = async (req, res) => {
    try {
        const { Location_Name, Section_ID, Status } = req.body;

        // Insert the new section into the database
        const [result] = await pool.query(
            'INSERT INTO section (Location_Name, Section_ID, Status) VALUES (?, ?, ?)',
            [Location_Name, Section_ID, Status]
        );

        res.status(201).json({
            message: 'Section created successfully',
            sectionId: result.insertId
        });
    } catch (error) {
        console.error('Error creating section:', error);
        res.status(500).json({ error: 'Failed to create section' });
    }
};

export const deleteSectionController = async (req, res) => {
    try {
        const { Section_ID } = req.params;

        // Delete the section from the database
        const [result] = await pool.query(
            'DELETE FROM section WHERE Section_ID = ?',
            [Section_ID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Section not found' });
        }

        res.status(200).json({ message: 'Section deleted successfully' });
    } catch (error) {
        console.error('Error deleting section:', error);
        res.status(500).json({ error: 'Failed to delete section' });
    }
};

export const getAllSectionController = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                Location_Name,
                Section_ID,
                Status
            FROM section
            WHERE 1=1
        `);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching sections:", err);
        res.status(500).json({ error: "Failed to fetch sections data" });
    }
};

export const filterSectionController = async (req, res) => {
    try {
        const { Location_Name, Section_ID, Status } = req.query;

        let query = `
            SELECT 
                Location_Name,
                Section_ID,
                Status
            FROM section
            WHERE 1=1
        `;
        const params = [];

        if (Location_Name) {
            query += ' AND Location_Name = ?';
            params.push(Location_Name);
        }

        if (Section_ID) {
            query += ' AND Section_ID = ?';
            params.push(Section_ID);
        }

        if (Status) {
            query += ' AND Status = ?';
            params.push(Status);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);

    } catch (err) {
        console.error("Error filtering section:", err);
        res.status(500).json({ error: "Failed to filter section" });
    }
};