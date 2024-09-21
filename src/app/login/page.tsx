/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { fetchLogin } from "../services/budget-items";
import { useRouter } from "next/navigation";

function login() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');

  // Login handler
  // const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Prevent the default form submission

  //   try {
  //     const token = await fetchLogin({
  //       username, 
  //       password: pw
  //     });
  //     // Save the token (you can save it in localStorage)
  //     localStorage.setItem('token', token);
  //     console.log("Login successful, token:", token);

  //     // After successful login, you can redirect the user or refresh the page
  //     router.push('../'); // Redirect to the home page or dashboard
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetchLogin({
      username, password: pw,
    }).then(() => router.push('../'))
  };




  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Please Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4" >
            <div>
              <label htmlFor="title" className="block text-lg font-medium ">
                Username
              </label>
              <input
                name="username"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>
            <div>
              <label htmlFor="quantity" className="block text-lg font-medium ">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                onChange={(e) => setPw(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:greem-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
              <Link
                href="#"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancle
              </Link>
            </div>
          </form>
        </div>
      </div>

    </main>
  );
}

export default login;

