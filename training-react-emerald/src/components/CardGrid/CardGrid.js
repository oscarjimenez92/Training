import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CardGrid } from "emerald-ui/lib";
import CardCondor from "../Card/Card";

export default function GridCardsCondor({
  currentItems,
  countItemsPage,
  onClickCard,
  dataCard,
  tabIndex,
  className
}) {
  const urlImages = "https://static01.nyt.com/";
  const [dataRender, setDataRender] = useState([]);
  const [countItemsCards, setCountCards] = useState(4);
  /**
   * Return the image for the container.
   * @param {array photos} multimedia
   */
  const returnImageToRender = (multimedia) => {
    return multimedia.find((photo) => photo.width >= 390 && photo.width <= 404);
  };

  useEffect(() => {
    setDataRender(dataCard);
    return () => {
      setDataRender([]);
    };
  }, [dataRender]);

  useEffect(() => {
    setCountCards(countItemsPage);
    return () => {
      setCountCards(4);
    };
  }, [countItemsCards]);

  return (
    <CardGrid className={className} tabIndex={tabIndex}>
      {dataRender.slice(currentItems, countItemsPage).map((item, index) => {
        return (
          <CardCondor
            id={`target_${index+1}`}
            key={index}
            onClick={onClickCard}
            NumberIndex={`#${index + 1}`}
            urlImage={`${urlImages}${returnImageToRender(item.multimedia).url}`}
            titleCard={item.snippet}
            textCardDescription={item.lead_paragraph}
          />
        );
      })}
    </CardGrid>
  );
}

GridCardsCondor.propTypes = {
  dataCard: PropTypes.array.isRequired,
};
GridCardsCondor.defaultProps = {
  dataCard: [],
};
