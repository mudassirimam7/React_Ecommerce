import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../components/CartSlice";
import { API_URL } from "../Config/Constant";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/order/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          select_products: cart,
          user_information: {
            first_name: "First Name",
            last_name: "Last Name",
            user_id: 1
          },
          payment_information: {
            method: "bac",
            title: "bac",
            amount: "100"
          },
          status: "pending"
        }),
      });
      const data = await response.json();
      console.log("asdasd",data)
      dispatch(clearCart());
      setIsLoading(false);
      navigate("/success");
    } catch (error) {
      setIsLoading(false);
      console.error("Error placing order:", error);
    }
  };

  return (
    <section className="checkout-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2>Checkout</h2>
            {cart.length > 0 ? (
              <ul className="list-group">
                {cart.map((product) => (
                  <li key={product.id} className="list-group-item">
                    <div>
                      <img
                        className="card-img-top"
                        src={product.image}
                        alt=""
                      />
                    </div>
                    <div>
                      <h4>{product.title}</h4>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${product.price * product.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p>Your cart is empty.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/cart")}
                >
                  Go back to Cart
                </button>
              </>
            )}
          </div>
          <div className="col-lg-6">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Quantity</span>
                  <span>{cart.length > 0 ? cart.length : 0}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Price</span>
                  <span>${totalPrice}</span>
                </li>
              </ul>
              {cart.length > 0 && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Placing Order..." : "Place Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;