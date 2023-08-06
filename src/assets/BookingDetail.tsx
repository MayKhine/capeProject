import { FC } from "react";

export type BookingDetailProps = {
  bookingInfo: Array<object>;
  bookingDictionary: Record<string, number>;
};

export const BookingDetail: FC<BookingDetailProps> = ({
  bookingInfo,
  ...rest
}) => {
  const sortTheArray = (arr) => {
    return Array.sort((a, b) => {
      return a.startDate - b.startDate;
    });
  };

  return (
    <div style={{ backgroundColor: "gray" }}>
      Booking Detail
      {bookingInfo
        .sort((a, b) => {
          return a.startDate - b.startDate;
        })
        .map((booking) => {
          const startDate = booking.startDate.toLocaleString();
          const endDate = booking.endDate.toLocaleString();
          //   console.log("sorted booking? : ", booking);
          return (
            <div>
              {startDate} - {endDate} booked by {booking.name}
            </div>
          );
        })}
    </div>
  );
};
