import {pool} from '../db/database.js';
import { hashPassword } from '../utils/authHelper.mjs';

export const createCompanyController = async (req, res) => {
    try {
        const { Company_Name} = req.body;

        const [result] = await pool.query(
            'INSERT INTO company (Company_Name) VALUES (?)',
            [Company_Name]
        );

        res.status(201).json({
            message: 'Company created successfully',
            adminId: result.insertId
        });
    } catch (error) {
        console.error('Error creating Company:', error);
        res.status(500).json({ error: 'Failed to create Company' });
    }
}

export const deleteCompanyController = async (req, res) => {
    try {
        const { Company_Name } = req.params;

        const [result] = await pool.query(
            'DELETE FROM company WHERE Company_Name = ?',
            [Company_Name]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ error: 'Failed to delete company' });
    }
}

export const getAllCompanyController = async (req, res) => {
    try {
      const [rows] = await pool.execute(`
        SELECT 
            Company_Name
        FROM company
      `);
  
      res.json(rows);
    } catch (err) {
      console.error("Error fetching companies:", err);
      res.status(500).json({ error: "Failed to fetch company data" });
    }
  };

  export const getCompanyBySimilarityController = async (req, res) => {
    try {
      const { Company_Name } = req.params;
  
      let rows;
  
      if (!Company_Name || Company_Name.trim() === "") {
        // Fallback: return any 5 companies
        [rows] = await pool.query(
          `SELECT * FROM company LIMIT 5`
        );
      } else {
        // Filtered search with LIKE
        [rows] = await pool.query(
          `SELECT * FROM company WHERE Company_Name LIKE ? LIMIT 5`,
          [`%${Company_Name}%`]
        );
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No similar companies found' });
      }
  
      res.json(rows);
    } catch (error) {
      console.error('Error fetching similar companies:', error);
      res.status(500).json({ error: 'Failed to fetch similar companies' });
    }
  };
  