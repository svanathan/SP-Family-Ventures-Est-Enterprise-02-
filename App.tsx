import React, { useState, useCallback, useEffect } from 'react';
import type { View, Customer, Product, Order, BusinessDetails } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { MOCK_CUSTOMERS, MOCK_PRODUCTS, MOCK_ORDERS } from './constants';
import { DashboardIcon, OrdersIcon, CustomersIcon, ProductsIcon, ReportsIcon, MenuIcon, XIcon, SPLogoIcon, SunIcon, MoonIcon } from './components/Icons';
import { CustomersPage, ProductsPage, OrdersPage, ReportsPage, DashboardPage } from './components/Page';

const Logo = ({ className, businessDetails }: { className?: string; businessDetails: BusinessDetails }) => (
    <div className={`flex items-center gap-3 ${className}`}>
        {businessDetails.logo ? (
            <img src={businessDetails.logo} alt="Logo" className="w-10 h-10 object-contain rounded-md bg-white p-1" />
        ) : (
            <SPLogoIcon className="w-10 h-10" />
        )}
        <span className="font-bold text-sm text-white">
            {businessDetails.companyName} ({businessDetails.regNo})
        </span>
    </div>
);

const LandingPage: React.FC<{ onEnter: () => void; businessDetails: BusinessDetails; }> = ({ onEnter, businessDetails }) => (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <div className="text-center">
            {businessDetails.logo ? (
                <img src={businessDetails.logo} alt="Company Logo" className="w-24 h-24 mx-auto mb-4 object-contain" />
            ) : (
                <SPLogoIcon className="w-24 h-24 mx-auto mb-4" />
            )}
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 dark:text-gray-100">
                {businessDetails.companyName} ({businessDetails.regNo})
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                Welcome to your business management dashboard. Streamline orders, manage customers and products, and gain insights with powerful reports.
            </p>
            <button
                onClick={onEnter}
                className="mt-8 px-8 py-3 bg-green-700 text-white font-bold rounded-lg shadow-lg hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 transition-transform transform hover:scale-105 duration-300"
            >
                Enter Dashboard
            </button>
        </div>
    </div>
);

const Sidebar: React.FC<{ currentView: View; setView: (view: View) => void; isOpen: boolean; businessDetails: BusinessDetails }> = ({ currentView, setView, isOpen, businessDetails }) => {
    const navItems = [
        { view: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { view: 'orders', label: 'Orders', icon: OrdersIcon },
        { view: 'customers', label: 'Customers', icon: CustomersIcon },
        { view: 'products', label: 'Products', icon: ProductsIcon },
        { view: 'reports', label: 'Reports', icon: ReportsIcon },
    ] as const;

    const baseClasses = "flex items-center px-4 py-3 rounded-lg transition-colors duration-200";
    const activeClasses = "bg-green-700 text-white";
    const inactiveClasses = "text-green-200 hover:bg-green-800 hover:text-white";

    return (
        <aside className={`bg-green-900 text-white w-64 space-y-2 p-4 fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-30`}>
            <Logo businessDetails={businessDetails} />
            <nav className="pt-8">
                {navItems.map(item => (
                    <a key={item.view} href="#" onClick={(e) => { e.preventDefault(); setView(item.view) }}
                       className={`${baseClasses} ${currentView === item.view ? activeClasses : inactiveClasses}`}>
                        <item.icon className="w-6 h-6 mr-3" />
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
};

export default function App() {
    const [view, setView] = useLocalStorage<View>('sp-app-view', 'landing');
    const [customers, setCustomers] = useLocalStorage<Customer[]>('sp-customers', MOCK_CUSTOMERS);
    const [products, setProducts] = useLocalStorage<Product[]>('sp-products', MOCK_PRODUCTS);
    const [orders, setOrders] = useLocalStorage<Order[]>('sp-orders', MOCK_ORDERS.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
    const [businessDetails, setBusinessDetails] = useLocalStorage<BusinessDetails>('sp-business-details', {
      companyName: 'SP FAMILY VENTURES EST ENTERPRISE',
      regNo: '002905563-H',
      phone: 'H/P : (012) 627-3691 (MR.SELVA)',
      description: `PEMBORONG AYAM HIDUP / AYAM PROSES
AYAM DAGING(BROILER), AYAM KAMPUNG & AYAM TUA`,
      poultryLogo: '',
    });
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('sp-app-theme', 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleEnter = () => {
        setView('dashboard');
    };

    const handleUpdateOrder = (updatedOrder: Order) => {
        setOrders(prevOrders => prevOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    };

    const navigateAndCloseSidebar = (selectedView: View) => {
        setView(selectedView);
        setSidebarOpen(false);
    };

    const renderView = useCallback(() => {
        switch (view) {
            case 'dashboard': return <DashboardPage orders={orders} customers={customers} setView={setView} theme={theme}/>;
            case 'customers': return <CustomersPage customers={customers} setCustomers={setCustomers} />;
            case 'products': return <ProductsPage products={products} setProducts={setProducts} />;
            case 'orders': return <OrdersPage orders={orders} setOrders={setOrders} customers={customers} products={products} handleUpdateOrder={handleUpdateOrder} businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} />;
            case 'reports': return <ReportsPage orders={orders} products={products} customers={customers} theme={theme}/>;
            default: return <DashboardPage orders={orders} customers={customers} setView={setView} theme={theme}/>;
        }
    }, [view, customers, products, orders, setCustomers, setProducts, setOrders, theme, businessDetails, setBusinessDetails]);

    if (view === 'landing') {
        return <LandingPage onEnter={handleEnter} businessDetails={businessDetails} />;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar currentView={view} setView={navigateAndCloseSidebar} isOpen={isSidebarOpen} businessDetails={businessDetails} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm relative z-10 transition-colors duration-300">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-gray-300 md:hidden" aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}>
                        {isSidebarOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
                    </button>
                    <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 md:hidden">
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                    </div>
                    <div className="hidden md:block"></div>
                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                        {theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6" />}
                    </button>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    );
}