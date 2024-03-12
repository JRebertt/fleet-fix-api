import { Driver } from '@prisma/client'
import { DriverNotFoundError } from './error/resource-not-found-error'
import { DriverRespository } from '@/repositories/driver-repository'
import { DriverAlreadyExistsError } from './error/already-exist-error'

interface UpdateDriverRequest {
  id: string
  cpf: string
  contact_number: string
  birthDate: Date
  licenseNumber: string
  licenseExpiry: Date
  company_id: string
}

interface UpdateDriverResponse {
  driver: Driver
}

export class UpdateDriverUseCase {
  constructor(private driverRepository: DriverRespository) {}

  async execute({
    id,
    cpf,
    birthDate,
    contact_number,
    licenseExpiry,
    licenseNumber,
    company_id,
  }: UpdateDriverRequest): Promise<UpdateDriverResponse> {
    const existingDriver = await this.driverRepository.findById(id)

    if (!existingDriver) {
      throw new DriverNotFoundError()
    }

    if (cpf === existingDriver.cpf) {
      throw new DriverAlreadyExistsError()
    }

    const vehicleWithSameLicensePlate =
      await this.driverRepository.findByCpf(cpf)

    if (vehicleWithSameLicensePlate && vehicleWithSameLicensePlate.id !== id) {
      throw new DriverAlreadyExistsError()
    }

    existingDriver.cpf = cpf ?? existingDriver.cpf
    existingDriver.birthDate = birthDate ?? existingDriver.birthDate
    existingDriver.licenseExpiry = licenseExpiry ?? existingDriver.licenseExpiry
    existingDriver.licenseNumber = licenseNumber ?? existingDriver.licenseNumber
    existingDriver.company_id = company_id ?? existingDriver.company_id
    existingDriver.contact_number =
      contact_number ?? existingDriver.contact_number

    const updatedDriver = await this.driverRepository.update(existingDriver)

    return { driver: updatedDriver }
  }
}
