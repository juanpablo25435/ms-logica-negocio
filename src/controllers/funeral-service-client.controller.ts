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
  Client,
} from '../models';
import {FuneralServiceRepository} from '../repositories';

export class FuneralServiceClientController {
  constructor(
    @repository(FuneralServiceRepository)
    public funeralServiceRepository: FuneralServiceRepository,
  ) { }

  @get('/funeral-services/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to FuneralService',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof FuneralService.prototype.id,
  ): Promise<Client> {
    return this.funeralServiceRepository.client(id);
  }
}
