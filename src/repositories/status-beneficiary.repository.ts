import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {StatusBeneficiary, StatusBeneficiaryRelations, Beneficiary} from '../models';
import {BeneficiaryRepository} from './beneficiary.repository';

export class StatusBeneficiaryRepository extends DefaultCrudRepository<
  StatusBeneficiary,
  typeof StatusBeneficiary.prototype.id,
  StatusBeneficiaryRelations
> {

  public readonly beneficiary: BelongsToAccessor<Beneficiary, typeof StatusBeneficiary.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BeneficiaryRepository') protected beneficiaryRepositoryGetter: Getter<BeneficiaryRepository>,
  ) {
    super(StatusBeneficiary, dataSource);
    this.beneficiary = this.createBelongsToAccessorFor('beneficiary', beneficiaryRepositoryGetter,);
    this.registerInclusionResolver('beneficiary', this.beneficiary.inclusionResolver);
  }
}
