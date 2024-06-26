import SingleProduct from '../SingleProduct/SingleProduct';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Row, Col } from 'react-bootstrap';
import {
  getAllProducts,
  loadProductsRequest,
} from '../../../redux/productsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

const List = ({ onAddToCart }) => {
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(loadProductsRequest());
      setIsLoading(false);
    };
    fetchProducts();
  }, [dispatch]);

  if (isLoading) {
    return <Spinner animation="border" role="status"></Spinner>;
  }

  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} xs="12" md="6" lg="4">
          <SingleProduct {...product} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Row>
  );
};

export default List;
