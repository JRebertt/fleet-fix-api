export class UsersAlreadyExistsError extends Error {
  constructor() {
    super('E-mail já existe')
  }
}
