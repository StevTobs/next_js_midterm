import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('http://localhost:3456/test/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Define the path to save the JSON file
      const filePath = path.join(process.cwd(), 'data', 'items.json');

      // Create the directory if it doesn't exist
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // Write the data to a JSON file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      res.status(200).json({ message: 'Data saved successfully!', data });
    } catch (error) {
      console.error("Error fetching or saving items:", error);
      res.status(500).json({ error: 'Failed to save items.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
