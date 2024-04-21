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
  Plan,
  PlanServicePlan,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPlanServicePlanController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'Array of Plan has many PlanServicePlan',
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
    return this.planRepository.includedServices(id).find(filter);
  }

  @post('/plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlanServicePlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicePlan, {
            title: 'NewPlanServicePlanInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) planServicePlan: Omit<PlanServicePlan, 'id'>,
  ): Promise<PlanServicePlan> {
    return this.planRepository.includedServices(id).create(planServicePlan);
  }

  @patch('/plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'Plan.PlanServicePlan PATCH success count',
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
    return this.planRepository.includedServices(id).patch(planServicePlan, where);
  }

  @del('/plans/{id}/plan-service-plans', {
    responses: {
      '200': {
        description: 'Plan.PlanServicePlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlanServicePlan)) where?: Where<PlanServicePlan>,
  ): Promise<Count> {
    return this.planRepository.includedServices(id).delete(where);
  }
}
