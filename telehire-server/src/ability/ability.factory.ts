import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, createPrismaAbility } from '@casl/prisma';
import { Profile } from '@prisma/client';
import { Action } from './ability.action';
import { SubjectsAbility } from './prisma.subjects';
type ExtendedSubjects = 'all';
export type AppSubjects = SubjectsAbility | ExtendedSubjects;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

export class AppCaslFactory {
  createAbility(user: Profile) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    cannot('manage', 'all');
    // Company
    can(Action.create, 'Company');
    can(Action.read, 'Company');
    can(Action.update, 'Company', {
      ownerId: user.id,
    });

    // Profile
    can(Action.create, 'Profile');
    can(Action.read, 'Profile');

    // Resume
    can(Action.create, 'Resume');
    can(Action.update, 'Resume', {
      user: {
        id: user.id,
      },
    });
    can(Action.read, 'Resume');

    // Vacancy
    can(Action.create, 'Vacancy');
    can(Action.read, 'Vacancy');
    can(Action.update, 'Vacancy', {
      author: { id: user.id },
    });

    // Apply
    can(Action.create, 'Applies', {});
    can(Action.read, 'Applies');

    return build();
  }
}
