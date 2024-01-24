import { ChristianRoles } from './roles';

type CurrentResponsibility = {
  name: string;
  date: Date;
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
