// lib
import { Children } from "react";
import Header from "../components/Header/Header";

// style
import style from "./Layout.module.css";

type layoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: layoutProps) => {
  return (
    <div className={style["layout"]}>
      <Header />
      <div className={style["content"]}>{children}</div>
    </div>
  );
};
