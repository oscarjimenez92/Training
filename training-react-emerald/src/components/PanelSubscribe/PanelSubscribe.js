import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import SkeletonCondor from "../SkeletonLoader/Skeleton";
import {Row, Col, Container} from "emerald-ui/lib"
function PanelSubscribe({
  titleSubscribe,
  textSubscribe,
  showButton,
  textButton,
  visible,
}) {
  const [visibleContainer, setVisible] = useState(true);
  useEffect(() => {
    setVisible(visible);
    return () => {
      setVisible(true);
    };
  }, [visibleContainer]);

  return (
    <Container fluid={true} className="container-subscribe">
      {visible ? (
        <Row>
          <Row lg={7} md={7} sm={12} className="container-text-subscribe">
            <Col lg={12} sm={8} xs={10} md={10} className="items-subscribe">
              <Row className="text-title-subscribe" tabIndex="11">
                <span>{titleSubscribe}</span>
              </Row>
              <Row tabIndex="12" className="text-subscribe">
                <span>{textSubscribe}</span>
              </Row>
              <Row className="container-button-subscribe" tabIndex="13">
                <button style={{display: showButton ? 'block' : 'none'}} className="buttonSubscribe">{textButton}</button>
              </Row>
            </Col>
          </Row>
        </Row>
      ) : (
        <SkeletonCondor
          style={{ width: "100%", height: "576px" }}
          loading={!visible}
        />
      )}
    </Container>
  );
}

PanelSubscribe.propTypes = {
  titleSubscribe: PropTypes.string.isRequired,
  textSubscribe: PropTypes.string.isRequired,
  showButton: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

PanelSubscribe.defaultProps = {
  titleSubscribe: "title",
  textSubscribe: "text",
  showButton: true,
  textButton: "button",
  visible: true,
};

export default PanelSubscribe;
