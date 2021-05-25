import ExplorableSite from "../../web/ExplorableSite.js";

export default async function Site(url) {
  return new ExplorableSite(url);
}

Site.usage = `Site(url)\tThe explorable site at url`;
