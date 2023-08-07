import { CSSProperties, FC, useState } from "react";
import { validateAsync } from "../api/validateApi";
import { useNavigate } from "react-router-dom";

export type LoginPgProps = {
  setLoginSuccess: (arg0: boolean) => void;
  setLoginUser: (arg0: string) => void;
};

export const LoginPg: FC<LoginPgProps> = (props) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userError, setUserError] = useState("");
  const [pswError, setPswError] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div>
      <div style={loginFormStyle}>
        <div style={{ fontSize: "1.5em" }}> Welcome to Cape Cod!</div>
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

// const sand1 = "#F2D6B8";
// const sand2 = "#E7BB8D";
const water1 = "#BDD7DF";
const water2 = "#8AB6C6";
const water3 = "#5F98A9";

const loginFormStyle: CSSProperties = {
  height: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const formItemStyle: CSSProperties = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
};

const inputStyle: CSSProperties = {
  height: "30px",
  fontSize: "1em",
  borderRadius: "6px",
  border: "1px solid gray",
  backgroundColor: water1,
  borderColor: water3,
};

const labelStyle: CSSProperties = {
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
  borderColor: water3,
  backgroundColor: water2,
  cursor: "pointer",
  // transition: "borderColor 0.9s",
};
