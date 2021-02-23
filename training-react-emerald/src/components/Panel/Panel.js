import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Panel } from "emerald-ui/lib";
import SkeletonCondor from "../SkeletonLoader/Skeleton";
import GridCardsCondor from "../CardGrid/CardGrid";

function PanelCondor({
  currentItems,
  countItemsPage,
  onClickCard,
  dataCards,
  tabIndex,
}) {
  return (
    <Panel tabIndex={tabIndex}>
      <Panel.Body>
        {dataCards.length > 0 ? (
          <GridCardsCondor
            currentItems={currentItems}
            countItemsPage={countItemsPage}
            onClickCard={onClickCard}
            dataCard={dataCards}
            className="card-grid"
          />
        ) : (
          <Row lg={12}>
            <Col xs={12} lg={6} md={6} sm={6}>
              <SkeletonCondor
                style={{ width: "auto", height: "432px" }}
                loading={dataCards.length > 0 ? false : true}
              />
            </Col>
            <Col xs={12} lg={6} md={6} sm={6}>
              <SkeletonCondor
                style={{ width: "auto", height: "432px" }}
                loading={dataCards.length > 0 ? false : true}
              />
            </Col>
          </Row>
        )}
      </Panel.Body>
    </Panel>
  );
}

PanelCondor.propTypes = {
  dataCards: PropTypes.array.isRequired,
  currentItems: PropTypes.string,
  countItemsPage: PropTypes.number,
  onClickCard: PropTypes.func,
  tabIndex: PropTypes.string
};
PanelCondor.defaultProps = {
  dataCards: [],
  currentItems: "",
  countItemsPage: 0,
  onClickCard: () => {},
  tabIndex: ""
};

export default PanelCondor;
