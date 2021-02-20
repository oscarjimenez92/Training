import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Avatar } from "emerald-ui"
import DropdownCondor from "../Dropdown/Dropdown"

function HeaderCondor({countItemsPage, data, breakAt, barClassName, fixedAtTop, tabIndex }) {
  return (
    <Navbar
      breakAt={breakAt}
      barClassName={barClassName}
      fixedAtTop={fixedAtTop}
      tabIndex={tabIndex}
    >
      <Navbar.Brand>
        <h2>
          <img src="./assets/images/21601.png" />
        </h2>
      </Navbar.Brand>
      <Nav grow collapsible>
        <DropdownCondor
          countItemsPage={countItemsPage}
          data={data}
          toggleOnHover={true}
          className="dropdown-button"
          title="Sections"
          id="dd1"
        />
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
  );
}

HeaderCondor.propTypes = {
  breakAt: PropTypes.string.isRequired,
  barClassName: PropTypes.string.isRequired,
  fixedAtTop: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

HeaderCondor.defaultProps = {
  breakAt: "",
  barClassName: "container-items",
  fixedAtTop: true,
  tabIndex: "",
  data: []
};

export default HeaderCondor;
