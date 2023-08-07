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
      <div style={{ fontSize: "1.4em", padding: "20px" }}>
        Welcome to Cape House, {props.loginUser}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
          margin: "0px",
          padding: "0px",
        }}
      >
        <div
          style={{
            backgroundColor: water1,
            maxWidth: "480px",
            borderRadius: "10px",
            paddingBottom: "20px",
          }}
        >
          <Calander
            setBookingInfo={setBookingInfo}
            bookingInfo={bookingInfo}
            bookingDictionary={bookingDictionary}
            loginUser={props.loginUser}
          ></Calander>
        </div>
        <div style={{ backgroundColor: water1, borderRadius: "10px" }}>
          <BookingDetail bookingInfo={bookingInfo}></BookingDetail>
        </div>
      </div>
    </div>
  );
};

const sand1 = "#F2D6B8";
const sand2 = "#E7BB8D";
const water1 = "#BDD7DF";
const water2 = "#8AB6C6";
const water3 = "#5F98A9";
