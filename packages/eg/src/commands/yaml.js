import YAML from "yaml";

export default async function yaml(graph) {
  const obj = await graph.strings();
  const text = YAML.stringify(obj);
  return text;
}

yaml.usage = `yaml(graph)\tPrint the graph in YAML format`;
