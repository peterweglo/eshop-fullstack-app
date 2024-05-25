import React, { useState } from 'react';
import List from '../../features/List/List';
import { Alert } from 'react-bootstrap';

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = () => {
    setShowAlert(true);
    window.scrollTo(0, 0);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>The product has been added to the cart</p>
        </Alert>
      )}
      <div className="d-flex justify-content-between pb-4"></div>
      <List onAddToCart={handleAddToCart} />
    </div>
  );
};

export default Home;
