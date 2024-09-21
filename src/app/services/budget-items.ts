import { api } from "../lib/api";
import { BudgetRequest, UsersRequest } from "../models/budget-request";

interface FetchBudgetItemsResponse {
  data: BudgetRequest[];
}

interface FetchUserResponse {
  data: UsersRequest[];
}

interface IUserLogin {
  username: string;
  password: string;
}

// Login API call to fetch the token


export const fetchLogin = async (body: IUserLogin) => {
  const response = await fetch("http://localhost:3456/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE"


    },
    body: JSON.stringify(body), // Convert username and password to JSON format
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data; // Assuming the API returns the token or login details
};

// Fetch logged-in user data using the Bearer token
export const fetchLogined = async () => {
  try {
    const response = await api.get<FetchUserResponse>("/test/items");

    // Log response status and data for debugging
    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error.message || error);
    throw new Error("Failed to fetch user data");
  }
};

// services/budget-items.ts
export const fetchBudgetItems = async (token: string): Promise<BudgetRequest[]> => {
  try {
    const response = await fetch("http://localhost:3456/test/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token if required
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch budget items");
    }

    const data = await response.json();
    return data; // Assuming the API returns an array of BudgetRequest
  } catch (error) {
    console.error("Error fetching budget items:", error);
    throw new Error("Failed to fetch budget items");
  }
};



// Fetch budget items using the Bearer token
export const c= async (token: string): Promise<BudgetRequest[]> => {
  try {
    const response = await api.get<FetchBudgetItemsResponse>("/test/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response.data;
    console.log("");
    return data;
  } catch (error) {
    console.error("Error fetching budget items:", error);
    throw new Error("Failed to fetch budget items");
  }
};

// Create, update, and patch budget items
interface CreateBudgetItemRequest {
  title: string;
  quantity: number;
  amount: number;
  status?: string;
}

interface CreateBudgetItemResponse {
  data: BudgetRequest;
}

export const createBudgetItem = async (body: CreateBudgetItemRequest) => {
  const response = await api.post<CreateBudgetItemResponse>("/items", body);
  const { data } = response.data;
  return data;
};

export const updateBudgetItem = async (id: number, body: CreateBudgetItemRequest) => {
  const response = await api.put<CreateBudgetItemResponse>(`/items/${id}`, body);
  const { data } = response.data;
  return data;
};

export const patchBudgetItem = async (id: number, body: CreateBudgetItemRequest) => {
  const response = await api.patch<CreateBudgetItemResponse>(`/items/${id}`, body);
  const { data } = response.data;
  return data;
};
