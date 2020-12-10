import {
  AsyncExplorable,
  asyncGet,
  asyncKeys,
  asyncOps,
} from "@explorablegraph/core";

const INDEX_HTML = "index.html";
const KEYS_JSON = ".keys.json";

export default class DefaultPages extends AsyncExplorable {
  constructor(inner) {
    super();
    this.inner = new AsyncExplorable(inner);
  }

  async *[asyncKeys]() {
    // Add "index.html" to the inner's keys if not already there.
    const base = await asyncOps.keys(this.inner);
    const keys = [...base];

    if (!keys.includes(INDEX_HTML)) {
      // Inner doesn't define "index.html" yet; add it to the beginning.
      keys.unshift(INDEX_HTML);
    }

    yield* keys;
  }

  async [asyncGet](...keys) {
    const value = await this.inner[asyncGet](...keys);
    const lastKey = keys[keys.length - 1];

    let indexParent;
    if (value instanceof AsyncExplorable) {
      // Value is explorable; return an DefaultPages wrapper around it.
      return new this.constructor(value);
    } else if (lastKey === INDEX_HTML && value === undefined) {
      // Last key was explicitly "index.html", and the inner graph doesn't have a value
      // for it, return an index for the parent.
      const route = keys.slice(0, keys.length - 1);
      indexParent =
        route.length === 0 ? this.inner : await this.inner[asyncGet](...route);
    }

    // In either of the above cases, return an index.
    if (indexParent) {
      return await defaultIndexHtml(indexParent);
    }

    if (lastKey === KEYS_JSON && value === undefined) {
      // Return default .keys.json page.
      const route = keys.slice(0, keys.length - 1);
      const parent =
        route.length === 0 ? this.inner : await this.inner[asyncGet](...route);
      return await defaultKeysJson(parent);
    }

    // No work for us to do.
    return value;
  }

  static isDefaultPage(key) {
    return key === INDEX_HTML || key === KEYS_JSON;
  }
}

// TODO: This and default index.html both need to get each key, which is too
// inefficient for real use.
async function defaultKeysJson(graph) {
  const keys = [];
  for await (const key of graph) {
    const value = await graph[asyncGet](key);
    const text = value instanceof AsyncExplorable ? `${key}/` : key;
    keys.push(text);
  }
  if (!keys.includes(INDEX_HTML)) {
    // Since we're going to define it, we include index.html in the keys.
    keys.unshift(INDEX_HTML);
  }
  return JSON.stringify(keys, null, 2);
}

async function defaultIndexHtml(graph) {
  const links = [];
  for await (const key of graph) {
    const value = await graph[asyncGet](key);
    const href = value instanceof AsyncExplorable ? `${key}/` : key;
    const link = `<li><a href="${href}">${href}</a></li>`;
    links.push(link);
  }
  const list = `<ul>\n${links.join("\n")}\n</ul>`;
  return list;
}