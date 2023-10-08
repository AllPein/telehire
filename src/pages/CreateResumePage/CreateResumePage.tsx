import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import {
  Body,
  Body2,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { CurrencyEnum } from '@/enums/Vacancy';
import { useMainButton } from '@/hooks/useMainButton';
import { CurrencyToSymbol } from '@/models/Vacancy';
import {
  selectCreateResumeLoading,
  selectSkillsLoading,
} from '@/store/Loader/LoaderSelectors';
import { DictionaryAction } from '@/store/dictionary/DictionaryActions';
import { selectSkills } from '@/store/dictionary/DictionarySelectors';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { ResumeFormData } from '@/types/FormData';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppContainer,
  FlexWrapper,
  HeadingWrapper,
  InputWrapper,
  LabelWrapper,
} from './CreateResumePage.styles';

const options = [
  {
    label: CurrencyToSymbol[CurrencyEnum.USD],
    value: CurrencyEnum.USD,
  },
  {
    label: CurrencyToSymbol[CurrencyEnum.RUB],
    value: CurrencyEnum.RUB,
  },
];

const CreateResumePage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<ResumeFormData>({
    position: '',
    salary: '',
    description: '',
    skills: [],
    currency: options[0],
  });

  const loading = useSelector(selectCreateResumeLoading);
  const skills = useSelector(selectSkills);

  const skillsLoading = useSelector(selectSkillsLoading);

  const handleCreateClick = () => {
    dispatch(ResumeAction.createResume(formData));
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
    text: 'Create',
    condition: showButton,
    loading: loading,
  });

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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let { name, value } = event.target;

    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <AppContainer>
      <HeadingWrapper>
        <Heading6>Create your Resume</Heading6>
      </HeadingWrapper>
      <Body>Desired position</Body>
      <InputWrapper>
        <Input
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
        />
      </InputWrapper>
      <LabelWrapper>
        <Body>Information</Body>
      </LabelWrapper>
      <InputWrapper>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Your work experience, personal information, etc.."
        />
      </InputWrapper>
      <LabelWrapper>
        <Body>Salary</Body>
      </LabelWrapper>
      <InputWrapper>
        <FlexWrapper>
          <Input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
          />
          <Select
            value={formData.currency}
            name="currency"
            options={options}
            onChange={handleChange}
          />
        </FlexWrapper>
      </InputWrapper>
      <LabelWrapper>
        <Body2>Skills</Body2>
      </LabelWrapper>
      <InputWrapper>
        <Select
          name="skills"
          isMulti
          onFocus={handleLoadSkills}
          withCreate
          value={formData.skills}
          loading={skillsLoading}
          onChange={handleChange}
          options={skills ?? []}
        />
      </InputWrapper>
    </AppContainer>
  );
};

export { CreateResumePage };
