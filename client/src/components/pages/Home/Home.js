import List from '../../features/List/List';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="d-flex justify-content-between pb-4">
        <h1>All Shoes</h1>
      </div>
      <List />
    </div>
  );
};

export default Home;
