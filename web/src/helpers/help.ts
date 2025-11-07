import type { Terminal } from "../types";

const createHelp = (terminal: Terminal.Instance): Terminal.Command => ({
  name: "help",
  description: "shows a list of alll available commands",
  func: ({ print }) => {
    const { commands } = terminal.settings;
    for (const key in commands) {
      const cmd = commands[key];
      print(`${cmd.name} - ${cmd.description}`);
    }
  },
});

export default createHelp;
