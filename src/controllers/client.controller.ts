import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import * as crypto from 'crypto';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {Client, FuneralServiceRequest} from '../models';
import {ClientRepository} from '../repositories';
//import {NotificacionesService} from '../services/notificaciones.services';


export class ClientController {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
    /*     @service(NotificacionesService)
        public servicioNotificaciones: NotificacionesService */
  ) { }

  @post('/request-funeral-service')
  @response(200, {
    description: 'Funeral Service Request',
    content: {'application/json': {schema: getModelSchemaRef(FuneralServiceRequest)}},
  })
  async requestFuneralService(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              clientId: {type: 'string'},
              beneficiaryId: {type: 'string'},
              bodyLocation: {type: 'string'},
              checkInTime: {type: 'string'}, // Use ISO 8601 time format
              checkOutTime: {type: 'string'}, // Use ISO 8601 time format
            },
          },
        },
      },
    })
    requestData: {
      clientId: number;
      beneficiaryId: number;
      bodyLocation: string;
      checkInTime: string;
      checkOutTime: string;
    },
  ): Promise<object> {
    // Validate request data
    if (!requestData.clientId || !requestData.beneficiaryId || !requestData.bodyLocation || !requestData.checkInTime || !requestData.checkOutTime) {
      throw new HttpErrors[400]('All input fields are required.');
    }

    // Fetch the client by ID
    const client = await this.clientRepository.findById(requestData.clientId);
    if (!client) {
      throw new HttpErrors[404]('Client not found.');
    }

    // Generate a unique code for the service
    const uniqueCode = crypto.randomBytes(8).toString('hex');

    // Prepare the funeral service details
    const funeralServiceDetails = {
      date: new Date().toISOString().slice(0, 10), // Current date
      times: `${requestData.checkInTime} to ${requestData.checkOutTime}`,
      location: requestData.bodyLocation,
      sede: 'Main Funeral Hall', // Hardcoded; adjust as necessary
      uniqueCode,
    };

    // Send the unique code to the client via email
    const emailDetails = {
      correoDestino: client.email,
      nombreDestino: `${client.name} ${client.lastName}`,
      contenidoCorreo: `Your funeral service request has been scheduled. Here are the details:
      Date: ${funeralServiceDetails.date}
      Times: ${funeralServiceDetails.times}
      Location: ${funeralServiceDetails.location}
      Venue: ${funeralServiceDetails.sede}
      Unique Code: ${uniqueCode}`,
      asuntoCorreo: 'Funeral Service Request Confirmation',
    };
    const notificationUrl = ConfiguracionNotificaciones.claveAsignada; // Specify your email notification URL
    // await this.servicioNotificaciones.EnviarNotificacion(emailDetails, notificationUrl);

    // Return the funeral service details
    return funeralServiceDetails;
  }
  @post('/client')
  @response(200, {
    description: 'Client model instance',
    content: {'application/json': {schema: getModelSchemaRef(Client)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {
            title: 'NewClient',
            exclude: ['id'],
          }),
        },
      },
    })
    client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.clientRepository.create(client);
  }
  //i need to make an endpoint that asks for a funeral service, in which asks from the list of beneficiarys of the client who died, then will ask for the location of the body, then asks for the time of check in and check out of the velation of the body, and when its generated it returns the date, times, location and sede of the velation plus an unique code will be sent to the client via email

  @get('/client/count')
  @response(200, {
    description: 'Client model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Client) where?: Where<Client>,
  ): Promise<Count> {
    return this.clientRepository.count(where);
  }

  @get('/client')
  @response(200, {
    description: 'Array of Client model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Client, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Client) filter?: Filter<Client>,
  ): Promise<Client[]> {
    return this.clientRepository.find(filter);
  }

  @patch('/client')
  @response(200, {
    description: 'Client PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Client,
    @param.where(Client) where?: Where<Client>,
  ): Promise<Count> {
    return this.clientRepository.updateAll(client, where);
  }

  @get('/client/{id}')
  @response(200, {
    description: 'Client model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Client, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Client, {exclude: 'where'}) filter?: FilterExcludingWhere<Client>
  ): Promise<Client> {
    return this.clientRepository.findById(id, filter);
  }

  @patch('/client/{id}')
  @response(204, {
    description: 'Client PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Client,
  ): Promise<void> {
    await this.clientRepository.updateById(id, client);
  }

  @put('/client/{id}')
  @response(204, {
    description: 'Client PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.replaceById(id, client);
  }

  @del('/client/{id}')
  @response(204, {
    description: 'Client DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientRepository.deleteById(id);
  }
}
