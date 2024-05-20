import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getTotalQuantity } from '../../../redux/cartRedux';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const totalQuantity = useSelector(getTotalQuantity);
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded"
    >
      <Container>
        <Navbar.Brand href="/">ShoeShop.app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to='/login'>
              Sign in
            </Nav.Link>
            <Nav.Link as={NavLink} to='/logout'>
              Logout
            </Nav.Link> */}
            <Nav.Link as={NavLink} to="/cart">
              Cart
            </Nav.Link>
            {totalQuantity > 0 && (
              <div>
                <p>{totalQuantity}</p>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
