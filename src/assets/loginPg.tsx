import { FC, useState } from "react";
import { validateAsync } from "../api/validateApi";

// export type LoginPgProps = {
//   validateAsync: (password: string) => Promise<boolean>;
// };

// export const LoginPg: FC<LoginPgProps> = (props) => {

export const LoginPg: FC = (props) => {
  const [password, setPassword] = useState("");
  console.log(props);

  return (
    <>
      Login Page
      <input
        type="text"
        // value={password}
        onChange={(input) => {
          setPassword(input.target.value);
          console.log("passowrd: ", password);
        }}
      ></input>
      <button
        onClick={async () => {
          console.log("call validate: ", password);
          await validateAsync(password);
        }}
      >
        Validate
      </button>
    </>
  );
};
