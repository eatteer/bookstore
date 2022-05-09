import { SetMetadata } from '@nestjs/common';

export enum Role {
  Client = 'client',
  Admin = 'admin',
}

export const ROLES_KEY = 'role';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
