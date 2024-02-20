import { Prisma, Vehicle } from '@prisma/client'

export interface VehicleRespository {
  findByLicensePlate(licensePlate: string): Promise<Vehicle | null>
  findManyVehicles(page: number): Promise<Vehicle[]>
  findById(id: string): Promise<Vehicle | null>
  create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
  update(id: string, data: Prisma.VehicleUpdateInput): Promise<Vehicle>
}
