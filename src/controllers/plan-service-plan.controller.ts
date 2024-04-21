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
import {PlanServicePlan} from '../models';
import {PlanServicePlanRepository} from '../repositories';

export class PlanServicePlanController {
  constructor(
    @repository(PlanServicePlanRepository)
    public planServicePlanRepository : PlanServicePlanRepository,
  ) {}

  @post('/plan-service-plan')
  @response(200, {
    description: 'PlanServicePlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(PlanServicePlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicePlan, {
            title: 'NewPlanServicePlan',
            exclude: ['id'],
          }),
        },
      },
    })
    planServicePlan: Omit<PlanServicePlan, 'id'>,
  ): Promise<PlanServicePlan> {
    return this.planServicePlanRepository.create(planServicePlan);
  }

  @get('/plan-service-plan/count')
  @response(200, {
    description: 'PlanServicePlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PlanServicePlan) where?: Where<PlanServicePlan>,
  ): Promise<Count> {
    return this.planServicePlanRepository.count(where);
  }

  @get('/plan-service-plan')
  @response(200, {
    description: 'Array of PlanServicePlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PlanServicePlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PlanServicePlan) filter?: Filter<PlanServicePlan>,
  ): Promise<PlanServicePlan[]> {
    return this.planServicePlanRepository.find(filter);
  }

  @patch('/plan-service-plan')
  @response(200, {
    description: 'PlanServicePlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicePlan, {partial: true}),
        },
      },
    })
    planServicePlan: PlanServicePlan,
    @param.where(PlanServicePlan) where?: Where<PlanServicePlan>,
  ): Promise<Count> {
    return this.planServicePlanRepository.updateAll(planServicePlan, where);
  }

  @get('/plan-service-plan/{id}')
  @response(200, {
    description: 'PlanServicePlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PlanServicePlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PlanServicePlan, {exclude: 'where'}) filter?: FilterExcludingWhere<PlanServicePlan>
  ): Promise<PlanServicePlan> {
    return this.planServicePlanRepository.findById(id, filter);
  }

  @patch('/plan-service-plan/{id}')
  @response(204, {
    description: 'PlanServicePlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicePlan, {partial: true}),
        },
      },
    })
    planServicePlan: PlanServicePlan,
  ): Promise<void> {
    await this.planServicePlanRepository.updateById(id, planServicePlan);
  }

  @put('/plan-service-plan/{id}')
  @response(204, {
    description: 'PlanServicePlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() planServicePlan: PlanServicePlan,
  ): Promise<void> {
    await this.planServicePlanRepository.replaceById(id, planServicePlan);
  }

  @del('/plan-service-plan/{id}')
  @response(204, {
    description: 'PlanServicePlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planServicePlanRepository.deleteById(id);
  }
}
