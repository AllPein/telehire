import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import { Body, Heading6 } from '@/components/Typography/Typography.styles';
import { CompanyVolumeEnum, CompanyVolumeToLabel } from '@/enums/Company';
import { useBackButton } from '@/hooks/useBackButton';
import { useMainButton } from '@/hooks/useMainButton';
import { history } from '@/utils/history';
import { ChangeEvent, useCallback, useState } from 'react';
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
    name: '',
    description: '',
    volume: 'default',
  });

  const handleCreateClick = useCallback(() => {
    console.log(formData);
  }, [formData]);

  const handleBackClick = () => {
    history.push('/');
  };

  const { onShowButton, onCloseButton } = useMainButton({
    onClick: handleBackClick,
    text: 'Create',
  });

  useBackButton({
    onClick: handleBackClick,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      const hideButton = Object.entries(newFormData).some(([key, value]) => {
        if (key === 'volume' && value === 'default') {
          return true;
        }
        return !value;
      });

      if (!hideButton) {
        onShowButton();
      } else {
        onCloseButton();
      }
      return newFormData;
    });
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
            value={formData.name}
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
            value={formData.description}
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
