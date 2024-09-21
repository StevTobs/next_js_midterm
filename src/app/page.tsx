"use client";

import { useEffect, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../components/BudgetRequestDataTable";
import Header from "@/components/Header";
import { BudgetRequest } from "./models/budget-request";
import { fetchBudgetItems, fetchLogin, fetchLogined } from "./services/budget-items";
import Link from "next/link";

function Home() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // console.log(token);
  // try {
  //   const items = fetchBudgetItems(token);
  //   setBudgetRequests(items);
  // } catch (error) {
  //   console.error("Error fetching budget items:", error);
  // }
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const loginData = await fetchLogin({ username, password });
  //     setToken(loginData.token); // Adjust according to the structure of your login response
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message);
  //     console.error("Login failed:", err);
  //   }
  // };

  
  useEffect(() => {
    
    const loginUser = async () => {
      try {
        const loggedInUser = await fetchLogin();
        setToken(loggedInUser.token);
        console.log("xxxxxxxxxx",loggedInUser);
        
      } catch (error) {
        console.error("Error fetching logged in user:", error);
      }
    };

    loginUser();
  //   const items = await fetchBudgetItems(token);
  //   setBudgetRequests(items);
  }, [token]);

  useEffect(() => {
    const getBudgetItems = async () => {
    
      try {
        const items = await fetchBudgetItems();
        setBudgetRequests(items);
      } catch (error) {
        console.error("Error fetching budget items:", error);
      }
    
    };

    getBudgetItems();


  }, [token]);

  const saveAsJsonFile = () => {
    const jsonBlob = new Blob([JSON.stringify(budgetRequests, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "budget_requests.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests} />
        </div>
        <div className="mt-4">
          <Link href="/add">
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add items
            </button>
          </Link>
          <button
            onClick={saveAsJsonFile}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save as JSON
          </button>
        </div>
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

export default Home;
