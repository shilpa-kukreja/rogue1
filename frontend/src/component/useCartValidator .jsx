import { useEffect } from 'react';
import { getCart, createCart } from '../utils/shopifyCart'; 

const useCartValidator = () => {
  useEffect(() => {
    const validateOrCreateCart = async () => {
      const cartId = localStorage.getItem('cart_id');

      if (!cartId) {
        console.log('No cart ID found. Creating a new cart...');
        const newCart = await createCart();
        localStorage.setItem('cart_id', newCart.id);
        return;
      }

      try {
        const cart = await getCart(cartId);
        if (!cart || !cart.id) {
          console.log('Invalid cart ID. Creating a new cart...');
          const newCart = await createCart();
          localStorage.setItem('cart_id', newCart.id);
        } else {
          console.log('Valid cart found:', cart.id);
        }
      } catch (err) {
        console.error('Error validating cart:', err.message);
        const newCart = await createCart();
        localStorage.setItem('cart_id', newCart.id);
      }
    };

    validateOrCreateCart();
  }, []);
};

export default useCartValidator;
