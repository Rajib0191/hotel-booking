export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  TRIPLE = "TRIPLE",
  SUITE = "SUITE",
}

export interface Room {
  id: number;
  roomNumber?: number | string;
  type?: RoomType;
  pricePerNight?: number | string;
  capacity?: number | string;
  description?: string;
  imageUrl?: File | string;
}

export interface GetAllRoomsResponse {
  status: number;
  message: string;
  rooms: Room[];
  timestamp: string;
}

export interface RoomFormData {
  imageUrl: File | string;
  roomNumber: string;
  type: string;
  capacity: string;
  pricePerNight: string;
  description: string;
}

export interface RoomFormDataError {
  imageUrl: string;
  roomNumber: string;
  type: string;
  capacity: string;
  pricePerNight: string;
  description: string;
}

export interface CreateRoomResponse {
  status: number;
  message: string;
  timestamp: string;
}

export type DeleteResponse = {
  status: number;
  message: string;
};
