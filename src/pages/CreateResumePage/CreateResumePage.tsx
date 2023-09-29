import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import { Body, Heading6 } from '@/components/Typography/Typography.styles';
import { CurrencyEnum } from '@/enums/Vacancy';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { ResumeAction } from '@/store/cv/ResumeActions';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AppContainer,
  FlexWrapper,
  HeadingWrapper,
  InputWrapper,
  LabelWrapper,
} from './CreateResumePage.styles';

const options = [
  {
    text: CurrencyToSymbol[CurrencyEnum.USD],
    value: CurrencyEnum.USD,
  },
  {
    text: CurrencyToSymbol[CurrencyEnum.RUB],
    value: CurrencyEnum.RUB,
  },
];

const CreateResumePage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<any>({
    position: '',
    salary: '0',
    description: '',
    skills: ['React', 'Node.js'],
    currency: CurrencyEnum.USD,
  });

  const handleCreateClick = () => {
    const mappedFormData = Object.entries(formData).reduce(
      (acc: any, [key, value]) => {
        if (key === 'salary') {
          acc[key] = Number(value);
        } else {
          acc[key] = value;
        }

        return acc;
      },
      {},
    );
    dispatch(ResumeAction.createResume(mappedFormData));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData: any) => {
      const newFormData = { ...prevFormData, [name]: value };
      const hideButton = Object.values(newFormData).some((value) => !value);

      //   if (!hideButton) {
      //     onShowButton();
      //   } else {
      //     onHideButton();
      //   }
      return newFormData;
    });
  };

  return (
    <AppContainer>
      <div>
        <HeadingWrapper>
          <Heading6>Create your CV</Heading6>
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
      </div>
      <LabelWrapper>
        <Button block onClick={handleCreateClick}>
          Create
        </Button>
      </LabelWrapper>
    </AppContainer>
  );
};

export { CreateResumePage };
