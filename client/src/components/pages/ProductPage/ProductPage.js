import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import { Navigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { loadProductsRequest } from '../../../redux/productsRedux';

const ProductPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const productData = useSelector((state) => getProductById(state, id));

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadProductsRequest());
      setIsLoading(false);
    };

    loadData();
  }, [dispatch]);

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
            src={
              'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_1280.png'
            }
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
          <Button variant="outline-info" className="m-1">
            Buy
          </Button>
        </Card>
      </div>
    </main>
  );
};

export default ProductPage;
