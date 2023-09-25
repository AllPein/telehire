export enum CompanyVolumeEnum {
  SelfEmployed = 'SelfEmployed',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Huge = 'Huge',
}

export const CompanyVolumeToLabel = {
  [CompanyVolumeEnum.SelfEmployed]: 'Self employed',
  [CompanyVolumeEnum.Low]: '0 - 10 employees',
  [CompanyVolumeEnum.Medium]: '11 - 200 employees',
  [CompanyVolumeEnum.High]: '201 - 1000 employees',
  [CompanyVolumeEnum.Huge]: '1001+ employees',
};
