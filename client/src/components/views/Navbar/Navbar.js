import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getAll,
  getTotalQuantity,
  removeProduct,
  updateQuantity,
} from '../../../redux/cartRedux';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../images/logo2.svg';

const NavBar = () => {
  const totalQuantity = useSelector(getTotalQuantity);
  const cartProducts = useSelector(getAll);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity(id, quantity));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10) || 0;

    if (newQuantity < 1) {
      newQuantity = 1;
    }
    handleUpdateQuantity(id, newQuantity);
  };

  const handleGotoCart = () => {
    navigate('/cart');
    setIsCartOpen(false);
  };

  const deliveryCost = 5;
  const totalCost =
    cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ) + deliveryCost;

  return (
    <Navbar
      bg="secondary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded"
    >
      <Container>
        <Navbar.Brand href="/">
          <Logo style={{ height: '150px' }} />
          <span className={styles.logo}>ShoeShop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className={styles.homeIcon}>
              Home
            </Nav.Link>

            <div className={`col text-right ${styles.cart}`}>
              <Nav.Link className={styles.cartBox} as={NavLink} to="/cart">
                <div className={styles.cartIcon} onClick={toggleCart}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faShoppingBasket}
                  />
                </div>
                <div className={styles.cartCounter}>({totalQuantity})</div>
              </Nav.Link>
              {isCartOpen && (
                <div className={styles.cartList}>
                  {cartProducts.map((product) => (
                    <div key={product.id} className={styles.cartItem}>
                      <div className={styles.productDetails}>
                        <span className={styles.productName}>
                          {product.name}
                        </span>
                        <span className={styles.productPrice}>
                          {' '}
                          - Price: ${product.price * product.quantity}
                        </span>
                      </div>
                      <div className={styles.quantityControls}>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity - 1,
                            )
                          }
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          className={styles.quantityInput}
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(product.id, e.target.value)
                          }
                        />
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity + 1,
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.removeIcon}
                        onClick={() => handleRemoveProduct(product.id)}
                      />
                    </div>
                  ))}
                  <div className={styles.cartSummary}>
                    <div>
                      {' '}
                      Products: {(totalCost - deliveryCost).toFixed(2)} $
                    </div>
                    <div>Delivery price: $5.00</div>
                    <div>Total price: ${totalPrice + 5}</div>
                    <Button variant="success" onClick={handleGotoCart}>
                      Go to cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
