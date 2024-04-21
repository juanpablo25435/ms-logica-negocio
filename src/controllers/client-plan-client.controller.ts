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
  Client,
} from '../models';
import {ClientPlanRepository} from '../repositories';

export class ClientPlanClientController {
  constructor(
    @repository(ClientPlanRepository)
    public clientPlanRepository: ClientPlanRepository,
  ) { }

  @get('/client-plans/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to ClientPlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof ClientPlan.prototype.id,
  ): Promise<Client> {
    return this.clientPlanRepository.plan(id);
  }
}
