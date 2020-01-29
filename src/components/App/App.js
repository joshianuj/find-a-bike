import React from "react";
import styles from "./App.module.scss";
import Body from "../Body";
import Header from "../Header";

export default () => (
  <div className={styles.app}>
    <Header />
    <Body />
  </div>
);
