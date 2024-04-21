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
import {AdditionalService} from '../models';
import {AdditionalServiceRepository} from '../repositories';

export class AdditionalServiceController {
  constructor(
    @repository(AdditionalServiceRepository)
    public additionalServiceRepository : AdditionalServiceRepository,
  ) {}

  @post('/additional-service')
  @response(200, {
    description: 'AdditionalService model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdditionalService)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalService, {
            title: 'NewAdditionalService',
            exclude: ['id'],
          }),
        },
      },
    })
    additionalService: Omit<AdditionalService, 'id'>,
  ): Promise<AdditionalService> {
    return this.additionalServiceRepository.create(additionalService);
  }

  @get('/additional-service/count')
  @response(200, {
    description: 'AdditionalService model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdditionalService) where?: Where<AdditionalService>,
  ): Promise<Count> {
    return this.additionalServiceRepository.count(where);
  }

  @get('/additional-service')
  @response(200, {
    description: 'Array of AdditionalService model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdditionalService, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdditionalService) filter?: Filter<AdditionalService>,
  ): Promise<AdditionalService[]> {
    return this.additionalServiceRepository.find(filter);
  }

  @patch('/additional-service')
  @response(200, {
    description: 'AdditionalService PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalService, {partial: true}),
        },
      },
    })
    additionalService: AdditionalService,
    @param.where(AdditionalService) where?: Where<AdditionalService>,
  ): Promise<Count> {
    return this.additionalServiceRepository.updateAll(additionalService, where);
  }

  @get('/additional-service/{id}')
  @response(200, {
    description: 'AdditionalService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdditionalService, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AdditionalService, {exclude: 'where'}) filter?: FilterExcludingWhere<AdditionalService>
  ): Promise<AdditionalService> {
    return this.additionalServiceRepository.findById(id, filter);
  }

  @patch('/additional-service/{id}')
  @response(204, {
    description: 'AdditionalService PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalService, {partial: true}),
        },
      },
    })
    additionalService: AdditionalService,
  ): Promise<void> {
    await this.additionalServiceRepository.updateById(id, additionalService);
  }

  @put('/additional-service/{id}')
  @response(204, {
    description: 'AdditionalService PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() additionalService: AdditionalService,
  ): Promise<void> {
    await this.additionalServiceRepository.replaceById(id, additionalService);
  }

  @del('/additional-service/{id}')
  @response(204, {
    description: 'AdditionalService DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.additionalServiceRepository.deleteById(id);
  }
}
