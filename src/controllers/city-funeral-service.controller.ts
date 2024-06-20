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
  FuneralService,
} from '../models';
import {CityRepository} from '../repositories';

export class CityFuneralServiceController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'Array of City has many FuneralService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FuneralService)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FuneralService>,
  ): Promise<FuneralService[]> {
    return this.cityRepository.funeralServices(id).find(filter);
  }

  @post('/cities/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(FuneralService)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FuneralService, {
            title: 'NewFuneralServiceInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) funeralService: Omit<FuneralService, 'id'>,
  ): Promise<FuneralService> {
    return this.cityRepository.funeralServices(id).create(funeralService);
  }

  @patch('/cities/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'City.FuneralService PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FuneralService, {partial: true}),
        },
      },
    })
    funeralService: Partial<FuneralService>,
    @param.query.object('where', getWhereSchemaFor(FuneralService)) where?: Where<FuneralService>,
  ): Promise<Count> {
    return this.cityRepository.funeralServices(id).patch(funeralService, where);
  }

  @del('/cities/{id}/funeral-services', {
    responses: {
      '200': {
        description: 'City.FuneralService DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FuneralService)) where?: Where<FuneralService>,
  ): Promise<Count> {
    return this.cityRepository.funeralServices(id).delete(where);
  }
}
