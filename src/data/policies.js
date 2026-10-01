// Sample policy text written for this demo. Replace with the client's reviewed legal copy before launch.
export const POLICIES = {
  shipping: {
    title: 'Shipping Policy',
    sections: [
      { h: 'Order processing', p: ['All orders are processed within 1–2 working days (Monday to Saturday, excluding public holidays). During sale periods and Eid, processing may take up to 3 working days.', 'We currently accept prepaid orders only. Cash on delivery is not available.'] },
      { h: 'Delivery within India', p: [[
        'Standard shipping: 4–7 working days — ₹99, free on orders over ₹1,499.',
        'Express shipping: 2–3 working days — ₹249.',
        'Remote and north-eastern PIN codes may take 2–3 additional days.',
      ]] },
      { h: 'International shipping', p: ['We ship to most countries, including the UAE, Saudi Arabia, Qatar, the United Kingdom, the United States, Canada and Malaysia. International orders are delivered in 7–14 working days.', 'Import duties and taxes, where applicable, are charged by the destination country and are the responsibility of the recipient.'] },
      { h: 'Tracking', p: ['Once your order has shipped you will receive a tracking link by email and WhatsApp. Tracking information may take up to 24 hours to update.'] },
      { h: 'Incorrect addresses', p: ['Please double-check your shipping address at checkout. We are not responsible for delays or losses caused by an incorrect or incomplete address. Re-shipping charges may apply.'] },
    ],
  },
  returns: {
    title: 'Return & Exchange Policy',
    sections: [
      { h: 'Exchanges', p: ['We accept exchange requests within 7 days of delivery. Items must be unused, unwashed and returned with original tags and packaging.', 'To request an exchange, contact us with your order number and the reason for the exchange.'] },
      { h: 'Unboxing video', p: ['An uninterrupted unboxing video, starting from the sealed parcel, is required for all claims of damaged, defective or missing items. Claims without a video cannot be processed.'] },
      { h: 'Non-returnable items', p: [[
        'Jewellery and keychains',
        'Skincare and personal-care products',
        'Hijab caps and undercaps',
        'Items purchased during final sale',
      ]] },
      { h: 'Refunds', p: ['Refunds are issued only for items that are damaged, defective or incorrect. Approved refunds are credited to the original payment method within 7–10 working days. In other cases we offer an exchange or store credit.'] },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { h: 'Information we collect', p: ['When you place an order or create an account we collect your name, email address, phone number and shipping address. Payment details are handled by our payment partner and are never stored on our servers.'] },
      { h: 'How we use your information', p: [[
        'To process and deliver your orders',
        'To send order updates by email, SMS or WhatsApp',
        'To respond to your questions and requests',
        'To send newsletters, only if you have subscribed',
      ]] },
      { h: 'Sharing your information', p: ['We share only what is necessary with trusted partners such as courier companies and payment processors. We never sell your personal information.'] },
      { h: 'Cookies', p: ['We use essential cookies and local storage to keep your cart and wishlist, and analytics cookies to understand how our store is used. You can control cookies from your browser settings.'] },
      { h: 'Your choices', p: ['You can update your account details at any time, unsubscribe from marketing emails using the link in any email, or contact us to request deletion of your data.'] },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      { h: 'Overview', p: ['By using this website and placing an order you agree to these terms. Please read them carefully before making a purchase.'] },
      { h: 'Products and pricing', p: ['We make every effort to display colours and details accurately, but slight variations may occur due to screen settings and photography lighting. All prices are in Indian Rupees and include applicable taxes unless stated otherwise.', 'We reserve the right to change prices or discontinue products without notice.'] },
      { h: 'Orders', p: ['An order is confirmed only once payment has been received. We may cancel an order if a product is out of stock or if there is a pricing error, in which case a full refund is issued.'] },
      { h: 'Discount codes', p: ['Discount codes cannot be combined, have no cash value and may be withdrawn at any time.'] },
      { h: 'Intellectual property', p: ['All content on this website, including images, text and the logo, belongs to the store and may not be reproduced without written permission.'] },
      { h: 'Governing law', p: ['These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in Mumbai.'] },
    ],
  },
}
