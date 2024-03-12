import { Driver, Prisma } from '@prisma/client'

export interface DriverRespository {
  findByCpf(cpf: string): Promise<Driver | null>
  findManyDrivers(page: number): Promise<Driver[]>
  findById(id: string): Promise<Driver | null>
  findByUserId(id: string): Promise<Driver | null>
  create(data: Prisma.DriverUncheckedCreateInput): Promise<Driver>
  update(vehicle: Driver): Promise<Driver>
  delete(id: string): Promise<{ message: string }>
}
