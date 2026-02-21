import API from "./api";

export const registerUser = (data) =>
  API.post("auth/register/", data);

export const verifyOtp = (data) =>
  API.post("auth/verify-email-otp/", data);

export const loginUser = (data) =>
  API.post("auth/login/", data);

export const createOrganization = (data) =>
  API.post("organizations/create/", data);

export const getIndustries = () =>
  API.get("industries/");