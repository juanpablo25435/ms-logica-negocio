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
import {Departament} from '../models';
import {DepartamentRepository} from '../repositories';

export class DepartmentController {
  constructor(
    @repository(DepartamentRepository)
    public departamentRepository : DepartamentRepository,
  ) {}

  @post('/department')
  @response(200, {
    description: 'Departament model instance',
    content: {'application/json': {schema: getModelSchemaRef(Departament)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departament, {
            title: 'NewDepartament',
            exclude: ['id'],
          }),
        },
      },
    })
    departament: Omit<Departament, 'id'>,
  ): Promise<Departament> {
    return this.departamentRepository.create(departament);
  }

  @get('/department/count')
  @response(200, {
    description: 'Departament model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Departament) where?: Where<Departament>,
  ): Promise<Count> {
    return this.departamentRepository.count(where);
  }

  @get('/department')
  @response(200, {
    description: 'Array of Departament model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Departament, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Departament) filter?: Filter<Departament>,
  ): Promise<Departament[]> {
    return this.departamentRepository.find(filter);
  }

  @patch('/department')
  @response(200, {
    description: 'Departament PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departament, {partial: true}),
        },
      },
    })
    departament: Departament,
    @param.where(Departament) where?: Where<Departament>,
  ): Promise<Count> {
    return this.departamentRepository.updateAll(departament, where);
  }

  @get('/department/{id}')
  @response(200, {
    description: 'Departament model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Departament, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Departament, {exclude: 'where'}) filter?: FilterExcludingWhere<Departament>
  ): Promise<Departament> {
    return this.departamentRepository.findById(id, filter);
  }

  @patch('/department/{id}')
  @response(204, {
    description: 'Departament PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departament, {partial: true}),
        },
      },
    })
    departament: Departament,
  ): Promise<void> {
    await this.departamentRepository.updateById(id, departament);
  }

  @put('/department/{id}')
  @response(204, {
    description: 'Departament PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() departament: Departament,
  ): Promise<void> {
    await this.departamentRepository.replaceById(id, departament);
  }

  @del('/department/{id}')
  @response(204, {
    description: 'Departament DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departamentRepository.deleteById(id);
  }
}
