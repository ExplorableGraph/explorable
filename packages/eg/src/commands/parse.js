import { Explorable } from "@explorablegraph/core";

export default async function parse(text) {
  const obj = JSON.parse(text);
  return Explorable(obj);
}