import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../redux/cartRedux';
import { useDispatch } from 'react-redux';

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: props.id,
        name: props.name,
        price: props.price,
        image: props.image,
        quantity: 1,
      }),
    );
    if (props.onAddToCart) {
      props.onAddToCart();
    }
  };

  return (
    <Card className="mb-3">
      <Card.Img
        className="width: 18rem;"
        variant="top"
        src={'../../../images/' + props.image}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>Price: {props.price} $</Card.Text>
        <Button
          variant="secondary"
          onClick={() => navigate(`/product/${props.id}`)}
        >
          Read more
        </Button>
        <Button
          variant="success"
          onClick={() => handleAddToCart()}
          className="mx-3"
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
