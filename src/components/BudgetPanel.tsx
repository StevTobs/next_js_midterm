import { formatDecimal } from "../app/lib/format-decimal";
import { BudgetRequest } from "../app/models/budget-request";

interface BudgetCardProps {
  title: string;
  value: number;
}

function BudgetCard({ title, value }: BudgetCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-center">
        {title}: {formatDecimal(value)}
      </p>
    </div>
  );
}

interface BudgetPanelProps {
  items: BudgetRequest[];
  totalBudget: number; // Make total a prop
}

function BudgetPanel({ items, totalBudget }: BudgetPanelProps) {
  const usedBudget = items
    .filter((request) => request.status === 'APPROVED')
    .reduce((sum, request) => sum + request.amount, 0);

  const budgetData = [
    { title: "Total Budget", value: totalBudget },
    { title: "Used Budget", value: usedBudget },
    { title: "Balance", value: totalBudget - usedBudget },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {budgetData.map((data) => (
        <BudgetCard key={data.title} title={data.title} value={data.value} />
      ))}
      <div className="col-span-full mt-4">
        <h3 className="text-lg font-bold">Budget Requests</h3>
        <ul className="mt-2">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className="p-2 border-b hover:bg-gray-100 transition duration-150">
                <h4 className="font-semibold">{item.title}</h4>
                <p>Amount: {item.amount}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Status: {item.status}</p>
                <p>Owner ID: {item.owner_id}</p>
              </li>
            ))
          ) : (
            <li className="p-2">No budget requests available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BudgetPanel;
