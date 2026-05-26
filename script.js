const statusText = document.getElementById("status");

const releaseURL =
    "https://shop.uniteng.com/product/meshtastic-mesh-device-station-edition/";

let alreadyNotified = false;

async function checkRelease() {

    try {

        const response = await fetch(
            "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(releaseURL)
        );

        const text = await response.text();

        // Detects G3 anywhere
        if (
            text.includes("G3") ||
            text.includes("Station G3") ||
            text.includes("Meshtastic-G3-Reminder")
        ) {

            statusText.innerText = "🔥 STATION G3 FOUND 🔥";

            if (!alreadyNotified) {

                alreadyNotified = true;

                new Notification(
                    "Meshtastic Station G3 Update!",
                    {
                        body: "The website mentions G3."
                    }
                );
            }

        } else {

            statusText.innerText =
                "Still waiting for Station G3...";
        }

    } catch (err) {

        statusText.innerText =
            "Error checking website";

        console.error(err);
    }
}

// Notification permission
async function startTracker() {

    if (Notification.permission !== "granted") {

        const permission =
            await Notification.requestPermission();

        if (permission === "granted") {

            statusText.innerText =
                "Thank you, Due to AI it might take long.";

        } else {

            statusText.innerText =
                "Notifications denied.";

            return;
        }
    }

    checkRelease();

    setInterval(checkRelease, 30000);
}

startTracker();
