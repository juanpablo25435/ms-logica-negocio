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
  PlanServicePlan,
} from '../models';
import {ServicePlanRepository} from '../repositories';

export class ServicePlanPlanServicePlanController {
  constructor(
    @repository(ServicePlanRepository) protected servicePlanRepository: ServicePlanRepository,
  ) { }

  @get('/service-plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'Array of ServicePlan has many PlanServicePlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlanServicePlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PlanServicePlan>,
  ): Promise<PlanServicePlan[]> {
    return this.servicePlanRepository.servicePlanIncluded(id).find(filter);
  }

  @post('/service-plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'ServicePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlanServicePlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicePlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicePlan, {
            title: 'NewPlanServicePlanInServicePlan',
            exclude: ['id'],
            optional: ['servicePlanId']
          }),
        },
      },
    }) planServicePlan: Omit<PlanServicePlan, 'id'>,
  ): Promise<PlanServicePlan> {
    return this.servicePlanRepository.servicePlanIncluded(id).create(planServicePlan);
  }

  @patch('/service-plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'ServicePlan.PlanServicePlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicePlan, {partial: true}),
        },
      },
    })
    planServicePlan: Partial<PlanServicePlan>,
    @param.query.object('where', getWhereSchemaFor(PlanServicePlan)) where?: Where<PlanServicePlan>,
  ): Promise<Count> {
    return this.servicePlanRepository.servicePlanIncluded(id).patch(planServicePlan, where);
  }

  @del('/service-plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'ServicePlan.PlanServicePlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlanServicePlan)) where?: Where<PlanServicePlan>,
  ): Promise<Count> {
    return this.servicePlanRepository.servicePlanIncluded(id).delete(where);
  }
}
