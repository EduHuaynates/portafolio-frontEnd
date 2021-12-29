class RequiredFields extends Error {
  constructor(message) {
    super(message);
    this.message = message || "Por favor complete todos los campos";
    this.status = 409;
    this.name = "RequiredFields";
  }
}

module.exports = { RequiredFields };
