import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import { Navigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { loadProductsRequest } from '../../../redux/productsRedux';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { addProduct } from '../../../redux/cartRedux';

const ProductPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productData = useSelector((state) => getProductById(state, id));

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadProductsRequest());
      setIsLoading(false);
    };

    loadData();
  }, [dispatch]);

  const handleAddToCart = () => {
    dispatch(addProduct({ ...productData, quantity: 1 }));
    setShow(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <Navigate to="/" />;
  }

  if (!productData) return <Navigate to="/" />;

  return (
    <main className="d-flex justify-content-center">
      <div className="pe-5 me-5">
        <Card className="mb-4 border border-0">
          <Card.Img
            className="width: 18rem;"
            variant="top"
            src={'../../../images/' + productData.image}
          />
          <Card.Body>
            <Card.Title>{productData.title}</Card.Title>
            <Card.Text>
              <strong>Name:</strong> {productData.name}
            </Card.Text>
            <Card.Text>
              <strong>description:</strong> {productData.description}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong> {productData.price} $
            </Card.Text>
            <Card.Text>
              <strong>Product added:</strong> {productData.createdAt}
            </Card.Text>
            <Card.Text>
              <strong>Product updated :</strong> {productData.updatedAt}
            </Card.Text>
          </Card.Body>
          <Button
            variant="outline-info"
            className="m-1"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </Card>
        <div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>The product has been added to the cart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Card>
                <Card.Img
                  variant="top"
                  src={'../../../images/' + productData.image}
                />
                <Card.Body>
                  <Card.Title>{productData.name}</Card.Title>
                  <Card.Text>{productData.description}</Card.Text>
                  <Card.Text>Price: {productData.price}$</Card.Text>
                </Card.Body>
              </Card>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Continue shopping
              </Button>
              <Button variant="primary">Go to cart</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
