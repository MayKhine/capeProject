import { useState, FC } from "react";

export type HomePgProps = {
  loginUser: string;
};
export const HomePg: FC = (props) => {
  return <div>Welcome to home page {props.loginUser}</div>;
};
