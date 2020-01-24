import React from 'react';
import { paramCase } from 'param-case';
import styled from 'styled-components/macro';
import { TieIcon } from '@saschazar/unicat-icons';

import {
  ExperienceSection,
  ExperienceHeading
} from 'components/profile/experience';
import { WorkItemProps } from 'components/profile/experience/work';

const WorkIcon = styled(TieIcon)`
  justify-self: center;
  border: 1px solid hsla(var(--color-grey), 0.75);
  border-radius: 9999px;
  padding: 0.5rem;
  fill: hsla(var(--color-grey), 0.75);
  max-height: 100%;
  max-width: 100%;
`;

const WorkDuration = styled.small`
  color: hsl(var(--color-accent));
`;

const WorkItem = (props: WorkItemProps): JSX.Element => {
  const { city, end, institution, position, start, url } = props;
  const id = paramCase(`${position} at ${institution}`);

  return (
    <ExperienceSection>
      <WorkIcon aria-hidden="true" />
      <section>
        <WorkDuration>
          {start.year}–{end ? end.year : 'current'}
        </WorkDuration>
        <ExperienceHeading data-level="3" id={id}>
          {position}
        </ExperienceHeading>
        <span>
          <a href={url} rel="noopener noreferrer nofollow" target="_blank">
            {institution}
          </a>
          , {city}
        </span>
      </section>
    </ExperienceSection>
  );
};

export default WorkItem;
