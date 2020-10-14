import dotenv from "dotenv";
import { readdirSync } from "fs";
import Discord from "discord.js";
import { config } from "./src/config.js";

dotenv.config();

const { prefix } = config;
const Bot = new Discord.Client({ autoReconnect: true });
const commandFiles = readdirSync("./src/commands").filter((file) =>
  file.endsWith(".cmd.js")
);

Bot.commands = new Discord.Collection();
commandFiles.map(async (file) => {
  const command = await import(`./src/commands/${file}`);
  Bot.commands.set(command.name, command);
});
const commands = commandFiles.map((file) =>
  file.substring(0, file.indexOf(".cmd.js"))
);

Bot.on("ready", () => {
  console.log(`Logged in as ${Bot.user.tag}`);
});

Bot.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  if (commands?.find((cmd) => cmd === command)) {
    try {
      Bot.commands.get(command).execute(message, args);
    } catch (err) {
      message.reply("Hmmm... 🤔 Something went wrong with this command...");
    }
  } else {
    message.reply("Hmmm... 🤔 I think you typed a wrong command...");
  }
});

Bot.login(process.env.TOKEN);
