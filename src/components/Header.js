import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  //Access the name value from the local Storage
  const data = localStorage.getItem("accountDetails");
  const accountDetails = JSON.parse(data);

  let name = "";
  if (accountDetails && accountDetails.length > 0) {
    name = accountDetails[0].name;
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Bank App</Navbar.Brand>
          <Navbar.Text className="ml-auto text-white">
            Welcome, {name}
          </Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
