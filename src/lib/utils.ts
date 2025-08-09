import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRoomAvailable(
  hotelId: string,
  roomNumber: string,
  checkIn: string | Date,
  checkOut: string | Date
): boolean {
  // Get existing bookings
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  // Convert dates to timestamps for comparison
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = new Date(checkOut).getTime();

  // Find any overlapping bookings for this room
  const hasOverlappingBooking = bookings.some((booking: any) => {
    if (booking.hotelId !== hotelId || booking.roomNumber !== roomNumber) {
      return false;
    }

    const bookingStart = new Date(booking.checkinDate).getTime();
    const bookingEnd = new Date(booking.checkoutDate).getTime();

    return (
      (checkInTime >= bookingStart && checkInTime < bookingEnd) ||
      (checkOutTime > bookingStart && checkOutTime <= bookingEnd) ||
      (checkInTime <= bookingStart && checkOutTime >= bookingEnd)
    );
  });

  return !hasOverlappingBooking;
}
