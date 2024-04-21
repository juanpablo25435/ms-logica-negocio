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
import {ServicePlan} from '../models';
import {ServicePlanRepository} from '../repositories';

export class ServicePlanController {
  constructor(
    @repository(ServicePlanRepository)
    public servicePlanRepository : ServicePlanRepository,
  ) {}

  @post('/service-plan')
  @response(200, {
    description: 'ServicePlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServicePlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePlan, {
            title: 'NewServicePlan',
            exclude: ['id'],
          }),
        },
      },
    })
    servicePlan: Omit<ServicePlan, 'id'>,
  ): Promise<ServicePlan> {
    return this.servicePlanRepository.create(servicePlan);
  }

  @get('/service-plan/count')
  @response(200, {
    description: 'ServicePlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServicePlan) where?: Where<ServicePlan>,
  ): Promise<Count> {
    return this.servicePlanRepository.count(where);
  }

  @get('/service-plan')
  @response(200, {
    description: 'Array of ServicePlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServicePlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServicePlan) filter?: Filter<ServicePlan>,
  ): Promise<ServicePlan[]> {
    return this.servicePlanRepository.find(filter);
  }

  @patch('/service-plan')
  @response(200, {
    description: 'ServicePlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePlan, {partial: true}),
        },
      },
    })
    servicePlan: ServicePlan,
    @param.where(ServicePlan) where?: Where<ServicePlan>,
  ): Promise<Count> {
    return this.servicePlanRepository.updateAll(servicePlan, where);
  }

  @get('/service-plan/{id}')
  @response(200, {
    description: 'ServicePlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServicePlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ServicePlan, {exclude: 'where'}) filter?: FilterExcludingWhere<ServicePlan>
  ): Promise<ServicePlan> {
    return this.servicePlanRepository.findById(id, filter);
  }

  @patch('/service-plan/{id}')
  @response(204, {
    description: 'ServicePlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePlan, {partial: true}),
        },
      },
    })
    servicePlan: ServicePlan,
  ): Promise<void> {
    await this.servicePlanRepository.updateById(id, servicePlan);
  }

  @put('/service-plan/{id}')
  @response(204, {
    description: 'ServicePlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servicePlan: ServicePlan,
  ): Promise<void> {
    await this.servicePlanRepository.replaceById(id, servicePlan);
  }

  @del('/service-plan/{id}')
  @response(204, {
    description: 'ServicePlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servicePlanRepository.deleteById(id);
  }
}
