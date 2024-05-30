import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RoomBooking,
  Beneficiary,
} from '../models';
import {RoomBookingRepository} from '../repositories';

export class RoomBookingBeneficiaryController {
  constructor(
    @repository(RoomBookingRepository)
    public roomBookingRepository: RoomBookingRepository,
  ) { }

  @get('/room-bookings/{id}/beneficiary', {
    responses: {
      '200': {
        description: 'Beneficiary belonging to RoomBooking',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Beneficiary),
          },
        },
      },
    },
  })
  async getBeneficiary(
    @param.path.number('id') id: typeof RoomBooking.prototype.id,
  ): Promise<Beneficiary> {
    return this.roomBookingRepository.beneficiary(id);
  }
}
