import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, PlanServicePlan} from '../models';
import {PlanServicePlanRepository} from './plan-service-plan.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly includedServices: HasManyRepositoryFactory<PlanServicePlan, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanServicePlanRepository') protected planServicePlanRepositoryGetter: Getter<PlanServicePlanRepository>,
  ) {
    super(Plan, dataSource);
    this.includedServices = this.createHasManyRepositoryFactoryFor('includedServices', planServicePlanRepositoryGetter,);
    this.registerInclusionResolver('includedServices', this.includedServices.inclusionResolver);
  }
}
