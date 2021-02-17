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
  StripeForm,
  Modal
} from "emerald-ui";
import "emerald-ui/lib/styles.css";

export default function App() {
  const urlService =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=5AAMG971G6GEX04HYE8Jhqw0qu5ITQho";
  const urlImages = "https://static01.nyt.com/";
  const palete_colors = {
    error: "#d87f7f",
    success: "#58a258"
  }
  const [dataRequest, setDataRequest] = useState([]);
  const [messageError, setMessage] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [countItemsPage, setcountItemsPage] = useState(4);
  const [dataForm, setDataForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    comments: ""
  })
  let loader = true;
  const currentItems = 0, styleLoader = {margin: 0, width: "100%", marginBottom: "20px"};
  const open = () => {
    setOpenModal(true);
  }
  // You can use here an arrow function instead to avoind using binding in the constructor:
  // close = () => {}
  const close = () => {
    setOpenModal(false);
  }



  useEffect(() => {
    try {
      loader = true
      fetch(urlService)
        .then((response) => {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            loader = false
            return;
          }
          response.json().then((data) => {
            if (data) {
              if (data.response.hasOwnProperty("docs")) {
                setDataRequest(data.response.docs);
                loader = false
              } else if (data.hasOwnProperty("response")) {
                setDataRequest(data.response);
                loader = false
              } else {
                setDataRequest(data);
                loader = false
              }
            } else {
              setDataRequest([]);
              loader = false
            }
            console.log(data);
          });
        })
        .catch(function (err) {
          console.log("error ocurrido", err);
          loader = false
        });
    } catch (error) {
      console.log("Error", error)
      loader = false
    }
    
  }, [])

  useEffect(() => {
    console.log(dataForm)
  }, [dataForm])


  const removeClassActive = () => {
    let dropdownItems = document.getElementsByClassName("eui-dropdown-item")
    for(let i = 0, n = dropdownItems.length; i< n; i++){
      dropdownItems[i].classList.remove('active')
    }
  }

  /**
   * @param {element item dropdown handleclick} element
   */
  const addClassActive = elm => {
    elm.stopPropagation();
    console.log(elm)
    removeClassActive()
    elm.currentTarget.classList.add("active")
  }
  
  const closeElement = (elm) => {
    elm.target.offsetParent.style.display = "none"
    console.log(elm.target.offsetParent)
  }

  const changestyleElemForm = (elm, color) => {
    elm.target.style.borderColor = palete_colors[color]
  }

  const handleChange = e => {
    e.target.style.borderColor = null
    let expRegEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/), regExpNumber = new RegExp(/^[0-9]{10}$/);
    if(e.target.name === "email" && expRegEmail.test(e.target.value)){
      setDataForm({...dataForm, [e.target.name]: e.target.value})
      changestyleElemForm(e, "success")
    }else if(e.target.name === "phonenumber" && regExpNumber.test(+e.target.value)){
      setDataForm({...dataForm, [e.target.name]: e.target.value})
      changestyleElemForm(e, "success")
    }else if(!!e.target.value.trim() && (e.target.name !== "email" && e.target.name !== "phonenumber")){
      setDataForm({...dataForm, [e.target.name]: e.target.value})
      changestyleElemForm(e, "success")
    }else{
      changestyleElemForm(e, "error")
      console.error("Error en el campo", `${e.target.name} - ${e.target.value}`)
      dataForm[e.target.name] = ""
    }
  }

  const validateForm = (e) => {
    let dataError = []
    console.log(e)
    for (const property in dataForm) {
      if(!!!dataForm[property]){
        dataError.push(`${property.charAt(0).toUpperCase() + property.slice(1)}`)
      }
      console.log(`${property}: ${dataForm[property]}`);
    }
    e.preventDefault();
    setMessage(dataError)
    open()
  }


  return (
    <main>
        {
          dataRequest.length > 0
          ?
            <>
            <Navbar 
              breakAt="lg" 
              barClassName="container-items" 
              fixedAtTop={true}
            >
              <Navbar.Brand>
                <h2 style={{ margin: 0}}>
                  <img src="./assets/images/21601.png"/>
                </h2>
              </Navbar.Brand>
              <Nav grow collapsible>
                <DropdownButton 
                  toggleOnHover={true} 
                  className="dropdown-button" 
                  title="Sections" 
                  id="dd1"
                >
                  {
                    dataRequest.slice(currentItems, countItemsPage).map((item, index) => {
                      return <DropdownItem href={`#target_${index+1}`} key={index+1} onClick={addClassActive} eventKey={index+1}>
                      {`Noticia#${index+1}`}
                    </DropdownItem>
                    })
                  }
                </DropdownButton>
                <a href="https://www.nytimes.com/" target="_blank">Editorial</a>
                <a href="https://help.nytimes.com/hc/en-us/articles/115015385887-Contact-us" target="_blank">Contact Us</a>
              </Nav>
              <Nav collapsible>
                <a href="/">
                  <Avatar title="JS" style={{backgroundColor: "#9100AD", color: "#fff"}}/>
                </a>
              </Nav>
            </Navbar>
            </>
          :
            <SkeletonLoader 
              loading={dataRequest.length>0 ? false : true} 
              height="66px" 
              style={styleLoader}
            >
            </SkeletonLoader>
        }
        
      
      <section className="container-general-news">
        {
          dataRequest.length > 0
          ?
            <Alert onDismiss={closeElement} dismissible={true}>
              <p style={{ padding: '10px 0', margin: 0 }}>
              Welcome to the new look of News.com,. Keeps scrolling to discover interesting new features and news.
              </p>
            </Alert>
          :
          <>
            <SkeletonLoader 
              loading={dataRequest.length>0 ? false : true} 
              height="66px" 
              style={styleLoader}
            >
            </SkeletonLoader>
          </>
        }
        {
          dataRequest.length > 0 
          ?
          <Container fluid={true} className="top-news">
            <h1>Top news</h1>
          </Container>
          :
          <SkeletonLoader loading />
        }
        <article>
          {
            dataRequest.length > 0 
            ?
              <Panel>
                <Panel.Body>
                <CardGrid className="card-grid">
                {
                  dataRequest.slice(currentItems, countItemsPage).map((item, index) => {
                    return <Card key={`#_${index+1}`} onClick={() => window.open(item.web_url, "_blank")}>
                      <div className="container-img-card" id={`target_${index+1}`}>
                        <img src={`${urlImages}${item.multimedia[Math.floor(Math.random() * item.multimedia.length)].url}`} alt=""/>
                      </div>
                      <h1 className="eui-card-title">
                        {item.snippet}
                      </h1>
                      <p>
                        {item.lead_paragraph}
                      </p>
                    </Card>
                  })
                }
              </CardGrid>
                </Panel.Body>
              </Panel>
            :
              <SkeletonLoader 
                  style={{width: "100%", height: "304px"}} 
                  loading={dataRequest.length>0 ? false : true} 
              />
          }
        </article>
          <Container className="container-news-button">
            <Row center={true}>
                {
                  dataRequest.length > 0
                  ?
                    <Button color={countItemsPage > dataRequest.length ? 'danger' : 'info'} onClick={() => {
                        if(countItemsPage < dataRequest.length){
                          setcountItemsPage(countItemsPage => countItemsPage + 4)
                        }
                      }}
                    >
                      <span>
                        {
                          countItemsPage > dataRequest.length ? 'No more stories' : 'View more stories'
                        }
                      </span>
                    </Button>
                  :
                    <SkeletonLoader 
                      style={{width: "163px", height: "39px"}} 
                      loading={dataRequest.length>0 ? false : true} 
                    />
                } 
            </Row>
            <Toast
              message="View stories limit, thanks!"
              actionText="X"
              position="right"
              visible={countItemsPage > dataRequest.length && dataRequest.length > 0 ? true : false}
              onActionClick={closeElement}
            />
          </Container>
      </section>
      <Container fluid={true} className="container-subscribe">
        <Row>
          <img src="./assets/images/background.jpg" alt="" height="576"></img>
          <Row lg={7} md={7} sm={12} className="container-text-subscribe">
            <Col lg={12} sm={8} xs={10} md={10} className="items-subscribe">
              <Row className="text-subscribe">
                <span>Subscribe to our newsletter.</span>
              </Row>
              <Row>
                <span>
                  Subscribe to our newsletter receive weekly digests of the best and most ground-breaking news. Also receive a discount on yout monthly subscription.
                </span>
              </Row>
              <Row className="container-button-subscribe">
                <button>Subscribe</button>
              </Row>
            </Col>
          </Row>
        </Row>
      </Container>
      <Container className="footer-contact-us">
        <Row center={true} className="contact-us">
            <span>Contact Us</span>
        </Row>
      </Container>
      <Container className="footer-contact-us">
        <form onSubmit={validateForm}>
        <Container fluid={true} className="container-form">
          <Row className="row-form">
            <div lg={6} xs={12} sm={12} md={12}>
              <label>Firstname</label>
              <input type="text" name="firstname" id="firstname" required="" onChange={(e) => handleChange(e)}/>
            </div>
            <div lg={6} xs={12} sm={12} md={12}>
                <label>Lastname</label>
                <input type="text" name="lastname" id="lastname" required="" onChange={(e) => handleChange(e)}/>
            </div>
          </Row>
          <Row className="row-form">
            <div>
              <label>Email</label>
              <input type="email" name="email" id="email" required="" onChange={(e) => handleChange(e)}/>
            </div>
            <div>
              <label>Phone number</label>
              <input onKeyPress={(e) => {
                if(e.target.value.length > 10){
                  e.target.value = e.target.value.substring(0, 9)
                } 
              }} placeholder="Min 10 digits" type="number" min="1" size="10" maxLength="10" name="phonenumber" id="phonenumber" required="" onChange={(e) => handleChange(e)}/>
            </div>
          </Row>
          <Row className="row-form-full">
            <div>
              <label>Comments</label>
              <textarea name="comments" required="" onChange={(e) => handleChange(e)}></textarea>
            </div>
          </Row>
          <div className="container-checkbox">
            <input type="checkbox" id="checkboxForm"/>
            <span>Send me emails about breaking news and promotions.</span>
          </div>
            <Container fluid={true}>
              <Row center={true}>
                <Button type="submit" color="info" className="button-submit">
                  Submit
                </Button>
              </Row>
            </Container>          
          </Container>
        </form>          
      </Container>
      <Modal
        onHide={close}
        show={openModal}
      >
        <Modal.Header closeButton={true} style={{backgroundColor: "#0073e9"}}>
          <Modal.Title style={{color: "#fff"}}>Verify form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Error in the following fields. </strong>
          </p>
          <ol>
            {
              messageError.map((item, index) => {
                return <li className="listModal" key={index}>{item}</li>
            })
            }
          </ol> 
        </Modal.Body>
        <Modal.Footer>
          <Button color="info" onClick={close}>Accept</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}