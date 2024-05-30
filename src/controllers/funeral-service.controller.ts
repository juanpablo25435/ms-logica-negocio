import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {io} from 'socket.io-client';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {Beneficiary, City, Client, ClientPlan, Garage, Room} from '../models';
import {BeneficiaryRepository, BusRepository, CityRepository, ClientPlanRepository, ClientRepository, GarageRepository, RoomBookingRepository, RoomRepository, ServicePlanRepository} from '../repositories';
import {NotificacionesService} from '../services';
export class FuneralServiceController {
  constructor(
    @repository(BeneficiaryRepository)
    public beneficiaryRepository: BeneficiaryRepository,
    @repository(BusRepository)
    public busRepository: BusRepository,
    @repository(RoomRepository)
    public roomRepository: RoomRepository,
    @repository(CityRepository)
    public cityRepository: CityRepository,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
    @repository(ServicePlanRepository)
    public servicePlanRepository: ServicePlanRepository,
    @repository(ClientPlanRepository)
    public clientPlanRepository: ClientPlanRepository,
    @repository(GarageRepository)
    public garageRepository: GarageRepository,
    @repository(RoomBookingRepository)
    public roomBookingRepository: RoomBookingRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService
  ) { }

  @post('/funeral-service', {
    responses: {
      '200': {
        description: 'Funeral service processed',
      },
    },
  })
  async processFuneralService(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              beneficiaryId: {type: 'number'},
              location: {type: 'number'}, // Cambiado a location como cityId
              entryDateTime: {type: 'string'},
              exitDateTime: {type: 'string'},
              traditionalBurial: {type: 'boolean'}, // Agregado traditionalBurial
            },
            required: ['beneficiaryId', 'location', 'entryDateTime', 'exitDateTime', 'traditionalBurial'], // Asegurarse de requerir traditionalBurial
          },
        },
      },
    })
    requestData: {
      beneficiaryId: number;
      location: number; // Cambiado a location como cityId
      entryDateTime: string;
      exitDateTime: string;
      traditionalBurial: boolean; // Agregado traditionalBurial
    },
  ): Promise<void> {
    const {beneficiaryId, location, entryDateTime, exitDateTime, traditionalBurial} = requestData;

    // Obtener el beneficiario
    const beneficiary: Beneficiary | null = await this.beneficiaryRepository.findById(beneficiaryId, {include: ['clientPlan']});
    if (!beneficiary) {
      throw new HttpErrors.NotFound(`Beneficiary with id ${beneficiaryId} not found`);
    }

    // Obtener el plan del cliente
    const clientPlan: ClientPlan | null = await this.clientPlanRepository.findById(beneficiary.clientPlanId);
    if (!clientPlan) {
      throw new HttpErrors.NotFound(`ClientPlan with id ${beneficiary.clientPlanId} not found`);
    }

    // Obtener el cliente
    const client: Client | null = await this.clientRepository.findById(clientPlan.clientId);
    if (!client) {
      throw new HttpErrors.NotFound(`Client with id ${clientPlan.clientId} not found`);
    }

    // Obtener la ciudad
    const city: City | null = await this.cityRepository.findById(location); // Utilizamos location como cityId
    if (!city) {
      throw new HttpErrors.NotFound(`City with id ${location} not found`); // Utilizamos location como cityId
    }

    // Verificar si la ciudad tiene buses disponibles para recoger
    const garages: Garage[] = await this.garageRepository.find({where: {cityId: location}}); // Utilizamos location como cityId
    if (garages.length === 0) {
      throw new HttpErrors.NotFound(`No garages found in city with id ${location}`); // Utilizamos location como cityId
    }

    let busUpdated = false;
    for (const garage of garages) {
      // Verificar si hay buses disponibles en el garaje
      const buses = await this.busRepository.find({where: {garageId: garage.id, status: true}});
      if (buses.length > 0) {
        const bus = buses[0];
        bus.status = false;
        await this.busRepository.updateById(bus.id, bus);
        busUpdated = true;
        break;
      }
    }

    if (!busUpdated) {
      throw new HttpErrors.NotFound(`No available buses in city with id ${location}`); // Utilizamos location como cityId
    }

    // Encontrar una sala disponible
    const rooms: Room[] = await this.roomRepository.find({where: {cityId: location, status: true}}); // Utilizamos location como cityId
    if (rooms.length === 0) {
      throw new HttpErrors.NotFound(`No available rooms in city with id ${location}`); // Utilizamos location como cityId
    }

    // Reservar la sala de velación
    const room: Room = rooms[0];
    room.status = false;
    await this.roomRepository.updateById(room.id, room);

    // Crear una nueva reserva de sala
    await this.roomBookingRepository.create({
      startDate: entryDateTime,
      endDate: exitDateTime,
      beneficiaryId: beneficiaryId,
    });

    // Generar un código único y enviar notificación (simplificado)
    function generateRandomCode(): string {
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10); // Genera un dígito aleatorio entre 0 y 9
      }
      return code;
    }

    const randomCode = generateRandomCode();
    console.log(randomCode); // Muestra el código aleatorio generado
    const emailMessage = `
    Estimado ${client.name},

    Queremos informarte sobre los detalles del servicio funerario para ${beneficiary.name}.

    Sala de velación: ${room.id}
    Ciudad: ${city.name}
    Hora de entrada: ${entryDateTime}
    Hora de salida: ${exitDateTime}
    Tipo de servicio: ${traditionalBurial ? 'Velación tradicional' : 'Cremación'}
    Código único del servicio de chat: ${randomCode}
    Atentamente,
    [funeraria NP]
  `;

    // Envía el correo electrónico de notificación
    const emailData = {
      correoDestino: client.email,
      nombreDestino: `${client.name} ${client.lastName}`,
      contenidoCorreo: emailMessage,
      asuntoCorreo: 'Detalles del servicio funerario',
    };

    const url = ConfiguracionNotificaciones.urlNotificacionesCorreo; // URL para el servicio de notificaciones (ajústalo si es necesario)
    await this.servicioNotificaciones.EnviarNotificacion(emailData, url);
    const socket = io('http://localhost:3010');
    socket.emit('codigoChat', randomCode);
    socket.on('response', (data) => {
      console.log('Respuesta del servicio de chat:', data);
    });
  }
}
