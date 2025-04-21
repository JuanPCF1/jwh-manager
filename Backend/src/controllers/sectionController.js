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
}

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
}