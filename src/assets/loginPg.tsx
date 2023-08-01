import { FC, useState } from "react";
import { validateAsync } from "../api/validateApi";
import { useNavigate } from "react-router-dom";

export type LoginPgProps = {
  // validateAsync: (password: string) => Promise<boolean>;
  setLoginSuccess: (arg0: boolean) => boolean;
};

export const LoginPg: FC<LoginPgProps> = (props) => {
  // export const LoginPg: FC = () => {
  const [password, setPassword] = useState("");
  //   console.log(props);
  const navigate = useNavigate();

  return (
    <>
      Login Page
      <input
        type="text"
        value={password}
        onChange={(input) => {
          setPassword(input.target.value);
        }}
      ></input>
      <button
        onClick={async () => {
          if (await validateAsync(password)) {
            props.setLoginSuccess(true);
            navigate("/HomePg");
          }
        }}
      >
        Validate
      </button>
    </>
  );
};
