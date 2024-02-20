import { DriverRespository } from '@/repositories/driver-repository'
import { Driver } from '@prisma/client'
import { hash } from 'bcryptjs'
import { DriverAlreadyExistsError } from './error/driver-already-exist-error'

interface CreateDriverRequest {
  full_name: string
  email: string
  password: string
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
    full_name,
    email,
    password,
    cpf,
    birthDate,
    contact_number,
    licenseExpiry,
    licenseNumber,
    company_id,
  }: CreateDriverRequest): Promise<CreateDriverResponse> {
    const password_hash = await hash(password, 6)
    const driverWithSomeCpf = await this.driverRepository.findByCpf(cpf)
    const driverWithSomeEmail = await this.driverRepository.findByEmail(email)

    if (driverWithSomeCpf || driverWithSomeEmail) {
      throw new DriverAlreadyExistsError()
    }

    const driver = await this.driverRepository.create({
      full_name,
      email,
      password_hash,
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
