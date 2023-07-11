// import { useSelector } from 'react-redux';
// import { FaShoppingCart } from 'react-icons/fa';

// const CartIcon = () => {
//   const cart = useSelector(state => state.cart.cart);
//   const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

//   return (
//     <div className="cart-icon text-white">
//       <FaShoppingCart />
//       {totalQuantity > 0 && <span className="cart-count text-white">{totalQuantity}</span>}
//     </div>
//   );
// };

// export default CartIcon;