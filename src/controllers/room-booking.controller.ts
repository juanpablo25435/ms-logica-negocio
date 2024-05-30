// room-booking.controller.ts

import {
  repository
} from '@loopback/repository';
import {
  post,
  requestBody
} from '@loopback/rest';
import {RoomBooking} from '../models';
import {RoomBookingRepository} from '../repositories';

export class RoomBookingController {
  constructor(
    @repository(RoomBookingRepository)
    public roomBookingRepository: RoomBookingRepository,
  ) { }

  @post('/room-bookings', {
    responses: {
      '200': {
        description: 'Room booking created',
      },
    },
  })
  async createRoomBooking(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              roomId: {type: 'number'},
              startDate: {type: 'string', format: 'date-time'},
              endDate: {type: 'string', format: 'date-time'},
              beneficiaryId: {type: 'number'},
            },
            required: ['roomId', 'startDate', 'endDate', 'beneficiaryId'],
          },
        },
      },
    })
    roomBookingData: Omit<RoomBooking, 'id'>,
  ): Promise<RoomBooking> {
    return this.roomBookingRepository.create(roomBookingData);
  }
}
