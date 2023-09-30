import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import {
  Body,
  Body2,
  Heading6,
} from '@/components/Typography/Typography.styles';
import {
  CurrencyEnum,
  ExperienceEnum,
  ExperienceToLabel,
  JobTypeEnum,
} from '@/enums/Vacancy';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { VacancyAction } from '@/store/vacancy/VacancyActions';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  AppContainer,
  FlexWrapper,
  HeadingWrapper,
  InputWrapper,
  LabelWrapper,
} from './CreateVacancyPage.styles';

const currencyOptions = [
  {
    text: CurrencyToSymbol[CurrencyEnum.USD],
    value: CurrencyEnum.USD,
  },
  {
    text: CurrencyToSymbol[CurrencyEnum.RUB],
    value: CurrencyEnum.RUB,
  },
];

const jobTypeOptions = [
  {
    text: JobTypeEnum.Office,
    value: JobTypeEnum.Office,
  },
  {
    text: JobTypeEnum.Remote,
    value: JobTypeEnum.Remote,
  },
  {
    text: JobTypeEnum.Hybrid,
    value: JobTypeEnum.Hybrid,
  },
];

const experienceOptions = [
  {
    text: ExperienceToLabel[ExperienceEnum.No],
    value: ExperienceEnum.No,
  },
  {
    text: ExperienceToLabel[ExperienceEnum.Junior],
    value: ExperienceEnum.Junior,
  },
  {
    text: ExperienceToLabel[ExperienceEnum.Middle],
    value: ExperienceEnum.Middle,
  },
  {
    text: ExperienceToLabel[ExperienceEnum.Senior],
    value: ExperienceEnum.Senior,
  },
  {
    text: ExperienceToLabel[ExperienceEnum.Extra],
    value: ExperienceEnum.Extra,
  },
];

const CreateVacancyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<any>({
    position: '',
    salaryFrom: '',
    salaryTo: '',
    country: '',
    city: '',
    requirements: '',
    jobType: JobTypeEnum.Hybrid,
    experience: ExperienceEnum.No,
    skills: ['React', 'Node.js'],
    currency: CurrencyEnum.USD,
  });

  const handleCreateClick = () => {
    const mappedFormData = Object.entries(formData).reduce(
      (acc: any, [key, value]) => {
        if (key === 'salaryFrom' || key === 'salaryTo') {
          acc[key] = Number(value);
        } else {
          acc[key] = value;
        }

        if (key === 'country' || key === 'city') {
          if (acc.location) {
            acc.location[key] = value;
          } else {
            acc.location = {
              [key]: value,
            };
          }
        }

        return acc;
      },
      {
        companyId: Number(companyId),
      },
    );
    dispatch(VacancyAction.createVacancy(mappedFormData));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const disabled = useMemo(() => {
    return Object.values(formData).some((val) => !val);
  }, [formData]);

  return (
    <AppContainer>
      <div>
        <HeadingWrapper>
          <Heading6>Create new vacancy</Heading6>
        </HeadingWrapper>
        <Body>Position</Body>
        <InputWrapper>
          <Input
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Position"
          />
        </InputWrapper>
        <LabelWrapper>
          <Body>Requirements</Body>
        </LabelWrapper>
        <InputWrapper>
          <TextArea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Requirements for the position"
          />
        </InputWrapper>
        <LabelWrapper>
          <Body>Salary</Body>
        </LabelWrapper>
        <InputWrapper>
          <FlexWrapper>
            <Body>from</Body>
            <Input
              type="number"
              name="salaryFrom"
              value={formData.salaryFrom}
              onChange={handleChange}
              placeholder="Salary from"
            />
            <Body>to</Body>
            <Input
              type="number"
              name="salaryTo"
              value={formData.salaryTo}
              onChange={handleChange}
              placeholder="Salary to"
            />
            <Select
              value={formData.currency}
              name="currency"
              options={currencyOptions}
              onChange={handleChange}
            />
          </FlexWrapper>
        </InputWrapper>
        <LabelWrapper>
          <Body>Required experience</Body>
        </LabelWrapper>
        <InputWrapper>
          <Select
            value={formData.experience}
            name="experience"
            options={experienceOptions}
            onChange={handleChange}
          />
        </InputWrapper>
        <LabelWrapper>
          <Body>Job type</Body>
        </LabelWrapper>
        <InputWrapper>
          <Select
            value={formData.jobType}
            name="jobType"
            options={jobTypeOptions}
            onChange={handleChange}
          />
        </InputWrapper>
        {formData.jobType !== JobTypeEnum.Remote && (
          <>
            <LabelWrapper>
              <Body>Location</Body>
            </LabelWrapper>
            <LabelWrapper>
              <Body2>Country</Body2>
            </LabelWrapper>
            <InputWrapper>
              <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </InputWrapper>
            <LabelWrapper>
              <Body2>City</Body2>
            </LabelWrapper>
            <InputWrapper>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </InputWrapper>
          </>
        )}
      </div>

      <LabelWrapper>
        <Button block onClick={handleCreateClick}>
          Create
        </Button>
      </LabelWrapper>
    </AppContainer>
  );
};

export { CreateVacancyPage };
