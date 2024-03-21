import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function DepositBalance() {
  const [show, setShow] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  const handleClose = () => {
    setDepositAmount("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //fetch the balance from the localstorage
  const data = localStorage.getItem("accountDetails");
  const accountDetails = JSON.parse(data);

  let balance = 0;
  if (accountDetails && accountDetails.length > 0) {
    balance = accountDetails[0].deposit;
  }

  const handleDeposit = () => {
    const newDeposit = parseFloat(depositAmount);
    const newBalance = parseFloat(balance) + newDeposit;

    //checking the deposit amount
    if (newDeposit <= 100) {
      alert(
        "Insufficient deposit amount. The amount should be more than Rs. 100"
      );
      return;
    } else if (newDeposit < 0) {
      alert("Please provide a valid amount");
      return;
    }

    // Update the balance in accountDetails in localstorage
    if (accountDetails && accountDetails.length > 0) {
      accountDetails[0].deposit = newBalance;
      localStorage.setItem("accountDetails", JSON.stringify(accountDetails));
    }

    window.location.reload();

    setDepositAmount("");
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Deposit Cash
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deposit Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center mb-2">
          Your Current Balance: Rs. {balance}
          <Form.Group className="mb-3 text-left" controlId="formBasicDeposit">
            <Form.Label>Enter Deposit Amount</Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="Enter amount"
              value={depositAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/, "");
                setDepositAmount(value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeposit}>
            Deposit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DepositBalance;
