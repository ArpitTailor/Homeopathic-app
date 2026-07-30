const prisma = require('../utils/prismaClient');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress, couponCode, prescriptionUrl } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Calculate totals and verify stock
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      if (typeof item.productId !== 'string') {
        return res.status(400).json({ 
          message: 'It seems you have old items in your cart. Please clear your cart and add the items again.' 
        });
      }
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId
        }
      });
      
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = Number(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
    }

    let discountAmount = 0;
    let appliedCouponId = null;

    // Apply Coupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && coupon.isActive && new Date(coupon.expiryDate) > new Date()) {
        if (totalAmount >= Number(coupon.minOrderValue)) {
          if (coupon.type === 'PERCENTAGE') {
            discountAmount = (totalAmount * Number(coupon.discountValue)) / 100;
            if (coupon.maxDiscount && discountAmount > Number(coupon.maxDiscount)) {
              discountAmount = Number(coupon.maxDiscount);
            }
          } else {
            discountAmount = Number(coupon.discountValue);
          }
          appliedCouponId = coupon.id;
        }
      }
    }

    const finalAmount = totalAmount - discountAmount;

    // Create Order
    const order = await prisma.order.create({
      data: {
        userId,
        status: 'PENDING',
        totalAmount: finalAmount,
        discountAmount,
        paymentMethod,
        shippingAddress,
        prescriptionUrl,
        couponId: appliedCouponId,
        orderItems: {
          create: orderItemsData
        }
      },
      include: {
        orderItems: true
      }
    });

    // If Razorpay, generate order id here (skipping actual Razorpay API for now)
    let razorpayOrderId = null;
    if (paymentMethod === 'RAZORPAY') {
      // razorpayOrderId = await razorpay.orders.create({ amount: finalAmount * 100, ... })
      razorpayOrderId = 'order_mock_' + Date.now();
      await prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId }
      });
    }

    // Decrease stock count
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    res.status(201).json({ message: 'Order created successfully', order, razorpayOrderId });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        orderItems: {
          include: { product: { select: { name: true, image: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Get My Orders Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Update Order Status Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Track an order (Public)
exports.trackOrder = async (req, res) => {
  try {
    const { orderId, email } = req.body;

    if (!orderId || !email) {
      return res.status(400).json({ message: 'Order ID and Email are required' });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { email: true } },
        orderItems: {
          include: { product: { select: { name: true } } }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found. Please check your Order ID.' });
    }

    if (order.user.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(403).json({ message: 'Email does not match the order records.' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('Track Order Error:', error);
    if (error.code === 'P2023' || error.message.includes('ObjectID')) {
      return res.status(400).json({ message: 'Invalid Order ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
