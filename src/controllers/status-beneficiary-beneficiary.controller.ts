import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  StatusBeneficiary,
  Beneficiary,
} from '../models';
import {StatusBeneficiaryRepository} from '../repositories';

export class StatusBeneficiaryBeneficiaryController {
  constructor(
    @repository(StatusBeneficiaryRepository)
    public statusBeneficiaryRepository: StatusBeneficiaryRepository,
  ) { }

  @get('/status-beneficiaries/{id}/beneficiary', {
    responses: {
      '200': {
        description: 'Beneficiary belonging to StatusBeneficiary',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Beneficiary),
          },
        },
      },
    },
  })
  async getBeneficiary(
    @param.path.number('id') id: typeof StatusBeneficiary.prototype.id,
  ): Promise<Beneficiary> {
    return this.statusBeneficiaryRepository.beneficiary(id);
  }
}
