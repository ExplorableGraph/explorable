// Simple graph of web pages used by the server in test.js.

import { Explorable, get, keys } from "@explorablegraph/exfn";

const letters = ["a", "b", "c", "d", "e", "f", "g", "i", "j"];
const routes = ["index.html", ...letters];

// TODO: When async ops can do implict conversion, this can just be a plain
// JavaScript object.
export default new Explorable({
  [keys]() {
    return routes[Symbol.iterator]();
  },

  "index.html": letters
    .map((letter) => `<li><a href="${letter}">${letter}</a></li>`)
    .join(""),

  secret: "You have found the secret page!",

  async [get](key) {
    return this[key] || `Hello, ${key}.`;
  },

  // TODO: Get this key from web package.
  "__keys__.json": JSON.stringify(routes, null, 2),
});