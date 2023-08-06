import { useState, FC, useMemo } from "react";
import { Calander } from "./Calander";
import { Blockquote, Button } from "@mantine/core";
import { BookingDetail } from "./BookingDetail";
export type HomePgProps = {
  loginUser: string;
};

export const HomePg: FC<HomePgProps> = (props) => {
  const [bookingInfo, setBookingInfo] = useState<Array<object>>([]);

  const bookingDictionary = useMemo(() => {
    let tempDictionary: Record<string, number> = {};
    bookingInfo.forEach((booking) => {
      const days = (booking.endDate - booking.startDate) / (86400 * 1000);
      for (let i = 0; i <= days; i++) {
        const key = booking.startDate.plus({ days: i }).toLocaleString();
        tempDictionary[key] = booking.privacy;
      }
    });
    return tempDictionary;
  }, [bookingInfo]);

  // console.log("Bookign Dictionary: ", bookingDictionary);
  // const sortedData = bookingInfo.sort((a, b) => {
  //   console.log(a, b);

  //   let bookingA = a.startDate;
  //   let bookingB = b.startDate;

  //   if (bookingA < bookingB) return -1;
  //   if (bookingA > bookingB) return 1;
  //   return 0;
  // });

  return (
    <div>
      Welcome to home page {props.loginUser}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ backgroundColor: "pink" }}>
          <Calander
            setBookingInfo={setBookingInfo}
            bookingInfo={bookingInfo}
            bookingDictionary={bookingDictionary}
            loginUser={props.loginUser}
          ></Calander>
        </div>
        <BookingDetail
          bookingInfo={bookingInfo}
          bookingDictionary={bookingDictionary}
        ></BookingDetail>
      </div>
    </div>
  );
};
