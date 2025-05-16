const themeSelectorTemplate = document.createElement('template');
themeSelectorTemplate.innerHTML = /* html */ `
<style>
  :host {
    --duration: var(--duration-slow);
  }

  * {
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--color-secondary) var(--color-bg-muted);
  }

  :focus {
    outline: var(--border-width-md) dotted var(--color-text-muted);
    outline-offset: var(--border-width-sm);
  }

  ::selection {
    background-color: var(--color-secondary);
    color: var(--color-bg);
  }
  
  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-text-muted);
    border-radius: var(--border-radius, 0);
    transition: background-color var(--duration-fast) var(--timing);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-text);
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  h2 {
    margin: 0;
    font-size: var(--font-size-h4);
  }

  button {
    --color: var(--color-link);
    --space: var(--space-xs);

    position: relative;
    border-radius: 9999px;
    border: var(--border-width-sm) solid var(--border-color, currentColor);
    padding: var(--space-xs);
    height: var(--size, 44px);
    width: var(--size, 44px);
    font-size: var(--font-size);
    background-color: var(--bg-color, transparent);
    color: var(--color);
    aspect-ratio: 1;
    overflow: hidden;
    transition: background-color var(--duration-normal) var(--timing), color var(--duration-normal) var(--timing), border-color var(--duration-normal) var(--timing);
  }

  button:is(:hover, :focus) {
    --bg-color: var(--color-link);
    --border-color: var(--color-bg);
    --color: var(--color-bg);
  }

  #backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
    transition: opacity var(--duration) var(--timing);
    z-index: -10;
  }

  #container {
    --transform: translateX(100%);

    position: fixed;
    display: flex;
    flex-direction: column;
    padding: var(--space-sm);
    top: 0;
    right: 0;
    width: clamp(224px, 38.2vw, 288px);
    height: 100vh;
    background-color: var(--color-bg);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    transform: var(--transform);
    transition: transform var(--duration) var(--timing);
    visibility: hidden;
    overflow: hidden;
    z-index: -10;
  }

  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 5px 20px -2px var(--color-bg-muted);
    border-bottom: var(--border-width-sm) solid var(--color-bg-muted);
    margin: calc(var(--space-sm) * -1);
    margin-bottom: 0;
    padding: var(--space-sm) var(--space-md);
    z-index: 10;
  }

  #content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: var(--space-md);
    margin: calc(var(--space-sm) * -1);
    margin-top: 0;
    padding: var(--space-sm);
    padding-top: var(--space-md);
    overflow-y: auto;
    scrollbar-gutter: stable;
  }

  #close {
    flex: 0 0 var(--size, 44px);
    align-self: flex-start;
  }

  #backdrop.visible {
    --bg-color: hsla(0, 0%, 0%, 0.5);

    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    backdrop-filter: blur(8px);
    visibility: visible;
    opacity: 1;
    z-index: 1000;
  }

  #backdrop.visible:focus {
    outline-offset: 0;
    outline-width: var(--border-width-md);
  }

  #container.visible {
    --transform: translateX(0);

    visibility: visible;
    z-index: 1001;
  }
</style>
<button type="button" id="trigger" title="Select Theme" aria-label="Select Theme" aria-haspopup="dialog" aria-expanded="false" aria-controls="container">
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentatino" width="26" height="26">
    <use xlink:href="/assets/icons/icons.sprite.svg#icon-palette"></use>
  </svg>
</button>
<div id="backdrop"></div>
<aside id="container" role="dialog" aria-modal="true">
  <div id="header">
    <h2 id="title">Select Theme</h2>
    <button type="button" id="close" title="Close" aria-label="Close" aria-controls="container">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentatino" width="26" height="26">
        <use xlink:href="/assets/icons/icons.sprite.svg#icon-close"></use>
      </svg>
    </button>
  </div>
  <div id="content" role="listbox" aria-labelledby="title">
    <slot></slot>
  </div>
</aside>
`;

class ThemeSelector extends HTMLElement {
  private readonly backdrop: HTMLDivElement;
  private readonly closeButton: HTMLButtonElement;
  private readonly container: HTMLDivElement;
  private readonly themes: HTMLElement[];
  private readonly trigger: HTMLButtonElement;

  private focusedIndex = -1;
  private focusableElements: HTMLElement[] = [];

  public shadowRoot: ShadowRoot;

  static get THEME_IDENTIFIER() {
    return 'theme';
  }

  static get observedAttributes() {
    return ['theme'];
  }

  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(themeSelectorTemplate.content.cloneNode(true));

