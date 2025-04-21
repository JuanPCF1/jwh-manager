import {pool} from '../db/database.js';

export const createWarehouseLocationController = async (req, res) => {
    try {
        const { Location_Name, Num_of_Sections, Owning_Company } = req.body;

        // Insert the new warehouse location into the database
        const [result] = await pool.query(
            'INSERT INTO warehouse_location (Location_Name, `#Of_Sections`, Owning_Company) VALUES (?, ?, ?)',
            [Location_Name, Num_of_Sections, Owning_Company]
        );

        res.status(201).json({
            message: 'Warehouse location created successfully',
            locationId: result.insertId
        });
    } catch (error) {
        console.error('Error creating warehouse location:', error);
        res.status(500).json({ error: 'Failed to create warehouse location' });
    }
}

export const deleteWarehouseLocationController = async (req, res) => {
    try {
        const { Location_ID } = req.params;

        // Delete the warehouse location from the database
        const [result] = await pool.query(
            'DELETE FROM warehouse_location WHERE Location_ID = ?',
            [Location_ID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Warehouse location not found' });
        }

        res.status(200).json({ message: 'Warehouse location deleted successfully' });
    } catch (error) {
        console.error('Error deleting warehouse location:', error);
        res.status(500).json({ error: 'Failed to delete warehouse location' });
    }
}