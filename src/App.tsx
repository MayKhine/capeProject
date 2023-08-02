// import { useState } from "react";
import "./App.css";
import { LoginPg } from "./assets/LoginPg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePg } from "./assets/HomePg";
import { useState, useEffect } from "react";
import { ErrorPg } from "./assets/ErrorPg";
import { Protected } from "./assets/Protected";
function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [bookDateRange, setBookDateRange] = useState([]);

  useEffect(() => {
    console.log("Use effect");
    localStorage.setItem("bookdates", JSON.stringify(bookDateRange));
  }, [bookDateRange]);

  return (
    <div style={mainDivStyle}>
      <div style={headerStyle}>Cape House Sharing Project</div>

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
                    <HomePg
                      loginUser={loginUser}
                      setBookDateRange={setBookDateRange}
                    />
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
const mainDivStyle = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "lightgray",
  display: "flex",
  flexDirection: "column",
};

const headerStyle = {
  // width: "100%",
  backgroundColor: "pink",
  height: "50px",
  fontSize: "1.5em",
};

const containerStyle = {
  backgroundColor: "lightblue",
  flex: "1",
};

export default App;
