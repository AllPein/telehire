import { CreateCompanyDto } from '@/store/company/types';
import { CreateResumeDto } from '@/store/resume/types';
import { CreateVacancyRequestDto } from '@/store/vacancy/types';
import {
  CompanyFormData,
  ResumeFormData,
  VacancyFormData,
} from '@/types/FormData';
import { Option } from '@/types/Select';

const VACANCY_KEYS_REQUIRED_TO_MAP = [
  'currency',
  'country',
  'jobType',
  'experience',
  'skills',
];

const RESUME_KEYS_REQUIRED_TO_MAP = ['currency', 'skills'];

export function mapVacancyFormToVacancyDto(
  formData: VacancyFormData,
  companyId: number,
) {
  return Object.entries(formData).reduce(
    (acc: CreateVacancyRequestDto, [key, value]) => {
      if (VACANCY_KEYS_REQUIRED_TO_MAP.includes(key)) {
        if (key === 'country') {
          acc.location = {
            [key]: (value as Option).value,
          };
        } else if (key === 'skills') {
          acc[key] = (value as Option[]).map((option) => option.value);
        } else {
          acc[key as string] = (value as Option).value;
        }
      } else {
        if (key === 'salaryFrom' || key === 'salaryTo') {
          acc[key] = Number(value);
        } else {
          acc[key as string] = value;
        }
      }

      return acc;
    },
    {
      companyId: Number(companyId),
    } as CreateVacancyRequestDto,
  );
}

export function mapResumeFormToVacancyDto(formData: ResumeFormData) {
  return Object.entries(formData).reduce(
    (acc: CreateResumeDto, [key, value]) => {
      if (RESUME_KEYS_REQUIRED_TO_MAP.includes(key)) {
        if (key === 'skills') {
          acc[key] = (value as Option[]).map((option) => option.value);
        } else {
          acc[key] = (value as Option).value;
        }
      } else {
        if (key === 'salary') {
          acc[key] = Number(value);
        } else {
          acc[key as keyof CreateVacancyRequestDto] = value;
        }
      }

      return acc;
    },
    {} as CreateResumeDto,
  );
}

export function mapCompanyFormDataToVacancyDto(formData: CompanyFormData) {
  return Object.entries(formData).reduce(
    (acc: CreateCompanyDto, [key, value]) => {
      if (key === 'volume') {
        acc[key] = (value as Option).value;
      } else {
        acc[key] = value;
      }

      return acc;
    },
    {} as CreateCompanyDto,
  );
}
