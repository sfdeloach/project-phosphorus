export class Message {
  constructor(
    public success?: string,
    public danger?: string,
    public info?: string,
    public warning?: string
  ) {}

  static success(message) {
    this.success = message;
    return this;
  }

  static danger(message) {
    this.danger = message;
    return this;
  }

  static info(message) {
    this.info = message;
    return this;
  }

  static warning(message) {
    this.warning = message;
    return this;
  }
}
