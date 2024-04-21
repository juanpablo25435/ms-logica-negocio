import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Garage,
  City,
} from '../models';
import {GarageRepository} from '../repositories';

export class GarageCityController {
  constructor(
    @repository(GarageRepository)
    public garageRepository: GarageRepository,
  ) { }

  @get('/garages/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Garage',
        content: {
          'application/json': {
            schema: getModelSchemaRef(City),
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof Garage.prototype.id,
  ): Promise<City> {
    return this.garageRepository.city(id);
  }
}
