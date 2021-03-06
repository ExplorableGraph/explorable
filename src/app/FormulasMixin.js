import ExplorableGraph from "../core/ExplorableGraph.js";
import builtins from "../eg/builtins.js";
import execute from "../eg/execute.js";
import parse from "../eg/parse.js";

export default function FormulasMixin(Base) {
  return class Formulas extends Base {
    #keys;
    #formulas;
    #scope = builtins;

    async *[Symbol.asyncIterator]() {
      if (!this.#keys) {
        await this.#refresh();
      }
      yield* this.#keys;
    }

    async formulas() {
      if (!this.#formulas) {
        await this.#refresh();
      }
      return this.#formulas;
    }

    async get(...keys) {
      const [key, ...rest] = keys;
      const formulas = await this.formulas();
      const formula = formulas[key];
      if (formula) {
        const scope = this.scope;
        const value = await execute(formula, scope, this);
        return ExplorableGraph.isExplorable(value) && rest.length > 0
          ? await value.get(...rest)
          : value;
      } else {
        return await super.get(...keys);
      }
    }

    async #refresh() {
      this.#keys = [];
      this.#formulas = {};
      for await (const baseKey of super[Symbol.asyncIterator]()) {
        // Try to parse the base key as an expression.
        const parsed = parse(baseKey);
        const isFormula = parsed instanceof Array && parsed[0] === "=";
        if (isFormula) {
          const left = parsed[1];
          const right = parsed[2];
          this.#formulas[left] = right;
          this.#keys.push(left);
        } else {
          this.#keys.push(baseKey);
        }
      }

      // Store keys in JavaScript sort order.
      this.#keys.sort();
    }

    get scope() {
      return this.#scope;
    }
    set scope(scope) {
      this.#scope = scope;
    }
  };
}
