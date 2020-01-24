import React, { useState } from 'react';
import { useAmp } from 'next/amp';

import {
  ExperienceList,
  ExperienceDate,
  ExperienceButton,
  ExperienceButtonWrapper
} from 'components/profile/experience';

import experience from 'public/experience.json';
import WorkItem from './item';

export interface WorkItemProps {
  city: string;
  end?: ExperienceDate;
  institution: string;
  position: string;
  start: ExperienceDate;
  url: string;
}

const Work = (): JSX.Element => {
  const { data: { work = [] } = {} } = experience;
  const isAmp = useAmp();

  const [first, second, third] = work;
  const [workItems, setWorkItems] = useState(
    isAmp ? work : [first, second, third]
  );

  const handleClick = (): void => setWorkItems(work);

  return (
    <>
      <ExperienceList>
        {workItems.map((workItemData: WorkItemProps, index: number) => (
          <li key={`WorkItem-${index}`}>
            <WorkItem {...workItemData} />
          </li>
        ))}
      </ExperienceList>
      {workItems.length !== work.length && (
        <ExperienceButtonWrapper>
          <ExperienceButton onClick={handleClick}>
            See all positions
          </ExperienceButton>
        </ExperienceButtonWrapper>
      )}
    </>
  );
};

export default Work;
