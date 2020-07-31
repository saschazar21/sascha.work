import React from 'react';
import styled from 'styled-components';
import { paramCase } from 'param-case';
import { TempleIcon } from '@saschazar/unicat-icons';

import {
  ExperienceSection,
  ExperienceHeading,
} from 'components/profile/experience';
import { EducationItemProps } from 'components/profile/experience/education';

const EducationDuration = styled.small`
  color: hsl(var(--color-secondary));
`;

const EducationGraduation = styled.span`
  color: hsl(var(--color-secondary));
`;

const EducationIcon = styled(TempleIcon)`
  justify-self: center;
  border: 1px solid hsla(var(--color-grey), 0.75);
  border-radius: 9999px;
  padding: 0.5rem;
  fill: hsla(var(--color-grey), 0.75);
  max-height: 100%;
  max-width: 100%;
`;

const EducationItem = (props: EducationItemProps): JSX.Element => {
  const { city, end, graduation, institution, programme, start, url } = props;
  const id = paramCase(`${programme} at ${institution}`);

  return (
    <ExperienceSection>
      <EducationIcon aria-hidden="true" />
      <section>
        <EducationDuration>
          {start.year}–{end ? end.year : 'current'}
        </EducationDuration>
        <ExperienceHeading data-level="3" id={id}>
          {programme},&nbsp;
          <EducationGraduation>{graduation}</EducationGraduation>
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

export default EducationItem;
