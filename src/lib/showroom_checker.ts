import { nextLive, showroomLiveInfo } from "./types";

const BASE_URL = "https://www.showroom-live.com/api";

const liveInfo = "/live/live_info";
const nextLive = "/room/next_live";

export const fetchShowroomLiveInfo = async (
  roomId: string | number
): Promise<showroomLiveInfo> => {
  const result = await fetch(`${BASE_URL}${liveInfo}?room_id=${roomId}`);
  return (await result.json()) as Promise<showroomLiveInfo>;
};

export const fetchShowroomNextLive = async (
  roomId: string | number
): Promise<nextLive> => {
  const result = await fetch(`${BASE_URL}${nextLive}?room_id=${roomId}`);
  return (await result.json()) as Promise<nextLive>;
};
