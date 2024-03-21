import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function WithdrawBalance() {
  const [show, setShow] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleClose = () => {
    setWithdrawAmount("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Access the deposit value from the local Storage
  const data = localStorage.getItem("accountDetails");
  const accountDetails = JSON.parse(data);

  let balance = 0;
  if (accountDetails && accountDetails.length > 0) {
    balance = accountDetails[0].deposit;
  }

  const handleWithdraw = () => {
    const newWithdrawal = parseFloat(withdrawAmount);

    // Checking the withdrawal amount
    if (newWithdrawal <= 0) {
      alert("Please provide a valid withdrawal amount");
      return;
    } else if (newWithdrawal > balance) {
      alert(
        "Insufficient balance. You cannot withdraw more than your current balance."
      );
      return;
    } else if (isNaN(newWithdrawal) || newWithdrawal <= 0) {
        alert("Please provide a valid amount");
        return;
      }

    const newBalance = parseFloat(balance) - newWithdrawal;

    // Update the balance in accountDetails in localStorage
    if (accountDetails && accountDetails.length > 0) {
      accountDetails[0].deposit = newBalance;
      localStorage.setItem("accountDetails", JSON.stringify(accountDetails));
    }

    window.location.reload();

    setWithdrawAmount("");
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Withdraw Cash
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Withdraw Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center mb-2">
          Your Current Balance: Rs. {balance}
          <Form.Group className="mb-3 text-left" controlId="formBasicWithdraw">
            <Form.Label>Enter Withdraw Amount</Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/, "");
                setWithdrawAmount(value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WithdrawBalance;
