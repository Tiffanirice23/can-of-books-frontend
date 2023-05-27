import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand> Designed by <a href="https://github.com/AnthonySinitsa">Anthony Sinitsa</a>  and <a href="https://github.com/Tiffanirice23">Tiffani Rice</a> </Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
