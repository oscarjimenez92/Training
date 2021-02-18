/**
 * @version 1.3
 * @author Oscar Jiménez
 */
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  DropdownButton,
  DropdownItem,
  Icon,
  Avatar,
  Alert,
  Button,
  SkeletonLoader,
  Toast,
  CardGrid,
  Card,
  Panel,
  TextField,
  Modal,
  Checkbox,
} from "emerald-ui";
import "emerald-ui/lib/styles.css";
export default function App() {
  /**
   * URL FOR REQUEST THE API NY TIMES.
   */
  const urlService =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=5AAMG971G6GEX04HYE8Jhqw0qu5ITQho";
  const urlImages = "https://static01.nyt.com/";

  /**
   * 
   * 
   * HOOKS APP
   * 
   * 
   */

  /**
   * State that saves the api request
   */
  const [dataRequest, setDataRequest] = useState([]);

  /**
   * Saves the percentage of loading the button 'submit'.
   */
  const [percentageForm, setPercentageForm] = useState(0);
  /**
   * Flag for open and close the modal.
   */
  const [openModal, setOpenModal] = useState(false);
  /**
   * 
   * Item counter from 4 to 4, it increases for each user click on the button 'View more stories'.
   */
  const [countItemsPage, setCountItemsPage] = useState(4);
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
  const [errorMessage, setErrorMessage] = useState({...dataForm});
  const currentItems = 0,
    styleLoader = { margin: 0, width: "100%", marginBottom: "20px" };

  /**
   * FUNCTIONS OPEN AND CLOSE OF MODAL
   */
  const open = () => {
    setOpenModal(true);
  };
  const close = () => {
    setOpenModal(false);
  };

  /**
   * Hook for consulting api rest NY Times
   */
  useEffect(() => {
    try {
      fetch(urlService)
        .then((response) => {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            window.location.reload();
            return;
          }
          response.json().then((data) => {
            if (data) {
              if (data.response.hasOwnProperty("docs")) {
                setDataRequest(data.response.docs);
              } else if (data.hasOwnProperty("response")) {
                setDataRequest(data.response);
              } else {
                setDataRequest(data);
              }
            } else {
              setDataRequest([]);
            }
          });
        })
        .catch(function (err) {
          console.log("error ocurrido", err);
        });
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  /**
   * Hook responsible for listening to changes in the form at the foot of the page.
   */
  useEffect(() => {
    console.log(dataForm);
    let percentage =
      (Object.values(dataForm).filter((val) => !!val).length * 100) /
      Object.keys(dataForm).length;
    setPercentageForm(Math.trunc(percentage));
  }, [dataForm]);


  /**
   * Remove class 'active' of items actives on the dropdown.
   */
  const removeClassActive = () => {
    let dropdownItems = document.getElementsByClassName("eui-dropdown-item");
    for (let i = 0, n = dropdownItems.length; i < n; i++) {
      dropdownItems[i].classList.remove("active");
    }
  };

  /**
   * @param {element item dropdown handleclick} element
   * Add class 'active' of element selected at the dropdown.
   */
  const addClassActive = (elm) => {
    elm.stopPropagation();
    console.log(elm);
    removeClassActive();
    elm.currentTarget.classList.add("active");
  };

  /**
   * Delete a selected item in the dom that contains a parent.
   * @param {elm selected on the DOM} elm
   */
  const closeElement = (elm) => {
    elm.target.offsetParent.style.display = "none";
  };

  /**
   *
   * @param {element with changes on the field the form} elm
   */
  const validateDataField = (elm) => {
    try {
      let expRegEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/), 
          regExpNumber = new RegExp(/^[0-9]{10}$/);
      if (elm.target.name !== "email" && elm.target.name !== "phonenumber" && elm.target.name !== "sendEmail") {
        if (!!!elm.target.value.trim()) {
          setErrorMessage({ ...errorMessage, [elm.target.name]: true });
        } else {
          setErrorMessage({ ...errorMessage, [elm.target.name]: false });
        }
      } else if (elm.target.name === "email" && !expRegEmail.test(elm.target.value) && !!elm.target.value.trim()) {
        setErrorMessage({ ...errorMessage, [elm.target.name]: true });
      } else if (elm.target.name === "phonenumber" && !regExpNumber.test(elm.target.value) && !!elm.target.value.trim()) {
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
    e && setDataForm({...dataForm, [e.target.name]: validateDataField(e)});
  };

  /**
   * Converts the first character of labelto Uppercase
   * @param {label of field success} str 
   */
  const convertLabelToUpperCase = (str) => {
    return !!str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  /**
   * RENDER APP
   */
  return (
    <main
      style={{ background: dataRequest.length > 0 ? "transparent" : "#fff" }}
    >
      {dataRequest.length > 0 ? (
        <>
          <Navbar
            breakAt="lg"
            barClassName="container-items"
            fixedAtTop={true}
            tabIndex="1"
          >
            <Navbar.Brand>
              <h2>
                <img src="./assets/images/21601.png" />
              </h2>
            </Navbar.Brand>
            <Nav grow collapsible>
              <DropdownButton
                toggleOnHover={true}
                className="dropdown-button"
                title="Sections"
                id="dd1"
              >
                {dataRequest
                  .slice(currentItems, countItemsPage)
                  .map((item, index) => {
                    return (
                      <DropdownItem
                        href={`#target_${index + 1}`}
                        key={index + 1}
                        onClick={addClassActive}
                        eventKey={index + 1}
                      >
                        {`Noticia#${index + 1}`}
                        <Icon
                          aria-hidden
                          name="assignment"
                          className="pull-right"
                        />
                      </DropdownItem>
                    );
                  })}
              </DropdownButton>
              <a href="https://www.nytimes.com/" target="_blank" tabIndex="3">
                Editorial
              </a>
              <a
                href="https://help.nytimes.com/hc/en-us/articles/115015385887-Contact-us"
                target="_blank"
                tabIndex="4"
              >
                Contact Us
              </a>
            </Nav>
            <Nav collapsible>
              <a href="/" tabIndex="5">
                <Avatar
                  title="JS"
                  style={{ backgroundColor: "#9100AD", color: "#fff" }}
                />
              </a>
            </Nav>
          </Navbar>
        </>
      ) : (
        <SkeletonLoader
          loading={dataRequest.length > 0 ? false : true}
          height="66px"
          style={styleLoader}
        ></SkeletonLoader>
      )}

      <Container className="container-general-news">
        {dataRequest.length > 0 ? (
          <Alert onDismiss={closeElement} dismissible={true} tabIndex="6">
            <p style={{ padding: "10px 0", margin: 0 }}>
              Welcome to the new look of News.com,. Keeps scrolling to discover
              interesting new features and news.
            </p>
          </Alert>
        ) : (
          <>
            <SkeletonLoader
              loading={dataRequest.length > 0 ? false : true}
              height="66px"
              style={styleLoader}
            ></SkeletonLoader>
          </>
        )}
        {dataRequest.length > 0 ? (
          <Container fluid={true} className="top-news" tabIndex="7">
            <h1>Top news</h1>
          </Container>
        ) : (
          <SkeletonLoader loading />
        )}
        <article>
          <Panel tabIndex="8">
            <Panel.Body>
              {dataRequest.length > 0 ? (
                <CardGrid className="card-grid" tabIndex="9">
                  {dataRequest
                    .slice(currentItems, countItemsPage)
                    .map((item, index) => {
                      return (
                        <Card
                          key={`#_${index + 1}`}
                          onClick={() => window.open(item.web_url, "_blank")}
                        >
                          <div
                            className="container-img-card"
                            id={`target_${index + 1}`}
                          >
                            <img
                              src={`${urlImages}${
                                item.multimedia[
                                  Math.floor(
                                    Math.random() * item.multimedia.length
                                  )
                                ].url
                              }`}
                              alt=""
                            />
                          </div>
                          <h1 className="eui-card-title">{item.snippet}</h1>
                          <p>{item.lead_paragraph}</p>
                        </Card>
                      );
                    })}
                </CardGrid>
              ) : (
                <Row lg={12}>
                  <Col>
                    <SkeletonLoader
                      style={{ width: "auto", height: "432px" }}
                      loading={dataRequest.length > 0 ? false : true}
                    />
                  </Col>
                  <Col>
                    <SkeletonLoader
                      style={{ width: "auto", height: "432px" }}
                      loading={dataRequest.length > 0 ? false : true}
                    />
                  </Col>
                </Row>
              )}
            </Panel.Body>
          </Panel>
        </article>
        <Container className="container-news-button">
          <Row center={true}>
            {dataRequest.length > 0 ? (
              <Button
                tabIndex="10"
                color={countItemsPage > dataRequest.length ? "danger" : "info"}
                onClick={() => {
                  if (countItemsPage < dataRequest.length) {
                    setCountItemsPage((countItemsPage) => countItemsPage + 4);
                  }
                }}
              >
                <span>
                  {countItemsPage > dataRequest.length
                    ? "No more stories"
                    : "View more stories"}
                </span>
              </Button>
            ) : (
              <SkeletonLoader
                style={{ width: "163px", height: "39px" }}
                loading={dataRequest.length > 0 ? false : true}
              />
            )}
          </Row>
          <Toast
            message="View stories limit, thanks!"
            actionText="X"
            position="right"
            visible={
              countItemsPage > dataRequest.length && dataRequest.length > 0
                ? true
                : false
            }
            onActionClick={closeElement}
          />
        </Container>
      </Container>
      <Container fluid={true} className="container-subscribe">
        {dataRequest.length > 0 ? (
          <Row>
            <img src="./assets/images/background.jpg" alt="" height="576"></img>
            <Row lg={7} md={7} sm={12} className="container-text-subscribe">
              <Col lg={12} sm={8} xs={10} md={10} className="items-subscribe">
                <Row className="text-subscribe" tabIndex="11">
                  <span>Subscribe to our newsletter.</span>
                </Row>
                <Row tabIndex="12">
                  <span>
                    Subscribe to our newsletter receive weekly digests of the
                    best and most ground-breaking news. Also receive a discount
                    on yout monthly subscription.
                  </span>
                </Row>
                <Row className="container-button-subscribe" tabIndex="13">
                  <button>Subscribe</button>
                </Row>
              </Col>
            </Row>
          </Row>
        ) : (
          <SkeletonLoader
            style={{ width: "100%", height: "576px" }}
            loading={dataRequest.length > 0 ? false : true}
          />
        )}
      </Container>
      <Container className="footer-contact-us">
        <Row center={true} className="contact-us">
          {dataRequest.length > 0 ? (
            <span tabIndex="14">Contact Us</span>
          ) : (
            <SkeletonLoader loading />
          )}
        </Row>
      </Container>
      <Container className="footer-contact-us">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            open();
          }}
          tabIndex="15"
        >
          <Container className="container-form">
            <Row className="row-form">
              <Col xs={12} lg={6} md={6} sm={12}>
                {dataRequest.length > 0 ? (
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
                  <SkeletonLoader loading width="auto" />
                )}
              </Col>
              <Col xs={12} lg={6} md={6} sm={12}>
                {dataRequest.length > 0 ? (
                  <TextField
                    errorMessage={
                      errorMessage.lastname
                        ? "fill in the name field Lastname"
                        : ""
                    }
                    label="Lastname"
                    onChange={(e) => handleChange(e)}
                    name="lastname"
                    value={dataForm.lastname}
                    type="text"
                  />
                ) : (
                  <SkeletonLoader loading width="auto" />
                )}
              </Col>
            </Row>
            <Row className="row-form">
              <Col xs={12} lg={6} md={6} sm={12}>
                {dataRequest.length > 0 ? (
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
                  <SkeletonLoader loading width="auto" />
                )}
              </Col>
              <Col xs={12} lg={6} md={6} sm={12}>
                {dataRequest.length > 0 ? (
                  <TextField
                    min="0"
                    maxLength={10}
                    errorMessage={
                      errorMessage.phonenumber
                        ? "fill in the name field Phonenumber (Min. 10 digits)."
                        : ""
                    }
                    label="Phonenumber"
                    onMaxLengthReached={(e) => {console.log("no mas")}}
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
                  <SkeletonLoader loading width="auto" />
                )}
              </Col>
            </Row>
            <Row className="row-form-full">
              <Col>
                {dataRequest.length > 0 ? (
                  <TextField
                    textarea={true}
                    errorMessage={
                      errorMessage.comments
                        ? "fill in the name field comments"
                        : ""
                    }
                    label="Comments"
                    onChange={(e) => handleChange(e)}
                    name="comments"
                    value={dataForm.comments}
                    type="text"
                  />
                ) : (
                  <SkeletonLoader loading width="auto" height="61px" />
                )}
              </Col>
            </Row>
            <Row className="container-checkbox">
              <Col>
                {dataRequest.length > 0 ? (
                  <Checkbox
                    tabIndex="21"
                    onChange={(e) => handleChange(e)}
                    label="Send me emails about breaking news and promotions."
                    name="sendEmail"
                  />
                ) : (
                  <SkeletonLoader loading width="auto" />
                )}
              </Col>
            </Row>
            <Container fluid={true}>
              <Row center={true}>
                {dataRequest.length > 0 ? (
                  <Button
                    loading={percentageForm > 0 ? true : false}
                    progress={percentageForm}
                    disabled={
                      percentageForm === 100 &&
                      !Object.values(errorMessage).find((msn) => !!msn)
                        ? false
                        : true
                    }
                    type="submit"
                    color="info"
                    className="button-submit"
                    tabIndex="23"
                  >
                    Submit
                  </Button>
                ) : (
                  <SkeletonLoader loading />
                )}
              </Row>
            </Container>
          </Container>
        </form>
      </Container>
      <Container>
        <Modal onHide={close} show={openModal}>
          <Modal.Header
            closeButton={true}
            style={{ backgroundColor: "#0073e9" }}
          >
            <Modal.Title style={{ color: "#fff" }}>Verify form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>All fields completed.</strong>
            </p>
            <ol>
              {Object.entries(dataForm).map((item, index) => {
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
            <Button color="info" onClick={close}>
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
}
