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
  Garage,
  Bus,
} from '../models';
import {GarageRepository} from '../repositories';

export class GarageBusController {
  constructor(
    @repository(GarageRepository) protected garageRepository: GarageRepository,
  ) { }

  @get('/garages/{id}/buses', {
    responses: {
      '200': {
        description: 'Array of Garage has many Bus',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bus)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bus>,
  ): Promise<Bus[]> {
    return this.garageRepository.buses(id).find(filter);
  }

  @post('/garages/{id}/buses', {
    responses: {
      '200': {
        description: 'Garage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bus)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Garage.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {
            title: 'NewBusInGarage',
            exclude: ['id'],
            optional: ['garageId']
          }),
        },
      },
    }) bus: Omit<Bus, 'id'>,
  ): Promise<Bus> {
    return this.garageRepository.buses(id).create(bus);
  }

  @patch('/garages/{id}/buses', {
    responses: {
      '200': {
        description: 'Garage.Bus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {partial: true}),
        },
      },
    })
    bus: Partial<Bus>,
    @param.query.object('where', getWhereSchemaFor(Bus)) where?: Where<Bus>,
  ): Promise<Count> {
    return this.garageRepository.buses(id).patch(bus, where);
  }

  @del('/garages/{id}/buses', {
    responses: {
      '200': {
        description: 'Garage.Bus DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bus)) where?: Where<Bus>,
  ): Promise<Count> {
    return this.garageRepository.buses(id).delete(where);
  }
}
