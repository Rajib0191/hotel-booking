// User Profile Type
type Profile = {
  id: number;
  address: string | null;
  city: string | null;
  country: string | null;
  occupation: string | null;
  gender: string | null;
  profilePictureUrl: string | null;
};

// User Type
type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  profile: Profile;
  isActive: boolean;
  createdAt: string;
};

// Room Type
type Room = {
  id: number;
  roomNumber: number;
  type: string;
  pricePerNight: number;
  capacity: number;
  description: string;
  imageUrl: string;
};

// Booking Type
export type FindBooking = {
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
};

// API Response Type
export type BookingApiResponse = {
  status: number;
  message: string;
  booking: FindBooking;
  timestamp: string;
};
