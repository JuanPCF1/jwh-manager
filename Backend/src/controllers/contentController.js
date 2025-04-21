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