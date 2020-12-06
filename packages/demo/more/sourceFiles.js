import { Files } from "@explorablegraph/node";
import { IndexPages } from "@explorablegraph/web";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.join(dirname, ".");

export default new IndexPages(Files(sourceDirectory));