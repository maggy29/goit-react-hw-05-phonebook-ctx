import React from "react";
import ThemeContext from "../context/ThemeContext";

const withThemeContext = (WrappedComponent) => {
  return function WithThemeContext(props) {
    return (
      <ThemeContext.Consumer>
        {(ctx) => <WrappedComponent {...props} theme={ctx} />}
      </ThemeContext.Consumer>
    );
  };
};

export default withThemeContext;
