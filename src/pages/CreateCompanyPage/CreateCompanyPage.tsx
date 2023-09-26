import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import { Body, Heading6 } from '@/components/Typography/Typography.styles';
import { CompanyVolumeEnum, CompanyVolumeToLabel } from '@/enums/Company';
import { useTelegram } from '@/hooks/useTelegram';
import { ChangeEvent, useState } from 'react';
import {
  AppContainer,
  HeadingWrapper,
  InputWrapper,
  LabelWrapper,
} from './CreateCompanyPage.styles';

const options = [
  {
    text: CompanyVolumeToLabel[CompanyVolumeEnum.SelfEmployed],
    value: CompanyVolumeEnum.SelfEmployed,
  },
  {
    text: CompanyVolumeToLabel[CompanyVolumeEnum.Low],
    value: CompanyVolumeEnum.Low,
  },
  {
    text: CompanyVolumeToLabel[CompanyVolumeEnum.Medium],
    value: CompanyVolumeEnum.Medium,
  },
  {
    text: CompanyVolumeToLabel[CompanyVolumeEnum.High],
    value: CompanyVolumeEnum.High,
  },
  {
    text: CompanyVolumeToLabel[CompanyVolumeEnum.Huge],
    value: CompanyVolumeEnum.Huge,
  },
];

const CreateCompanyPage = () => {
  const [formData, setFormData] = useState({
    name: null,
    description: null,
    volume: 'default',
  });

  const { onToggleButton } = useTelegram();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    const hasValues = Object.values(formData).every((item) => item);
    if (hasValues) {
      onToggleButton();
    }
  };

  return (
    <AppContainer>
      <div>
        <HeadingWrapper>
          <Heading6>Create a company</Heading6>
        </HeadingWrapper>
        <Body>Company name</Body>
        <InputWrapper>
          <Input
            name="name"
            value={formData.name ?? ''}
            onChange={handleChange}
            placeholder="Company name"
          />
        </InputWrapper>
        <LabelWrapper>
          <Body>Description</Body>
        </LabelWrapper>
        <InputWrapper>
          <TextArea
            name="description"
            value={formData.description ?? ''}
            onChange={handleChange}
            placeholder="Description"
          />
        </InputWrapper>
        <LabelWrapper>
          <Body>Volume</Body>
        </LabelWrapper>
        <InputWrapper>
          <Select
            value={formData.volume}
            name="volume"
            options={options}
            onChange={handleChange}
          />
        </InputWrapper>
      </div>
    </AppContainer>
  );
};

export { CreateCompanyPage };
