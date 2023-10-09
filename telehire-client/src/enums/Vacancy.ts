export enum ExperienceEnum {
  No = 'No',
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
  Extra = 'Extra',
}

export enum CurrencyEnum {
  USD = 'usd',
  RUB = 'rub',
}

export enum JobTypeEnum {
  Remote = 'Remote',
  Office = 'Office',
  Hybrid = 'Hybrid',
}

export enum VacancyStatusEnum {
  Pending = 'Pending',
  Denied = 'Denied',
  Accepted = 'Accepted',
}

export const ExperienceToLabel = {
  [ExperienceEnum.No]: 'No experience',
  [ExperienceEnum.Junior]: '0 - 1 year',
  [ExperienceEnum.Middle]: '1 - 3 years',
  [ExperienceEnum.Senior]: '3 - 6 years',
  [ExperienceEnum.Extra]: 'More than 6 years',
};
