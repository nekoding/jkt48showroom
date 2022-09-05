import Airtable from "airtable";
import {
  fetchShowroomLiveInfo,
  fetchShowroomNextLive,
} from "./lib/showroom_checker";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE);

airtable(process.env.AIRTABLE_TABLE_NAME)
  .select({
    view: "Grid view",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function (record) {
        const uuid = record.getId();
        const showroomProfile = record.get("showroom_profile");

        if (typeof showroomProfile === "string") {
          const showroomId = showroomProfile.replace(/^\D+/g, "");
          Promise.all([
            fetchShowroomLiveInfo(showroomId),
            fetchShowroomNextLive(showroomId),
          ]).then((item) => {
            const [liveInfo, nextLive] = item;
            airtable(process.env.AIRTABLE_TABLE_NAME)
              .update([
                {
                  id: uuid,
                  fields: {
                    online_status:
                      liveInfo.live_status == 2 ? "online" : "offline",
                    last_checked_at: new Date().getTime(),
                    room_name: liveInfo.room_name,
                    next_live: nextLive.epoch,
                  },
                },
              ])
              .then((res) => {
                const { fields } = res[0];
                console.log(`${fields.name} updated 😁`);
              })
              .catch((err) => {
                console.error(err);
              });
          });
        }
      });
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
