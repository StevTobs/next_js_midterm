export interface BudgetRequest {
  id: number;
  title: string;
  amount: number;
  quantity: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface UsersRequest {
  id: number;
  username: string;
  password: string;
}