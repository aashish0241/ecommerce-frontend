import React from "react";
import styles from "./footer.module.scss";

const footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className={styles.footer}>
      This website is develop by Aashish Timsina &copy; {year} All Rights
      reservve
    </div>
  );
};

export default footer;
