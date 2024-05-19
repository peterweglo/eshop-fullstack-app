import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

const Cart = () => {
  const cart = useSelector((state) => state.cart); // Zakładając, że masz reducer 'cart' w swoim Redux store

  const getTotalPrice = () => {
    return cart.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2>Koszyk ({cart.items.length})</h2>
          {cart.items.map((item, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Kolor: {item.color}</Card.Text>
                <Card.Text>Rozmiar: {item.size}</Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    Cena za sztukę: {item.price.toFixed(2)} zł
                  </ListGroupItem>
                  <ListGroupItem>Ilość: {item.quantity}</ListGroupItem>
                  <ListGroupItem>
                    Suma: {(item.price * item.quantity).toFixed(2)} zł
                  </ListGroupItem>
                </ListGroup>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    /* funkcja usuwająca produkt z koszyka */
                  }}
                >
                  Usuń
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Podsumowanie</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Wartość produktów: {getTotalPrice()} zł
              </ListGroupItem>
              <ListGroupItem>Dostawa: Wybierz dostawę i płatność</ListGroupItem>
              <ListGroupItem>
                <strong>Do zapłaty (z VAT): {getTotalPrice()} zł</strong>
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="success" block>
                Przejdź do kasy
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
