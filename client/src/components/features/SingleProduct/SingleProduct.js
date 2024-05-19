import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const SingleProduct = (props) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-3">
      <Card.Img
        className="width: 18rem;"
        variant="top"
        src={
          'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_1280.png'
        }
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>Price: {props.price} $</Card.Text>
        <Button variant="primary" onClick={() => navigate(`/ad/${props.id}`)}>
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
