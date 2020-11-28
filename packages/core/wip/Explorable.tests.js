describe("Explorable", () => {
  // it("Explorable.values can return the flat list of values", async () => {
  //   const fixture = Explorable.from({
  //     a: 1,
  //     b: 2,
  //     c: 3,
  //     more: {
  //       d: 4,
  //       e: 5,
  //     },
  //   });
  //   const values = await Explorable.values(fixture);
  //   assert.deepEqual(values.slice(0, 3), [1, 2, 3]);
  //   const nestedValues = await Explorable.values(values[3]);
  //   assert.deepEqual(nestedValues, [4, 5]);
  // });
  // it("Explorable.collapse can collapse a graph using a callback", async () => {
  //   const fixture = Explorable.from({
  //     a: 1,
  //     b: 2,
  //     c: 3,
  //     more: {
  //       d: 4,
  //       e: 5,
  //     },
  //   });
  //   const collapsed = await Explorable.collapse(fixture, (...values) => [
  //     ...values,
  //   ]);
  //   assert.deepEqual(collapsed, [1, 2, 3, [4, 5]]);
  // });
  // it("can resolve the objects in a graph", async () => {
  //   const graph = new ObjectGraph({
  //     a: {
  //       b: {
  //         c: Promise.resolve("Hello"),
  //         d: "world",
  //       },
  //     },
  //   });
  //   const resolved = await graph.resolve();
  //   assert.deepEqual(resolved, {
  //     a: {
  //       b: {
  //         c: "Hello",
  //         d: "world",
  //       },
  //     },
  //   });
  // });
  // it("can return the text of the resolved objects in a graph", async () => {
  //   const graph = new ObjectGraph({
  //     string: "string",
  //     number: 1,
  //     numberPromise: Promise.resolve(2),
  //     boolean: true,
  //   });
  //   const resolved = await graph.resolveText();
  //   assert.deepEqual(resolved, {
  //     string: "string",
  //     number: "1",
  //     numberPromise: "2",
  //     boolean: "true",
  //   });
  // });
  // it("can traverse a set of keys", async () => {
  //   const graph = new ObjectGraph({
  //     a: {
  //       b: {
  //         c: Promise.resolve("Hello"),
  //       },
  //     },
  //   });
  //   const obj = await graph.traverse(["a", "b", "c"]);
  //   assert.equal(obj, "Hello");
  //   const doesntExist = await graph.traverse(["foo"]);
  //   assert.isUndefined(doesntExist);
  // });
});