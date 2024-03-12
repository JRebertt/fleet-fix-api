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

  async findByUserId(id: string) {
    const driver = this.items.find((item) => item.user_id === id)

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
      cpf: data.cpf,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      contact_number: data.contact_number ?? null,
      licenseExpiry: data.licenseExpiry ? new Date(data.licenseExpiry) : null,
      licenseNumber: data.licenseNumber ?? null,
      user_id: data.user_id,
      company_id: data.company_id,
      created_at: new Date() ?? '',
      updated_at: new Date() ?? '',
    }

    this.items.push(driver)

    return driver
  }

  async delete(id: string): Promise<{ message: string }> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index >= 0) {
      this.items.splice(index, 1)
    }
    return { message: 'Motorista deletado com sucesso.' }
  }

  async update(driver: Driver) {
    const index = this.items.findIndex((item) => item.id === driver.id)

    const isValidIndex = index >= 0

    if (isValidIndex) {
      this.items[index] = driver
    }

    return driver
  }
}
