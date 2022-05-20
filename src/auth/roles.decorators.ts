import { SetMetadata } from '@nestjs/common';

export enum Role {
  Client = 'client',
  Admin = 'admin',
}

export const ROLES_KEY = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
