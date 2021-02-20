import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SkeletonCondor from "../SkeletonLoader/Skeleton";
import {Row, Col, TextField, Container, Checkbox} from "emerald-ui/lib"
import ButtonCondor from "../Button/Button"
function FormCondor({ loading, onSubmit,  tabIndex}) {
  /**
   * Saves all the data entered by the user in the form.
   */
  const [dataForm, setDataForm] = useState({
    firstname: "",
    lastname: "", 
    email: "",
    phonenumber: "",
    comments: "",
    sendEmail: false,
  }); 

  /**
   * State for validate changes on the fields of form.
   */
  const [errorMessage, setErrorMessage] = useState({ ...dataForm });
  const [percentageForm, setPercentageForm] = useState(0);

  /**
   * Hook responsible for listening to changes in the form at the foot of the page.
   */
  useEffect(() => {
    let percentage =
      (Object.values(dataForm).filter((val) => !!val).length * 100) /
      Object.keys(dataForm).length;
    setPercentageForm(Math.trunc(percentage));
  }, [dataForm]);


  /**
   *
   * @param {element with changes on the field the form} elm
   */
  const validateDataField = (elm) => {
    try {
      let expRegEmail = new RegExp(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        ),
        regExpNumber = new RegExp(/^[0-9]{10}$/);
      if (
        elm.target.name !== "email" &&
        elm.target.name !== "phonenumber" &&
        elm.target.name !== "sendEmail"
      ) {
        if (!!!elm.target.value.trim()) {
          setErrorMessage({ ...errorMessage, [elm.target.name]: true });
        } else {
          setErrorMessage({ ...errorMessage, [elm.target.name]: false });
        }
      } else if (
        elm.target.name === "email" &&
        !expRegEmail.test(elm.target.value) &&
        !!elm.target.value.trim()
      ) {
        setErrorMessage({ ...errorMessage, [elm.target.name]: true });
      } else if (
        elm.target.name === "phonenumber" &&
        !regExpNumber.test(elm.target.value) &&
        !!elm.target.value.trim()
      ) {
        setErrorMessage({ ...errorMessage, [elm.target.name]: true });
      } else if (elm.target.name === "sendEmail") {
        return elm.target.checked;
      } else {
        setErrorMessage({ ...errorMessage, [elm.target.name]: false });
      }
      return elm.target.value;
    } catch (error) {
      throw new Error(
        "Error en uno de los campos",
        `Valor introducido - ${elm.target.name} - ${elm.target.value}`
      );
    }
  };

  /**
   * Function responsability of making changes on the fields the form.
   * @param {element with changes on the form} e
   */
  const handleChange = (e) => {
    e && setDataForm({ ...dataForm, [e.target.name]: validateDataField(e) });
  };

  return (
    <Container className="footer-contact-us">
      <form
      onSubmit={(e) => onSubmit([e, dataForm])}
      tabIndex={tabIndex}
    >
      <Container className="container-form">
        <Row className="row-form">
          <Col xs={12} lg={6} md={6} sm={12}>
            {loading ? (
              <TextField
                errorMessage={
                  errorMessage.firstname
                    ? "fill in the name field Firstname"
                    : ""
                }
                label="Firstname"
                onChange={(e) => handleChange(e)}
                name="firstname"
                value={dataForm.firstname}
                type="text"
              />
            ) : (
              <SkeletonCondor loading width="auto" />
            )}
          </Col>
          <Col xs={12} lg={6} md={6} sm={12}>
            {loading ? (
              <TextField
                errorMessage={
                  errorMessage.lastname ? "fill in the name field Lastname" : ""
                }
                label="Lastname"
                onChange={(e) => handleChange(e)}
                name="lastname"
                value={dataForm.lastname}
                type="text"
              />
            ) : (
              <SkeletonCondor loading width="auto" />
            )}
          </Col>
        </Row>
        <Row className="row-form">
          <Col xs={12} lg={6} md={6} sm={12}>
            {loading ? (
              <TextField
                errorMessage={
                  errorMessage.email
                    ? "fill in the name field Email, E.G. - example@gmail.com"
                    : ""
                }
                label="Email"
                onChange={(e) => handleChange(e)}
                name="email"
                value={dataForm.email}
                type="email"
              />
            ) : (
              <SkeletonCondor loading width="auto" />
            )}
          </Col>
          <Col xs={12} lg={6} md={6} sm={12}>
            {loading ? (
              <TextField
                min="0"
                maxLength={10}
                errorMessage={
                  errorMessage.phonenumber
                    ? "fill in the name field Phonenumber (Min. 10 digits)."
                    : ""
                }
                label="Phonenumber"
                onChange={(e) => handleChange(e)}
                name="phonenumber"
                value={dataForm.phonenumber}
                type="number"
                onKeyPress={(e) => {
                  if (e.target.value.length > 10) {
                    e.target.value = e.target.value.substring(0, 9);
                  }
                }}
              />
            ) : (
              <SkeletonCondor loading width="auto" />
            )}
          </Col>
        </Row>
        <Row className="row-form-full">
          <Col>
            {loading ? (
              <TextField
                textarea={true}
                errorMessage={
                  errorMessage.comments ? "fill in the name field comments" : ""
                }
                label="Comments"
                onChange={(e) => handleChange(e)}
                name="comments"
                value={dataForm.comments}
                type="text"
              />
            ) : (
              <SkeletonCondor loading width="auto" height="61px" />
            )}
          </Col>
        </Row>
        <Row className="container-checkbox">
          <Col>
            {loading ? (
              <Checkbox
                tabIndex="21"
                onChange={(e) => handleChange(e)}
                label="Send me emails about breaking news and promotions."
                name="sendEmail"
              />
            ) : (
              <SkeletonCondor loading width="auto" />
            )}
          </Col>
        </Row>
        <Container fluid={true}>
          <Row center={true}>
            {loading ? (
              <ButtonCondor
                loading={percentageForm > 0 ? true : false}
                progress={percentageForm}
                disabled={
                  percentageForm === 100 &&
                  !Object.values(errorMessage).find((msn) => !!msn)
                    ? false
                    : true
                }
                text="Submit"
                type="submit"
                color="info"
                className="button-submit"
                tabIndex="23"
              >
              </ButtonCondor>
            ) : (
              <SkeletonCondor loading />
            )}
          </Row>
        </Container>
      </Container>
    </form>
    </Container>
  );
}

FormCondor.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

FormCondor.defaultProps = {
  loading: false,
  onSubmit: () => {},
  tabIndex: ""
};

export default FormCondor;
