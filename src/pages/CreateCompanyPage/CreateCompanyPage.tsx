import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import { TextArea } from '@/components/TextArea/TextArea';
import { Body, Heading6 } from '@/components/Typography/Typography.styles';
import { CompanyVolumeEnum, CompanyVolumeToLabel } from '@/enums/Company';
import { selectCreateCompanyLoading } from '@/store/Loader/LoaderSelectors';
import { CompanyAction } from '@/store/company/CompanyActions';
import { CompanyFormData } from '@/types/FormData';
import { ChangeEvent, useMemo, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppContainer,
  HeadingWrapper,
  InputWrapper,
  LabelWrapper,
} from './CreateCompanyPage.styles';

const options = [
  {
    label: CompanyVolumeToLabel[CompanyVolumeEnum.SelfEmployed],
    value: CompanyVolumeEnum.SelfEmployed,
  },
  {
    label: CompanyVolumeToLabel[CompanyVolumeEnum.Low],
    value: CompanyVolumeEnum.Low,
  },
  {
    label: CompanyVolumeToLabel[CompanyVolumeEnum.Medium],
    value: CompanyVolumeEnum.Medium,
  },
  {
    label: CompanyVolumeToLabel[CompanyVolumeEnum.High],
    value: CompanyVolumeEnum.High,
  },
  {
    label: CompanyVolumeToLabel[CompanyVolumeEnum.Huge],
    value: CompanyVolumeEnum.Huge,
  },
];

const CreateCompanyPage = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<CompanyFormData, 'photoUrl'>>({
    name: '',
    description: '',
    volume: options[0],
  });
  const loading = useSelector(selectCreateCompanyLoading);

  const handleCreateClick = () => {
    dispatch(CompanyAction.createCompany({ ...formData, photoUrl: preview! }));
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
        <Button
          disabled={disabled}
          block
          onClick={handleCreateClick}
          loading={loading}
        >
          Create
        </Button>
      </LabelWrapper>
    </AppContainer>
  );
};

export { CreateCompanyPage };
