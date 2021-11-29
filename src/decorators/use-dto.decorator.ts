import { BaseDto } from '../common/dto/base.dto';
import { BaseEntity } from '../common/entity/common/base.entity';
import { Constructor } from '../types';

export function UseDto(
  dtoClass: Constructor<BaseDto, [BaseEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
