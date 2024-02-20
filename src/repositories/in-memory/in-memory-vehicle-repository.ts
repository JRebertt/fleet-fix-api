import { Prisma, Vehicle } from '@prisma/client'
import { VehicleRespository } from '../vehicles-repository'

export class InMemoryVehicleRepository implements VehicleRespository {
  public items: Vehicle[] = []
  async findByLicensePlate(licensePlate: string) {
    const vehicle = this.items.find(
      (item) => item.licensePlate === licensePlate,
    )

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async update(id: string, data: Prisma.VehicleUpdateInput) {
    // Encontra o índice do veículo no array 'items' com base no 'id'
    const index = this.items.findIndex((vehicle) => vehicle.id === data.id)

    const isValidIndex = index >= 0

    if (isValidIndex) {
      return (this.items[index] = data)
    }

    // Retorna o veículo atualizado
    return data
  }

  async findById(id: string) {
    const vehicle = this.items.find((item) => item.id === id)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findManyVehicles(page: number) {
    const vehicles = this.items.slice((page - 1) * 20, page * 20)

    return vehicles
  }

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = {
      id: 'vehicle-1',
      make: data.make,
      model: data.model,
      year: data.year,
      licensePlate: data.licensePlate,
      vin: data.vin,
      company_id: data.company_id,
      driver_id: data.driver_id,
    }

    this.items.push(vehicle)

    return vehicle
  }
}
