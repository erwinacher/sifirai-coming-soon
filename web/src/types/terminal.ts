export namespace Terminal {
  // type structure holding the terminal instance
  export type Instance = {
    settings: Settings;
    commandContainer: HTMLElement;
    inputContainer: HTMLElement;
    input: HTMLInputElement;
    history: string[];
    lastHistoryIndex: number;
    print: (
      text: string,
      isCommand?: boolean,
      scrollIntoView?: boolean
    ) => void;
    run: (cmd: string) => void;
    start: () => void;
    stop: () => void;
    type: (
      text: string,
      speed?: number,
      isCommand?: boolean
    ) => Promise<boolean>;
    setPrompt: (newPrompt: string) => void;
  };

  // type structure for a single command in the terminal
  export type Command = {
    name: string;
    description: string;
    argDescriptions?: string[];
    func: (terminal: Instance, ...args: string[]) => void;
  };

  // type structure for the terminal settings
  export type Settings = {
    host: HTMLElement;
    commands: Record<string, Command>;
    welcomeMessage?: string;
    prompt?: string;
    historyLength?: number;
    history?: string[];
    enableHelp?: boolean;
  };
}
