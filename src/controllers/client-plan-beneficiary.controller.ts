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
  ClientPlan,
  Beneficiary,
} from '../models';
import {ClientPlanRepository} from '../repositories';

export class ClientPlanBeneficiaryController {
  constructor(
    @repository(ClientPlanRepository) protected clientPlanRepository: ClientPlanRepository,
  ) { }

  @get('/client-plans/{id}/beneficiaries', {
    responses: {
      '200': {
        description: 'Array of ClientPlan has many Beneficiary',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Beneficiary)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Beneficiary>,
  ): Promise<Beneficiary[]> {
    return this.clientPlanRepository.beneficiaries(id).find(filter);
  }

  @post('/client-plans/{id}/beneficiaries', {
    responses: {
      '200': {
        description: 'ClientPlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Beneficiary)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ClientPlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiary, {
            title: 'NewBeneficiaryInClientPlan',
            exclude: ['id'],
            optional: ['clientPlanId']
          }),
        },
      },
    }) beneficiary: Omit<Beneficiary, 'id'>,
  ): Promise<Beneficiary> {
    return this.clientPlanRepository.beneficiaries(id).create(beneficiary);
  }

  @patch('/client-plans/{id}/beneficiaries', {
    responses: {
      '200': {
        description: 'ClientPlan.Beneficiary PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiary, {partial: true}),
        },
      },
    })
    beneficiary: Partial<Beneficiary>,
    @param.query.object('where', getWhereSchemaFor(Beneficiary)) where?: Where<Beneficiary>,
  ): Promise<Count> {
    return this.clientPlanRepository.beneficiaries(id).patch(beneficiary, where);
  }

  @del('/client-plans/{id}/beneficiaries', {
    responses: {
      '200': {
        description: 'ClientPlan.Beneficiary DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Beneficiary)) where?: Where<Beneficiary>,
  ): Promise<Count> {
    return this.clientPlanRepository.beneficiaries(id).delete(where);
  }
}
