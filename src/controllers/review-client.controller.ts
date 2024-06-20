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
  Client,
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewClientController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) { }

  @get('/reviews/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Review',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof Review.prototype.id,
  ): Promise<Client> {
    return this.reviewRepository.client(id);
  }
}
