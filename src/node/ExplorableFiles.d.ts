/// <reference path="../core/explorable.ts"/>

export default class ExplorableFiles implements Explorable, Storable {
  constructor(dirname: string);
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
  dirname: string;
  get(...keys: any[]): Promise<any>;
  set(...args: any[]): Promise<void>;
}