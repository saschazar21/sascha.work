import React from 'react';

import {
  INITIAL_DISPLAY,
  ExperienceList,
  ExperienceDate,
  ExperienceButton,
  ExperienceButtonWrapper
} from 'components/profile/experience';
import WorkItem from 'components/profile/experience/work/item';

import experience from 'public/experience.json';

export interface WorkItemProps {
  city: string;
  end?: ExperienceDate;
  institution: string;
  position: string;
  start: ExperienceDate;
  url: string;
}

const renderExperiences = (list: WorkItemProps[], key: string): JSX.Element[] =>
  list.map((workItemData: WorkItemProps, index: number) => (
    <li
      key={`${key}-${index}`}
      {...Object.assign(
        {},
        key === 'HiddenWorkItem'
          ? { hidden: true, 'data-amp-bind-hidden': 'workstate.visible' }
          : null
      )}
    >
      <WorkItem {...workItemData} />
    </li>
  ));

const Work = (): JSX.Element => {
  const { data: { work = [] } = {} } = experience;
  const initialWorkDisplay = work.slice(0, INITIAL_DISPLAY);
  const additionalWorkDisplay = work.slice(INITIAL_DISPLAY);

  return (
    <>
      <amp-state id="workstate">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ visible: false })
          }}
        />
      </amp-state>
      <ExperienceList>
        {renderExperiences(initialWorkDisplay, 'WorkItem')}
        {renderExperiences(additionalWorkDisplay, 'HiddenWorkItem')}
      </ExperienceList>
      {additionalWorkDisplay.length > 0 && (
        <ExperienceButtonWrapper data-amp-bind-hidden="!workstate.visible">
          <ExperienceButton on="tap:AMP.setState({ visible: true })">
            Show all positions
          </ExperienceButton>
        </ExperienceButtonWrapper>
      )}
    </>
  );
};

export default Work;
