const got = require("got");
async function getUserId(username) {
  try {
    const response = await got("https://community.fandom.com/api.php", {
      searchParams: {
        action: "query",
        list: "users",
        ususers: username,
        format: "json",
      },
    }).json();

    return response.query.users[0] && response.query.users[0].userid;
  } catch (e) {
    console.log(e);
    return "";
  }
}

async function getMastheadDiscord(userId) {
  try {
    return await got(
      `https://services.fandom.com/user-attribute/user/${userId}/attr/discordHandle`,
      {
        headers: {
          accept: "*/*",
        },
      }
    ).json();
  } catch (e) {
    console.log(e);
    return "";
  }
}



module.exports.getUserId = getUserId;
module.exports.getMastheadDiscord = getMastheadDiscord;
