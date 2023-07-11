import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logout from "../../Auth/Logout";
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cart);
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Link to="/home" className="nav-link header-link">Home</Link>
              <Link to="/addproduct" className="nav-link header-link">Addproduct</Link>
              <Link to="/cart" className="nav-link header-link" onClick={(e) => { e.preventDefault(); navigate("/cart"); }}>
                <div className="cart-icon text-white">
                  <FaShoppingCart />
                  {totalQuantity > 0 && <span className="cart-count text-white">{totalQuantity}</span>}
                </div>
              </Link>
            </Nav>  
          </Navbar.Collapse>
          <Logout />
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
