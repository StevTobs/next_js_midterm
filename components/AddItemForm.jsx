import { useState } from 'react';

const AddItemForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('PENDING');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      title,
      amount,
      quantity,
      status,
    };

    try {
      const response = await fetch('http://localhost:3456/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Failed to create item');
      }

      const data = await response.json();
      onAdd(data); // Pass the new item back to the parent
      // Clear the form
      setTitle('');
      setAmount(0);
      setQuantity(1);
      setStatus('PENDING');
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
