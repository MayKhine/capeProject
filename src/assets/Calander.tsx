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

  const [bookedDatesDic, setBookedDatesDic] = useState({});

  const insertBookingDays = (startDate: DateTime, endDate: DateTime) => {
    // 86400 sec or 1 days short
    if (endDate - startDate == 0) {
      console.log("Same day trip");
      setBookedDatesDic({ startDate: 1 });
    } else {
      const days = (endDate - startDate) / (86400 * 1000);
      for (let i = 0; i <= days; i++) {
        const iDate = startDate.plus({ days: i });
        // console.log("date: ", startDate.plus({ days: i }));
        setBookedDatesDic({ ...bookedDatesDic, iDate: 1 });
      }
      console.log("bookedDatesDIc: ", bookedDatesDic);
    }
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
            const dt = DateTime.fromJSDate(dateJs);

            props.bookDateRange.forEach((dateRange) => {
              // console.log(
              //   "Date time happending?? dt: ",
              //   dt,
              //   "dateRange 0: ",
              //   DateTime.fromHTTP(dateRange[0]),
              //   "date range 1: ",
              //   DateTime.fromJSDate(dateRange[1])
              // );
              // if (
              //   dt >= DateTime.fromJSDate(dateRange[0]) &&
              //   dt <= DateTime.fromJSDate(dateRange[1])
              // ) {
              //   console.log("Date math: ", dt, dateRange[0], dateRange[1]);
              // }
            });
          }}
        ></DatePicker>
        <Button
          onClick={() => {
            if (dateRange[0] == null) {
              console.log("Start date is NULL");
              return;
            }
            calculateBookingDays(
              DateTime.fromJSDate(dateRange[0]),
              dateRange[1]
                ? DateTime.fromJSDate(dateRange[1])
                : DateTime.fromJSDate(dateRange[0])
            );

            // props.setBookDateRange([...props.bookDateRange, [dateRange]]);
            // setDateRange([null, null]);
            // navigate("/");
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
