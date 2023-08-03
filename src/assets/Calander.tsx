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
  /*
    {
      "08/02/2023": 1
    }
  */

  const insertBookingDays = (startDate: DateTime, endDate: DateTime) => {
    const days = (endDate - startDate) / (86400 * 1000);
    for (let i = 0; i <= days; i++) {
      const key = startDate.plus({ days: i }).toLocaleString();
      bookedDatesDic[key] = 1;
    }
    setBookedDatesDic({ ...bookedDatesDic });
  };

  const checkBookingDays = (startDate: DateTime, endDate: DateTime) => {
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
        {/* <DateInput></DateInput> */}
        <DatePicker
          type="range"
          allowDeselect
          value={dateRange}
          onChange={setDateRange}
          getDayProps={(dateJs) => {
            const dt = DateTime.fromJSDate(dateJs).toLocaleString();
            if (bookedDatesDic[dt]) {
              return {
                sx: (theme) => ({
                  backgroundColor: "#e0d3db",
                  color: "#002cff",
                }),
              };
            }
          }}
        ></DatePicker>
        <Button
          onClick={() => {
            if (dateRange[0] == null) {
              console.log("Start date is NULL");
              return;
            }
            const bookingSuccess = checkBookingDays(
              DateTime.fromJSDate(dateRange[0]),
              dateRange[1]
                ? DateTime.fromJSDate(dateRange[1])
                : DateTime.fromJSDate(dateRange[0])
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

            // console.log("Date range: ", dateRange);

            // console.log("Date range: ", props.bookDateRange);
          }}
        >
          Print the booked Date range
        </Button>
      </Group>
    </>
  );
};
