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
  ClientPlan,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientClientPlanController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/client-plan', {
    responses: {
      '200': {
        description: 'Client has one ClientPlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClientPlan),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ClientPlan>,
  ): Promise<ClientPlan> {
    return this.clientRepository.clientPlan(id).get(filter);
  }

  @post('/clients/{id}/client-plan', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientPlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientPlan, {
            title: 'NewClientPlanInClient',
            exclude: ['id'],
            optional: ['clientId']
          }),
        },
      },
    }) clientPlan: Omit<ClientPlan, 'id'>,
  ): Promise<ClientPlan> {
    return this.clientRepository.clientPlan(id).create(clientPlan);
  }

  @patch('/clients/{id}/client-plan', {
    responses: {
      '200': {
        description: 'Client.ClientPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientPlan, {partial: true}),
        },
      },
    })
    clientPlan: Partial<ClientPlan>,
    @param.query.object('where', getWhereSchemaFor(ClientPlan)) where?: Where<ClientPlan>,
  ): Promise<Count> {
    return this.clientRepository.clientPlan(id).patch(clientPlan, where);
  }

  @del('/clients/{id}/client-plan', {
    responses: {
      '200': {
        description: 'Client.ClientPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ClientPlan)) where?: Where<ClientPlan>,
  ): Promise<Count> {
    return this.clientRepository.clientPlan(id).delete(where);
  }
}
