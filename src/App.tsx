// import { useState } from "react";
import "./App.css";
import { LoginPg } from "./assets/LoginPg";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePg } from "./assets/homePg";
import { useState } from "react";
import { ErrorPg } from "./assets/ErrorPg";
import { Protected } from "./assets/Protected";
function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <>
      <div>Cape House Sharing Project</div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPg setLoginSuccess />} />
            <Route
              path="HomePg"
              element={
                <Protected isLoggedIn={loginSuccess}>
                  <HomePg />
                </Protected>
              }
            />

            <Route path="ErrorPg" element={<ErrorPg />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
