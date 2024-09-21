import { useEffect, useState } from 'react';
import styles from './ItemsList.module.css';
// import AddItemForm from './AddItemForm.jsx'; // Import the new form component

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to fetch items");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    // Delete item logic...
  };

  const saveItemsToJson = async () => {
    // Save items logic...
  };

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]); // Add the new item to the list
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>To-Do List</h1>
      {error && <p>{error}</p>}
      {/* <AddItemForm onAdd={addItem} /> Include the AddItemForm */}
      {items.length > 0 ? (
        <ul className={styles.horizontalList}>
          {items.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <h2>{item.title}</h2>
              <p>Amount: {item.amount}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Status: {item.status}</p>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available.</p>
      )}
      <button onClick={saveItemsToJson}>Save Items to JSON</button>
    </div>
  );
};

export default ItemsList;
