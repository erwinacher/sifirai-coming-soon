import type { Terminal } from "../types";

export const populateHistory = (instance: Terminal.Instance) => {
  const {
    input: { value },
    history,
    settings: { historyLength },
  } = instance;

  if (value === history[0]) {
    return;
  }
  if (history.length >= (historyLength as number)) {
    instance.history = [value, ...history.slice(0, -1)];
    return;
  }
  instance.history = [value, ...history];
  instance.lastHistoryIndex = 0;
};

export const searchHistory = (
  instance: Terminal.Instance,
  isPressedDown?: boolean
) => {
  const { history, lastHistoryIndex } = instance;
  const endOfHistory = history.length - 1;
  let newIndex: number;

  // boundary checks
  // if user pressed Down and history index is empty, return
  if (isPressedDown && lastHistoryIndex === 0) return;
  // if User pressed Up and user is currently on first executed command, return;
  if (!isPressedDown && lastHistoryIndex === history.length) return;

  if (endOfHistory < 0) return;
  // @TODO: still not consistent, index is duplicated once when searching down

  // If Down key is pressed, check if value of newIndex is < 0?
  //  At this point, if lastHistoryIndex is 1, we should show empty string.
  if (isPressedDown) {
    newIndex = lastHistoryIndex - 1;
    instance.input.value = newIndex - 1 >= 0 ? history[newIndex - 1] : "";
  } else {
    newIndex = lastHistoryIndex + 1;
    instance.input.value = history[lastHistoryIndex];
  }
  instance.lastHistoryIndex = newIndex;
};
