import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Review,
  FuneralService,
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewFuneralServiceController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) { }

  @get('/reviews/{id}/funeral-service', {
    responses: {
      '200': {
        description: 'FuneralService belonging to Review',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FuneralService),
          },
        },
      },
    },
  })
  async getFuneralService(
    @param.path.number('id') id: typeof Review.prototype.id,
  ): Promise<FuneralService> {
    return this.reviewRepository.funeralService(id);
  }
}
