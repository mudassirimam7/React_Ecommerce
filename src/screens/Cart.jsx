import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  incrementQuantity,
  decrementQuantity,
} from "../components/CartSlice";


const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const [totalPlus, setTotalPlus] = useState(0);
  const [totalMinus, setTotalMinus] = useState(0);

  const handleIncrementQuantity = (product) => {
    dispatch(incrementQuantity(product));
    setTotalPlus(totalPlus + product.price);
  };

  const handleDecrementQuantity = (product) => {
    dispatch(decrementQuantity(product));
    setTotalMinus(totalMinus + product.price);
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout")
  };

  useEffect(() => {
    const newTotalPlus = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const newTotalMinus = cart.reduce(
      (total, product) => total - product.price * product.quantity,
      0
    );
    setTotalPlus(newTotalPlus);
    setTotalMinus(newTotalMinus);
  }, [cart]);

  return (
    <section className="cart-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <h2>Cart ({totalQuantity})</h2>
            {cart.length > 0 ? (
              <ul className="list-group">
                {cart.map((product) => (
                  <li key={product.id} className="list-group-item ">
                    <div>
                      <img
                        className="card-img-top"
                        src={product.image}
                        alt=""
                      />
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm my-3"
                        onClick={() => handleDecrementQuantity(product)}
                      >
                        -
                      </button>
                      <span className="mx-2">{product.quantity}</span>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleIncrementQuantity(product)}
                      >
                        +
                      </button>
                    </div>
                    <span className="badge bg-primary rounded-pill me-3 px-3">
                      ${product.price * product.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p>Your cart is empty.</p>
              </>
            )}
          </div>
          <div className="col-lg-4">
              <div className="total_cart">
              <h2>Summary</h2>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Quantity</span>
                <span>{totalQuantity}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Plus</span>
                <span>${totalPlus}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Price</span>
                <span>${totalPrice}</span>
              </li>
            </ul>
            <button className="btn btn-primary mt-3" onClick={handleCheckout}>
              Checkout
            </button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Cart;
