import { ChristianRoles } from './roles';

type CurrentResponsibility = {
  name: string;
  date: Date;
  owner?: string;
  assistant?: string;
};

export interface CreateChristian {
  name: string;
  roles: ChristianRoles[];
  gender: 'male' | 'female';
  dateOfLastPart?: Date | null;
  currentResponsibilities?: CurrentResponsibility[] | null;
  allowedToParticipate?: boolean;
  lastPartMilliseconds?: number;
  lastPersonParticipatedName?: string;
}

export interface GetChristian extends CreateChristian {
  id: string;
}

export type UpdateChristian = Partial<
  Omit<CreateChristian, 'lastPartMilliseconds'>
>;
