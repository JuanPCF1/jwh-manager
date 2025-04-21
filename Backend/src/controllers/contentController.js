import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createContentController = async (req, res) => {
    try { 
        // Grabs the JSON conents from front end can be seen in Thunder client. 
        // Making variable names for each one of the request bodies.
        const { Container_ID, Section_ID, Location_Name, Store_date, 
            Type, Monthly_Cost, Status, Invoice_Code, Client_ID, Company_Name} = req.body;

        const Job_Number = req.body['Job#'];


        // Query into SQL
        const [result] = await pool.query(
            'INSERT INTO content (Container_ID, Section_ID, Location_Name, Store_date, Type, Monthly_Cost, Status, Invoice_Code, Client_ID, Company_Name, `Job#\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Container_ID, Section_ID, Location_Name, Store_date, 
                Type, Monthly_Cost, Status, Invoice_Code, Client_ID, Company_Name, Job_Number]
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
        console.error('Error creating admin:', error);

        // Return status on error be sure its right.
        res.status(500).json({ error: 'Failed to create content' });
    }
}