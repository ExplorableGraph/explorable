import path from "path";
import YAML from "yaml";

const defaultLoaders = {
  ".htm": String,
  ".html": String,
  ".json": (data) => JSON.parse(String(data)),
  ".txt": String,
  ".xhtml": String,
  ".yaml": (data) => YAML.parse(String(data)),
};

export default function FileLoadersMixin(Base) {
  return class FileLoaders extends Base {
    #loaders = defaultLoaders;

    async get(...keys) {
      let value = await super.get(...keys);
      const lastKey = keys[keys.length - 1];
      if (
        lastKey !== undefined &&
        (typeof value === "string" || value instanceof Buffer)
      ) {
        const extname = path.extname(lastKey).toLowerCase();
        const loader = this.loaders[extname];
        if (loader) {
          return loader(value);
        }
      }
      return value;
    }

    get loaders() {
      return this.#loaders;
    }
    set loaders(loaders) {
      this.#loaders = loaders;
    }
  };
}
