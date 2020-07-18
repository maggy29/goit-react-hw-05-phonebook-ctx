import React, { createContext, Component } from "react";

export const themeConfig = {
  light: {
    headerBg: "#00bb99",
    fontColor: "black",
    bodybg: "white",
  },
  dark: {
    headerBg: "#424242",
    fontColor: "white",
    bodybg: "#2c2c2c",
  },
};

const Context = createContext();
class ThemeContext extends Component {
  static Consumer = Context.Consumer;

  state = {
    theme: "light",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      localStorage.setItem("theme", JSON.stringify(this.state.theme));
    }
  }

  componentDidMount() {
    const themeInLocalStorage = localStorage.getItem("theme");
    if (themeInLocalStorage) {
      this.setState({ theme: JSON.parse(themeInLocalStorage) });
    }
  }

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === "dark" ? "light" : "dark",
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          type: this.state.theme,
          config: themeConfig[this.state.theme],
          onThemeToggle: this.toggleTheme,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ThemeContext;
