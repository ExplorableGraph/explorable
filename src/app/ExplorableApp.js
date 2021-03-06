import DefaultValues from "../../src/common/DefaultValues.js";
import ExplorableFiles from "../../src/node/ExplorableFiles.js";
import FileLoadersMixin from "../../src/node/FileLoadersMixin.js";
import ModulesDefaultExportMixin from "../node/ModulesDefaultExportMixin.js";
import defaultIndexHtml from "./defaultIndexHtml.js";
import defaultKeysJson from "./defaultKeysJson.js";
// import VirtualValuesMixin from "./VirtualValuesMixin.js";
import FormulasMixin from "./FormulasMixin.js";
import SplatKeysMixin from "./SplatKeysMixin.js";
import VirtualKeysMixin from "./VirtualKeysMixin.js";
import WildcardKeysMixin from "./WildcardKeysMixin.js";

class AppGraph extends WildcardKeysMixin(
  SplatKeysMixin(
    VirtualKeysMixin(
      FormulasMixin(
        FileLoadersMixin(ModulesDefaultExportMixin(ExplorableFiles))
      )
    )
  )
) {}

export default class ExplorableApp extends DefaultValues {
  #main;

  constructor(dirname) {
    const main = new AppGraph(dirname);
    const defaults = {
      ".keys.json": defaultKeysJson,
      "index.html": defaultIndexHtml,
    };
    super(main, defaults);
    this.#main = main;
  }

  get scope() {
    return this.#main.scope;
  }
  set scope(scope) {
    this.#main.scope = scope;
  }
}
