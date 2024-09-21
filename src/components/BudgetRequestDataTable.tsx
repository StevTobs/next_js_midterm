import { patchBudgetItem } from "@/app/services/budget-items";
import { formatDecimal } from "../app/lib/format-decimal";
import { BudgetRequest } from "../app/models/budget-request";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { IBudgetItems } from "@/app/interfaces/budgetItem.interfaces";

interface BudgetRequestDataTableProps {
  items: BudgetRequest[];
}

function BudgetRequestDataTable({ items }: BudgetRequestDataTableProps) {
  const router = useRouter();

  const handleClick = async (id: number, status: string, eId: IBudgetItems) => {
    try {
      await patchBudgetItem(id, {
        title: eId.title,
        quantity: eId.quantity,
        amount: eId.amount,
        status: status,
      });

      Swal.fire({
        title: "Success!",
        text: `Update Status: ${status} Complete!`,
        icon: "success",
      });
      router.push("../reload");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update status. Please try again.",
        icon: "error",
      });
      console.error("Update Status Failed", error);
    }
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
  {items.length > 0 ? (
    items.map((request) => (
      <tr key={request.id}>
        {/* Your existing table row rendering */}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No budget requests available.</td>
    </tr>
  )}
</tbody>

    </table>
  );
}

export default BudgetRequestDataTable;
