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
  Room,
} from '../models';
import {CityRepository} from '../repositories';

export class CityRoomController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/rooms', {
    responses: {
      '200': {
        description: 'Array of City has many Room',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Room)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Room>,
  ): Promise<Room[]> {
    return this.cityRepository.rooms(id).find(filter);
  }

  @post('/cities/{id}/rooms', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoomInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) room: Omit<Room, 'id'>,
  ): Promise<Room> {
    return this.cityRepository.rooms(id).create(room);
  }

  @patch('/cities/{id}/rooms', {
    responses: {
      '200': {
        description: 'City.Room PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {partial: true}),
        },
      },
    })
    room: Partial<Room>,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.cityRepository.rooms(id).patch(room, where);
  }

  @del('/cities/{id}/rooms', {
    responses: {
      '200': {
        description: 'City.Room DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.cityRepository.rooms(id).delete(where);
  }
}
