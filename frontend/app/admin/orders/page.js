export default function AdminOrdersPage() {
  // Mock Orders
  const orders = [
    { id: 'ORD-7832', customer: 'Rahul Sharma', date: 'Oct 24, 2023', total: 1299, status: 'PROCESSING', payment: 'RAZORPAY', items: 3 },
    { id: 'ORD-7831', customer: 'Priya Patel', date: 'Oct 23, 2023', total: 450, status: 'SHIPPED', payment: 'COD', items: 1 },
    { id: 'ORD-7830', customer: 'Amit Kumar', date: 'Oct 23, 2023', total: 2100, status: 'DELIVERED', payment: 'RAZORPAY', items: 5 },
    { id: 'ORD-7829', customer: 'Neha Singh', date: 'Oct 22, 2023', total: 899, status: 'DELIVERED', payment: 'RAZORPAY', items: 2 },
    { id: 'ORD-7828', customer: 'Vikas Jain', date: 'Oct 21, 2023', total: 350, status: 'CANCELLED', payment: 'COD', items: 1 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-muted text-foreground';
      case 'PROCESSING': return 'bg-yellow-100 text-yellow-800';
      case 'SHIPPED': return 'bg-blue-100 text-blue-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search by Order ID or Name..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex space-x-2">
            <select className="px-4 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-muted-foreground text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{order.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">{order.items} items</td>
                  <td className="px-6 py-4 font-bold">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium border border-border px-2 py-1 rounded-md">{order.payment}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border-none focus:ring-2 focus:ring-primary/50 cursor-pointer ${getStatusColor(order.status)}`}
                      defaultValue={order.status}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
