import { DateTime } from "luxon";
import { FC } from "react";

export type BookingDetailProps = {
  bookingInfo: Array<Booking>;
};

export type Booking = {
  startDate: DateTime;
  endDate: DateTime;
  privacy: number;
  name: string;
};

export const BookingDetail: FC<BookingDetailProps> = ({ bookingInfo }) => {
  return (
    <div>
      <div style={{ fontSize: "1.2em", paddingTop: "15px" }}>
        Booking Detail information
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "480px",
          padding: "15px",
        }}
      >
        {bookingInfo
          .sort((a, b) => {
            return a.startDate.toMillis() - b.startDate.toMillis();
          })
          .map((booking) => {
            const startDate = booking.startDate.toLocaleString();
            const endDate = booking.endDate.toLocaleString();
            return (
              <li style={{ textAlign: "left" }}>
                {startDate} - {endDate}
                <ul style={{ margin: "0px", listStyle: "none" }}>
                  <li> booked by {booking.name}</li>
                </ul>
              </li>
            );
          })}
      </div>
    </div>
  );
};
