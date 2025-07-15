export interface Profile {
  id: number;
  address: string;
  city: string;
  country: string;
  occupation: string;
  gender: string;
  profilePictureUrl: string | null;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  profile: Profile;
  isActive: boolean;
  createdAt: string;
}

export interface Room {
  id: number;
  roomNumber: number;
  type: string;
  pricePerNight: number;
  capacity: number;
  description: string;
  imageUrl: string;
}

export interface Booking {
  id: number;
  user: User;
  room: Room;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  paymentStatus: string;
  bookingReference: string;
  bookingStatus: string;
  createdAt: string;
}

export interface GetAllBookingResponse {
  status: number;
  message: string;
  bookings: Booking[];
  timestamp: string;
}

export interface BookingRequest {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface BookingResponse {
  status: number;
  message: string;
  booking: {
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
  };
  timestamp: string;
}

export interface BookingStatusChangeRequest {
  id: number;
  bookingStatus: string;
}

export interface BookingStatusChangeResponse {
  status: number;
  message: string;
  timestamp: string;
}
