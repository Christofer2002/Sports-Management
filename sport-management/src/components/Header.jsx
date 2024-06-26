import React from 'react';
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';
import logo from '../../public/img/logo.jpg'; // Asegúrate de tener el logo en la carpeta assets

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <NavbarBrand href="#">
          <img
            src={logo}
            className="d-inline-block align-top"
            alt="Sports Management Logo"
          />
        </NavbarBrand>
      </Container>
    </Navbar>
  );
};

export default Header;
