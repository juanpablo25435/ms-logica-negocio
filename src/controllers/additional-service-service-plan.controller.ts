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
  ServicePlan,
} from '../models';
import {AdditionalServiceRepository} from '../repositories';

export class AdditionalServiceServicePlanController {
  constructor(
    @repository(AdditionalServiceRepository)
    public additionalServiceRepository: AdditionalServiceRepository,
  ) { }

  @get('/additional-services/{id}/service-plan', {
    responses: {
      '200': {
        description: 'ServicePlan belonging to AdditionalService',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicePlan),
          },
        },
      },
    },
  })
  async getServicePlan(
    @param.path.number('id') id: typeof AdditionalService.prototype.id,
  ): Promise<ServicePlan> {
    return this.additionalServiceRepository.principalService(id);
  }
}
