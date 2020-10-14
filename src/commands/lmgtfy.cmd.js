const name = "lmgtfy";
const description = "This command gives you a LMGTFY link";
const execute = (message, args) => {
  const research = args.join("+");

  message.delete();
  message.channel.send("I found something on the internet !");
  message.channel.send(`https://lmgtfy.app/?q=${research}&iie=1`);
  message.channel.send("Check this out !");
};

export { name, description, execute };
