import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Client,
  FuneralService,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientFuneralServiceController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'Array of Client has many FuneralService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FuneralService)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FuneralService>,
  ): Promise<FuneralService[]> {
    return this.clientRepository.funeralServices(id).find(filter);
  }

  @post('/clients/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(FuneralService)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FuneralService, {
            title: 'NewFuneralServiceInClient',
            exclude: ['id'],
            optional: ['clientId']
          }),
        },
      },
    }) funeralService: Omit<FuneralService, 'id'>,
  ): Promise<FuneralService> {
    return this.clientRepository.funeralServices(id).create(funeralService);
  }

  @patch('/clients/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'Client.FuneralService PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FuneralService, {partial: true}),
        },
      },
    })
    funeralService: Partial<FuneralService>,
    @param.query.object('where', getWhereSchemaFor(FuneralService)) where?: Where<FuneralService>,
  ): Promise<Count> {
    return this.clientRepository.funeralServices(id).patch(funeralService, where);
  }

  @del('/clients/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'Client.FuneralService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FuneralService)) where?: Where<FuneralService>,
  ): Promise<Count> {
    return this.clientRepository.funeralServices(id).delete(where);
  }
}
