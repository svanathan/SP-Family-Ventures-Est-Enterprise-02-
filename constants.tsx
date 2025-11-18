import { Customer, Product, Order } from './types';

// Create consistent IDs for linking mock data
const CUS_ABU_ID = 'CUS-MOCK-1';
const CUS_SITI_ID = 'CUS-MOCK-2';

const PROD_BROILER_ID = 'PROD-MOCK-1';
const PROD_KAMPUNG_ID = 'PROD-MOCK-2';
const PROD_TUA_ID = 'PROD-MOCK-3';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: CUS_ABU_ID,
    name: 'Kedai Runcit Abu',
    email: 'abu@example.com',
    phone: '012-3456789',
    address: '123, Jalan Merdeka, 50000 Kuala Lumpur',
  },
  {
    id: CUS_SITI_ID,
    name: 'Restoran Siti',
    email: 'siti@example.com',
    phone: '019-8765432',
    address: '456, Lorong Setia, 60000 Petaling Jaya, Selangor',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: PROD_BROILER_ID, name: 'Ayam Daging (Broiler)', price: 8.50 },
  { id: PROD_KAMPUNG_ID, name: 'Ayam Kampung', price: 15.00 },
  { id: PROD_TUA_ID, name: 'Ayam Tua (Layer)', price: 10.00 },
];

// Generate dynamic dates for mock orders to be relevant
const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const fiveDaysAgo = new Date(new Date().setDate(today.getDate() - 5));


export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-MOCK-1',
    invoiceNo: `INV-${fiveDaysAgo.getFullYear()}${(fiveDaysAgo.getMonth() + 1).toString().padStart(2, '0')}${fiveDaysAgo.getDate().toString().padStart(2, '0')}-001`,
    customerId: CUS_ABU_ID,
    orderDate: fiveDaysAgo.toISOString(),
    items: [
      { productId: PROD_BROILER_ID, quantity: 20, price: 8.50, unit: 'kg' },
      { productId: PROD_TUA_ID, quantity: 10, price: 10.00, unit: 'pcs' },
    ],
    totalAmount: (20 * 8.50) + (10 * 10.00), // 270
    paymentStatus: 'Paid',
    payments: [{ id: 'PAY-MOCK-1', date: fiveDaysAgo.toISOString(), amount: 270.00 }],
    images: [],
    discount: 0,
    previousBalance: 0,
  },
  {
    id: 'ORD-MOCK-2',
    invoiceNo: `INV-${yesterday.getFullYear()}${(yesterday.getMonth() + 1).toString().padStart(2, '0')}${yesterday.getDate().toString().padStart(2, '0')}-001`,
    customerId: CUS_SITI_ID,
    orderDate: yesterday.toISOString(),
    items: [
      { productId: PROD_KAMPUNG_ID, quantity: 15, price: 15.00, unit: 'pcs' },
    ],
    totalAmount: 15 * 15.00, // 225
    paymentStatus: 'Partially Paid',
    payments: [{ id: 'PAY-MOCK-2', date: yesterday.toISOString(), amount: 100.00 }],
    images: [],
    discount: 5,
    previousBalance: 0,
  },
  {
    id: 'ORD-MOCK-3',
    invoiceNo: `INV-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}-001`,
    customerId: CUS_ABU_ID,
    orderDate: today.toISOString(),
    items: [
      { productId: PROD_BROILER_ID, quantity: 50, price: 8.50, unit: 'kg' },
    ],
    totalAmount: 50 * 8.50, // 425
    paymentStatus: 'Unpaid',
    payments: [],
    images: [],
    discount: 0,
    previousBalance: 20,
  },
];
