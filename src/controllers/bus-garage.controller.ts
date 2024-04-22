import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Bus,
  Garage,
} from '../models';
import {BusRepository} from '../repositories';

export class BusGarageController {
  constructor(
    @repository(BusRepository)
    public busRepository: BusRepository,
  ) { }

  @get('/buses/{id}/garage', {
    responses: {
      '200': {
        description: 'Garage belonging to Bus',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Garage),
          },
        },
      },
    },
  })
  async getGarage(
    @param.path.number('id') id: typeof Bus.prototype.id,
  ): Promise<Garage> {
    return this.busRepository.garage(id);
  }
}
