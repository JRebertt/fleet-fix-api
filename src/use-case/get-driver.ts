import { DriverRespository } from '@/repositories/driver-repository'
import { Driver } from '@prisma/client'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface GetDriverUseCaseRequest {
  driverId: string
}

interface GetDriverUseCaseResponse {
  driver: Driver
}

export class GetDriverUseCase {
  constructor(private repository: DriverRespository) {}

  async execute({
    driverId,
  }: GetDriverUseCaseRequest): Promise<GetDriverUseCaseResponse> {
    const driver = await this.repository.findById(driverId)

    if (!driver) {
      throw new ResourceNotFoundError()
    }

    return { driver }
  }
}
