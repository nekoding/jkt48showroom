export type showroomLiveInfo = {
  enquete_gift_num: number;
  is_enquete: number;
  is_recording_prohibited: boolean;
  live_id: number;
  is_enquete_result: boolean;
  room_name: string;
  background_image_url: string;
  age_verification_status: number;
  bcsvr_port: number;
  video_type: number;
  live_type: number;
  is_free_gift_only: boolean;
  premium_room_type: number;
  bcsvr_host: number;
  bcsvr_key: string;
  room_id: number;
  live_status: number;
};

export type nextLive = {
  epoch?: number;
  text: string;
};
