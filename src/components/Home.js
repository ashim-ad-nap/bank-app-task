import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    deposit: 0,
  });
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //useEffect hook to check value in localStorage for navigation
  useEffect(() => {
    const existingData = localStorage.getItem("accountDetails");
    if (existingData) {
      navigate("/profile");
    }
  }, [navigate]);

  //get data from the form input field
  const getData = (e) => {
    const { value, name } = e.target;
    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  //create account and save the value in localStorage
  const createAccount = (e) => {
    e.preventDefault();
    const { name, email, deposit } = inputValue;
    if (name === "") {
      alert("Name field is required");
    } else if (email === "") {
      alert("Email field is required");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email");
    } else if (deposit === 0) {
      alert("Deposit amount cannot be 0");
    } else if (deposit === null || deposit.includes("-")) {
      alert("Please enter a valid Deposit Amount");
    } else if (deposit <= 100) {
      alert("Deposit Amount must be more than Rs. 100");
    } else {
      console.log("Account created succesfully");
      localStorage.setItem(
        "accountDetails",
        JSON.stringify([...data, inputValue])
      );
      setData(inputValue);
      navigate("/profile");
    }
  };

  return (
    <div className="container mt-3">
      <section>
        <div className="row justify-content-center">
          <div className="col-lg-6 border rounded p-4">
            <h3 className="text-center">Create Account</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getData}
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getData}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDeposit">
                <Form.Label>Deposit Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="deposit"
                  onChange={getData}
                  placeholder="Deposit Amount"
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" onClick={createAccount} type="submit">
                  Create Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
