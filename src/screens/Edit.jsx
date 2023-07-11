import { Audio } from 'react-loader-spinner';
import { API_URL } from '../Config/Constant';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import BackButton from '../components/BackButton';

const EditProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setUpdatedTitle(data.title);
        setUpdatedDescription(data.description);
        setUpdatedPrice(data.price);
        setUpdatedQuantity(data.quantity);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', updatedTitle);
    formData.append('description', updatedDescription);
    formData.append('price', updatedPrice);
    formData.append('quantity', updatedQuantity);
    if (updatedImage) {
      formData.append('image', updatedImage);
    }
    try {
      const response = await fetch(`${API_URL}/api/products/${id}/edit`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setShowModal(true);
      navigate(`/product/${id}`); 
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate(`/product/${id}`);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    setUpdatedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };
  
  return (
    <div className='container py-md-5 py-4'>
        <div className="row justify-content-center py-lg-5 ">
            <div className="col-12 d-flex justify-content-center">
                <h1>Edit Product</h1>
            </div>
            <div className="col-xl-6 col-md-8 col-12">
                {product ? (
                    <form>
                    <div className='w-100'>
                        <label htmlFor="title">Title:</label>
                        <input
                        type="text"
                        id="title"
                        value={updatedTitle}
                        className="form-control w-100"
                        onChange={(event) => setUpdatedTitle(event.target.value)}
                        />
                    </div>
                    <div className='w-100'>
                        <label htmlFor="description">Description:</label>
                        <textarea
                        id="description"
                        value={updatedDescription}
                        onChange={(event) => setUpdatedDescription(event.target.value)}
                        className="form-control w-100"
                        />
                    </div>
                    <div className='w-100'>
                        <label htmlFor="price">Price:</label>
                        <input
                        type="number"
                        id="price"
                        value={updatedPrice}
                        onChange={(event) => setUpdatedPrice(event.target.value)}
                        className="form-control w-100"
                        />
                    </div>
                    <div className='w-100'>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                        type="number"
                        id="quantity"
                        value={updatedQuantity}
                        onChange={(event) => setUpdatedQuantity(event.target.value)}
                        className="form-control w-100"
                        />
                    </div>
                    <div className='w-100'>
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            className="form-control w-100"
                        />
                        {imagePreviewUrl && (
                            <img
                            src={imagePreviewUrl}
                            alt="Product Preview"
                            className="img-fluid mt-3"
                            style={{ maxHeight: 200 }}
                            />
                        )}
                        </div>
                    <button type="button" className='btn px-5 bg-red me-2' onClick={() => setShowModal(true)}>
                        Save
                    </button>
                    <BackButton/>
                    </form>
                ) : (
                    <div className="d-flex justify-content-center loader-height">
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
            </div>
        </div>
          <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Product updated</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to Update this Product?
          </Modal.Body>
          <Modal.Footer>
              <Button variant="danger" onClick={handleSave}>
                Yes
              </Button>
            <Button variant="primary" onClick={closeModal}>
              No
            </Button>
          </Modal.Footer>
        </Modal>  
    </div>
  );    
};

export default EditProduct;