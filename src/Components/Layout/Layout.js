import React from "react";
import withThemeContext from "../../hoc/withThemeContext";
import styles from "./Layout.module.css";

const Layout = ({ children, theme }) => {
  return (
    <div
      style={{
        background: theme.config.bodybg,
        color: theme.config.fontColor,
      }}
    >
      <header
        className={styles.header}
        style={{
          background: theme.config.headerBg,
          color: theme.config.fontColor,
        }}
      >
        <label>
          {theme.type === "light" ? "Go dark mode" : " Go light mode"}
          <input
            type="checkbox"
            onChange={(e) => theme.onThemeToggle(e.currentTarget.value)}
          />
        </label>
      </header>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default withThemeContext(Layout);
