import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import {
  Body,
  Body2,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { CurrencyEnum } from '@/enums/Vacancy';
import { useMount } from '@/hooks/useMount';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { DictionaryAction } from '@/store/dictionary/DictionaryActions';
import { selectSkills } from '@/store/dictionary/DictionarySelectors';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { ResumeFormData } from '@/types/FormData';
import { debounce } from 'lodash';
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

const CHANGE_DEBOUNCE_TIME = 300;

const CreateResumePage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<ResumeFormData>({
    position: '',
    salary: '',
    description: '',
    skills: [],
    currency: options[0],
  });

  const skills = useSelector(selectSkills);

  useMount(() => {
    dispatch(
      DictionaryAction.getDictionaryByKey({
        key: 'skills',
        payload: { query: '' },
      }),
    );
  });

  const handleCreateClick = () => {
    dispatch(ResumeAction.createResume(formData));
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

  const debouncedSetValue = useMemo(
    () =>
      debounce((value) => {
        dispatch(
          DictionaryAction.getDictionaryByKey({
            key: 'skills',
            payload: { query: value },
          }),
        );
      }, CHANGE_DEBOUNCE_TIME),
    [],
  );

  const handleChangeSkills = (value: string) => {
    if (value.length) {
      debouncedSetValue(value);
    }
  };

  return (
    <AppContainer>
      <div>
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
          <Body>Description</Body>
        </LabelWrapper>
        <InputWrapper>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
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
            onInputChange={handleChangeSkills}
            isMulti
            value={formData.skills}
            onChange={handleChange}
            options={skills ?? []}
          />
        </InputWrapper>
      </div>
      <LabelWrapper>
        <Button disabled={disabled} block onClick={handleCreateClick}>
          Create
        </Button>
      </LabelWrapper>
    </AppContainer>
  );
};

export { CreateResumePage };
