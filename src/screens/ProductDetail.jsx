import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { API_URL } from '../Config/Constant';
import { useParams, useNavigate ,Link} from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import BackButton from '../components/BackButton';
import Header from '../layout/Header';
import Footer from '../layout/Footer/Footer';
import { addToCart } from '../components/CartSlice';
import { useDispatch } from 'react-redux';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate  = useNavigate();

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
        dispatch(addToCart(product));     
    };
    
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/api/products/${id}/delete`, {
        method: 'DELETE',
      });
      navigate('/home');
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
    <Header/>
      <section className="product-detail">
        <div className="container">
          {product ? (
            <>
              <div className="row">
                <div className="col-12 mt-5">
                  <h1 className="text-center mb-5 text-uppercase">Product Detail</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <img src={product.image} alt="Product Image" className="w-100 detail-image" />
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12  py-3">
                      <div className='d-flex justify-content-between'>
                        <h5 className="card-title py-2">{product.title}</h5>
                          <BackButton/>
                      </div>
                    </div>
                  </div>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex justify-content-between">
                    <p className="card-text price-text">Price ${product.price}</p>
                    <p className="card-text">
                      <span className="text-primary">quantity</span>{' '}
                      <span className="price-text">{product.quantity}</span>
                    </p>
                  </div>
                  <button type="button" className="btn bg-red me-2 px-5" onClick={() => setShowModal(true)}>
                    Delete
                  </button>
                     <span>
                        <button type="button" className="btn bg-red me-2 px-5"  onClick={() => handleAddToCart(product)}>
                           add to cart
                         </button>
                      </span>
                      <Link to={`/products/${id}/edit`}>
                          <button type="button" className="btn bg-red px-5" >
                            Edit
                          </button>
                     </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center loader-height">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          )}
          <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this Product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              NO
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default ProductDetail;

        

                        
                        
                        