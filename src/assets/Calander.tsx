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
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const navigate = useNavigate();

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
          // getDayProps={(date) => {
          //   props.bookDateRange.forEach((dateRange: Array<Date>) => {});
          //   if (date >= dateRange[0] && date <= dateRange[1]) {
          //     console.log("Date found");
          //     console.log("Date: ", date, dateRange[0], dateRange[1]);
          //   }
          // }}

          getDayProps={(dateJs) => {
            const dt = DateTime.fromJSDate(dateJs);

            // const dateStrToBookingCount = {
            //   "08/01/2023": 1,
            //   "08/02/2023": 1,
            //   "08/03/2023": 1,
            //   "08/04/2023": 1,
            //   "08/05/2023": 1,
            //   "08/06/2023": 1,
            //   "08/07/2023": 1,
            // }
            props.bookDateRange.forEach((dateRange) => {
              console.log(
                "Date time happending? dt: ",
                dt,
                "dateRange 0: ",
                dateRange[0],
                "date range 1: ",
                DateTime.fromJSDate(dateRange[1])
              );

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
            props.setBookDateRange([...props.bookDateRange, [dateRange]]);
            navigate("/");
          }}
        >
          Book
        </Button>
      </Group>
    </>
  );
};
