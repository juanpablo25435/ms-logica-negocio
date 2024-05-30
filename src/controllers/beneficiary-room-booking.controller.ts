import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Beneficiary,
  RoomBooking,
} from '../models';
import {BeneficiaryRepository} from '../repositories';

export class BeneficiaryRoomBookingController {
  constructor(
    @repository(BeneficiaryRepository)
    public beneficiaryRepository: BeneficiaryRepository,
  ) { }

  @get('/beneficiaries/{id}/room-booking', {
    responses: {
      '200': {
        description: 'RoomBooking belonging to Beneficiary',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RoomBooking),
          },
        },
      },
    },
  })
  async getRoomBooking(
    @param.path.number('id') id: typeof Beneficiary.prototype.id,
  ): Promise<RoomBooking> {
    return this.beneficiaryRepository.roomBooking(id);
  }
}
