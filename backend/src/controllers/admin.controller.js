const prisma = require('../utils/prismaClient');

// Get Dashboard Statistics (Admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count({
      where: { role: 'USER' }
    });

    const totalProducts = await prisma.product.count();

    const totalOrders = await prisma.order.count();

    const totalRevenueResult = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        status: {
          notIn: ['CANCELLED', 'PAYMENT_FAILED']
        }
      }
    });
    
    const totalRevenue = totalRevenueResult._sum.totalAmount || 0;

    const lowStockProducts = await prisma.product.findMany({
      where: {
        stockCount: {
          lt: 10 // Threshold for low stock
        }
      },
      select: {
        id: true,
        name: true,
        stockCount: true
      }
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.status(200).json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue
      },
      lowStockProducts,
      recentOrders
    });
  } catch (error) {
    console.error('Get Dashboard Stats Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
