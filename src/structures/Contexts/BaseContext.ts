export class BaseContext {
  /**
   * Decorates the object with a new property.
   *
   * @param {string} name - The name of the property.
   * @param {unknown} data - The data to assign to the property.
   * @return {unknown} The decorated object.
   */
  public decorate(name: string, data: unknown): unknown {
    return Object.defineProperty(this, name, {
      value: data,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }
}
