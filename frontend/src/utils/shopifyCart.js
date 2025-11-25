// const GRAPHQL_URL = 'https://naj9vi-zx.myshopify.com/api/2024-04/graphql.json';
// const ACCESS_TOKEN = 'd64d7024dc6ea00c329778b8c71e7fce';

// const fetchShopify = async (query, variables = {}) => {
//   const res = await fetch(GRAPHQL_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
//     },
//     body: JSON.stringify({ query, variables }),
//   });

//   const json = await res.json();
//   if (json.errors) {
//     throw new Error(json.errors[0].message);
//   }
//   return json.data;
// };

// export const createCheckout = async (variantId, quantity = 1) => {
//   const query = `
//   mutation cartCreate($input: CartInput!) {
//   cartCreate(input: $input) {
//     cart {
//       id
//       checkoutUrl
//     }
//     userErrors {
//       field
//       message
//     }
//   }
// }
//   `;
//   const variables = {
//     input: {
//       lineItems: [{ variantId, quantity }],
//     },
//   };
//   const data = await fetchShopify(query, variables);
//   return data.checkoutCreate.checkout;
// };

// export const addLineItemToCheckout = async (checkoutId, variantId, quantity = 1) => {
//   const query = `
//     mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
//       checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
//         checkout {
//           id
//           webUrl
//         }
//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `;
//   const variables = {
//     checkoutId,
//     lineItems: [{ variantId, quantity }],
//   };
//   const data = await fetchShopify(query, variables);
//   return data.checkoutLineItemsAdd.checkout;
// };


// export async function addToCart(variantId, quantity = 1) {
//   let cartId = localStorage.getItem('cart_id');

