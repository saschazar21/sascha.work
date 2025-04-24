const PROJECT_API_ENDPOINT = '/api/v1/project';
const IS_REFETCHING = 'is-refetching';

let projectObserver: IntersectionObserver;

const projectObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const projectObserverCallback = (
  entries: IntersectionObserverEntry[],
  _observer: IntersectionObserver,
) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      target.setAttribute(IS_REFETCHING, 'true');
      projectObserver.unobserve(target);
    }
  });
};

projectObserver = new IntersectionObserver(
  projectObserverCallback,
  projectObserverOptions,
);

interface Project {
  stargazersCount: number;
  languages: {
    name: string;
    color: string;
    size: number;
  }[];
  release: {
    publishedAt: string;
  };
  pushedAt: string;
}

interface ProjectResponse {
  data: Project | null;
}

const projectTemplate = document.createElement('template');
projectTemplate.innerHTML = /* html */ `<slot name="project"></slot>`;

class ProjectEntry extends HTMLElement {
  private readonly container: HTMLDivElement;

  public shadowRoot: ShadowRoot;

  static get observedAttributes() {
    return ['owner', 'repo', IS_REFETCHING];
  }

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(projectTemplate.content.cloneNode(true));

    const slot = this.shadowRoot.querySelector(
      'slot[name="project"]',
    ) as HTMLSlotElement;
    this.container = slot.assignedNodes()[0] as HTMLDivElement;
  }

  private updateProject(project: Project) {
    const stargazers = this.container.querySelector(
      'data-stargazers span',
    ) as HTMLSpanElement;
    stargazers.innerText = project.stargazersCount.toString();

    const update = this.container.querySelector(
      'data-updated',
    ) as HTMLSpanElement;
    const updatedAt = new Date(
      project.release?.publishedAt ?? project.pushedAt,
    );

    const t = update.querySelector('time') as HTMLTimeElement;
    t.setAttribute('datetime', updatedAt.toISOString());
    t.innerText = updatedAt.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });

    let gradient = 'linear-gradient(to right, ';
    let stop = 0;

    const languagesHTML = project.languages.reduce((prev, language, i) => {
      gradient += `${language.color} ${stop}%,`;

      const li = document.createElement('li');
      li.style.setProperty('--color-language', language.color);
      li.setAttribute('data-size', language.size.toString());

      const name = document.createElement('small');
      name.classList.add('p-category');
      name.innerText = language.name;

      const size = document.createElement('small');
      size.innerText = language.size.toString();

      li.innerHTML = `${name.outerHTML}&nbsp;${size.outerHTML}`;

      stop += language.size;
      gradient += `${stop}%${i < project.languages.length - 1 ? ',' : ''}`;

      return prev + li.outerHTML;
    }, '' as string);

    const languages = this.container.querySelector(
      'data-languages',
    ) as HTMLUListElement;

    languages.innerHTML = languagesHTML;

    gradient += ')';

    this.container.style.setProperty('--gradient', gradient);
  }

  private async refetch() {
    return fetch(
      `${PROJECT_API_ENDPOINT}/${this.getAttribute(
        'owner',
      )}/${this.getAttribute('repo')}`,
    )
      .then((response) => response.json())
      .then((data: ProjectResponse) => {
        if (data.data) {
          return data.data;
        }
        throw new Error('Response contained errors.');
      })
      .then(this.updateProject.bind(this))
      .catch((error) => {
        console.error('Error fetching project data:', error);
        projectObserver.unobserve(this);
        return null;
      })
      .finally(() => {
        this.removeAttribute(IS_REFETCHING);
      });
  }

  connectedCallback() {
    const owner = this.getAttribute('owner');
    const repo = this.getAttribute('repo');
    if (owner && repo) {
      projectObserver.observe(this);
    }
  }

  disconnectedCallback() {
    projectObserver.unobserve(this);
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === IS_REFETCHING) {
      newValue === 'true' && this.refetch();
    } else if (name === 'owner' || name === 'repo') {
      const owner = this.getAttribute('owner');
      const repo = this.getAttribute('repo');
      if (owner && repo) {
        projectObserver.observe(this);
      }
    }
  }
}

customElements.define('project-entry', ProjectEntry);
