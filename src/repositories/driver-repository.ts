import { Driver, Prisma } from '@prisma/client'

export interface DriverRespository {
  findByEmail(email: string): Promise<Driver | null>
  findByCpf(cpf: string): Promise<Driver | null>
  findManyDrivers(page: number): Promise<Driver[]>
  findById(id: string): Promise<Driver | null>
  create(data: Prisma.DriverUncheckedCreateInput): Promise<Driver>
}
