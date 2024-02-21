export class VehicleNotFoundError extends Error {
  constructor() {
    super('Veículo não encontrado')
  }
}
