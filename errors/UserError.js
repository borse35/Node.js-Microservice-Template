class UserError extends Error {
  constructor(msg, resCode = 500) {
    super(msg);
    this.resCode = resCode;

    return this;
  }
}

module.exports = { UserError };