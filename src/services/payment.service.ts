import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const epayco = require('epayco-sdk-node')({
  apiKey: '02aeb49dd547ec899a0844774f36e486',
  privateKey: 'a40a57029fceb73ea034a2117ac83fd3',
  lang: 'ES',
  test: true, // Modo de prueba
});

@injectable({scope: BindingScope.TRANSIENT})
export class PaymentService {
  constructor(/* Add @inject to inject parameters */) { }

  // Función para crear un token de tarjeta
  async createToken(cardInfo: {
    number: string;
    exp_year: string;
    exp_month: string;
    cvc: string;
  }): Promise<string> {
    try {
      const tokenResponse = await epayco.token.create({
        "card[number]": cardInfo.number,
        "card[exp_year]": cardInfo.exp_year,
        "card[exp_month]": cardInfo.exp_month,
        "card[cvc]": cardInfo.cvc
      });
      return tokenResponse.id;
    } catch (error) {
      throw new Error(`Error al crear el token: ${error.message}`);
    }
  }

  // Función para crear un pago
  async createPayment(paymentInfo: {
    cardInfo: {
      number: string;
      exp_year: string;
      exp_month: string;
      cvc: string;
    };
    cantidad: string;
    descripcion: string;
    email: string;
  }): Promise<object> {
    try {
      // Crear un token de tarjeta
      const token = await this.createToken(paymentInfo.cardInfo);

      // Crear el cliente
      const customer = await epayco.customers.create({
        token_card: token,
        name: 'Cliente de prueba',
        last_name: 'Apellido',
        email: paymentInfo.email,
        default: true,
      });

      if (!customer.status) {
        throw new Error('Error al crear el cliente: ' + customer.message);
      }

      // Procesar el pago
      const payment = await epayco.charge.create({
        token_card: token,
        customer_id: customer.data.customerId,
        doc_type: 'CC', // Tipo de documento (por ejemplo, CC para cédula de ciudadanía en Colombia)
        doc_number: '123456789', // Número de documento
        name: 'Cliente de prueba',
        last_name: 'Apellido',
        email: paymentInfo.email,
        bill: 'OR-1234',
        description: paymentInfo.descripcion,
        value: paymentInfo.cantidad,
        tax: '0',
        tax_base: paymentInfo.cantidad,
        currency: 'COP', // Moneda (por ejemplo, COP para pesos colombianos)
        dues: '1', // Número de cuotas
        ip: '190.000.000.000', // IP del cliente
        url_response: 'https://ejemplo.com/respuesta', // URL de respuesta (puedes dejarlo vacío para pruebas)
        url_confirmation: 'https://ejemplo.com/confirmacion', // URL de confirmación (puedes dejarlo vacío para pruebas)
        method_confirmation: 'GET', // Método de confirmación
      });

      return payment;
    } catch (error) {
      throw new Error(`Error al crear el pago: ${error.message}`);
    }
  }
}
