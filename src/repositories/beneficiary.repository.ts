import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiary, BeneficiaryRelations, ClientPlan, StatusBeneficiary, RoomBooking} from '../models';
import {ClientPlanRepository} from './client-plan.repository';
import {StatusBeneficiaryRepository} from './status-beneficiary.repository';
import {RoomBookingRepository} from './room-booking.repository';

export class BeneficiaryRepository extends DefaultCrudRepository<
  Beneficiary,
  typeof Beneficiary.prototype.id,
  BeneficiaryRelations
> {

  public readonly clientPlan: BelongsToAccessor<ClientPlan, typeof Beneficiary.prototype.id>;

  public readonly statusBeneficiary: HasOneRepositoryFactory<StatusBeneficiary, typeof Beneficiary.prototype.id>;

  public readonly roomBooking: BelongsToAccessor<RoomBooking, typeof Beneficiary.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientPlanRepository') protected clientPlanRepositoryGetter: Getter<ClientPlanRepository>, @repository.getter('StatusBeneficiaryRepository') protected statusBeneficiaryRepositoryGetter: Getter<StatusBeneficiaryRepository>, @repository.getter('RoomBookingRepository') protected roomBookingRepositoryGetter: Getter<RoomBookingRepository>,
  ) {
    super(Beneficiary, dataSource);
    this.roomBooking = this.createBelongsToAccessorFor('roomBooking', roomBookingRepositoryGetter,);
    this.registerInclusionResolver('roomBooking', this.roomBooking.inclusionResolver);
    this.statusBeneficiary = this.createHasOneRepositoryFactoryFor('statusBeneficiary', statusBeneficiaryRepositoryGetter);
    this.registerInclusionResolver('statusBeneficiary', this.statusBeneficiary.inclusionResolver);
    this.clientPlan = this.createBelongsToAccessorFor('clientPlan', clientPlanRepositoryGetter,);
    this.registerInclusionResolver('clientPlan', this.clientPlan.inclusionResolver);
  }
}
