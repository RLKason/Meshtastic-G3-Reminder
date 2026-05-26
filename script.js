const statusText = document.getElementById("status");

const releaseURL = "https://shop.uniteng.com/product/meshtastic-mesh-device-station-edition/";

let alreadyNotified = false;

async function checkRelease() {
    try {
        const response = await fetch(
            "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(releaseURL)
        );

        const text = await response.text();

        // Looks for Station G3 mentions
        if (
            text.includes("Station G3") ||
            text.includes("Meshtastic-G3-Reminder") ||
            text.includes("G3 in stock")
        ) {

            statusText.innerText = "STATION G3 FOUND!";

            if (!alreadyNotified) {
                alreadyNotified = true;

                new Notification("Meshtastic Station G3 Update!", {
                    body: "The website mentions Station G3."
                });
            }

        } else {
            statusText.innerText = "Still waiting for Station G3...";
        }

    } catch (err) {
        statusText.innerText = "Error checking website";
        console.error(err);
    }
}

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

checkRelease();

setInterval(checkRelease, 30000);
