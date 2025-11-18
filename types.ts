export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  unit: 'pcs' | 'kg';
}

export interface Payment {
  id: string;
  date: string; // ISO string
  amount: number;
}

export interface Order {
  id: string;
  invoiceNo: string;
  customerId: string;
  orderDate: string; // ISO string
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Cancelled';
  payments: Payment[];
  images: string[];
  discount?: number;
  previousBalance?: number;
}

export interface BusinessDetails {
  companyName: string;
  regNo: string;
  phone: string;
  description: string;
  logo?: string;
  poultryLogo?: string;
}

export type View = 'landing' | 'dashboard' | 'orders' | 'customers' | 'products' | 'reports';