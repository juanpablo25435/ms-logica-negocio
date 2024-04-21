import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PlanServicePlan,
  Plan,
} from '../models';
import {PlanServicePlanRepository} from '../repositories';

export class PlanServicePlanPlanController {
  constructor(
    @repository(PlanServicePlanRepository)
    public planServicePlanRepository: PlanServicePlanRepository,
  ) { }

  @get('/plan-service-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to PlanServicePlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Plan),
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof PlanServicePlan.prototype.id,
  ): Promise<Plan> {
    return this.planServicePlanRepository.includedPlan(id);
  }
}
