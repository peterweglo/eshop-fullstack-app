import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { IMGS_URL } from '../../../config';

const SingleProduct = (props) => {
  const navigate = useNavigate();

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
          variant="primary"
          onClick={() => navigate(`/product/${props.id}`)}
        >
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
