export class DriverAlreadyExistsError extends Error {
  constructor() {
    super('Motorista já cadastradado')
  }
}

export class CompanyAlreadyExistsError extends Error {
  constructor() {
    super('Empresa já cadastrada')
  }
}
