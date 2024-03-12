import { DriverRespository } from '@/repositories/driver-repository'
import { Driver } from '@prisma/client'
import { DriverAlreadyExistsError } from './error/already-exist-error'

interface CreateDriverRequest {
  user_id: string
  cpf: string
  contact_number: string
  birthDate: Date
  licenseNumber: string
  licenseExpiry: Date
  company_id: string
}

interface CreateDriverResponse {
  driver: Driver
}

export class CreateDriverUseCase {
  constructor(private driverRepository: DriverRespository) {}

  async execute({
    user_id,
    cpf,
    birthDate,
    contact_number,
    licenseExpiry,
    licenseNumber,
    company_id,
  }: CreateDriverRequest): Promise<CreateDriverResponse> {
    const driverWithSomeUserId =
      await this.driverRepository.findByUserId(user_id)
    const driverWithSomeCpf = await this.driverRepository.findByCpf(cpf)

    if (driverWithSomeCpf || driverWithSomeUserId) {
      throw new DriverAlreadyExistsError()
    }

    const driver = await this.driverRepository.create({
      user_id,
      cpf,
      birthDate,
      contact_number,
      licenseExpiry,
      licenseNumber,
      company_id,
    })

    return {
      driver,
    }
  }
}
