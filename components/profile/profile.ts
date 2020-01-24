import pkg from 'package.json';
import experience from 'public/experience.json';

const { data: { education = [], work = [] } = {} } = experience;
const latestEducation = education[education.length - 1];
const latestWork = work[work.length - 1];

export const alumniOf = {
  '@type': 'EducationalOrganization',
  department: {
    '@type': 'Organization',
    name: latestEducation.programme
  },
  location: {
    '@type': 'PostalAddress',
    addressLocality: latestEducation.city
  },
  legalName: latestEducation.institution,
  name: latestEducation.institution,
  url: latestEducation.url
};

export const worksFor = {
  '@type': 'Corporation',
  description: latestWork.position,
  location: {
    '@type': 'PostalAddress',
    addressLocality: latestWork.city
  },
  legalName: latestWork.institution,
  url: latestWork.url
};

export const person = {
  '@type': 'Person',
  name: pkg.author.name,
  url: pkg.author.url,
  alumniOf,
  worksFor,
  knowsAbout: ['HTML', 'JavaScript', 'React', 'Node.js', 'TypeScript'],
  knowsLanguage: ['de-AT', 'en-US', 'fr-FR'],
  nationality: 'Austrian'
};

const ld = {
  '@context': 'http://schema.org',
  ...person
};

export default ld;
