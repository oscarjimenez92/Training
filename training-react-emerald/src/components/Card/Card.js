import React from "react";
import PropTypes from "prop-types";
import { Card } from "emerald-ui/lib";
import LabelCondor from "../Label/Label";
export default function CardCondor({
  onClick,
  labelTitle,
  labelDescription,
  id,
  classNameCard,
  showImage,
  showNumberIndex,
  NumberIndex,
  urlImage,
  titleCard,
  textCardDescription,
}) {
  return (
    <Card onClick={(e) => onClick(e)} id={id} className={classNameCard}>
      {showImage ? (
        <div className="container-img-card">
          <div className="number-news-card">
            {showNumberIndex ? <span>{NumberIndex}</span> : null}
          </div>
          <img src={urlImage} alt="" />
        </div>
      ) : null}
      <LabelCondor
        tag={labelTitle}
        text={titleCard}
        className="eui-card-title"
      />
      <LabelCondor tag={labelDescription} text={textCardDescription} />
    </Card>
  );
}

CardCondor.propTypes = {
  showImage: PropTypes.bool.isRequired,
  showNumberIndex: PropTypes.bool.isRequired,
  NumberIndex: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  titleCard: PropTypes.string.isRequired,
  textCardDescription: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  labelDescription: PropTypes.string.isRequired,
};

CardCondor.defaultProps = {
  showImage: true,
  showNumberIndex: true,
  NumberIndex: "",
  urlImage: "",
  titleCard: "",
  textCardDescription: "",
  labelTitle: "h1",
  labelDescription: "p",
};
