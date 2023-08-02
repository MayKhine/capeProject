import { FC } from "react";
import { Group, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";

export type CalanderProps = {
  setBookDateRange: (arg0: Array<Date>) => void;
};

export const Calander: FC = (props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
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
        ></DatePicker>
        <Button
          onClick={() => {
            console.log("date values: ", dateRange);
            props.setBookDateRange(dateRange);
          }}
        >
          Book
        </Button>
      </Group>
    </>
  );
};
