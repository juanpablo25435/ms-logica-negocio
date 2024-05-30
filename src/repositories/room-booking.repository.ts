import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RoomBooking, RoomBookingRelations, Beneficiary} from '../models';
import {BeneficiaryRepository} from './beneficiary.repository';

export class RoomBookingRepository extends DefaultCrudRepository<
  RoomBooking,
  typeof RoomBooking.prototype.id,
  RoomBookingRelations
> {

  public readonly beneficiary: BelongsToAccessor<Beneficiary, typeof RoomBooking.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BeneficiaryRepository') protected beneficiaryRepositoryGetter: Getter<BeneficiaryRepository>,
  ) {
    super(RoomBooking, dataSource);
    this.beneficiary = this.createBelongsToAccessorFor('beneficiary', beneficiaryRepositoryGetter,);
    this.registerInclusionResolver('beneficiary', this.beneficiary.inclusionResolver);
  }
}
