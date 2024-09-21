"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { updateBudgetItem } from "../../services/budget-items";
import { BudgetRequest } from "@/app/models/budget-request";
import { useRouter } from "next/navigation";

type FormData = {
  title: string;
  quantity: number;
  amount: number;
};

function EditBudgetRequest({ searchParams }) {
  // const [title, setTitle] = useState('');
  // const [amount, setAmount] = useState('');
  // const [quantity, setQuantity] = useState('');

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: searchParams.title,
      quantity: searchParams.quantity,
      amount: searchParams.amount,
    },
  });

  const onSubmit = (data: FormData) => {
    const chang: BudgetRequest = {
      title:data.title,
      amount: Number(data.amount),
      quantity: Number(data.quantity)
    }
    editBudget(chang);
    console.log(chang)
    // console.log(chang)
   router.push('../../')
  };

 
  
  const editBudget = async (data: FormData) => {
    const insertedRequest = await updateBudgetItem(searchParams.id, {
      title: data.title,
      quantity: data.quantity,
      amount: data.amount,
    });
    console.log(insertedRequest);
  };

 

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Budget Request</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-lg font-medium ">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true, minLength: 3 })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                // onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.type === "required" && "Title is required"}
                  {errors.title.type === "minLength" &&
                    "Title must be at least 3 characters"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="quantity" className="block text-lg font-medium ">
                Quantity
              </label>
              <input

                type="number"
                id="quantity"
                {...register("quantity", { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                // onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.quantity.type === "required" &&
                    "Quantity is required"}
                  {errors.quantity.type === "min" &&
                    "Quantity must be greater than 0"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="amount" className="block text-lg font-medium ">
                Amount
              </label>
              <input

                type="number"
                id="amount"
                {...register("amount", { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                // onChange={(e) => setAmount(e.target.value)}
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.amount.type === "required" && "Amount is required"}
                  {errors.amount.type === "min" &&
                    "Amount must be greater than 0"}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:yellow-blue-500 focus:ring-offset-2"
              >
                Edit items
              </button>
              <Link
                href="../"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>

    </main>

  );
}

export default EditBudgetRequest;

