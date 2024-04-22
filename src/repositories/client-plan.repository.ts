import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ClientPlan, ClientPlanRelations, Client, Beneficiary, City} from '../models';
import {ClientRepository} from './client.repository';
import {BeneficiaryRepository} from './beneficiary.repository';
import {CityRepository} from './city.repository';

export class ClientPlanRepository extends DefaultCrudRepository<
  ClientPlan,
  typeof ClientPlan.prototype.id,
  ClientPlanRelations
> {

  public readonly plan: BelongsToAccessor<Client, typeof ClientPlan.prototype.id>;

  public readonly beneficiaries: HasManyRepositoryFactory<Beneficiary, typeof ClientPlan.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof ClientPlan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('BeneficiaryRepository') protected beneficiaryRepositoryGetter: Getter<BeneficiaryRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(ClientPlan, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.beneficiaries = this.createHasManyRepositoryFactoryFor('beneficiaries', beneficiaryRepositoryGetter,);
    this.registerInclusionResolver('beneficiaries', this.beneficiaries.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', clientRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
