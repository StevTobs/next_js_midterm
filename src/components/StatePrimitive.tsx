import { useState } from "react";
function StatePrimitive() {
  const [title, setTitle] = useState<string>("-");
  const [age, setAge] = useState<number>(0);
  const [items, setItems] = useState<(number)[]>([]);

  const addItem = () => {
    // newItems.push(Math.random())
    setItems([...items, Math.random()] //copy items, new memory address
)
    // items.push(Math.random()) //ถ้าเป็น String เพิ้ม .tostring()
    
  }


  const removeItems = (value:number) => {
    const newItems = items.filter((items) => items !== value)
    setItems(newItems)
  }

  return (
    <div>
      {title}
      <br />
      <div>
        Title:
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        {age * 2} Age:
        <input
          type="number"
          value={age}
          onChange={(event) => setAge(Number(event.target.value))}
        />
      </div>
      <div>
        List: {" "}<br />
        {items.map((items) => (
          <p key = {items}>
            {items}
            <button onClick={() => removeItems(items)}>Delete</button>
          </p>
        ))}
        <button onClick={addItem}>Add item</button>

        
      </div>
    </div>
  );
}
export default StatePrimitive;