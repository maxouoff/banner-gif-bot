const { Client, Collection } = require("discord.js")
const fs = require("fs")
const fetch = require("node-fetch")
const config = require("./config")
const client = new Client({
    intents: [3276799],
    partials: [
        1, 2, 5, 3,
        4, 6, 0
    ]
})
client.on("ready", async () => {
    console.log(`Your bot ${client.user.tag} has connected successfully.`)
    async function updateBanner() {
        try {
            let newBanner = fs.readFileSync(`./${config.file}.gif`)
            let response = await fetch("https://discord.com/api/v9/users/@me", {
                method: "PATCH",
                headers: {
                    Authorization: `Bot ${client.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    banner: `data:image/gif;base64,${newBanner.toString("base64")}`
                })
            })
            if (response.ok) {
                return console.log("Your bot's banner has updated successfully.")
            } else {
                console.log(`Unable to update banner : ${response.statusText}`)
                let responseBody = await response.text()
                console.log(`Response : ${responseBody}`)
            }
        } catch (err) {
            console.error(`An error occurred while updating the banner : ${err}`)
        }
    }
    updateBanner()
})
client.login(config.token)