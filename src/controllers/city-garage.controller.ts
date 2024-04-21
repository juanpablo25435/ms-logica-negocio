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
  City,
  Garage,
} from '../models';
import {CityRepository} from '../repositories';

export class CityGarageController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/garages', {
    responses: {
      '200': {
        description: 'Array of City has many Garage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Garage)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Garage>,
  ): Promise<Garage[]> {
    return this.cityRepository.garages(id).find(filter);
  }

  @post('/cities/{id}/garages', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(Garage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Garage, {
            title: 'NewGarageInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) garage: Omit<Garage, 'id'>,
  ): Promise<Garage> {
    return this.cityRepository.garages(id).create(garage);
  }

  @patch('/cities/{id}/garages', {
    responses: {
      '200': {
        description: 'City.Garage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Garage, {partial: true}),
        },
      },
    })
    garage: Partial<Garage>,
    @param.query.object('where', getWhereSchemaFor(Garage)) where?: Where<Garage>,
  ): Promise<Count> {
    return this.cityRepository.garages(id).patch(garage, where);
  }

  @del('/cities/{id}/garages', {
    responses: {
      '200': {
        description: 'City.Garage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Garage)) where?: Where<Garage>,
  ): Promise<Count> {
    return this.cityRepository.garages(id).delete(where);
  }
}
