const cron = require("cron");
const axios = require("axios");
const { color } = require("console-log-colors");
require("dotenv").config();

const job = new cron.CronJob("0 0 7 * * *", async () => {
  // API call goes here
  try {
    const response = await axios.get(
      process.env.API_URL + "?source=USD&target=UYU",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "my_first_cron",
        },
      }
    );

    if (!response) {
      console.log(color.red("Error on request"));
      return;
    }

    const { data } = response;

    if (!data) {
      console.log(color.red("Error on request"));
      return;
    } else {
      console.log(color.green("Success !!"));
      console.log(color.yellow("Response is :: "), data);
      return;
    }
  } catch (e) {
    console.log(color.red("Error on request"));
    if (process.env.NODE_ENV === "development") {
      console.log(color.yellow(e));
    }
    return;
  }
});

job.start();

if (job.running) {
  console.log(color.green("Our CRON is Runing!!"));
}
