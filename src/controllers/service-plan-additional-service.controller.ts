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
  ServicePlan,
  AdditionalService,
} from '../models';
import {ServicePlanRepository} from '../repositories';

export class ServicePlanAdditionalServiceController {
  constructor(
    @repository(ServicePlanRepository) protected servicePlanRepository: ServicePlanRepository,
  ) { }

  @get('/service-plans/{id}/additional-services', {
    responses: {
      '200': {
        description: 'Array of ServicePlan has many AdditionalService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AdditionalService)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AdditionalService>,
  ): Promise<AdditionalService[]> {
    return this.servicePlanRepository.additionalServices(id).find(filter);
  }

  @post('/service-plans/{id}/additional-services', {
    responses: {
      '200': {
        description: 'ServicePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(AdditionalService)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicePlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalService, {
            title: 'NewAdditionalServiceInServicePlan',
            exclude: ['id'],
            optional: ['servicePlanId']
          }),
        },
      },
    }) additionalService: Omit<AdditionalService, 'id'>,
  ): Promise<AdditionalService> {
    return this.servicePlanRepository.additionalServices(id).create(additionalService);
  }

  @patch('/service-plans/{id}/additional-services', {
    responses: {
      '200': {
        description: 'ServicePlan.AdditionalService PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalService, {partial: true}),
        },
      },
    })
    additionalService: Partial<AdditionalService>,
    @param.query.object('where', getWhereSchemaFor(AdditionalService)) where?: Where<AdditionalService>,
  ): Promise<Count> {
    return this.servicePlanRepository.additionalServices(id).patch(additionalService, where);
  }

  @del('/service-plans/{id}/additional-services', {
    responses: {
      '200': {
        description: 'ServicePlan.AdditionalService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AdditionalService)) where?: Where<AdditionalService>,
  ): Promise<Count> {
    return this.servicePlanRepository.additionalServices(id).delete(where);
  }
}
