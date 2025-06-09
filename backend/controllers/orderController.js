import Razorpay from "razorpay";
import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";
import nodemailer from 'nodemailer';

//global variables
const currency = "inr";
const deliveryCharge = 10;

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);

const transporter = nodemailer.createTransport({
  // Your email configuration
  service: 'gmail', // or other service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

//gateway  initialize
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing order cod method

const placeOrder = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Add this line

    const { userId, items, amount, address, couponCode, discount } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "No items provided in the order",
      });
    }

    console.log("Items to Save:", items); // Verify items data
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

//Placing order Razorpay method

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address, couponCode, discount, currency } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: Math.round((amount - (discount || 0)) * 100),
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    if (!userId || !razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId or razorpay_order_id'
      });
    }

    let orderInfo;
    try {
      orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    } catch (razorpayError) {
      console.error('Razorpay order fetch failed:', razorpayError);
      return res.status(500).json({
        success: false,
        message: 'Failed to verify payment with Razorpay'
      });
    }

    let user, order;
    try {
      [user, order] = await Promise.all([
        User.findById(userId),
        orderModel.findById(orderInfo.receipt)
      ]);
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch order information'
      });
    }

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (!order.address) return res.status(400).json({ success: false, message: 'Order address missing' });
    if (!Array.isArray(order.items) || order.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order items' });
    }

    if (orderInfo.status === "paid") {
      try {
        await Promise.all([
          orderModel.findByIdAndUpdate(orderInfo.receipt, {
            payment: true,
            status: 'paid',
            razorpayOrderId: razorpay_order_id
          }),
          User.findByIdAndUpdate(userId, { cartData: {} })
        ]);
      } catch (updateError) {
        console.error('Database update failed:', updateError);
        return res.status(500).json({
          success: false,
          message: 'Failed to update order status'
        });
      }

      const orderDate = new Date(order.date || Date.now()).toLocaleString('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
      });

      const currencytype = order.address.currencytype || 'INR';

      const itemsHTML = order.items.map(item => {
        const name = item.name || 'Product';
        const size = item.size ? `Size: ${item.size}` : '';
        const quantity = Number(item.quantity) || 1;
        const discountedPrice = Number(item.discountedprice) || 0;
        const actualPrice = Number(item.actualprice) || 0;
        const itemTotal = discountedPrice * quantity;
        const originalTotal = actualPrice * quantity;

        let imageHtml = '<div style="width: 80px; height: 80px; background: #f5f5f5; display: inline-block; border-radius: 4px;"></div>';
        if (item.image) {
          const cleanImagePath = item.image.startsWith('/') ? item.image.substring(1) : item.image;
          const imageUrl = `${process.env.BACKEND_URL || ''}${cleanImagePath}`;
          imageHtml = `<img src="${imageUrl}" alt="${name}" width="80" style="border-radius: 4px; border: 1px solid #eee;">`;
        }

        const formattedAmount = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: currencytype,
        }).format(itemTotal);

        const formattedOriginalTotal = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: currencytype,
        }).format(originalTotal);

        return `
  <tr style="border-bottom: 1px solid #e0e0e0;">
    <td style="padding: 15px 0; text-align: center;">
      ${imageHtml}
    </td>
    <td style="padding: 15px 0;">
      <div style="font-weight: 600; margin-bottom: 5px;">${name}</div>
      ${size ? `<div style="color: #666; font-size: 13px; margin-bottom: 5px;">${size}</div>` : ''}
      <div style="color: #666; font-size: 13px;">Qty: ${quantity}</div>
    </td>
    <td style="padding: 15px 0; text-align: right;">
      <div style="font-weight: 600;">${formattedAmount}</div>
      ${actualPrice > discountedPrice ? `<div style="color: #666; font-size: 13px; text-decoration: line-through;">${formattedOriginalTotal}</div>` : ''}
    </td>
  </tr>
`;
      }).join('');

      const formattedPaidAmount = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencytype,
      }).format(Number(order.amount || 0));

      const customerMailOptions = {
        from: process.env.EMAIL_FROM || 'no-reply@example.com',
        to: user.email,
        subject: `Order Confirmation #${order._id.toString().slice(-8)}`,
        html: `
        <!DOCTYPE html>
        <html><head><meta charset="UTF-8"><title>Order Confirmation</title></head>
        <body style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2e7d32;">Thank you for your purchase, ${order.address.firstName || 'Customer'}!</h2>
        <p>Your order has been confirmed and payment was successful.</p>
        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> ${order._id.toString().slice(-8)}</p>
        <p><strong>Amount Paid:</strong> ${formattedPaidAmount}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Online Payment'}</p>
        <p><strong>Payment Status:</strong> Paid</p>
        <p><strong>Order Date:</strong> ${orderDate}</p>
        <h3>Shipping Details</h3>
        <p>${order.address.firstName} ${order.address.lastName}<br>
        ${order.address.street}<br>
        ${order.address.city}, ${order.address.state}<br>
        ${order.address.country} - ${order.address.zipcode}<br>
        Phone: ${order.address.phone}</p>
        <h3>Items Ordered</h3>
        <table style="width: 100%;">${itemsHTML}</table>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">If you have any questions, contact support.</p>
        </body></html>
        `
      };

      // Send email (assuming transporter is configured)
      try {
        await transporter.sendMail(customerMailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }


      // Send a copy to the admin
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminMailOptions = {
        from: process.env.EMAIL_FROM || 'no-reply@example.com',
        to: adminEmail,
        subject: `New Order Placed #${order._id.toString().slice(-8)}`,
        html: `
    <!DOCTYPE html>
    <html><head><meta charset="UTF-8"><title>New Order Notification</title></head>
    <body style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #1976d2;">New Order Received</h2>
    <p>A new order has been placed and payment was successful.</p>
    <h3>Order Summary</h3>
    <p><strong>Order ID:</strong> ${order._id.toString().slice(-8)}</p>
    <p><strong>Customer:</strong> ${user.email}</p>
    <p><strong>Amount Paid:</strong> ${formattedPaidAmount}</p>
    <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Online Payment'}</p>
    <p><strong>Payment Status:</strong> Paid</p>
    <p><strong>Order Date:</strong> ${orderDate}</p>
    <h3>Shipping Details</h3>
    <p>${order.address.firstName} ${order.address.lastName}<br>
    ${order.address.street}<br>
    ${order.address.city}, ${order.address.state}<br>
    ${order.address.country} - ${order.address.zipcode}<br>
    Phone: ${order.address.phone}</p>
    <h3>Items Ordered</h3>
    <table style="width: 100%;">${itemsHTML}</table>
    <p style="margin-top: 20px; font-size: 14px; color: #666;">Check the admin panel for more details.</p>
    </body></html>
  `
      };

      try {
        await transporter.sendMail(adminMailOptions);
      } catch (adminMailError) {
        console.error('Failed to send admin email:', adminMailError);
      }


      return res.status(200).json({
        success: true,
        message: 'Payment verified and order confirmed.'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment not successful.'
      });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred.'
    });
  }
};



//all order data for admin panel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Users Order for frontend

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update Order Stauts  for admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};