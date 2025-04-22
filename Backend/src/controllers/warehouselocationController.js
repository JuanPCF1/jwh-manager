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

export const getAllWarehouseLocationController = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                Location_Name,
                \`#Of_Sections\` AS Num_of_Sections,
                Owning_Company
            FROM warehouse_location
            WHERE 1=1
        `);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching warehouse locations:", err);
        res.status(500).json({ error: "Failed to fetch warehouse location data" });
    }
};

export const filterWarehouseLocationController = async (req, res) => {
    try {
        const { Location_Name, Num_of_Sections, Owning_Company } = req.query;

        let query = `
            SELECT 
                Location_Name,
                \`#Of_Sections\` AS Num_of_Sections,
                Owning_Company
            FROM warehouse_location
            WHERE 1=1
        `;
        const params = [];

        if (Location_Name) {
            query += ' AND Location_Name = ?';
            params.push(Location_Name);
        }

        if (Num_of_Sections) {
            query += ' AND \`#Of_Sections\` = ?';
            params.push(Num_of_Sections);
        }

        if (Owning_Company) {
            query += ' AND Owning_Company = ?';
            params.push(Owning_Company);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);

    } catch (err) {
        console.error("Error filtering warehouse locations:", err);
        res.status(500).json({ error: "Failed to filter warehouse location data" });
    }
};
