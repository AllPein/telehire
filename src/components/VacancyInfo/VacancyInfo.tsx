import {
  BigWrapper,
  SmallWrapper,
  Wrapper,
} from '@/components/Layout/Layout.styles';
import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import {
  CurrencyEnum,
  ExperienceToLabel,
  VacancyStatusEnum,
} from '@/enums/Vacancy';
import { useMainButton } from '@/hooks/useMainButton';
import { useTelegram } from '@/hooks/useTelegram';
import { CurrencyToSymbol, Vacancy } from '@/models/Vacancy';
import { selectUser } from '@/store/auth/UserSelectors';
import { VacancyAction } from '@/store/vacancy/VacancyActions';
import { mdiMapMarker } from '@mdi/js';
import Icon from '@mdi/react';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CountryWrapper,
  Delimiter,
  InfoWrapper,
  JobInfoWrapper,
} from './VacancyInfo.styles';

type Props = {
  vacancy: Vacancy;
};

const VacancyInfo: FC<Props> = ({ vacancy }) => {
  const { tg } = useTelegram();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleApply = () => {
    dispatch(
      VacancyAction.apply({
        resumeId: user!.activeResumeId!,
        vacancyId: vacancy.id,
      }),
    );
  };

  const vacancyStatusControl = useMemo(() => {
    if (user?.loggedInAs === 'applicant') {
      if (vacancy.status === VacancyStatusEnum.Pending) {
        return {
          visible: false,
        };
      }

      if (vacancy.status === VacancyStatusEnum.Accepted) {
        return {
          visible: true,
          text: 'Chat with HR',
          onClick: () =>
            tg.openTelegramLink(`https://t.me/${vacancy.authorId}`),
          params: {
            color: 'rgb(97, 179, 82)',
          },
        };
      }

      return {
        visible: true,
        text: 'Apply',
        onClick: handleApply,
      };
    }

    return {
      visible: false,
    };
  }, [vacancy, user]);

  useMainButton({
    onClick: vacancyStatusControl.onClick,
    condition: vacancyStatusControl.visible,
    text: vacancyStatusControl.text,
    params: vacancyStatusControl.params,
  });

  return (
    <Wrapper>
      <BigWrapper center>
        <Heading6>{vacancy.position}</Heading6>
      </BigWrapper>
      <SmallWrapper center>
        <a href={'/companies/' + vacancy.company.id}>
          <Caption>{vacancy.company.name}</Caption>
        </a>
      </SmallWrapper>
      <SmallWrapper>
        <CountryWrapper>
          <Icon path={mdiMapMarker} size={0.5} />
          <Caption>{vacancy.location?.country}</Caption>
        </CountryWrapper>
      </SmallWrapper>
      <BigWrapper>
        <JobInfoWrapper>
          <InfoWrapper>
            <Caption>Salary</Caption>
            <SmallWrapper center>
              {vacancy.salaryTo ? (
                <Caption>
                  {vacancy.salaryFrom} - {vacancy.salaryTo}{' '}
                  {CurrencyToSymbol[vacancy.currency as CurrencyEnum]}
                </Caption>
              ) : (
                <Caption>
                  from {vacancy.salaryFrom}
                  {CurrencyToSymbol[vacancy.currency as CurrencyEnum]}
                </Caption>
              )}
            </SmallWrapper>
          </InfoWrapper>
          <Delimiter />
          <InfoWrapper>
            <Caption>Job Type</Caption>
            <SmallWrapper center>
              <Caption>{vacancy.jobType}</Caption>
            </SmallWrapper>
          </InfoWrapper>
          <Delimiter />
          <InfoWrapper>
            <Caption>Level</Caption>
            <SmallWrapper center>
              <Caption>{ExperienceToLabel[vacancy.experience]}</Caption>
            </SmallWrapper>
          </InfoWrapper>
        </JobInfoWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>Requirements</Body2>
        <SmallWrapper>
          <Caption>{vacancy.requirements}</Caption>
        </SmallWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>About vacancy</Body2>
        <SmallWrapper>
          <Caption>{vacancy.description}</Caption>
        </SmallWrapper>
      </BigWrapper>
    </Wrapper>
  );
};

export { VacancyInfo };
