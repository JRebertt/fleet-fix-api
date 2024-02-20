export class LicensePlateAlreadyExistError extends Error {
  constructor() {
    super('Placa já cadastrada')
  }
}
