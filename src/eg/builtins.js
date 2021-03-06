import path from "path";
import { fileURLToPath } from "url";
import CommandModules from "../../src/node/CommandModules.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsFolder = path.resolve(dirname, "commands");
const builtins = new CommandModules(commandsFolder);

export default builtins;
