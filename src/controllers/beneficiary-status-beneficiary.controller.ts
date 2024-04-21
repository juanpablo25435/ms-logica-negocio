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
  Beneficiary,
  StatusBeneficiary,
} from '../models';
import {BeneficiaryRepository} from '../repositories';

export class BeneficiaryStatusBeneficiaryController {
  constructor(
    @repository(BeneficiaryRepository) protected beneficiaryRepository: BeneficiaryRepository,
  ) { }

  @get('/beneficiaries/{id}/status-beneficiary', {
    responses: {
      '200': {
        description: 'Beneficiary has one StatusBeneficiary',
        content: {
          'application/json': {
            schema: getModelSchemaRef(StatusBeneficiary),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<StatusBeneficiary>,
  ): Promise<StatusBeneficiary> {
    return this.beneficiaryRepository.statusBeneficiary(id).get(filter);
  }

  @post('/beneficiaries/{id}/status-beneficiary', {
    responses: {
      '200': {
        description: 'Beneficiary model instance',
        content: {'application/json': {schema: getModelSchemaRef(StatusBeneficiary)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Beneficiary.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusBeneficiary, {
            title: 'NewStatusBeneficiaryInBeneficiary',
            exclude: ['id'],
            optional: ['beneficiaryId']
          }),
        },
      },
    }) statusBeneficiary: Omit<StatusBeneficiary, 'id'>,
  ): Promise<StatusBeneficiary> {
    return this.beneficiaryRepository.statusBeneficiary(id).create(statusBeneficiary);
  }

  @patch('/beneficiaries/{id}/status-beneficiary', {
    responses: {
      '200': {
        description: 'Beneficiary.StatusBeneficiary PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusBeneficiary, {partial: true}),
        },
      },
    })
    statusBeneficiary: Partial<StatusBeneficiary>,
    @param.query.object('where', getWhereSchemaFor(StatusBeneficiary)) where?: Where<StatusBeneficiary>,
  ): Promise<Count> {
    return this.beneficiaryRepository.statusBeneficiary(id).patch(statusBeneficiary, where);
  }

  @del('/beneficiaries/{id}/status-beneficiary', {
    responses: {
      '200': {
        description: 'Beneficiary.StatusBeneficiary DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(StatusBeneficiary)) where?: Where<StatusBeneficiary>,
  ): Promise<Count> {
    return this.beneficiaryRepository.statusBeneficiary(id).delete(where);
  }
}
