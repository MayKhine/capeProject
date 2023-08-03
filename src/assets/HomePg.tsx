import { useState, FC } from "react";
import { Calander } from "./Calander";
export type HomePgProps = {
  loginUser: string;
  setBookDateRange: (arg0: Array<Date>) => void;
  bookDateRange: Array<Date>;
};

export const HomePg: FC = (props) => {
  return (
    <div>
      Welcome to home page {props.loginUser}
      <div style={{ backgroundColor: "pink" }}>
        <Calander
          setBookDateRange={props.setBookDateRange}
          bookDateRange={props.bookDateRange}
        ></Calander>
      </div>
    </div>
  );
};
