import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AdditionalService,
  Plan,
} from '../models';
import {AdditionalServiceRepository} from '../repositories';

export class AdditionalServicePlanController {
  constructor(
    @repository(AdditionalServiceRepository)
    public additionalServiceRepository: AdditionalServiceRepository,
  ) { }

  @get('/additional-services/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to AdditionalService',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Plan),
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof AdditionalService.prototype.id,
  ): Promise<Plan> {
    return this.additionalServiceRepository.plan(id);
  }
}
