
import Header from '../layout/Header';
import Card from '../components/BackButton/card';
import { API_URL } from '../Config/Constant';
import { addToCart } from '../components/CartSlice';
import { Audio } from 'react-loader-spinner';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../layout/Footer/Footer';

const Home = () => {


   const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        setProductData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Header />
      <section className="product-listing mb-5">
        <div className="container mt-5">
          <h1 className="text-center mb-5 text-uppercase">Product Listing</h1>
          {isLoading ? (
            <div className="d-flex justify-content-center  loader-height">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass11
              />
            </div>
          ) : (
            <div className="row">
              {productData.map((product) => (
                <div key={product.id} className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                  <Card product={product} handleAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Home;