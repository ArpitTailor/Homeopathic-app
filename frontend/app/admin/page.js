export default function AdminDashboard() {
  // Mock data for the dashboard stats
  const stats = [
    { label: 'Total Revenue', value: '₹1,24,500', trend: '+12%', isPositive: true, icon: '💰' },
    { label: 'Total Orders', value: '342', trend: '+5%', isPositive: true, icon: '📦' },
    { label: 'Active Customers', value: '1,204', trend: '+18%', isPositive: true, icon: '👥' },
    { label: 'Low Stock Alerts', value: '8', trend: '-2', isPositive: false, icon: '⚠️' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-primary/90 transition-colors">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-md ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-muted-foreground font-medium mb-1">{stat.label}</h3>
            <span className="text-3xl font-bold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { id: 'ORD-7832', name: 'Rahul Sharma', date: 'Oct 24, 2023', amt: '₹1,299', status: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
                  { id: 'ORD-7831', name: 'Priya Patel', date: 'Oct 23, 2023', amt: '₹450', status: 'Shipped', color: 'bg-blue-100 text-blue-800' },
                  { id: 'ORD-7830', name: 'Amit Kumar', date: 'Oct 23, 2023', amt: '₹2,100', status: 'Delivered', color: 'bg-green-100 text-green-800' },
                  { id: 'ORD-7829', name: 'Neha Singh', date: 'Oct 22, 2023', amt: '₹899', status: 'Delivered', color: 'bg-green-100 text-green-800' },
                ].map(order => (
                  <tr key={order.id}>
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4">{order.name}</td>
                    <td className="py-4 text-muted-foreground">{order.date}</td>
                    <td className="py-4 font-bold">({order.amt}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.color}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-1 bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Low Stock Alerts</h2>
          <div className="space-y-6">
            {[
              { name: 'Arnica Montana 30CH', stock: 3 },
              { name: 'Bryonia Alba 200CH', stock: 1 },
              { name: 'Glow C Serum', stock: 5 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                    ⚠️
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground line-clamp-1">{item.name}</h4>
                    <span className="text-xs text-red-500 font-bold">{item.stock} left in stock</span>
                  </div>
                </div>
                <button className="text-primary text-sm font-medium hover:underline">Restock</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
