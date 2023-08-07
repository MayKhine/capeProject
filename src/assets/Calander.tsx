import { FC } from "react";
import { Group, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { DateTime } from "luxon";
import { Booking } from "./BookingDetail";

export type CalanderProps = {
  setBookingInfo: (arg0: Array<Booking>) => void;
  bookingInfo: Array<Booking>;
  bookingDictionary: Record<string, number>;
  loginUser: string;
};

export const Calander: FC<CalanderProps> = ({
  bookingInfo,
  setBookingInfo,
  bookingDictionary,
}) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [privacy, setPrivacy] = useState<number | null>();
  const [error, setError] = useState<string>();
  const [bookingName, setBookingName] = useState<string>("");
  const [startBooking, setStartBooking] = useState<boolean>(false);
  const updateBookingInfo = (
    startDate: DateTime,
    endDate: DateTime,
    privacy: number,
    name: string
  ) => {
    const days = calculateDays(startDate, endDate);
    for (let i = 0; i <= days; i++) {
      setBookingInfo([
        ...bookingInfo,
        {
          startDate: startDate,
          endDate: endDate,
          privacy: privacy,
          name: name,
        },
      ]);
      setBookingName("");
      setStartBooking(false);
    }
  };

  const calculateDays = (startDate: DateTime, endDate: DateTime) => {
    return (endDate.toMillis() - startDate.toMillis()) / (86400 * 1000);
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
      <div style={{ fontSize: "1.2em", paddingTop: "15px" }}>
        Booking Calander
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          paddingTop: "15px",
        }}
      >
        <Group position="center">
          <DatePicker
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "15px",
            }}
            weekendDays={[]}
            type="range"
            value={dateRange}
            onChange={setDateRange}
            onClick={() => {
              setError("");
            }}
            size="md"
            getDayProps={(dateJs) => {
              const dt = DateTime.fromJSDate(dateJs).toLocaleString();

              if (bookingDictionary[dt] == 1) {
                return {
                  sx: () => ({
                    backgroundColor: water1,
                    color: "black",
                  }),
                };
              }
              if (bookingDictionary[dt] == 2) {
                return {
                  sx: () => ({
                    backgroundColor: water3,
                    color: "black",
                  }),
                };
              }
              return {
                sx: {
                  color: "gray",
                  fontSize: "18px",
                },
              };
            }}
          ></DatePicker>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {/* </div> */}
        </Group>

        <div>
          {!startBooking && (
            <div>
              <Button
                style={{
                  borderColor: sand2,
                  backgroundColor: water3,
                }}
                onClick={() => {
                  setStartBooking(true);
                }}
              >
                Start Booking
              </Button>
            </div>
          )}

          {startBooking && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <label>Are you willing to share the house?</label>
                <label>
                  <input
                    style={{
                      paddingTop: "5px",
                      width: "15px",
                      height: "15px",
                      marginRight: "10px",
                    }}
                    type="radio"
                    name="radio"
                    onClick={() => {
                      setError("");
                      setPrivacy(1);
                    }}
                  ></input>
                  Yes
                </label>
                <label>
                  <input
                    style={{
                      paddingTop: "5px",
                      width: "15px",
                      height: "15px",
                      marginRight: "10px",
                    }}
                    type="radio"
                    name="radio"
                    onClick={() => {
                      setError("");
                      setPrivacy(2);
                    }}
                  ></input>
                  No{" "}
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "10px",
                }}
              >
                <label style={{ textAlign: "left" }}>Booking Name</label>
                <input
                  style={{
                    backgroundColor: sand1,
                    border: "1px solid",
                    borderColor: water3,
                    height: "30px",
                    borderRadius: "6px",
                  }}
                  value={bookingName}
                  onChange={(e) => {
                    setError("");
                    setBookingName(e.target.value);
                  }}
                  type="text"
                ></input>
              </div>
              <Button
                style={{
                  marginTop: "10px",
                  width: "100px",
                  borderColor: sand2,
                  backgroundColor: water3,
                }}
                onClick={() => {
                  setStartBooking(false);
                  setBookingName("");
                  setError("");
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  marginTop: "10px",
                  width: "100px",
                  borderColor: sand2,
                  backgroundColor: water3,
                }}
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const sand1 = "#F2D6B8";
const sand2 = "#E7BB8D";
const water1 = "#BDD7DF";
// const water2 = "#8AB6C6";
const water3 = "#5F98A9";
