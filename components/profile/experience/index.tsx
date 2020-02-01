import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styled from 'styled-components/macro';

import Container from 'components/container';
import Education from 'components/profile/experience/education';
import FullBleed from 'components/fullbleed';
import Heading from 'components/mdx/heading';
import Work from 'components/profile/experience/work';

export const INITIAL_DISPLAY = 3; // show so many entries from the beginning
export interface ExperienceDate {
  month: number;
  year: number;
}

export interface ExperienceButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  on?: string;
}

export const ExperienceList = styled.ul`
  padding-left: 0;
  list-style-type: none;

  li {
    display: block;
    position: relative;

    &:not(:last-child) {
      padding-bottom: 4rem;

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0.5rem;
        width: 1px;
        height: 3.5rem;
        background-color: hsla(var(--color-grey), 0.5);
      }

      @media print, (min-width: 768px) {
        padding-bottom: 2rem;

        &:after {
          left: 1.5rem;
          height: calc(100% - 4rem);
        }
      }
    }
  }
`;

export const ExperienceSection = styled.div`
  display: grid;
  grid-template-rows: 3rem auto;
  column-gap: 2rem;
  margin-bottom: 1rem;

  > svg {
    height: 100%;
    width: auto;
  }

  @media print, (min-width: 768px) {
    grid-template-columns: 3rem auto;
    grid-template-rows: 1fr;

    > svg {
      height: auto;
      width: 100%;
    }
  }
`;

export const ExperienceHeading = styled(Heading)`
  margin-top: 0.5rem;

  @media print, (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const ExperienceButton = styled((props: ExperienceButtonProps) =>
  React.createElement('button', props),
)`
  --color-button: var(--color-primary);

  transition: background 200ms ease-in;
  display: inline-flex;
  position: relative;
  align-items: center;
  align-self: center;
  justify-content: center;
  border: 0.5px solid hsl(var(--color-button));
  padding: 0.5em 1em;
  margin: 1rem;
  background: inherit;
  color: inherit;
  font-family: inherit;
  font-size: 1em;

  &:focus {
    outline: hsl(var(--color-accent)) dotted 1px;
  }

  &:focus,
  &:hover {
    background: hsl(var(--color-button));
    color: hsl(var(--color-bg-primary));
    cursor: pointer;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: hsla(var(--color-button), 0.75);
    height: 1px;
    width: 2rem;
    top: 50%;
    left: 100%;
  }

  &::before {
    right: 100%;
    left: auto;
  }
`;

export const ExperienceButtonWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Experience = (): JSX.Element => {
  return (
    <>
      <FullBleed>
        <Container>
          <Heading data-level="2" id="work-experience">
            Work Experience
          </Heading>
          <Work />
        </Container>
      </FullBleed>
      <FullBleed>
        <Container>
          <Heading data-level="2" id="education">
            Education
          </Heading>
          <Education />
        </Container>
      </FullBleed>
    </>
  );
};

export default Experience;
