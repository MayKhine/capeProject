// import { Children } from "react";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export type ProtectedProps = PropsWithChildren<{
  isLoggedIn: boolean;
  // children: JSX.Element;
}>;
export const Protected: FC<ProtectedProps> = (props) => {
  if (!props.isLoggedIn) {
    return <Navigate to="/ErrorPg" replace />;
  }
  return props.children;
};
