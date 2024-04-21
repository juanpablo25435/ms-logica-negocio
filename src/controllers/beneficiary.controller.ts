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
import {Beneficiary} from '../models';
import {BeneficiaryRepository} from '../repositories';

export class BeneficiaryController {
  constructor(
    @repository(BeneficiaryRepository)
    public beneficiaryRepository : BeneficiaryRepository,
  ) {}

  @post('/beneficiary')
  @response(200, {
    description: 'Beneficiary model instance',
    content: {'application/json': {schema: getModelSchemaRef(Beneficiary)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiary, {
            title: 'NewBeneficiary',
            exclude: ['id'],
          }),
        },
      },
    })
    beneficiary: Omit<Beneficiary, 'id'>,
  ): Promise<Beneficiary> {
    return this.beneficiaryRepository.create(beneficiary);
  }

  @get('/beneficiary/count')
  @response(200, {
    description: 'Beneficiary model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Beneficiary) where?: Where<Beneficiary>,
  ): Promise<Count> {
    return this.beneficiaryRepository.count(where);
  }

  @get('/beneficiary')
  @response(200, {
    description: 'Array of Beneficiary model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Beneficiary, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Beneficiary) filter?: Filter<Beneficiary>,
  ): Promise<Beneficiary[]> {
    return this.beneficiaryRepository.find(filter);
  }

  @patch('/beneficiary')
  @response(200, {
    description: 'Beneficiary PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiary, {partial: true}),
        },
      },
    })
    beneficiary: Beneficiary,
    @param.where(Beneficiary) where?: Where<Beneficiary>,
  ): Promise<Count> {
    return this.beneficiaryRepository.updateAll(beneficiary, where);
  }

  @get('/beneficiary/{id}')
  @response(200, {
    description: 'Beneficiary model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Beneficiary, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Beneficiary, {exclude: 'where'}) filter?: FilterExcludingWhere<Beneficiary>
  ): Promise<Beneficiary> {
    return this.beneficiaryRepository.findById(id, filter);
  }

  @patch('/beneficiary/{id}')
  @response(204, {
    description: 'Beneficiary PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiary, {partial: true}),
        },
      },
    })
    beneficiary: Beneficiary,
  ): Promise<void> {
    await this.beneficiaryRepository.updateById(id, beneficiary);
  }

  @put('/beneficiary/{id}')
  @response(204, {
    description: 'Beneficiary PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() beneficiary: Beneficiary,
  ): Promise<void> {
    await this.beneficiaryRepository.replaceById(id, beneficiary);
  }

  @del('/beneficiary/{id}')
  @response(204, {
    description: 'Beneficiary DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.beneficiaryRepository.deleteById(id);
  }
}
