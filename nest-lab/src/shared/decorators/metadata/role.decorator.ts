import { SetMetadata } from '@nestjs/common';

export const ROLE = Symbol.for("ROLE");
export const Role = () => SetMetadata(ROLE, true);
