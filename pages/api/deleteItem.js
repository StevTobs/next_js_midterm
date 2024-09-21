// pages/api/deleteItem.js
import { items } from '../../data/items'; // Assuming you have a way to access your data

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    // Logic to delete the item from your database
    // For example:
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items.splice(index, 1); // Remove the item from the array
      
      return res.status(200).json({ message: 'Item deleted' });
    }

    return res.status(404).json({ error: 'Item not found' });
  }

  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
