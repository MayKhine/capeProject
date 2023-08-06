import { useState, FC, useMemo } from "react";
import { Calander } from "./Calander";
import { Button } from "@mantine/core";

export type HomePgProps = {
  loginUser: string;
  // setBookDateRange: (arg0: Array<Date>) => void;
  // bookDateRange: Array<Date>;
};

export const HomePg: FC<HomePgProps> = (props) => {
  // interface bookingInfo {
  //   privacy: number;
  //   name: Array<string>;
  //   date: string;
  // }

  const [bookingInfo, setBookingInfo] = useState<Array<object>>([]);

  //   const days = (endDate - startDate) / (86400 * 1000);
  //   for (let i = 0; i <= days; i++) {
  //     console.log("name: ", name);
  //     const key = startDate.plus({ days: i }).toLocaleString();
  //     if (bookedDatesDic[key]?.name) {
  //       let tempNameArr = bookedDatesDic[key].name;
  //       tempNameArr.push(name);
  //       bookedDatesDic[key] = {
  //         privacy: privacy,
  //         name: tempNameArr,
  //         date: key,
  //       };
  //     } else {
  //       bookedDatesDic[key] = { privacy: privacy, name: [name], date: key };
  //     }

  const bookingDictionary = useMemo(() => {
    console.log("Bookign Info:", bookingInfo);
    let tempDictionary: Record<string, number> = {};
    bookingInfo.forEach((booking) => {
      console.log("booking: ", booking.startDate);
      const days = (booking.endDate - booking.startDate) / (86400 * 1000);
      for (let i = 0; i <= days; i++) {
        const key = booking.startDate.plus({ days: i }).toLocaleString();
        tempDictionary[key] = booking.privacy;
      }
    });
    console.log("temp Dictionary: ", tempDictionary);

    return tempDictionary;
  }, [bookingInfo]);

  console.log("Bookign Dictionary: ", bookingDictionary);

  // const [bookingDictionary, setBookingDictionary] =
  //   useState<Record<string, number>>();

  // const [bookedDatesDic, setBookedDatesDic] = useState<
  //   Record<string, bookingInfo>
  // >({});

  // const bookingArr = Object.values(bookedDatesDic);
  // const keyValueParis = Object.entries(bookedDatesDic);

  return (
    <div>
      Welcome to home page {props.loginUser}
      <div style={{ backgroundColor: "pink" }}>
        <Calander
          setBookingInfo={setBookingInfo}
          bookingInfo={bookingInfo}
          bookingDictionary={bookingDictionary}
          // setBookedDatesDic={setBookedDatesDic}
          // bookedDatesDic={bookedDatesDic}
          loginUser={props.loginUser}
        ></Calander>
      </div>
      <div>Booking Details</div>
    </div>
  );
};
