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
import {StatusBeneficiary} from '../models';
import {StatusBeneficiaryRepository} from '../repositories';

export class StatusBeneficiaryController {
  constructor(
    @repository(StatusBeneficiaryRepository)
    public statusBeneficiaryRepository : StatusBeneficiaryRepository,
  ) {}

  @post('/status-beneficiary')
  @response(200, {
    description: 'StatusBeneficiary model instance',
    content: {'application/json': {schema: getModelSchemaRef(StatusBeneficiary)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusBeneficiary, {
            title: 'NewStatusBeneficiary',
            exclude: ['id'],
          }),
        },
      },
    })
    statusBeneficiary: Omit<StatusBeneficiary, 'id'>,
  ): Promise<StatusBeneficiary> {
    return this.statusBeneficiaryRepository.create(statusBeneficiary);
  }

  @get('/status-beneficiary/count')
  @response(200, {
    description: 'StatusBeneficiary model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(StatusBeneficiary) where?: Where<StatusBeneficiary>,
  ): Promise<Count> {
    return this.statusBeneficiaryRepository.count(where);
  }

  @get('/status-beneficiary')
  @response(200, {
    description: 'Array of StatusBeneficiary model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(StatusBeneficiary, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(StatusBeneficiary) filter?: Filter<StatusBeneficiary>,
  ): Promise<StatusBeneficiary[]> {
    return this.statusBeneficiaryRepository.find(filter);
  }

  @patch('/status-beneficiary')
  @response(200, {
    description: 'StatusBeneficiary PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusBeneficiary, {partial: true}),
        },
      },
    })
    statusBeneficiary: StatusBeneficiary,
    @param.where(StatusBeneficiary) where?: Where<StatusBeneficiary>,
  ): Promise<Count> {
    return this.statusBeneficiaryRepository.updateAll(statusBeneficiary, where);
  }

  @get('/status-beneficiary/{id}')
  @response(200, {
    description: 'StatusBeneficiary model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(StatusBeneficiary, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(StatusBeneficiary, {exclude: 'where'}) filter?: FilterExcludingWhere<StatusBeneficiary>
  ): Promise<StatusBeneficiary> {
    return this.statusBeneficiaryRepository.findById(id, filter);
  }

  @patch('/status-beneficiary/{id}')
  @response(204, {
    description: 'StatusBeneficiary PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusBeneficiary, {partial: true}),
        },
      },
    })
    statusBeneficiary: StatusBeneficiary,
  ): Promise<void> {
    await this.statusBeneficiaryRepository.updateById(id, statusBeneficiary);
  }

  @put('/status-beneficiary/{id}')
  @response(204, {
    description: 'StatusBeneficiary PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() statusBeneficiary: StatusBeneficiary,
  ): Promise<void> {
    await this.statusBeneficiaryRepository.replaceById(id, statusBeneficiary);
  }

  @del('/status-beneficiary/{id}')
  @response(204, {
    description: 'StatusBeneficiary DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.statusBeneficiaryRepository.deleteById(id);
  }
}
