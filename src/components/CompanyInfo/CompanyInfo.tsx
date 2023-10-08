import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button/Button';
import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { VacancyItem } from '@/components/VacancyItem/VacancyItem';
import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { CompanyVolumeToLabel } from '@/enums/Company';
import { useMainButton } from '@/hooks/useMainButton';
import { Company } from '@/models/Company';
import { selectUser } from '@/store/auth/UserSelectors';
import { CompanyAction } from '@/store/company/CompanyActions';
import { history } from '@/utils/history';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BigWrapper,
  JobInfoWrapper,
  MemberWrapper,
  SmallWrapper,
  Wrapper,
} from './CompanyInfo.styles';

type Props = {
  company: Company;
};

const CompanyInfo: FC<Props> = ({ company }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const fromCompany = useMemo(
    () => Number(localStorage.getItem(CURRENT_COMPANY_ID)) === company.id,
    [company],
  );

  useMainButton({
    onClick: () => history.push('/create-vacancy/' + company.id),
    condition: fromCompany,
    text: 'Create new vacancy',
  });

  const handleVacancyClick = (vacancyId: number) => {
    if (fromCompany) {
      history.push('/candidates/' + vacancyId);
    } else {
      history.push('/vacancies/' + vacancyId);
    }
  };

  const handleGenerateLink = () => {
    dispatch(CompanyAction.generateLink(company.id));
  };

  return (
    <Wrapper>
      <Avatar src={company.photoUrl} />
      <BigWrapper center>
        <Heading6>{company.name}</Heading6>
      </BigWrapper>
      <BigWrapper>
        <JobInfoWrapper>
          <Caption>Company size</Caption>
          <SmallWrapper center>
            <Caption>{CompanyVolumeToLabel[company.volume]}</Caption>
          </SmallWrapper>
        </JobInfoWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>About company</Body2>
        <SmallWrapper>
          <Caption>{company.description}</Caption>
        </SmallWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>Company members</Body2>
        <BigWrapper>
          {company.members.map((member) => (
            <MemberWrapper key={member.id}>
              <Caption>
                {member.firstName} {member.lastName}
              </Caption>
              <SmallWrapper>
                <Caption>@{member.username}</Caption>
              </SmallWrapper>
            </MemberWrapper>
          ))}
          {user?.id === company.ownerId && (
            <BigWrapper>
              <Button block onClick={handleGenerateLink}>
                Generate invite link
              </Button>
            </BigWrapper>
          )}
        </BigWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>Active positions</Body2>
        <BigWrapper>
          {company.vacancies?.length ? (
            company.vacancies.map((vacancy) => (
              <VacancyItem
                onClick={handleVacancyClick}
                withoutCompany
                key={vacancy.id}
                vacancy={vacancy}
              />
            ))
          ) : (
            <SmallWrapper>
              <Caption>{company.name} has no active vacancies yet</Caption>
            </SmallWrapper>
          )}
        </BigWrapper>
      </BigWrapper>
    </Wrapper>
  );
};

export { CompanyInfo };
