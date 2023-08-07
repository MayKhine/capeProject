import { FC } from "react";

export type BookingDetailProps = {
  bookingInfo: Array<object>;
};

export const BookingDetail: FC<BookingDetailProps> = ({ bookingInfo }) => {
  const sortTheArray = (arr) => {
    return Array.sort((a, b) => {
      return a.startDate - b.startDate;
    });
  };

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
            return a.startDate - b.startDate;
          })
          .map((booking) => {
            const startDate = booking.startDate.toLocaleString();
            const endDate = booking.endDate.toLocaleString();
            //   console.log("sorted booking? : ", booking);
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
