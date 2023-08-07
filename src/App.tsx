// import { useState } from "react";
import "./App.css";
import { LoginPg } from "./assets/LoginPg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePg } from "./assets/HomePg";
import { CSSProperties, useState } from "react";
import { ErrorPg } from "./assets/ErrorPg";
import { Protected } from "./assets/Protected";

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  return (
    <div style={mainDivStyle}>
      <div style={headerStyle}>House Sharing Project</div>

      <div style={containerStyle}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <LoginPg
                    setLoginSuccess={setLoginSuccess}
                    setLoginUser={setLoginUser}
                  />
                }
              />
              <Route
                path="Home"
                element={
                  <Protected isLoggedIn={loginSuccess}>
                    <HomePg loginUser={loginUser} />
                  </Protected>
                }
              />

              <Route path="ErrorPg" element={<ErrorPg />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

const sand1 = "#F2D6B8";
// const sand2 = "#E7BB8D";
// const water1 = "#BDD7DF";
// const water2 = "#8AB6C6";
const water3 = "#5F98A9";

const mainDivStyle: CSSProperties = {
  padding: "0px",
  margin: "0px",
  width: "100vw",
  height: "100vh",
  backgroundColor: "lightgray",
  display: "flex",
  flexDirection: "column",
};

const headerStyle: CSSProperties = {
  backgroundColor: water3,
  color: "white",
  height: "50px",
  fontSize: "1em",
  textAlign: "left",
  paddingTop: "13px",
  paddingLeft: "5px",
};

const containerStyle = {
  backgroundColor: sand1,
  flex: "1",
  padding: "0px",
  margin: "0px",
};

export default App;
