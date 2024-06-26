import styles from './Cart.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
} from 'react-bootstrap';
import {
  getAll,
  getTotalQuantity,
  removeProduct,
  updateQuantity,
} from '../../../redux/cartRedux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(getAll);
  const totalQuantity = useSelector(getTotalQuantity);

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const handleChangeQuantity = (id, quantity) => {
    quantity = parseInt(quantity, 10) || 0;

    if (quantity < 1) {
      quantity = 1;
    }
    dispatch(updateQuantity(id, quantity));
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      alert('Your cart is empty. Please add products to proceed to checkout.');
    } else navigate('/order');
  };

  // Delivery cost is fixed at $5
  const deliveryCost = 5;
  const totalCost =
    cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ) + deliveryCost;

  return (
    <Container>
      <h2>Cart ({totalQuantity} products)</h2>
      <Row>
        <Col md={8}>
          {cartProducts.map((product) => (
            <Card
              key={product.id}
              className="mb-3 d-flex flex-row align-items-stretch"
            >
              <Image
                src={'../../../images/' + product.image}
                style={{ width: '50%', objectFit: 'cover' }}
              />
              <Card.Body className="flex-grow-1">
                <Card.Title className={styles.cardTitle}>
                  {product.name}
                </Card.Title>
                <Card.Text>Price: {product.price.toFixed(2)} $</Card.Text>
                <Card.Text>
                  <div className={styles.quantityControls}>
                    <span>Quantity:</span>

                    <div>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleChangeQuantity(product.id, product.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        value={product.quantity}
                        min="1"
                        onChange={(e) =>
                          handleChangeQuantity(
                            product.id,
                            parseInt(e.target.value),
                          )
                        }
                      />
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleChangeQuantity(product.id, product.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </Card.Text>
                <Button
                  className={styles.removeButton}
                  variant="danger"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Total Cost</Card.Header>
            <ListGroup variant="flush" className={styles.cartSummary}>
              <ListGroup.Item>
                Products: {(totalCost - deliveryCost).toFixed(2)} $
              </ListGroup.Item>
              <ListGroup.Item>
                Delivery: {deliveryCost.toFixed(2)} $
              </ListGroup.Item>
              <ListGroup.Item>Total: {totalCost.toFixed(2)} $</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="success" onClick={handleCheckout}>
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
