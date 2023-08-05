import { FC } from "react";
import { Group, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { DateTime } from "luxon";

export type CalanderProps = {
  setBookingInfo: (arg0: Array<object>) => void;
  bookingInfo: Array<object>;
  bookingDictionary: Record<string, number>;

  // setBookedDatesDic: (arg0: Record<string, number>) => void;
  // bookedDatesDic: Record<string, number>;

  loginUser: string;
};

export const Calander: FC<CalanderProps> = ({
  bookingInfo,
  setBookingInfo,
  bookingDictionary,
  loginUser,
}) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [privacy, setPrivacy] = useState<number | null>();
  const [error, setError] = useState<string>();
  const [bookingName, setBookingName] = useState<string>("");

  // const insertBookingDays = (
  //   startDate: DateTime,
  //   endDate: DateTime,
  //   privacy: number,
  //   name: string
  // ) => {
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
  //   }
  //   setBookedDatesDic({ ...bookedDatesDic });
  //   setBookingName("");

  //   console.log("bookedDatesDic[key]: ", bookedDatesDic);
  // };

  const updateBookingInfo = (
    startDate: DateTime,
    endDate: DateTime,
    privacy: number,
    name: string
  ) => {
    const days = calculateDays(startDate, endDate);
    for (let i = 0; i <= days; i++) {
      const newBooking = {
        startDate: startDate,
        endDate: endDate,
        privacy: privacy,
        name: name,
      };
      setBookingInfo([
        ...bookingInfo,
        {
          startDate: startDate,
          endDate: endDate,
          privacy: privacy,
          name: name,
        },
      ]);
      console.log("Bookign info ", bookingInfo);
    }
  };

  // const checkBookingDays = (
  //   startDate: DateTime,
  //   endDate: DateTime,
  //   privacy: number
  // ) => {
  //   const days = (endDate - startDate) / (86400 * 1000);
  //   for (let i = 0; i <= days; i++) {
  //     const key = startDate.plus({ days: i }).toLocaleString();

  //     if (bookedDatesDic[key]?.privacy == 2) {
  //       setError("Already booked with full privacy!");
  //       return false;
  //     }
  //     if (bookedDatesDic[key]?.privacy == 1 && privacy == 2) {
  //       setError("Cannot double book for full privacy!");

  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const calculateDays = (startDate: DateTime, endDate: DateTime) => {
    return (endDate - startDate) / (86400 * 1000);
  };

  const checkBookingDays = (
    startDate: DateTime,
    endDate: DateTime,
    privacy: number
  ) => {
    const days = calculateDays(startDate, endDate);

    for (let i = 0; i <= days; i++) {
      const key = startDate.plus({ days: i }).toLocaleString();

      if (bookingDictionary) {
        const keyPrivacy = bookingDictionary[key];

        if (keyPrivacy == 2) {
          setError("Already booked with full privacy!");
          return false;
        }
        if (keyPrivacy == 1 && privacy == 2) {
          setError("Cannot double book for full privacy!");
          return false;
        }
      }
    }
    return true;
  };

  return (
    <>
      Booking Calander Div
      <Group
        position="center"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div>
          <DatePicker
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "15px",
            }}
            weekendDays={[]}
            type="range"
            allowDeselect
            value={dateRange}
            onChange={setDateRange}
            onClick={(e) => {
              setError("");
            }}
            size="md"
            getMonthControlProps={(monthJs) => {
              console.log("months JS ", monthJs);
              return {
                sx: {
                  fontSize: "25px",
                },
              };
            }}
            getDayProps={(dateJs) => {
              const dt = DateTime.fromJSDate(dateJs).toLocaleString();

              // if (bookingDictionary[dt]?.privacy == 1) {
              //   return {
              //     sx: (theme) => ({
              //       backgroundColor: "lightgray",
              //       color: "black",
              //       ...theme.fn.hover(),
              //     }),
              //   };
              // }
              // if (bookingDictionary[dt]?.privacy == 2) {
              //   return {
              //     sx: () => ({
              //       backgroundColor: "darkgray",
              //       color: "black",
              //     }),
              //   };
              // }
              return {
                sx: {
                  color: "gray",
                  fontSize: "18px",
                },
              };
            }}
          ></DatePicker>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <label>Wanna share the house</label>
            <label>
              <input
                style={{ paddingTop: "5px", width: "20px", height: "20px" }}
                type="radio"
                name="radio"
                onClick={() => {
                  setError("");
                  setPrivacy(1);
                }}
              ></input>
              willing to share
            </label>
            <label>
              <input
                style={{ paddingTop: "5px", width: "20px", height: "20px" }}
                type="radio"
                name="radio"
                onClick={() => {
                  setError("");
                  setPrivacy(2);
                }}
              ></input>
              prefer privacy
            </label>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "10px",
            }}
          >
            <label style={{ textAlign: "left" }}>Booking name</label>
            <input
              value={bookingName}
              onChange={(e) => {
                setError("");
                setBookingName(e.target.value);
              }}
              type="text"
            ></input>
          </div>
          <Button
            style={{ marginTop: "10px", width: "100px" }}
            onClick={() => {
              if (dateRange[0] == null) {
                setError("Booking start date is not picked!");
                return;
              }
              if (!privacy) {
                setError("Please choose a privacy setting!");
                return;
              }
              if (!bookingName) {
                setError("Please enter a name to book!");
                return;
              }

              const bookingSuccess = checkBookingDays(
                DateTime.fromJSDate(dateRange[0]),
                dateRange[1]
                  ? DateTime.fromJSDate(dateRange[1])
                  : DateTime.fromJSDate(dateRange[0]),
                privacy
              );

              bookingSuccess &&
                updateBookingInfo(
                  DateTime.fromJSDate(dateRange[0]),
                  dateRange[1]
                    ? DateTime.fromJSDate(dateRange[1])
                    : DateTime.fromJSDate(dateRange[0]),
                  privacy,
                  bookingName
                );

              setDateRange([null, null]);
            }}
          >
            Book
          </Button>

          <Button
            style={{ marginTop: "10px", width: "100px" }}
            onClick={() => {
              console.log("bookedDatesDIc: ", bookedDatesDic);
            }}
          >
            Print
          </Button>
        </div>
      </Group>
    </>
  );
};
