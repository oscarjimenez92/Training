import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DropdownButton, DropdownItem, Icon } from "emerald-ui";
function DropdownCondor({
  countItemsPage,
  data,
  toggleOnHover,
  className,
  title,
  id,
}) {
  const [dataRender, setData] = useState([]);
  const [countItems, setCountItemsPage] = useState(4);
  const currentItems = 0;

  /**
   *
   */
  useEffect(() => {
    setData(data);
    console.log("Cargando datos");
    return () => {
      setData([]);
    };
  });

  useEffect(() => {
    setCountItemsPage(countItemsPage);
    return () => {
      setCountItemsPage(0);
    };
  }, [countItemsPage]);

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
    removeClassActive();
    window.location.href = elm.target.hash;
    elm.currentTarget.classList.add("active");
  };

  return (
    <DropdownButton
      toggleOnHover={toggleOnHover}
      className={className}
      title={title}
      id={id}
    >
      {dataRender.slice(currentItems, countItems).map((item, index) => {
        return (
          <DropdownItem
            href={`#target_${index + 1}`}
            key={index + 1}
            target="_self"
            onClick={(e) => {
              console.log(e);
              addClassActive(e);
            }}
            eventKey={index + 1}
          >
            {`Noticia#${index + 1}`}
            <Icon aria-hidden name="assignment" className="pull-right" />
          </DropdownItem>
        );
      })}
    </DropdownButton>
  );
}

DropdownCondor.propTypes = {
  toggleOnHover: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

DropdownCondor.defaultProps = {
  toggleOnHover: true,
  className: "",
  title: "",
  id: "",
};

export default DropdownCondor;
