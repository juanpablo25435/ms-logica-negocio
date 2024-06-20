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
  FuneralService,
  Review,
} from '../models';
import {FuneralServiceRepository} from '../repositories';

export class FuneralServiceReviewController {
  constructor(
    @repository(FuneralServiceRepository) protected funeralServiceRepository: FuneralServiceRepository,
  ) { }

  @get('/funeral-services/{id}/reviews', {
    responses: {
      '200': {
        description: 'Array of FuneralService has many Review',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Review)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Review>,
  ): Promise<Review[]> {
    return this.funeralServiceRepository.reviews(id).find(filter);
  }

  @post('/funeral-services/{id}/reviews', {
    responses: {
      '200': {
        description: 'FuneralService model instance',
        content: {'application/json': {schema: getModelSchemaRef(Review)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof FuneralService.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReviewInFuneralService',
            exclude: ['id'],
            optional: ['funeralServiceId']
          }),
        },
      },
    }) review: Omit<Review, 'id'>,
  ): Promise<Review> {
    return this.funeralServiceRepository.reviews(id).create(review);
  }

  @patch('/funeral-services/{id}/reviews', {
    responses: {
      '200': {
        description: 'FuneralService.Review PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Partial<Review>,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.funeralServiceRepository.reviews(id).patch(review, where);
  }

  @del('/funeral-services/{id}/reviews', {
    responses: {
      '200': {
        description: 'FuneralService.Review DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.funeralServiceRepository.reviews(id).delete(where);
  }
}
