import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  City,
  Departament,
} from '../models';
import {CityRepository} from '../repositories';

export class CityDepartamentController {
  constructor(
    @repository(CityRepository)
    public cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/departament', {
    responses: {
      '200': {
        description: 'Departament belonging to City',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departament),
          },
        },
      },
    },
  })
  async getDepartament(
    @param.path.number('id') id: typeof City.prototype.id,
  ): Promise<Departament> {
    return this.cityRepository.departament(id);
  }
}
