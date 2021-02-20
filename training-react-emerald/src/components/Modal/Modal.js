import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Modal, Row, Col } from "emerald-ui/lib";
import ButtonCondor from "../Button/Button";

export default function ModalCondor({ showModal, dataShowModal, onHide }) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(showModal)
        return () => {
            setShow(false)
        }
    }, [showModal])
    
  /**
   * Converts the first character of labelto Uppercase
   * @param {label of field success} str
   */
  const convertLabelToUpperCase = (str) => {
    return !!str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <Container>
      <Modal onHide={onHide} show={show}>
        <Modal.Header closeButton={true} style={{ backgroundColor: "#0073e9" }}>
          <Modal.Title style={{ color: "#fff" }}>Verify form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>All fields completed.</strong>
          </p>
          <ol>
            {Object.entries(dataShowModal).map((item, index) => {
              return (
                <li
                  className="listModal"
                  key={index}
                  style={{ color: "green" }}
                >
                  <Row>
                    <Col>{convertLabelToUpperCase(item[0])}</Col>
                    <Col style={{ textAlign: "right" }}>
                      {item[1] === true ? "Yes" : item[1]}
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <ButtonCondor text="Accept" color="info" onClick={onHide} />
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

ModalCondor.propTypes = {
    showModal: PropTypes.bool.isRequired,
    dataShowModal: PropTypes.array.isRequired,
    onHide: PropTypes.func.isRequired
};

ModalCondor.defaultProps = {
    showModal: false,
    dataShowModal: {},
    onHide: () => {}
};