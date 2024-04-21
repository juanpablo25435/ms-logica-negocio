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
  Departament,
  City,
} from '../models';
import {DepartamentRepository} from '../repositories';

export class DepartamentCityController {
  constructor(
    @repository(DepartamentRepository) protected departamentRepository: DepartamentRepository,
  ) { }

  @get('/departaments/{id}/cities', {
    responses: {
      '200': {
        description: 'Array of Departament has many City',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(City)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<City>,
  ): Promise<City[]> {
    return this.departamentRepository.cities(id).find(filter);
  }

  @post('/departaments/{id}/cities', {
    responses: {
      '200': {
        description: 'Departament model instance',
        content: {'application/json': {schema: getModelSchemaRef(City)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Departament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {
            title: 'NewCityInDepartament',
            exclude: ['id'],
            optional: ['departamentId']
          }),
        },
      },
    }) city: Omit<City, 'id'>,
  ): Promise<City> {
    return this.departamentRepository.cities(id).create(city);
  }

  @patch('/departaments/{id}/cities', {
    responses: {
      '200': {
        description: 'Departament.City PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {partial: true}),
        },
      },
    })
    city: Partial<City>,
    @param.query.object('where', getWhereSchemaFor(City)) where?: Where<City>,
  ): Promise<Count> {
    return this.departamentRepository.cities(id).patch(city, where);
  }

  @del('/departaments/{id}/cities', {
    responses: {
      '200': {
        description: 'Departament.City DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(City)) where?: Where<City>,
  ): Promise<Count> {
    return this.departamentRepository.cities(id).delete(where);
  }
}
