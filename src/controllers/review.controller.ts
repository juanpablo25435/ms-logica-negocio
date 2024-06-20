import {
  repository
} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {
  Review
} from '../models';
import {ClientRepository, FuneralServiceRepository, ReviewRepository} from '../repositories';

export class ReviewController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
    @repository(FuneralServiceRepository)
    public funeralServiceRepository: FuneralServiceRepository,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) { }

  @post('/funeral-service/{id}/review', {
    responses: {
      '200': {
        description: 'Review added',
      },
    },
  })
  async addReview(
    @param.path.number('id') funeralServiceId: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              clientId: {
                type: 'number'
              },
              comment: {
                type: 'string'
              },
              rating: {
                type: 'number'
              },
            },
            required: ['clientId', 'comment', 'rating'],
          },
        },
      },
    })
    reviewData: {
      clientId: number;
      comment: string;
      rating: number;
    },
  ): Promise<void> {
    const {
      clientId,
      comment,
      rating
    } = reviewData;

    // Verificar que el servicio funerario existe
    const funeralService = await this.funeralServiceRepository.findById(funeralServiceId);
    if (!funeralService) {
      throw new HttpErrors.NotFound(`FuneralService with id ${funeralServiceId} not found`);
    }

    // Verificar que el cliente existe
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new HttpErrors.NotFound(`Client with id ${clientId} not found`);
    }

    // Crear la reseña
    await this.reviewRepository.create({
      funeralServiceId,
      clientId,
      comments: comment,
      rating,
    });
  }

  @get('/funeral-service/{id}/reviews', {
    responses: {
      '200': {
        description: 'Array of Review model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': Review,
              },
            },
          },
        },
      },
    },
  })
  async findReviews(
    @param.path.number('id') funeralServiceId: number,
  ): Promise<Review[]> {
    return this.reviewRepository.find({
      where: {
        funeralServiceId
      },
    });
  }
}
