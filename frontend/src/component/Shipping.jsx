import React from 'react';
import { FaArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Shipping = () => {
  return (
    <div className='sm:px-10 px-4 w-10/12 m-auto'>
      <div>
        <p className='flex items-center text-[#A9ABAE] text-xs'>SHIPPING <FaArrowDown className='ms-3' /></p>
      </div>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>SHIPPING DESTINATIONS</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>We deliver to  worldwide. However, due to logistical restrictions, delivery may not be possible to certain remote locations. If we are unable to ship to your location, we will notify you promptly.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>PROCESSING TIME</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>Orders are processed within 1-3 business days, excluding weekends and public holidays. Once your order is processed, you will receive a confirmation email with your tracking information.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>SHIPPING METHODS AND DELIVERY TIMES</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>
        <strong>Standard Shipping:</strong> Delivery within 7-15 business days. available worldwide.<br/>
        <strong>Express Shipping:</strong> Delivery within 3-7 business days. available worldwide.<br/>
        
      </p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>SHIPPING COSTS</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>Shipping fees are calculated at checkout based on the destination, shipping method, and order weight. Applicable taxes and duties are included where required.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>CUSTOMS, DUTIES, AND TAXES</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>For international orders, customs fees, import duties, and taxes may apply. These charges are the responsibility of the recipient and are not included in the total price of the order. We recommend checking with your local customs office for details on applicable charges.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>ORDER TRACKING</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>Once your order has been shipped, you will receive a tracking number via email. You can track your package through the carrier’s website or through our order tracking page.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>LOST OR DELAYED SHIPMENTS</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>If your order is delayed beyond the estimated delivery timeframe, please contact our support team at [support email] for assistance. For lost packages, we will work with the carrier to investigate and resolve the issue.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>DAMAGED OR INCORRECT ITEMS</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>If your package arrives damaged or contains incorrect items, please notify us within 7 days of receipt. We may request photographs of the damage or incorrect items to facilitate a resolution, which may include a replacement or refund.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>NON-DELIVERY AREAS</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>We reserve the right to refuse shipment to locations deemed high-risk or logistically challenging. In such cases, you will be notified, and a full refund will be issued for the order.</p>
      
      <p><strong className='text-xs my-6 block text-[#A9ABAE]'>CHANGES TO SHIPPING POLICY</strong></p>
      <p className='text-[#A9ABAE] text-xs mb-5'>We may update this shipping policy from time to time. Any changes will be reflected on this page, and the updated policy will apply to all orders placed after the date of the update.</p>
      
      <p className='text-[#A9ABAE] text-xs'>If you have any questions about our shipping policy, please contact us at <Link to="mailto:info@gmail.com">info@gmail.com</Link> or [support phone number].</p>

      <p className='text-[#A9ABAE] text-xs mt-5 font-semibold'>Team ROGUE 0707</p>
    </div>
  );
};

export default Shipping;