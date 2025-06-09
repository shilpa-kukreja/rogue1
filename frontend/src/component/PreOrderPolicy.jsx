import React from 'react';
import { FaArrowDown } from "react-icons/fa6";

const PreOrderPolicy = () => {
  return (
    <div className='sm:px-10 h-[75vh] px-4 w-10/12 m-auto'>
      <div>
        <p className='flex  text-[#A9ABAE] text-xs font-semibold uppercase'>
          Rogue Pre-Order Policy <FaArrowDown className='ms-3' />
        </p>
      </div>

      <div className='text-[#A9ABAE] text-xs mt-6 space-y-4 text-justify'>
        <p>
          All pre-orders placed with ROGUE require full payment at the time the order is submitted. This payment acts as a formal confirmation of the client’s intent to purchase and secures the reserved item(s) within ROGUE’s production schedule for the upcoming collection. Once payment is processed, ROGUE considers the pre-order confirmed, and preparation for fulfillment begins internally. Payments are accepted through all major standard methods supported by ROGUE’s checkout system and are subject to the same fraud protection, security, and verification protocols applied to standard transactions.
        </p>

        <p>
          The standard lead time for pre-orders typically spans between forty-five (45) and sixty (60) days prior to the official launch of the collection. This window is subject to change based on factors including, but not limited to, collection complexity, production volume, supply chain logistics, and market demand. The estimated launch date for each specific collection will be clearly communicated at the time of order placement—either directly on the product detail page or via a confirmation email sent to the client upon successful checkout.
        </p>

        <p>
          The term “launch date” refers to the official public release of the collection. This date marks the commencement of the order fulfillment process for all associated pre-orders. From the launch date forward, all reserved items will be packed, processed, and dispatched in accordance with ROGUE’s established shipping policy. Shipment timelines may vary based on the client’s geographic location, regional carrier operations, and customs procedures. Once an order has been dispatched, clients will receive tracking information via email to monitor the delivery status of their items.
        </p>

        <p>
          Clients who wish to cancel a pre-order may request a full refund at any time up to twenty-four (24) hours prior to the designated launch date of the collection. Any requests for cancellation or refund submitted after this deadline will not be eligible for processing, and the order will be considered final and non-refundable. All eligible refunds will be issued back to the original payment method used at checkout and are subject to ROGUE’s internal refund processing timeline, which may vary slightly depending on banking institutions.
        </p>

        <p>
          IN THE EVENT OF PRODUCTION DELAYS, LAUNCH SCHEDULE ADJUSTMENTS, OR OTHER CIRCUMSTANCES THAT MATERIALLY AFFECT THE FULFILLMENT OF A PRE-ORDER, ROGUE WILL PROACTIVELY NOTIFY ALL IMPACTED CLIENTS VIA THE CONTACT INFORMATION PROVIDED AT CHECKOUT. THE COMMUNICATION WILL INCLUDE REVISED TIMELINES AND ANY AVAILABLE OPTIONS, INCLUDING THE POSSIBILITY OF AN AMENDED DELIVERY SCHEDULE OR FULL REFUND WHERE APPROPRIATE. ROGUE RESERVES THE RIGHT TO CANCEL ANY PRE-ORDER AND ISSUE A FULL REFUND AT ITS SOLE DISCRETION IF FULFILLMENT BECOMES INFEASIBLE DUE TO CONDITIONS BEYOND THE BRAND’S REASONABLE CONTROL.
        </p>

         <p>
          BY PLACING A PRE-ORDER WITH ROGUE, YOU ACKNOWLEDGE AND ACCEPT THE TERMS OUTLINED IN THIS PRE-ORDER POLICY. ROGUE RESERVES THE RIGHT TO UPDATE OR AMEND THIS POLICY AT ANY TIME, WITHOUT PRIOR NOTICE. CLIENTS ARE ENCOURAGED TO REVIEW THE MOST CURRENT VERSION OF THIS POLICY PRIOR TO PLACING EACH NEW PRE-ORDER.
        </p>
        <p>
          <p>
            FOR ANY QUESTIONS, SUPPORT REQUESTS, OR CONCERNS RELATING TO A PRE-ORDER, CLIENTS MAY CONTACT DIRECTLY AT INFO@ROGUE0707.COM 
        </p>
        </p>

        <p className='mt-5 font-semibold'>Team ROGUE 0707</p>
      </div>
    </div>
  );
};

export default PreOrderPolicy;
