import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import { Body, Heading6 } from '@/components/Typography/Typography.styles';
import { CompanyVolumeEnum, CompanyVolumeToLabel } from '@/enums/Company';
import { useMainButton } from '@/hooks/useMainButton';
import { Company } from '@/models/Company';
import { CompanyAction } from '@/store/company/CompanyActions';
import { history } from '@/utils/history';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<
    Pick<Company, 'name' | 'description' | 'volume'>
  >({
    name: '',
    description: '',
    volume: undefined as unknown as CompanyVolumeEnum,
  });

  const handleCreateClick = useCallback(() => {
    console.log(formData);
    dispatch(CompanyAction.createCompany(formData));
    onHideButton();
  }, [formData]);

  const handleBackClick = () => {
    history.push('/');
  };

  const { onShowButton, onHideButton } = useMainButton({
    onClick: handleCreateClick,
    text: 'Create',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
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
      <LabelWrapper>
        <Button block onClick={handleCreateClick}>
          Create
        </Button>
      </LabelWrapper>
    </AppContainer>
  );
};

export { CreateCompanyPage };
