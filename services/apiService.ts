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

// Rooms
export const GET_AVAILABLE_ROOM = `${BASE_URL}/rooms/available`; //OK
