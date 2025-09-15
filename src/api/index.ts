import request from "./requests";
import { Cat } from "./types";

export const getCats = async (
  limit?: number,
) => {
  return request<Cat[]>("GET", `images/search${limit ? `?limit=${limit}` : ""}`);
};

export const voteCat = async (
  catId: string,
  vote: string,
) => {
  return request<Cat[]>("POST", `votes`, {
    catId,
    vote,
  });
};