const BASE_URL = "http://localhost:9090/api";
export const IMAGE_PATH = "http://localhost:9090";

// Auth
export const USER_REGISTER = `${BASE_URL}/auth/register`; //OK
export const USER_LOGIN = `${BASE_URL}/auth/login`; //OK

// Users
export const USER_DETAILS = `${BASE_URL}/users/account`; //OK
export const UPDATE_USERS = `${BASE_URL}/users/update`; //OK
export const CREATE_PROFILE = `${BASE_URL}/profiles`; //OK
export const UPDATE_PROFILE = `${BASE_URL}/profiles`; //OK
export const GET_ALL_USERS = `${BASE_URL}/users`; //OK
export const DELETE_USER = `${BASE_URL}/users/delete`; //OK

// Rooms
export const GET_AVAILABLE_ROOM = `${BASE_URL}/rooms/available`; //OK
export const GET_ALL_ROOMS = `${BASE_URL}/rooms/all`; //OK
export const CREATE_ROOM = `${BASE_URL}/rooms/add`; //OK
export const DELETE_ROOM = `${BASE_URL}/rooms/delete`; //OK
export const UPDATE_ROOM = `${BASE_URL}/rooms/update`; //OK
export const FILTER_ROOM = `${BASE_URL}/rooms/search`; //OK

// Booked
export const BOOKED_ROOM = `${BASE_URL}/bookings`; //OK
export const GET_TOTAL_BOOKING_LIST = `${BASE_URL}/bookings/all`; //OK
export const UPDATE_BOOKING = `${BASE_URL}/bookings/update`; //OK
export const FIND_BOOKING_BY_REFERENCE = `${BASE_URL}/bookings`; //OK
