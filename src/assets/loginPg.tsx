import { FC, useState } from "react";
import { validateAsync } from "../api/validateApi";
import { useNavigate } from "react-router-dom";
export type LoginPgProps = {
  // validateAsync: (password: string) => Promise<boolean>;
  setLoginSuccess: (arg0: boolean) => void;
  setLoginUser: (arg0: string) => void;
};

export const LoginPg: FC<LoginPgProps> = (props) => {
  // export const LoginPg: FC = () => {
  const [password, setPassword] = useState("");
  //   console.log(props);
  const navigate = useNavigate();
  const [userError, setUserError] = useState("");
  const [pswError, setPswError] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div>
      Welcome to Cape Cod!
      <div style={loginFormStyle}>
        <div style={formItemStyle}>
          <label style={labelStyle}>Name</label>
          <input
            style={inputStyle}
            type="text"
            value={userName}
            onChange={(input) => {
              setUserError("");
              setUserName(input.target.value);
            }}
          ></input>
          <div style={errorStyle}>{userError} </div>
        </div>
        <div style={formItemStyle}>
          <label style={labelStyle}>Password</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(input) => {
              setPswError("");
              setPassword(input.target.value);
            }}
          ></input>

          {pswError && <div style={errorStyle}>{pswError}</div>}
        </div>
        <div style={formItemStyle}>
          <button
            style={ButtonStyle}
            onClick={async () => {
              if (password.length <= 0 || userName.length <= 0) {
                if (password.length <= 0)
                  setPswError("Password cannot be empty.");

                if (userName.length <= 0)
                  setUserError("User Name cannot be empty.");
              } else {
                if (await validateAsync(password)) {
                  props.setLoginSuccess(true);
                  props.setLoginUser(userName);
                  navigate("/Home");
                }
                setPswError("Wrong Password!");
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const loginFormStyle = {
  height: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // alignSelf: "center",
  // backgroundColor: "gray",
  // marginTop: "10%",
};

const formItemStyle = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  height: "28px",
  fontSize: "1em",
  borderRadius: "6px",
  border: "1px solid gray",
};

const labelStyle = {
  marginTop: "5px",
  fontSize: "1em",
  textAlign: "left",
};

const errorStyle = {
  fontSize: ".7em",
  color: "red",
};

const ButtonStyle = {
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid transparent",
  fontSize: "1em",
  borderColor: "pink",
  backgroundColor: "darkgray",
  cursor: "pointer",
  // transition: "borderColor 0.9s",
};
