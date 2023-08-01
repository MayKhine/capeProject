// import { Children } from "react";
import { FC } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export type ProtectedProps = {
  // validateAsync: (password: string) => Promise<boolean>;
  isLoggedIn: boolean;
  children: any;
};
export const Protected: FC<ProtectedProps> = (props) => {
  //   const navigate = useNavigate();

  if (!props.isLoggedIn) {
    // return navigate("/ErrorPg");
    return <Navigate to="/ErrorPg" replace />;
  }
  return props.children;
};
