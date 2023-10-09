import { Subjects } from '@casl/prisma';
import {
  Applies,
  Company,
  Location,
  Profile,
  Resume,
  Vacancy,
} from '@prisma/client';

export type SubjectsAbility = Subjects<{
  Profile: Profile;
  Vacancy: Vacancy;
  Company: Company;
  Resume: Resume;
  Applies: Applies;
  Location: Location;
}>;
