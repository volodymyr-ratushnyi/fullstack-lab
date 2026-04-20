import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = Symbol.for("IS_PUBLIC");
export const Public = () => SetMetadata(IS_PUBLIC, true);
