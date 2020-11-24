import { promises as fs } from "fs";
import path from "path";

export default async function writeFiles(dirname, exfn) {
  // Ensure target directory exists.
  await fs.mkdir(dirname, { recursive: true });

  // Write out files.
  for await (const key of exfn) {
    const obj = await exfn[exfn.constructor.get](key);
    const objPath = path.join(dirname, key);
    if (exfn.constructor.isExplorable(obj)) {
      // Recurse
      await writeFiles(objPath, obj);
    } else {
      // Write out file
      await fs.writeFile(objPath, obj);
    }
  }
}