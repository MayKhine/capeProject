import { FC } from "react";
import { Group, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { DateTime } from "luxon";

export type CalanderProps = {
  setBookedDatesDic: (arg0: Record<string, number>) => void;
  bookedDatesDic: Record<string, number>;
  loginUser: string;
};

export const Calander: FC<CalanderProps> = ({
  bookedDatesDic,
  setBookedDatesDic,
  loginUser,
}) => {
  const [dateRange, setDateRange] = //useState([]);
    useState<[Date | null, Date | null]>([null, null]);

  const [privacy, setPrivacy] = useState<number | null>();
  const [error, setError] = useState<string>();
  const [note, setNote] = useState<string>();
  const [bookingName, setBookingName] = useState<string>("");
  // const [curNameArr, setCurNameArr] = useState<Array<string>>();

  const insertBookingDays = (
    startDate: DateTime,
    endDate: DateTime,
    privacy: number,
    name: string
  ) => {
    const days = (endDate - startDate) / (86400 * 1000);
    for (let i = 0; i <= days; i++) {
      console.log("name: ", name);
      const key = startDate.plus({ days: i }).toLocaleString();
      // let curNameArr = [bookedDatesDic[key]?.name];
      // bookedDatesDic[key] = { privacy: privacy, name: curNameArr.push(name) };
      if (bookedDatesDic[key]?.name) {
        console.log(
          "booking already exist and name is ",
          bookedDatesDic[key].name
        );
        // bookedDatesDic[key].name.push(name);
        let newNameArr = bookedDatesDic[key].name;
        newNameArr.push(name);
        console.log("new name arr: ", newNameArr);
        bookedDatesDic[key] = {
          privacy: privacy,
          name: newNameArr,
        };
      } else {
        bookedDatesDic[key] = { privacy: privacy, name: [name] };
      }
    }
    setBookedDatesDic({ ...bookedDatesDic });
    console.log("bookedDatesDic[key]: ", bookedDatesDic);
  };

  const checkBookingDays = (
    startDate: DateTime,
    endDate: DateTime,
    privacy: number
  ) => {
    const days = (endDate - startDate) / (86400 * 1000);
    for (let i = 0; i <= days; i++) {
      const key = startDate.plus({ days: i }).toLocaleString();

      if (bookedDatesDic[key]?.privacy == 2) {
        setError("Already booked with full privacy!");
        return false;
      }
      if (bookedDatesDic[key]?.privacy == 1 && privacy == 2) {
        setError("Cannot double book for full privacy!");

        return false;
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
                  // color: "red",
                  fontSize: "25px",
                },
              };
            }}
            getDayProps={(dateJs) => {
              const dt = DateTime.fromJSDate(dateJs).toLocaleString();

              if (bookedDatesDic[dt]?.privacy == 1) {
                return {
                  sx: (theme) => ({
                    backgroundColor: "lightgray",
                    color: "black",
                    ...theme.fn.hover(),
                  }),
                };
              }
              if (bookedDatesDic[dt]?.privacy == 2) {
                return {
                  sx: () => ({
                    backgroundColor: "darkgray",
                    color: "black",
                  }),
                };
              }
              return {
                sx: {
                  color: "gray",
                  fontSize: "20px",
                },
              };
            }}
          ></DatePicker>
          {note && <div>{note}</div>}
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
              console.log("loginuser: ", loginUser);
              bookingSuccess &&
                insertBookingDays(
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
            Print the booked Date range
          </Button>
        </div>
      </Group>
    </>
  );
};
