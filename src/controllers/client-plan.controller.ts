import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ClientPlan} from '../models';
import {ClientPlanRepository} from '../repositories';

export class ClientPlanController {
  constructor(
    @repository(ClientPlanRepository)
    public clientPlanRepository : ClientPlanRepository,
  ) {}

  @post('/client-plan')
  @response(200, {
    description: 'ClientPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClientPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientPlan, {
            title: 'NewClientPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    clientPlan: Omit<ClientPlan, 'id'>,
  ): Promise<ClientPlan> {
    return this.clientPlanRepository.create(clientPlan);
  }

  @get('/client-plan/count')
  @response(200, {
    description: 'ClientPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClientPlan) where?: Where<ClientPlan>,
  ): Promise<Count> {
    return this.clientPlanRepository.count(where);
  }

  @get('/client-plan')
  @response(200, {
    description: 'Array of ClientPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ClientPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ClientPlan) filter?: Filter<ClientPlan>,
  ): Promise<ClientPlan[]> {
    return this.clientPlanRepository.find(filter);
  }

  @patch('/client-plan')
  @response(200, {
    description: 'ClientPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientPlan, {partial: true}),
        },
      },
    })
    clientPlan: ClientPlan,
    @param.where(ClientPlan) where?: Where<ClientPlan>,
  ): Promise<Count> {
    return this.clientPlanRepository.updateAll(clientPlan, where);
  }

  @get('/client-plan/{id}')
  @response(200, {
    description: 'ClientPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClientPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ClientPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<ClientPlan>
  ): Promise<ClientPlan> {
    return this.clientPlanRepository.findById(id, filter);
  }

  @patch('/client-plan/{id}')
  @response(204, {
    description: 'ClientPlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientPlan, {partial: true}),
        },
      },
    })
    clientPlan: ClientPlan,
  ): Promise<void> {
    await this.clientPlanRepository.updateById(id, clientPlan);
  }

  @put('/client-plan/{id}')
  @response(204, {
    description: 'ClientPlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() clientPlan: ClientPlan,
  ): Promise<void> {
    await this.clientPlanRepository.replaceById(id, clientPlan);
  }

  @del('/client-plan/{id}')
  @response(204, {
    description: 'ClientPlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientPlanRepository.deleteById(id);
  }
}
