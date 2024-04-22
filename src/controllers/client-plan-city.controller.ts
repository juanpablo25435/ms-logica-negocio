import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ClientPlan,
  City,
} from '../models';
import {ClientPlanRepository} from '../repositories';

export class ClientPlanCityController {
  constructor(
    @repository(ClientPlanRepository)
    public clientPlanRepository: ClientPlanRepository,
  ) { }

  @get('/client-plans/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to ClientPlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(City),
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof ClientPlan.prototype.id,
  ): Promise<City> {
    return this.clientPlanRepository.city(id);
  }
}
