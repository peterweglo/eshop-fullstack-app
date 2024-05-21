import {
  Form,
  Button,
  Alert,
  Spinner,
  ListGroup,
  Card,
  Image,
  Row,
  Col,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/cartRedux';

const OrderForm = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (status === 'success') {
      dispatch(clearCart());
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [status, dispatch, navigate]);

  const handleSubmit = () => {
    if (cartProducts.length === 0) {
      alert(
        'Your cart is empty. Please add some products before placing an order.',
      );
      return;
    }
    const orderData = {
      firstName,
      lastName,
      email,
      country,
      street1,
      street2,
      city,
      zip,
      phone,
      comments,
      products: cartProducts.map((product) => ({
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
      })),
    };
    console.log('OrderData', orderData);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    };

    const url = `${API_URL}/orders`;

    setStatus('loading');
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          setStatus('success');
          // navigate('/');
        } else {
          switch (res.status) {
            case 400:
              setStatus('clientError');
              break;
            case 401:
              setStatus('loginError');
              break;
            default:
              setStatus('serverError');
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setStatus('serverError');
      });
  };

  const deliveryCost = 5;
  const totalCost =
    cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ) + deliveryCost;
  return (
    <Row>
      <Col md={6}>
        <div className="mb-4">
          <Form onSubmit={validate(handleSubmit)} id="orderForm">
            {status === 'success' && (
              <Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>Your order has been placed successfully!</p>
              </Alert>
            )}

            {status === 'serverError' && (
              <Alert variant="danger">
                <Alert.Heading>Something went wrong!</Alert.Heading>
                <p>Unexpected error, please try again.</p>
              </Alert>
            )}

            {status === 'clientError' && (
              <Alert variant="danger">
                <Alert.Heading>Not enough data</Alert.Heading>
                <p>You have to fill all the fields.</p>
              </Alert>
            )}

            {status === 'loginError' && (
              <Alert variant="warning">
                <Alert.Heading>You must be logged in</Alert.Heading>
                <p>You have to login first.</p>
              </Alert>
            )}

            {status === 'loading' && (
              <Spinner animation="border" role="status"></Spinner>
            )}

            <Form.Group className="mb-4">
              <Form.Label>First name</Form.Label>
              <Form.Control
                {...register('firstName', {
                  required: 'First name is required.',
                  minLength: {
                    value: 3,
                    message: 'First name is too short (min is 3).',
                  },
                  maxLength: {
                    value: 30,
                    message: 'First name is too long (max is 30).',
                  },
                })}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                isInvalid={errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                {...register('lastName', {
                  required: 'Last name is required.',
                  minLength: {
                    value: 3,
                    message: 'Last name is too short (min is 3).',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Last name is too long (max is 30).',
                  },
                })}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                isInvalid={errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: 'Invalid email format.',
                  },
                })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Country or region</Form.Label>
              <Form.Control
                {...register('country', { required: 'Country is required.' })}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                isInvalid={errors.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Street address</Form.Label>
              <Form.Control
                {...register('street1', {
                  required: 'Street address is required.',
                })}
                value={street1}
                onChange={(e) => setStreet1(e.target.value)}
                isInvalid={errors.street1}
              />
              <Form.Control
                {...register('street2')}
                value={street2}
                onChange={(e) => setStreet2(e.target.value)}
                placeholder="Street address 2 (optional)"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>City</Form.Label>
              <Form.Control
                {...register('city', { required: 'City is required.' })}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                isInvalid={errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>ZIP code</Form.Label>
              <Form.Control
                {...register('zip', {
                  required: 'ZIP code is required.',
                  pattern: {
                    value: /^(\d{2}-\d{3}|\d{5})$/,
                    message:
                      'Invalid ZIP code format. Expected format: XX-XXX or XXXXX.',
                  },
                })}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                isInvalid={errors.zip}
              />
              <Form.Control.Feedback type="invalid">
                {errors.zip?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                {...register('phone', {
                  required: 'Phone number is required.',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Invalid phone number.',
                  },
                })}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                {...register('comments')}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Header>Order Summary</Card.Header>
          <ListGroup variant="flush">
            {cartProducts.map((product) => (
              <ListGroup.Item
                key={product.id}
                className="d-flex align-items-center"
              >
                <Image
                  src={'../../../images/' + product.image}
                  thumbnail
                  style={{
                    width: '120px',
                    height: '100%',
                    objectFit: 'cover',
                    marginRight: '10px',
                  }}
                />
                <div>
                  <div>{product.name}</div>
                  <div>
                    {product.quantity} x ${product.price.toFixed(2)}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Footer>
            <div className="d-flex justify-content-between">
              <span>Products Total:</span>
              <span>
                $
                {cartProducts
                  .reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0,
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Delivery:</span>
              <span>${deliveryCost.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <Button
              variant="success"
              type="submit"
              form="orderForm"
              className="mt-3 w-100"
            >
              Place Order
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderForm;
