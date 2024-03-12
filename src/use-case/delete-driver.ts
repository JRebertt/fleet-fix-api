import { DriverNotFoundError } from './error/resource-not-found-error'
import { DriverRespository } from '@/repositories/driver-repository'

interface DeleteDriverRequest {
  id: string
}

interface DeleteDriverResponse {
  message: string
}

export class DeleteDriverUseCase {
  constructor(private repository: DriverRespository) {}

  async execute({ id }: DeleteDriverRequest): Promise<DeleteDriverResponse> {
    const existingDriver = await this.repository.findById(id)

    if (!existingDriver) {
      throw new DriverNotFoundError()
    }

    await this.repository.delete(existingDriver.id)

    return { message: 'Motorista deletado com sucesso' }
  }
}
