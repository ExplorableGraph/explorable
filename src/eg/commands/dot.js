import ExplorableGraph from "../../core/ExplorableGraph.js";

export default async function dot(graph, rootLabel = "") {
  const graphArcs = await statements(graph, "", "/");
  return `digraph g {
  rankdir=LR;
${graphArcs.join("\n")}
}`;
}

async function statements(graph, nodePath, nodeLabel) {
  let result = [];

  result.push(`  "${nodePath}" [label="${nodeLabel}"];`);

  for await (const key of graph) {
    const destPath = `${nodePath}/${key}`;
    const arc = `  "${nodePath}" -> "${destPath}";`;
    result.push(arc);

    const value = await graph.get(key);
    if (ExplorableGraph.isExplorable(value)) {
      const subStatements = await statements(value, destPath, key);
      result = result.concat(subStatements);
    } else {
      result.push(`  "${destPath}" [label="${key}"];`);
    }
  }
  return result;
}

dot.usage = `dot(graph)\tRender a graph visually in dot language`;