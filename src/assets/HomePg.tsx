import { useState, FC, useMemo } from "react";
import { Calander } from "./Calander";
import { Button } from "@mantine/core";

export type HomePgProps = {
  loginUser: string;
  setBookDateRange: (arg0: Array<Date>) => void;
  bookDateRange: Array<Date>;
};

export const HomePg: FC<HomePgProps> = (props) => {
  interface bookingInfo {
    privacy: number;
    name: Array<string>;
    date: string;
  }

  // const [bookingInfo, setBookingInfo] = useState<Array<object>>([{}]);

  // const bookingDictionary = useMemo(() => {
  //   return // claculate booking dictionary
  // }, [bookingInfo])

  // const [bookingDictionary, setBookingDictionary] =
  //   useState<Record<string, number>>();

  const [bookedDatesDic, setBookedDatesDic] = useState<
    Record<string, bookingInfo>
  >({});

  const bookingArr = Object.values(bookedDatesDic);
  const keyValueParis = Object.entries(bookedDatesDic);

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
      <div>
        Booking Details
        {bookingArr.map((e) => {
          // console.log(e);
          return (
            <div>
              {e.date} {e.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
