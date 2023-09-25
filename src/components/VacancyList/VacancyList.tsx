import { VacancyItem } from '@/components/VacancyList/components/VacancyItem';
import { Vacancy } from '@/components/models/Vacancy';
import { ExperienceEnum } from '@/enums/Vacancy';

const vacancies: Vacancy[] = [
  {
    title: 'React developer',
    salary: '1000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '2000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '3000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '4000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '5000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '6000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
];
const VacancyList = () => {
  return (
    <div>
      {vacancies.map((vacancy) => (
        <VacancyItem
          key={vacancy.country + vacancy.title + vacancy.salary}
          vacancy={vacancy}
        />
      ))}
    </div>
  );
};

export { VacancyList };
