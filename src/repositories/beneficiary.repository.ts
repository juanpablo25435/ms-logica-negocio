import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiary, BeneficiaryRelations, ClientPlan, StatusBeneficiary} from '../models';
import {ClientPlanRepository} from './client-plan.repository';
import {StatusBeneficiaryRepository} from './status-beneficiary.repository';

export class BeneficiaryRepository extends DefaultCrudRepository<
  Beneficiary,
  typeof Beneficiary.prototype.id,
  BeneficiaryRelations
> {

  public readonly clientPlan: BelongsToAccessor<ClientPlan, typeof Beneficiary.prototype.id>;

  public readonly statusBeneficiary: HasOneRepositoryFactory<StatusBeneficiary, typeof Beneficiary.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientPlanRepository') protected clientPlanRepositoryGetter: Getter<ClientPlanRepository>, @repository.getter('StatusBeneficiaryRepository') protected statusBeneficiaryRepositoryGetter: Getter<StatusBeneficiaryRepository>,
  ) {
    super(Beneficiary, dataSource);
    this.statusBeneficiary = this.createHasOneRepositoryFactoryFor('statusBeneficiary', statusBeneficiaryRepositoryGetter);
    this.registerInclusionResolver('statusBeneficiary', this.statusBeneficiary.inclusionResolver);
    this.clientPlan = this.createBelongsToAccessorFor('clientPlan', clientPlanRepositoryGetter,);
    this.registerInclusionResolver('clientPlan', this.clientPlan.inclusionResolver);
  }
}
