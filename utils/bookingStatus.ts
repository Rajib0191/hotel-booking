import { GetAllBookingResponse } from "@/types/booking";

export function getTodaysBookingStats(data: GetAllBookingResponse) {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Total Booking
  const totalBooking = data.bookings.length;

  // Filter bookings created today
  const todaysBookings = data.bookings.filter((booking) => {
    const bookingDate = booking.createdAt.split("T")[0];
    return bookingDate === today;
  });

  // Calculate stats
  const todaysBookedLength = todaysBookings.length;
  const sumTotalPrice = data.bookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0
  );
  const todaysTotalPrice = todaysBookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0
  );

  return {
    totalBooking,
    todaysBookedLength,
    sumTotalPrice,
    todaysTotalPrice,
  };
}
