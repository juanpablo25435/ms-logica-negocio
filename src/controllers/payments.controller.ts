import {inject} from '@loopback/core';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {PaymentService} from '../services/payment.service';

export class PaymentController {
  constructor(
    @inject('services.PaymentService')
    private paymentService: PaymentService,
  ) { }

  @post('/pagar', {
    responses: {
      '200': {
        description: 'Pago exitoso',
        content: {'application/json': {schema: {}}},
      },
      '500': {
        description: 'Error en el pago',
        content: {'application/json': {schema: {}}},
      },
    },
  })
  async pagar(
    @requestBody({
      description: 'Información del pago',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              cardInfo: {
                type: 'object',
                properties: {
                  number: {type: 'string'},
                  exp_year: {type: 'string'},
                  exp_month: {type: 'string'},
                  cvc: {type: 'string'},
                },
                required: ['number', 'exp_year', 'exp_month', 'cvc'],
              },
              cantidad: {type: 'string'},
              descripcion: {type: 'string'},
              email: {type: 'string'},
            },
            required: ['cardInfo', 'cantidad', 'descripcion', 'email'],
          },
        },
      },
    })
    paymentInfo: {
      cardInfo: {
        number: string;
        exp_year: string;
        exp_month: string;
        cvc: string;
      };
      cantidad: string;
      descripcion: string;
      email: string;
    },
  ): Promise<object> {
    try {
      const payment = await this.paymentService.createPayment(paymentInfo);
      return {mensaje: 'Pago exitoso', pago: payment};
    } catch (error) {
      throw new HttpErrors.InternalServerError(error.message);
    }
  }
}
