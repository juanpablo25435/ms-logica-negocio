import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Room,
  City,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomCityController {
  constructor(
    @repository(RoomRepository)
    public roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Room',
        content: {
          'application/json': {
            schema: getModelSchemaRef(City),
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof Room.prototype.id,
  ): Promise<City> {
    return this.roomRepository.roomCity(id);
  }
}