    this.backdrop = this.shadowRoot.querySelector(
      '#backdrop',
    ) as HTMLDivElement;
    this.closeButton = this.shadowRoot.querySelector(
      '#close',
    ) as HTMLButtonElement;
    this.container = this.shadowRoot.querySelector(
      '#container',
    ) as HTMLDivElement;
    this.trigger = this.shadowRoot.querySelector(
      '#trigger',
    ) as HTMLButtonElement;

    const slot = this.shadowRoot.querySelector('slot') as HTMLSlotElement;
    this.themes = Array.from(slot.assignedElements()).filter((element) =>
      element.hasAttribute('theme'),
    ) as HTMLElement[];
  }

  private toggle(isVisible: boolean) {
    if (isVisible) {
      this.backdrop.classList.add('visible');
      this.backdrop.setAttribute('tabindex', '0');
      this.container.classList.add('visible');
      this.trigger.setAttribute('aria-expanded', 'true');
    } else {
      this.backdrop.classList.remove('visible');
      this.backdrop.removeAttribute('tabindex');
      this.container.classList.remove('visible');
      this.trigger.setAttribute('aria-expanded', 'false');
    }
  }

  private handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.toggle(true);

    this.setFocus(0);
  }

  private handleClose(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.toggle(false);
  }

  private handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    switch (event.key) {
      case 'Enter':
      case 'Escape':
        this.toggle(false);
        break;
      case 'Tab':
        if (event.shiftKey) {
          this.focusedIndex <= 0
            ? this.setFocus(this.focusableElements.length - 1)
            : this.setFocus(this.focusedIndex - 1);
        } else {
          this.setFocus(
            (this.focusedIndex + 1) % this.focusableElements.length,
          );
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        this.focusedIndex <= 0
          ? this.setFocus(this.focusableElements.length - 1)
          : this.setFocus(this.focusedIndex - 1);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        this.setFocus((this.focusedIndex + 1) % this.focusableElements.length);
        break;
      case 'Home':
      case 'PageUp':
        this.setFocus(0);
        break;
      case 'End':
      case 'PageDown':
        this.setFocus(this.focusableElements.length - 1);
        break;
      default:
        break;
    }
  }

  private handleThemeSelect(event: CustomEventInit<{ theme: string }>) {
    event.detail?.theme && this.updateTheme(event.detail.theme);
  }

  private setFocus(i: number) {
    this.focusedIndex = i;
    i >= 0 && this.focusableElements[i % this.focusableElements.length].focus();
  }

  private updateTheme(theme: string) {
    const currentTheme = document.body.getAttribute('data-theme');

    currentTheme !== theme
      ? document.body.setAttribute('data-theme', theme)
      : document.body.removeAttribute('data-theme');

    currentTheme !== theme
      ? localStorage.setItem(ThemeSelector.THEME_IDENTIFIER, theme)
      : localStorage.removeItem(ThemeSelector.THEME_IDENTIFIER);

    for (const el of this.themes) {
      currentTheme !== theme && el.getAttribute('theme') === theme
        ? el.setAttribute('aria-current', 'true')
        : el.removeAttribute('aria-current');
    }
  }

  connectedCallback() {
    this.focusableElements = [
      ...this.container.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      ),
    ] as HTMLElement[];

    this.themes.forEach((theme) => {
      theme.addEventListener('themeselect', this.handleThemeSelect.bind(this));
      this.focusableElements.push(
        theme.querySelector('[tabindex]:not([tabindex="-1"])') as HTMLElement,
      );
    });
    this.container.addEventListener('keydown', this.handleKeydown.bind(this));
    this.backdrop.addEventListener('click', this.handleClose.bind(this));
    this.closeButton.addEventListener('click', this.handleClose.bind(this));
    this.trigger.addEventListener('click', this.handleClick.bind(this));

    const selectedTheme = localStorage.getItem(ThemeSelector.THEME_IDENTIFIER);
    selectedTheme && this.updateTheme(selectedTheme);
  }

  disconnectedCallback() {
    this.themes.forEach((theme) => {
      theme.removeEventListener(
        'themeselect',
        this.handleThemeSelect.bind(this),
      );
    });
    this.container.removeEventListener(
      'keydown',
      this.handleKeydown.bind(this),
    );
    this.backdrop.removeEventListener('click', this.handleClose.bind(this));
    this.closeButton.removeEventListener('click', this.handleClose.bind(this));
    this.trigger.removeEventListener('click', this.handleClick.bind(this));
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'selected-theme') {
      this.updateTheme(newValue);
    }
  }
}

customElements.define('theme-selector', ThemeSelector);
