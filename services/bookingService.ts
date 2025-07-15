"use client";
import { getToken } from "@/utils/authUtilities";
import {
  BOOKED_ROOM,
  FIND_BOOKING_BY_REFERENCE,
  GET_TOTAL_BOOKING_LIST,
  UPDATE_BOOKING,
} from "./apiService";
import axios from "axios";
import {
  BookingRequest,
  BookingResponse,
  BookingStatusChangeRequest,
  BookingStatusChangeResponse,
  GetAllBookingResponse,
} from "@/types/booking";
import { BookingApiResponse } from "@/types/find-booking";

export const fetchAllBookingList = async () => {
  const token = getToken();
  try {
    const response = await axios.get<GetAllBookingResponse>(
      GET_TOTAL_BOOKING_LIST,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch booked rooms"
      );
    }
    throw new Error("Failed to fetch booked rooms");
  }
};

export const bookedRoom = async (
  payload: BookingRequest
): Promise<BookingResponse> => {
  const token = getToken();
  try {
    const response = await axios.post<BookingResponse>(BOOKED_ROOM, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create booked room"
      );
    }
    throw new Error("Failed to create booked room");
  }
};

export const UpdateBookingStatus = async (
  payload: BookingStatusChangeRequest
): Promise<BookingStatusChangeResponse> => {
  const token = getToken();
  try {
    const response = await axios.put<BookingResponse>(UPDATE_BOOKING, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create booked room"
      );
    }
    throw new Error("Failed to create booked room");
  }
};

export const FindBookingByReference = async (
  payload: string
): Promise<BookingApiResponse> => {
  try {
    const response = await axios.get<BookingApiResponse>(
      `${FIND_BOOKING_BY_REFERENCE}/${payload}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to find booking by reference"
      );
    }
    throw new Error("Failed to find booking by reference");
  }
};
