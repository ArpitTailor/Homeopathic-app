'use client';
import { useState } from 'react';

export default function AdminProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock Products
  const products = [
    { id: '1', name: 'Arnica Montana 30CH', category: 'Cold & Cough', price: 299, stock: 45, status: 'Active' },
    { id: '2', name: 'Nux Vomica 200CH', category: 'Digestive Health', price: 350, stock: 12, status: 'Active' },
    { id: '3', name: 'Calendula Healing Cream', category: 'Skin Care', price: 499, stock: 0, status: 'Out of Stock' },
    { id: '4', name: 'Glow C Serum', category: 'Beauty Serums', price: 899, stock: 5, status: 'Low Stock' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory and product details.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors flex items-center"
        >
          <span className="mr-2 text-xl">+</span> Add Product
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex space-x-2">
            <select className="px-4 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>All Categories</option>
              <option>Cold & Cough</option>
              <option>Skin Care</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-muted-foreground text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-secondary/30 rounded-md mr-3 flex items-center justify-center text-xs font-bold text-muted-foreground">Img</div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-4 font-bold">₹{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.stock > 10 ? 'bg-green-100 text-green-700' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 font-medium mr-3">Edit</button>
                    <button className="text-red-500 hover:text-red-600 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal (Simple mockup) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input type="text" className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Cold & Cough</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea rows="4" className="w-full p-3 border rounded-lg"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <input type="number" className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Initial Stock</label>
                  <input type="number" className="w-full p-3 border rounded-lg" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="rx" className="w-4 h-4 text-primary" />
                <label htmlFor="rx" className="text-sm font-medium">Requires Prescription</label>
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 border rounded-lg">Cancel</button>
                <button type="button" className="px-6 py-2 bg-primary text-white rounded-lg">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
