import React, { FC } from "react";
import classes from "./styles.module.scss";
import cx from "classnames";
export const SubHeader: FC = ({ children }) => {
  return <div className={cx(classes.main, "mt-4", "mb-4")}>{children}</div>;
};
