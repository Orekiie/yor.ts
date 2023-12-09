export class YorClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'YorClientError';
  }
}
