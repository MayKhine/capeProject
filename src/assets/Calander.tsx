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
  const [privacy, setPrivacy] = useState<number>();

  const insertBookingDays = (startDate: DateTime, endDate: DateTime) => {
    const days = (endDate - startDate) / (86400 * 1000);
    for (let i = 0; i <= days; i++) {
      const key = startDate.plus({ days: i }).toLocaleString();
      bookedDatesDic[key] = 1;
    }
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
      if (bookedDatesDic[key]) {
        console.log("sorry cannot book: ", key);
        return false;
      }
    }
    return true;
  };

  return (
    <>
      Calander Div
      <Group position="center">
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
          getMonthControlProps={() => {
            return {
              sx: { color: "red", backgroundColor: "black", fontSize: "50px" },
            };
          }}
          getDayProps={(dateJs) => {
            const dt = DateTime.fromJSDate(dateJs).toLocaleString();
            if (bookedDatesDic[dt]) {
              return {
                sx: () => ({
                  backgroundColor: "darkgray",
                  color: "white",
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
        <div>
          <label>
            <input
              type="radio"
              name="radio"
              onClick={() => {
                console.log("whilling to share is checked");
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
                console.log("Prefer privacy is checked");
                setPrivacy(2);
              }}
            ></input>
            prefer privacy
          </label>
        </div>
        <Button
          onClick={() => {
            if (dateRange[0] == null) {
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
                  : DateTime.fromJSDate(dateRange[0])
              );

            // props.setBookDateRange([...props.bookDateRange, [dateRange]]);
            setDateRange([null, null]);
          }}
        >
          Book
        </Button>
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
