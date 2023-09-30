import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import { Body, Heading6 } from '@/components/Typography/Typography.styles';
import { CompanyVolumeEnum, CompanyVolumeToLabel } from '@/enums/Company';
import { Company } from '@/models/Company';
import { CompanyAction } from '@/store/company/CompanyActions';
import { ChangeEvent, useMemo, useState } from 'react';
import Avatar from 'react-avatar-edit';
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
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<
    Pick<Company, 'name' | 'description' | 'volume'>
  >({
    name: '',
    description: '',
    volume: undefined as unknown as CompanyVolumeEnum,
  });

  const handleCreateClick = () => {
    dispatch(
      CompanyAction.createCompany({
        ...formData,
        photoUrl: preview!,
      }),
    );
  };

  const disabled = useMemo(() => {
    return !preview || Object.values(formData).some((value) => !value);
  }, [formData, preview]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview: string) => {
    setPreview(preview);
  };

  return (
    <AppContainer>
      <div>
        <HeadingWrapper>
          <Heading6>Create a company</Heading6>
          <Body>Company avatar</Body>
          <LabelWrapper>
            <Avatar
              labelStyle={{ color: '#fff' }}
              width={200}
              height={100}
              imageWidth={200}
              onCrop={onCrop}
              onClose={onClose}
            />
          </LabelWrapper>
          {preview && (
            <LabelWrapper>
              <img src={preview!} />
            </LabelWrapper>
          )}
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
        <Button disabled={disabled} block onClick={handleCreateClick}>
          Create
        </Button>
      </LabelWrapper>
    </AppContainer>
  );
};

export { CreateCompanyPage };
