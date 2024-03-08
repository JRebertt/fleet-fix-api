export class CompanyNotFoundError extends Error {
  constructor() {
    super('Empresa não encontrada.')
  }
}
