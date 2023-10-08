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
import { useMainButton } from '@/hooks/useMainButton';
import { CurrencyToSymbol } from '@/models/Vacancy';
import {
  selectCountriesLoading,
  selectCreateVacancyLoading,
  selectSkillsLoading,
} from '@/store/Loader/LoaderSelectors';
import { DictionaryAction } from '@/store/dictionary/DictionaryActions';
import {
  selectCountreis,
  selectSkills,
} from '@/store/dictionary/DictionarySelectors';
import { VacancyAction } from '@/store/vacancy/VacancyActions';
import { VacancyFormData } from '@/types/FormData';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    label: CurrencyToSymbol[CurrencyEnum.USD],
    value: CurrencyEnum.USD,
  },
  {
    label: CurrencyToSymbol[CurrencyEnum.RUB],
    value: CurrencyEnum.RUB,
  },
];

const jobTypeOptions = [
  {
    label: JobTypeEnum.Office,
    value: JobTypeEnum.Office,
  },
  {
    label: JobTypeEnum.Remote,
    value: JobTypeEnum.Remote,
  },
  {
    label: JobTypeEnum.Hybrid,
    value: JobTypeEnum.Hybrid,
  },
];

const experienceOptions = [
  {
    label: ExperienceToLabel[ExperienceEnum.No],
    value: ExperienceEnum.No,
  },
  {
    label: ExperienceToLabel[ExperienceEnum.Junior],
    value: ExperienceEnum.Junior,
  },
  {
    label: ExperienceToLabel[ExperienceEnum.Middle],
    value: ExperienceEnum.Middle,
  },
  {
    label: ExperienceToLabel[ExperienceEnum.Senior],
    value: ExperienceEnum.Senior,
  },
  {
    label: ExperienceToLabel[ExperienceEnum.Extra],
    value: ExperienceEnum.Extra,
  },
];

const CreateVacancyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountreis);
  const skills = useSelector(selectSkills);
  const countriesLoading = useSelector(selectCountriesLoading);
  const skillsLoading = useSelector(selectSkillsLoading);
  const createLoading = useSelector(selectCreateVacancyLoading);

  const [formData, setFormData] = useState<VacancyFormData>({
    position: '',
    salaryFrom: '',
    salaryTo: '',
    country: null,
    requirements: '',
    jobType: jobTypeOptions[0],
    experience: experienceOptions[0],
    skills: [],
    currency: currencyOptions[0],
  });

  const handleLoadCountries = () => {
    if (!countries) {
      dispatch(DictionaryAction.getDictionaryByKey({ key: 'countries' }));
    }
  };

  const handleLoadSkills = () => {
    if (!skills) {
      dispatch(
        DictionaryAction.getDictionaryByKey({
          key: 'skills',
          payload: { query: '' },
        }),
      );
    }
  };

  const handleCreateClick = () => {
    dispatch(
      VacancyAction.createVacancy({ formData, companyId: Number(companyId) }),
    );
  };

  const showButton = useMemo(() => {
    return Object.values(formData).every((val) => {
      if (!val) {
        return false;
      }

      if (Array.isArray(val)) {
        return val.length > 0;
      }

      return true;
    });
  }, [formData]);

  useMainButton({
    onClick: handleCreateClick,
    condition: showButton,
    text: 'Create',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <AppContainer>
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
            placeholder=""
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
      {formData.jobType.value !== JobTypeEnum.Remote && (
        <>
          <LabelWrapper>
            <Body2>Country</Body2>
          </LabelWrapper>
          <InputWrapper>
            <Select
              onFocus={handleLoadCountries}
              name="country"
              value={formData.country}
              onChange={handleChange}
              withCreate
              placeholder="Select country"
              loading={countriesLoading}
              options={countries ?? []}
            />
          </InputWrapper>
        </>
      )}
      <LabelWrapper>
        <Body2>Required skills</Body2>
      </LabelWrapper>
      <InputWrapper>
        <Select
          name="skills"
          onFocus={handleLoadSkills}
          loading={skillsLoading}
          placeholder="Select required skills"
          isMulti
          value={formData.skills}
          onChange={handleChange}
          withCreate
          options={skills ?? []}
        />
      </InputWrapper>
    </AppContainer>
  );
};

export { CreateVacancyPage };
