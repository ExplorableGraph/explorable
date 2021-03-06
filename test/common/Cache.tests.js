import Cache from "../../src/common/Cache.js";
import ExplorableGraph from "../../src/core/ExplorableGraph.js";
import assert from "../assert.js";

describe("Cache", () => {
  it("returns the first defined value from an ordered list of graphs", async () => {
    const fixture = new Cache(
      {},
      {
        a: 1,
        b: 2,
        c: 3,
      }
    );
    const cache = fixture.cache;

    const keys = await ExplorableGraph.keys(fixture);
    assert.deepEqual(keys, ["a", "b", "c"]);

    assert.isUndefined(await cache.get("a"));
    assert.equal(await fixture.get("a"), 1);
    assert.equal(await cache.get("a"), 1);

    assert.isUndefined(await cache.get("b"));
    assert.equal(await fixture.get("b"), 2);
    assert.equal(await cache.get("b"), 2);
  });
});
