"use client";
// import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from 'next/navigation';
// import { useEffect } from "react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BudgetRequest } from "../models/budget-request";
import { createBudgetItem, fetchBudgetItems } from "../services/budget-items";


function AddBudgetRequest({}) {
  const router = useRouter()
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);


  useEffect(() => {
    fetchBudgetItems().then((items) => setBudgetRequests(items));
  }, []);

  const addRequest = async (newRequest: BudgetRequest) => {
    const insertedRequest = await createBudgetItem({
      title: newRequest.title,
      quantity: newRequest.quantity,
      amount: newRequest.amount,
    });
    setBudgetRequests([...budgetRequests, insertedRequest]);
  };
  
  const [newRequest, setNewRequest] = useState<BudgetRequest>({
    id: 0,
    title: "",
    amount: 0,
    quantity: 1,
    status: "PENDING",
  });

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "number"
        ? Number(event.target.value)
        : event.target.value;
    setNewRequest({
      ...newRequest,
      [event.target.name]: value,
    });
  };
  // let nextId=45;
  const handleSubmitt = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    addRequest({
      id: 1,
      title: newRequest.title,
      amount: newRequest.amount,
      quantity: newRequest.quantity,
      status: "PENDING",
    });
    router.push('../')
  };
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Add Budget Request</h2>
          <form onSubmit={handleSubmitt} className="space-y-4" >
            <div>
              <label htmlFor="title" className="block text-lg font-medium ">
                Title
              </label>
              <input
                name="title"
                value={newRequest.title}
                onChange={updateField}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
             
            </div>
            <div>
              <label htmlFor="quantity" className="block text-lg font-medium ">
                Quantity
              </label>
              <input
              name="quantity"
              type="number"
              value={newRequest.quantity}
              onChange={updateField}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-lg font-medium ">
                Amount
              </label>
              <input
              name="amount"
              type="number"
              value={newRequest.amount}
              onChange={updateField}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
              
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:greem-blue-500 focus:ring-offset-2"
              >
                Add items
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

export default AddBudgetRequest;

