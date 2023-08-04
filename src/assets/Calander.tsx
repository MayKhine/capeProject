import { FC } from "react";
import { Group, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

export type CalanderProps = {
  setBookDateRange: (arg0: Array<Array<Date>>) => void;
  bookDateRange: Array<Array<Date>>;
};

export const Calander: FC<CalanderProps> = (props) => {
  const [dateRange, setDateRange] = //useState([]);
    useState<[Date | null, Date | null]>([null, null]);

  const navigate = useNavigate();

  const [bookedDatesDic, setBookedDatesDic] = useState<Record<string, number>>(
    {}
  );
  const [privacy, setPrivacy] = useState<number | null>();
  const [error, setError] = useState<string>();

  const insertBookingDays = (
    startDate: DateTime,
    endDate: DateTime,
    privacy: number
  ) => {
    const days = (endDate - startDate) / (86400 * 1000);
    for (let i = 0; i <= days; i++) {
      const key = startDate.plus({ days: i }).toLocaleString();
      bookedDatesDic[key] = privacy;
    }
    // setPrivacy(null);
    setBookedDatesDic({ ...bookedDatesDic });
  };

  const checkBookingDays = (
    startDate: DateTime,
    endDate: DateTime,
    privacy: number
  ) => {
    const days = (endDate - startDate) / (86400 * 1000);
    for (let i = 0; i <= days; i++) {
      const key = startDate.plus({ days: i }).toLocaleString();
      if (bookedDatesDic[key] == 2) {
        setError("Already booked with full privacy!");
        return false;
      }
      if (bookedDatesDic[key] == 1 && privacy == 2) {
        setError("Cannot double book for full privacy!");

        return false;
      }
    }
    return true;
  };

  return (
    <>
      Calander Div
      <Group
        position="center"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div>
          <DatePicker
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "10px",
            }}
            weekendDays={[]}
            type="range"
            allowDeselect
            value={dateRange}
            onChange={setDateRange}
            onClick={() => {
              setError("");
            }}
            getDayProps={(dateJs) => {
              const dt = DateTime.fromJSDate(dateJs).toLocaleString();
              if (bookedDatesDic[dt] == 1) {
                return {
                  sx: () => ({
                    backgroundColor: "lightgray",
                    color: "black",
                  }),
                };
              }
              if (bookedDatesDic[dt] == 2) {
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
                },
              };
            }}
          ></DatePicker>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <input
              type="radio"
              name="radio"
              onClick={() => {
                setPrivacy(1);
              }}
            ></input>
            willing to share
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              onClick={() => {
                setPrivacy(2);
              }}
            ></input>
            prefer privacy
          </label>

          <Button
            onClick={() => {
              if (dateRange[0] == null) {
                setError("Booking start date is not picked!");
                console.log("Start date is NULL");
                return;
              }
              if (!privacy) {
                console.log("Privacy settting has to choose");
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
                insertBookingDays(
                  DateTime.fromJSDate(dateRange[0]),
                  dateRange[1]
                    ? DateTime.fromJSDate(dateRange[1])
                    : DateTime.fromJSDate(dateRange[0]),
                  privacy
                );

              // props.setBookDateRange([...props.bookDateRange, [dateRange]]);
              setDateRange([null, null]);
            }}
          >
            Book
          </Button>
        </div>

        <Button
          onClick={() => {
            console.log("bookedDatesDIc: ", bookedDatesDic);
          }}
        >
          Print the booked Date range
        </Button>
      </Group>
    </>
  );
};
