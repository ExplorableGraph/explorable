import DefaultValues from "../../src/common/DefaultValues.js";
import ExplorableGraph from "../../src/core/ExplorableGraph.js";
import assert from "../assert.js";

describe("DefaultValues", () => {
  it("provides default values for missing keys at any point in graph", async () => {
    const graph = new DefaultValues(
      {
        a: 1,
        b: 2,
        more: {
          c: 3,
        },
      },
      {
        b: 4,
        d: 5,
      }
    );

    // Default values don't show up in keys
    assert.deepEqual(await ExplorableGraph.keys(graph), ["a", "b", "more"]);

    assert.equal(await graph.get("a"), 1);
    assert.equal(await graph.get("b"), 2); // Respects main graph
    assert.equal(await graph.get("d"), 5); // Default
    assert.equal(await graph.get("more", "b"), 4); // Default
    assert.equal(await graph.get("more", "c"), 3);
    assert.equal(await graph.get("more", "d"), 5); // Default
  });
});
