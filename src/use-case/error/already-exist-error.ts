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

export class UsersAlreadyExistsError extends Error {
  constructor() {
    super('E-mail já existe')
  }
}

export class LicensePlateAlreadyExistError extends Error {
  constructor() {
    super('Placa já cadastrada')
  }
}
