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
import {Garage} from '../models';
import {GarageRepository} from '../repositories';

export class GarageController {
  constructor(
    @repository(GarageRepository)
    public garageRepository : GarageRepository,
  ) {}

  @post('/garage')
  @response(200, {
    description: 'Garage model instance',
    content: {'application/json': {schema: getModelSchemaRef(Garage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Garage, {
            title: 'NewGarage',
            exclude: ['id'],
          }),
        },
      },
    })
    garage: Omit<Garage, 'id'>,
  ): Promise<Garage> {
    return this.garageRepository.create(garage);
  }

  @get('/garage/count')
  @response(200, {
    description: 'Garage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Garage) where?: Where<Garage>,
  ): Promise<Count> {
    return this.garageRepository.count(where);
  }

  @get('/garage')
  @response(200, {
    description: 'Array of Garage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Garage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Garage) filter?: Filter<Garage>,
  ): Promise<Garage[]> {
    return this.garageRepository.find(filter);
  }

  @patch('/garage')
  @response(200, {
    description: 'Garage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Garage, {partial: true}),
        },
      },
    })
    garage: Garage,
    @param.where(Garage) where?: Where<Garage>,
  ): Promise<Count> {
    return this.garageRepository.updateAll(garage, where);
  }

  @get('/garage/{id}')
  @response(200, {
    description: 'Garage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Garage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Garage, {exclude: 'where'}) filter?: FilterExcludingWhere<Garage>
  ): Promise<Garage> {
    return this.garageRepository.findById(id, filter);
  }

  @patch('/garage/{id}')
  @response(204, {
    description: 'Garage PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Garage, {partial: true}),
        },
      },
    })
    garage: Garage,
  ): Promise<void> {
    await this.garageRepository.updateById(id, garage);
  }

  @put('/garage/{id}')
  @response(204, {
    description: 'Garage PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() garage: Garage,
  ): Promise<void> {
    await this.garageRepository.replaceById(id, garage);
  }

  @del('/garage/{id}')
  @response(204, {
    description: 'Garage DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.garageRepository.deleteById(id);
  }
}
