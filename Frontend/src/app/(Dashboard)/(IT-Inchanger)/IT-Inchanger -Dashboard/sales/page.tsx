'use client';
import DashboardNav from '@/app/components/EmployeesDashboardNav';
import { useState } from 'react';

interface Sale {
  id: string;
  customer: {
    name: string;
    email: string;
    initials: string;
  };
  product: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSale, setNewSale] = useState({
    customerName: '',
    customerEmail: '',
    product: '',
    amount: '',
    status: 'Pending'
  });
  const [sales, setSales] = useState<Sale[]>([
    {
      id: '#SALE-001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        initials: 'JD'
      },
      product: 'Premium Plan',
      amount: 999,
      date: '2024-03-15',
      status: 'Completed'
    },
    {
      id: '#SALE-002',
      customer: {
        name: 'Alice Smith',
        email: 'alice@example.com',
        initials: 'AS'
      },
      product: 'Basic Plan',
      amount: 499,
      date: '2024-03-14',
      status: 'Pending'
    },
    {
      id: '#SALE-003',
      customer: {
        name: 'Robert Johnson',
        email: 'robert@example.com',
        initials: 'RJ'
      },
      product: 'Enterprise Plan',
      amount: 2499,
      date: '2024-03-13',
      status: 'Cancelled'
    }
  ]);
  const handleAddNewSale = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewSale({
      customerName: '',
      customerEmail: '',
      product: '',
      amount: '',
      status: 'Pending'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSale(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate initials from customer name
    const initials = newSale.customerName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();

    // Create new sale object
    const sale: Sale = {
      id: `#SALE-${String(sales.length + 1).padStart(3, '0')}`,
      customer: {
        name: newSale.customerName,
        email: newSale.customerEmail,
        initials
      },
      product: newSale.product,
      amount: Number(newSale.amount),
      date: new Date().toISOString().split('T')[0],
      status: newSale.status as 'Completed' | 'Pending' | 'Cancelled'
    };

    // Add new sale to the list
    setSales(prev => [...prev, sale]);
    handleCloseModal();
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sale.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const averageOrderValue = Math.round(totalRevenue / sales.length);
  const conversionRate = ((sales.filter(sale => sale.status === 'Completed').length / sales.length) * 100).toFixed(1);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar Navigation */}
      <DashboardNav/>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Sales Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
              <button 
                onClick={handleAddNewSale}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New Sale
              </button>
            </div>
          </div>
        </header>

        {/* Main Sales Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Sales Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Sales</p>
                  <h3 className="text-2xl font-bold text-gray-900">{sales.length}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Average Order Value</p>
                  <h3 className="text-2xl font-bold text-gray-900">${averageOrderValue}</h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Conversion Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900">{conversionRate}%</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Sales List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Sales</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search sales..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Sales Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-sm">{sale.customer.initials}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{sale.customer.name}</div>
                            <div className="text-sm text-gray-500">{sale.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Add New Sale</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={newSale.customerName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={newSale.customerEmail}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product</label>
                <input
                  type="text"
                  name="product"
                  value={newSale.product}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={newSale.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newSale.status}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 