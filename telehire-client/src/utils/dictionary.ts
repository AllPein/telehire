import { CountriesDto } from '@/store/dictionary/types';

export const mapCountriesDtoToDictionary = (countriesDto: CountriesDto[]) => {
  return countriesDto.map((dictValue) => ({
    value: dictValue.name.common,
    label: dictValue.name.common,
  }));
};

export const mapSkillsDtoToDictionary = (skillsDto: any[]) => {
  return skillsDto.map((skill) => ({
    value: skill.name,
    label: skill.name,
  }));
};
