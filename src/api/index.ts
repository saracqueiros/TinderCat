import request from "./requests";
import { Cat } from "./types";

export const getCats = async (
  limit?: number,
) => {
  return request<Cat[]>("GET", `/breeds${limit ? `?limit=${limit}` : ""}`);
};

export type VoteValue = 0 | 1;

export const voteCat = async (
  imageId: string,
  subId: string,
  value: VoteValue,
) => {
  return request<Cat[]>("POST", `/votes`, {
    image_id: imageId,
    sub_id: subId,
    value,
  });
};