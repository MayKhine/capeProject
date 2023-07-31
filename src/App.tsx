// import { useState } from "react";
import "./App.css";
import { LoginPg } from "./assets/loginPg";

const validateAsync = async (password: string) => {
  const response = await fetch("http://localhost:3000/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const json = await response.json();

  return json as boolean; // probably do better type checking here
};

function App() {
  return (
    <>
      <div>Cape House Sharing Project</div>
      <LoginPg></LoginPg>
      <button
        onClick={() => {
          validateAsync("P@ssw0rd!");
        }}
      >
        Validate
      </button>
    </>
  );
}

export default App;
