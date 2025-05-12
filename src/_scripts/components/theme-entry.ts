const themeEntryTemplate = document.createElement('template');
themeEntryTemplate.innerHTML = /* html */ `
<div tabindex="0" role="button" data-theme-entry>
  <svg viewBox="0 0 128 64">
    <rect fill="var(--color-text)" width="64" height="8" />
    <rect y="12" fill="var(--color-text-muted)" width="128" height="4" /> 
    <rect y="18" fill="var(--color-text-muted)" width="128" height="4" /> 
    <rect y="24" fill="var(--color-text-muted)" width="92" height="4" /> 
    <circle cx="16" cy="48" r="14" fill="var(--color-primary)" />
    <circle cx="48" cy="48" r="14" fill="var(--color-secondary)" />
    <circle cx="80" cy="48" r="14" fill="var(--color-secondary-muted)" />
    <circle cx="112" cy="48" r="14" fill="var(--color-bg-muted)" />
  </svg>
  <span></span>
</div>
`;

class ThemeEntry extends HTMLElement {
  private readonly container: HTMLDivElement;

  static get observedAttributes() {
    return ['aria-current', 'theme'];
  }

  constructor() {
    super();
    this.appendChild(themeEntryTemplate.content.cloneNode(true));

    this.container = this.querySelector('div') as HTMLDivElement;
    this.container.querySelector('span')!.textContent =
      this.getAttribute('theme') ?? '';
  }

  private emitThemeSelection() {
    const theme = this.getAttribute('theme');
    if (theme) {
      const event = new CustomEvent('themeselect', {
        detail: { theme },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  private handleClick(event: MouseEvent | KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.emitThemeSelection();
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();

      this.emitThemeSelection();
    }
  }

  connectedCallback() {
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.container.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  disconnectedCallback() {
    this.container.removeEventListener('click', this.handleClick.bind(this));
    this.container.removeEventListener(
      'keydown',
      this.handleKeydown.bind(this),
    );
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'theme') {
      this.container.setAttribute('data-theme', newValue);
      this.container.setAttribute('aria-label', `Select ${newValue}-theme`);
    }

    if (name === 'aria-current' && newValue === 'true') {
      const css = this.getAttribute('css');
      if (css) {
        const theme = this.getAttribute('theme');
        if (
          theme &&
          !document.head.querySelector(`link[data-theme-entry="${theme}"]`)
        ) {
          const link = document.createElement('link');
          link.setAttribute('data-theme-entry', theme);
          link.setAttribute('rel', 'stylesheet');
          link.setAttribute('href', css);
          document.head.appendChild(link);
        }
      }
    }
  }
}

customElements.define('theme-entry', ThemeEntry);
