import React from "react";
import PropTypes from "prop-types";
import { Alert } from "emerald-ui/lib"

export default function AlertCondor({ textInfo, onDismiss, dismissible, tabIndex, style }) {
  return (
    <Alert
      onDismiss={(e) => onDismiss(e)}
      dismissible={dismissible}
      tabIndex={tabIndex}
    >
      <p style={{ style }}>{textInfo}</p>
    </Alert>
  );
}

AlertCondor.propTypes = {
  textInfo: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  dismissible: PropTypes.bool.isRequired,
  tabIndex: PropTypes.string
};

AlertCondor.defaultProps = {
  textInfo: "",
  onDismiss: "",
  dismissible: true,
  tabIndex: "",
  style: {}
};
