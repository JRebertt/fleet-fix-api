import { Driver, Prisma } from '@prisma/client'
import { DriverRespository } from '../driver-repository'

export class InMemoryDriverRepository implements DriverRespository {
  public items: Driver[] = []
  async findByCpf(cpf: string) {
    const driver = this.items.find((item) => item.cpf === cpf)

    if (!driver) {
      return null
    }

    return driver
  }

  async findByEmail(email: string) {
    const driver = this.items.find((item) => item.email === email)

    if (!driver) {
      return null
    }

    return driver
  }

  async findById(id: string) {
    const driver = this.items.find((item) => item.id === id)

    if (!driver) {
      return null
    }

    return driver
  }

  async findManyDrivers(page: number) {
    const drivers = this.items.slice((page - 1) * 20, page * 20)

    return drivers
  }

  async create(data: Prisma.DriverUncheckedCreateInput) {
    const driver = {
      id: 'driver-1',
      full_name: data.full_name,
      email: data.email,
      password_hash: data.password_hash,
      cpf: data.cpf,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      contact_number: data.contact_number ?? null,
      licenseExpiry: data.licenseExpiry ? new Date(data.licenseExpiry) : null,
      licenseNumber: data.licenseNumber ?? null,

      company_id: data.company_id,
      created_at: new Date() ?? '',
      updated_at: new Date() ?? '',
    }

    this.items.push(driver)

    return driver
  }
}
