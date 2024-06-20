import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FuneralService,
  Beneficiary,
} from '../models';
import {FuneralServiceRepository} from '../repositories';

export class FuneralServiceBeneficiaryController {
  constructor(
    @repository(FuneralServiceRepository)
    public funeralServiceRepository: FuneralServiceRepository,
  ) { }

  @get('/funeral-services/{id}/beneficiary', {
    responses: {
      '200': {
        description: 'Beneficiary belonging to FuneralService',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Beneficiary),
          },
        },
      },
    },
  })
  async getBeneficiary(
    @param.path.number('id') id: typeof FuneralService.prototype.id,
  ): Promise<Beneficiary> {
    return this.funeralServiceRepository.beneficiary(id);
  }
}
