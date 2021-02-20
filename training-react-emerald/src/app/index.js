/**
 * @version 1.3
 * @author Oscar Jiménez
 */
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  // Nav,
  // Navbar,
  // DropdownButton,
  // DropdownItem,
  // Icon,
  // Avatar,
  // Alert,
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
import HeaderCondor from "../components/Navbar/Navbar"
import AlertCondor from "../components/Alert/Alert"
import SkeletonCondor from "../components/SkeletonLoader/Skeleton"
import LabelCondor from "../components/Label/Label"
import PanelCondor from "../components/Panel/Panel"
import ButtonCondor from "../components/Button/Button"
import PanelSubscribe from "../components/PanelSubscribe/PanelSubscribe"
import FormCondor from "../components/Form/Form"
import ModalCondor from "../components/Modal/Modal"
import "emerald-ui/lib/styles.css";
export default function App() {
  /**
   * URL FOR REQUEST THE API NY TIMES.
   */
  const urlService =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=5AAMG971G6GEX04HYE8Jhqw0qu5ITQho";
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
  const [dataForm, setDataForm] = useState([]);

  /**
   * Flag for open and close the modal.
   */
  const [openModal, setOpenModal] = useState(false);
  /**
   * 
   * Item counter from 4 to 4, it increases for each user click on the button 'View more stories'.
   */
  const [countItemsPage, setCountItemsPage] = useState(4);


  const currentItems = 0,styleLoader = { margin: 0, width: "100%", marginBottom: "20px" };

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
      console.error("Error", error);
    }
  }, []);

  /**
   * Delete a selected item in the dom that contains a parent.
   * @param {elm selected on the DOM} elm
   */
  const closeElement = (elm) => {
    elm.target.offsetParent.style.display = "none";
  };
  
  /**
   * Open new on othe tab.
   */
  const openNew = (elm) => {
    window.open(elm.web_url, "_blank")
  }

  const viewMoreStories = (e) => {
    console.log(e)
    if (countItemsPage < dataRequest.length) {
      setCountItemsPage((countItemsPage) => countItemsPage + 4);
    }
  }

  const onSubmitForm = data => {
    data[0].preventDefault()
    setDataForm(data[1])
    open()
  }

  /**
   * RENDER APP
   */
  return (
    <main
      style={{ background: dataRequest.length > 0 ? "transparent" : "#fff" }}
    >
      {dataRequest.length > 0 ? (
        <>
          <HeaderCondor 
            data={dataRequest}
            breakAt="lg"
            barClassName="container-items"
            fixedAtTop={true}
            tabIndex="1"
            countItemsPage={countItemsPage}
          
          />
        </>
      ) : (
        <SkeletonCondor 
          loading={dataRequest.length > 0 ? false : true}
          height="66px"
          style={styleLoader}
        />
      )}

      <Container className="container-general-news">
        {dataRequest.length > 0 ? (
          <AlertCondor 
            textInfo="Welcome to the new look of News.com,. Keeps scrolling to discover
            interesting new features and news."
            style={{ padding: "10px 0", margin: 0 }} 
            onDismiss={closeElement} 
            dismissible={true} 
            tabIndex="6"
          />
        ) : (
          <>
            <SkeletonCondor 
              loading={dataRequest.length > 0 ? false : true}
              height="66px"
              style={styleLoader}
            />
          </>
        )}
        {dataRequest.length > 0 ? (
          <Container fluid={true} className="top-news" tabIndex="7">
            <LabelCondor text="Top news"/>
          </Container>
        ) : (
          <SkeletonLoader loading />
        )}
        <article>
          {
            dataRequest.length > 0
            ?
              <PanelCondor onClickCard={() => openNew} dataCards={dataRequest} currentItems={currentItems}
              countItemsPage={countItemsPage} tabIndex="8"/>
            :
              <SkeletonLoader loading />
          }
        </article>
        <Container className="container-news-button">
          <Row center={true}>
            {dataRequest.length > 0 ? (
              <ButtonCondor tabIndex="10"
              disabled={countItemsPage > dataRequest.length ? true : false}
              color={countItemsPage > dataRequest.length ? "danger" : "info"}
              onClick={viewMoreStories} text={countItemsPage > dataRequest.length
                ? "No more stories"
                : "View more stories"}/>
 
            ) : (
              <SkeletonCondor
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
      <PanelSubscribe 
        titleSubscribe="Subscribe to our newsletter."
        textSubscribe="Subscribe to our newsletter receive weekly digests of the
        best and most ground-breaking news. Also receive a discount
        on yout monthly subscription."
        textButton="Subscribe"
        visible={dataRequest.length > 0 ? true : false}
      />
      <Container className="footer-contact-us">
        <Row center={true} className="contact-us">
          {dataRequest.length > 0 ? (
            <LabelCondor tag="span" text="Contact Us"/>
          ) : (
            <SkeletonLoader loading />
          )}
        </Row>
      </Container>
        <FormCondor loading={dataRequest.length > 0 ? true : false} onSubmit={onSubmitForm} tabIndex="15"/>
      <ModalCondor onHide={close} showModal={openModal} dataShowModal={dataForm}/>
    </main>
  );
}
