import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Beneficiary,
  ClientPlan,
} from '../models';
import {BeneficiaryRepository} from '../repositories';

export class BeneficiaryClientPlanController {
  constructor(
    @repository(BeneficiaryRepository)
    public beneficiaryRepository: BeneficiaryRepository,
  ) { }

  @get('/beneficiaries/{id}/client-plan', {
    responses: {
      '200': {
        description: 'ClientPlan belonging to Beneficiary',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClientPlan),
          },
        },
      },
    },
  })
  async getClientPlan(
    @param.path.number('id') id: typeof Beneficiary.prototype.id,
  ): Promise<ClientPlan> {
    return this.beneficiaryRepository.clientPlan(id);
  }
}
