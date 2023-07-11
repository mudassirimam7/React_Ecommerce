import { Link } from "react-router-dom";
const Card = ({ product, handleAddToCart }) => {
  const { id, description, image, price, quantity, title } = product;
  return (
    <div className="card flex-grow-1">
      <img src={image} className="card-img-top" alt="Product Image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <p className="card-text price-text">Price ${price}</p>
          <p className="card-text">
            <span className="text-primary">quantity</span>{" "}
            <span className="price-text">{quantity}</span>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn bg-red"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <Link to={`/product/${id}`} className="btn btn-detail">
            View Details
          </Link>
        </div>                                                                                                                                                                                                                                      
      </div>
    </div>
  );
};
export default Card;
