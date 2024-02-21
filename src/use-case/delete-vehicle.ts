import { VehicleRespository } from '@/repositories/vehicles-repository'
import { VehicleNotFoundError } from './error/vehicle-not-found-error'
interface DeleteVehicleRequest {
  id: string
}

interface DeleteVehicleResponse {
  message: string
}

export class DeleteVehicleUseCase {
  constructor(private repository: VehicleRespository) {}

  async execute({ id }: DeleteVehicleRequest): Promise<DeleteVehicleResponse> {
    const existingVehicle = await this.repository.findById(id)

    if (!existingVehicle) {
      throw new VehicleNotFoundError()
    }

    await this.repository.delete(existingVehicle.id)

    return { message: 'Veiculo deletado com sucesso' }
  }
}
