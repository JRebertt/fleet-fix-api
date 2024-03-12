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

  async delete(id: string): Promise<{ message: string }> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index >= 0) {
      this.items.splice(index, 1)
    }
    return { message: 'Veiculo deletado com sucesso.' }
  }

  async update(vehicle: Vehicle) {
    const index = this.items.findIndex((item) => item.id === vehicle.id)

    const isValidIndex = index >= 0

    if (isValidIndex) {
      this.items[index] = vehicle
    }

    return vehicle
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
