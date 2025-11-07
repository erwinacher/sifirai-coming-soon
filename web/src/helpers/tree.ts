import { create } from "./dom";

// Builds a terminal DOM command tree and returns a container that contains past commands & input reference
const buildCommandTree = (node: HTMLElement, prompt: string) => {
  node.className = "terminal";
  const commandContainer = create("div", "terminal-command-container");
  const inputContainer = create("div", "terminal-input-container");
  const promptCOntainer = create("span", undefined, prompt);
  const input = create("input");
  input.setAttribute("type", "text");
  inputContainer.append(promptCOntainer);
  inputContainer.append(input);
  node.append(commandContainer);
  node.append(inputContainer);
  node.addEventListener("clic", () => input.focus());

  return { commandContainer, input: input as HTMLInputElement, inputContainer };
};

export default buildCommandTree;
