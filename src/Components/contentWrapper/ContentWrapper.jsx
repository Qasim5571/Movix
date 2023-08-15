import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

import "./styles.scss";

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

// Add prop validation using propTypes
ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is provided and of type node
};

export default ContentWrapper;
