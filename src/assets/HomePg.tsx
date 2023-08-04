import { useState, FC } from "react";
import { Calander } from "./Calander";
import { Button } from "@mantine/core";

export type HomePgProps = {
  loginUser: string;
  setBookDateRange: (arg0: Array<Date>) => void;
  bookDateRange: Array<Date>;
};

export const HomePg: FC<HomePgProps> = (props) => {
  // const [bookedDatesDic, setBookedDatesDic] = useState<Record<string, number>>(
  //   {}
  // );

  interface bookingInfo {
    privacy: number;
    name: Array<string>;
  }
  const [bookedDatesDic, setBookedDatesDic] = useState<
    Record<string, bookingInfo>
  >({});

  return (
    <div>
      Welcome to home page {props.loginUser}
      <div style={{ backgroundColor: "pink" }}>
        <Calander
          setBookedDatesDic={setBookedDatesDic}
          bookedDatesDic={bookedDatesDic}
          loginUser={props.loginUser}
        ></Calander>
      </div>
      {/* <Button
        onClick={() => {
          console.log("bookedDatesDIc: ", bookedDatesDic);
        }}
      >
        Print the booked Date range
      </Button> */}
    </div>
  );
};
