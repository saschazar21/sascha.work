import React from 'react';

import { ExperienceList, ExperienceDate } from 'components/profile/experience';
import EducationItem from 'components/profile/experience/education/item';

import experience from 'public/experience.json';

export interface EducationItemProps {
  city: string;
  end: ExperienceDate;
  graduation: string;
  institution: string;
  programme: string;
  start: ExperienceDate;
  url: string;
}

const Education = (): JSX.Element => {
  const { data: { education = [] } = {} } = experience;
  return (
    <ExperienceList>
      {education.map((educationItemData: EducationItemProps, index: number) => (
        <li key={`EducationItem-${index}`}>
          <EducationItem {...educationItemData} />
        </li>
      ))}
    </ExperienceList>
  );
};

export default Education;
