const USER_ID = "1419921126234259517";


// ============================
// Mobile Menu
// ============================

function toggleMenu() {
    const menu = document.getElementById("menu");

    menu.classList.toggle("show");
}


// ============================
// Discord Status
// ============================

async function getDiscordStatus() {

    const statusText = document.getElementById("statusText");
    const discordStatus = document.getElementById("discordStatus");
    const activityText = document.getElementById("activity");
    const statusDot = document.getElementById("statusDot");

    try {

        const response = await fetch(
            `https://api.lanyard.rest/v1/users/${USER_ID}`
        );

        const result = await response.json();

        if (!result.success) {
            throw new Error("User not found");
        }

        const data = result.data;

        let status = data.discord_status || "offline";

        let readableStatus = {
            online: "Online",
            idle: "Idle",
            dnd: "Do Not Disturb",
            offline: "Offline"
        };

        statusText.textContent =
            "● " + (readableStatus[status] || "Offline");

        discordStatus.textContent =
            readableStatus[status] || "Offline";

        statusDot.className =
            "status-dot " + status;


        // Activity

        if (data.activities && data.activities.length > 0) {

            const activity = data.activities.find(
                x => x.type !== 4
            );

            if (activity) {

                activityText.textContent =
                    "🎮 " +
                    activity.name +
                    (activity.details
                        ? " • " + activity.details
                        : "");

            } else {

                activityText.textContent =
                    "No current activity";

            }

        } else {

            activityText.textContent =
                "No current activity";

        }

    } catch (error) {

        console.log(error);

        statusText.textContent =
            "● Status unavailable";

        discordStatus.textContent =
            "Status unavailable";

        activityText.textContent =
            "Discord status couldn't be loaded";

        statusDot.className =
            "status-dot offline";
    }
}


// Initial load
getDiscordStatus();


// Refresh every 15 seconds
setInterval(getDiscordStatus, 15000);