import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FuneralService,
  City,
} from '../models';
import {FuneralServiceRepository} from '../repositories';

export class FuneralServiceCityController {
  constructor(
    @repository(FuneralServiceRepository)
    public funeralServiceRepository: FuneralServiceRepository,
  ) { }

  @get('/funeral-services/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to FuneralService',
        content: {
          'application/json': {
            schema: getModelSchemaRef(City),
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof FuneralService.prototype.id,
  ): Promise<City> {
    return this.funeralServiceRepository.city(id);
  }
}