//   // If no cart exists, create one
//   if (!cartId) {
//     const query = `
//       mutation cartCreate($input: CartInput!) {
//         cartCreate(input: $input) {
//           cart {
//             id
//             checkoutUrl
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       input: {
//         lines: [
//           {
//             quantity,
//             merchandiseId: variantId
//           }
//         ]
//       }
//     };

//     const data = await fetchShopify(query, variables);
//     cartId = data.cartCreate.cart.id;
//     localStorage.setItem('cart_id', cartId);
//     return data.cartCreate.cart.checkoutUrl;
//   }

//   // If cart already exists, just add new line to it
//   const query = `
//     mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
//       cartLinesAdd(cartId: $cartId, lines: $lines) {
//         cart {
//           id
//           checkoutUrl
//         }
//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `;

//   const variables = {
//     cartId,
//     lines: [
//       {
//         quantity,
//         merchandiseId: variantId
//       }
//     ]
//   };

//   const data = await fetchShopify(query, variables);
//   return data.cartLinesAdd.cart.checkoutUrl;
// }


// shopifyCart.js
// const GRAPHQL_URL = 'https://naj9vi-zx.myshopify.com/api/2024-04/graphql.json';
// const ACCESS_TOKEN = 'd64d7024dc6ea00c329778b8c71e7fce';


const GRAPHQL_URL = 'https://q3uepe-ic.myshopify.com/api/2024-04/graphql.json';
const ACCESS_TOKEN = '76df5b05e1b2db908234960f1757df67';



export const fetchShopify = async (query, variables = {}) => {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
};


export const removeLineItem = async (lineId) => {
  const cartId = localStorage.getItem("cart_id");
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id }
      }
    }
  `;
  const variables = { cartId, lineIds: [lineId] };
  return await fetchShopify(query, variables);
};

export const updateLineItemQuantity = async (lineId, quantity) => {
  const cartId = localStorage.getItem("cart_id");
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };
  return await fetchShopify(query, variables);
};

export const getCart = async (cartId) => {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                  }
                  product {
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = { cartId };
  const data = await fetchShopify(query, variables);
  console.log(data);
  if(data.cart === null) {
    await createCart();
    console.log('cart created');
      return [];
  };
  return data.cart;
};


// ✅ Main Add To Cart Function
// export async function addToCart(variantId, quantity = 1) {
//   let cartId = localStorage.getItem('cart_id');

//   if (!cartId) {
//     const query = `
//       mutation cartCreate($input: CartInput!) {
//         cartCreate(input: $input) {
//           cart {
//             id
//             checkoutUrl
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       input: {
//         lines: [{ quantity, merchandiseId: variantId }],
//       },
//     };

//     const data = await fetchShopify(query, variables);
//     const cart = data.cartCreate.cart;
//     localStorage.setItem('cart_id', cart.id);
//     localStorage.setItem('checkout_url', cart.checkoutUrl);
//     return cart; // 🔁 return the cart
//   }

//   const query = `
//     mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
//       cartLinesAdd(cartId: $cartId, lines: $lines) {
//         cart {
//           id
//           checkoutUrl
//         }
//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `;

//   const variables = {
//     cartId,
//     lines: [{ quantity, merchandiseId: variantId }],
//   };

//   const data = await fetchShopify(query, variables);
//   const cart = data.cartLinesAdd.cart;
//   localStorage.setItem('checkout_url', cart.checkoutUrl);
//   return cart; 
// }


// export async function addToCart(variantId, quantity = 1, product = {}, sizeInfo = {}, currency = 'INR') {
//   let cartId = localStorage.getItem('cart_id');

//   if (!cartId) {
//     const query = `
//       mutation cartCreate($input: CartInput!) {
//         cartCreate(input: $input) {
//           cart {
//             id
//             checkoutUrl
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       input: {
//         lines: [{ quantity, merchandiseId: variantId }],
//       },
//     };

//     const data = await fetchShopify(query, variables);
//     const cart = data.cartCreate.cart;
//     localStorage.setItem('cart_id', cart.id);
//     localStorage.setItem('checkout_url', cart.checkoutUrl);

//     // ✅ Facebook Pixel AddToCart Event
//     if (typeof fbq === 'function') {
//       fbq('track', 'AddToCart', {
//         content_ids: [product._id || variantId],
//         content_type: 'product',
//         value: sizeInfo.discountPrice || 0,
//         currency: currency
//       });
//     }

//     return cart;
//   }

//   const query = `
//     mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
//       cartLinesAdd(cartId: $cartId, lines: $lines) {
//         cart {
//           id
//           checkoutUrl
//         }
//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `;

//   const variables = {
//     cartId,
//     lines: [{ quantity, merchandiseId: variantId }],
//   };

//   const data = await fetchShopify(query, variables);
//   const cart = data.cartLinesAdd.cart;
//   localStorage.setItem('checkout_url', cart.checkoutUrl);

//   // ✅ Facebook Pixel AddToCart Event
//   if (typeof fbq === 'function') {
//     fbq('track', 'AddToCart', {
//       content_ids: [product._id || variantId],
//       content_type: 'product',
//       value: sizeInfo.discountPrice || 0,
//       currency: currency
//     });
//   }

//   return cart;
// }


export async function addToCart(variantId, quantity = 1, product = {}, sizeInfo = {}, currency = 'INR') {
   
  let cartId = localStorage.getItem('cart_id');
  await getCart(cartId);
  const trackPixel = () => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', {
        content_ids: [product._id || variantId],
        content_type: 'product',
        value: sizeInfo.discountPrice || 0,
        currency: currency,
      });
    } else {
      console.warn('Meta Pixel (fbq) is not available.');
    }
  };

  if (!cartId) {
    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: [{ quantity, merchandiseId: variantId }],
      },
    };

    const data = await fetchShopify(query, variables);
    const cart = data.cartCreate.cart;

    if (cart) {
      localStorage.setItem('cart_id', cart.id);
      localStorage.setItem('checkout_url', cart.checkoutUrl);
    }

    trackPixel();
    return cart;
  }

  cartId = localStorage.getItem('cart_id');
  // cart already exists
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  };

  const data = await fetchShopify(query, variables);
  const cart = data.cartLinesAdd.cart;

  if (cart) {
    localStorage.setItem('checkout_url', cart.checkoutUrl);
  }

  trackPixel();
  return cart;
}




// export async function createCart(variantId = null, quantity = 1) {
//   const query = `
//     mutation cartCreate($input: CartInput!) {
//       cartCreate(input: $input) {
//         cart {
//           id
//           checkoutUrl
//         }
//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `;

//   const variables = {
//     input: variantId
//       ? {
//           lines: [{ quantity, merchandiseId: variantId }],
//         }
//       : {},
//   };

//   const data = await fetchShopify(query, variables);
//   const cart = data.cartCreate.cart;
//   localStorage.setItem('cart_id', cart.id);
//   localStorage.setItem('checkout_url', cart.checkoutUrl);
//   return cart;
// }




export async function createCart(variantId = null, quantity = 1) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: variantId
      ? {
          lines: [{ quantity, merchandiseId: variantId }],
        }
      : {},
  };

  const data = await fetchShopify(query, variables);
  const cart = data.cartCreate.cart;

  if (cart) {
    localStorage.setItem('cart_id', cart.id);
    localStorage.setItem('checkout_url', cart.checkoutUrl);
  }

  return cart;
}










