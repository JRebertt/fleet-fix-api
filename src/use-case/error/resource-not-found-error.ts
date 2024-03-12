export class ResourceNotFoundError extends Error {
  constructor() {
    super('Recurso não encontrado.')
  }
}

export class CompanyNotFoundError extends Error {
  constructor() {
    super('Empresa não encontrada.')
  }
}

export class VehicleNotFoundError extends Error {
  constructor() {
    super('Veículo não encontrado')
  }
}

export class DriverNotFoundError extends Error {
  constructor() {
    super('Motorista não encontrado')
  }
}
