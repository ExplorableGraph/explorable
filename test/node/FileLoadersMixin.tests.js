import ExplorableObject from "../../src/core/ExplorableObject.js";
import FileLoadersMixin from "../../src/node/FileLoadersMixin.js";
import assert from "../assert.js";

describe("FileLoadersMixin", () => {
  it("returns the contents of .txt keys/files as text", async () => {
    const graph = new (FileLoadersMixin(ExplorableObject))({
      foo: 1, // should be left alone
      "bar.txt": 1, // should be cast to a string
    });

    assert.equal(await graph.get("foo"), 1);
    assert.equal(await graph.get("bar.txt"), "1");
  });

  it("returns the contents of .json key/file as parsed JSON objects", async () => {
    const graph = new (FileLoadersMixin(ExplorableObject))({
      foo: `{ "message": "foo" }`, // should be left alone
      "bar.json": `{ "message": "bar" }`, // should be parsed
    });

    assert.equal(await graph.get("foo"), `{ "message": "foo" }`);
    assert.deepEqual(await graph.get("bar.json"), { message: "bar" });
  });
});
