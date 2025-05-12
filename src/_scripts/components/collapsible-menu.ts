const menuTemplate = document.createElement('template');
menuTemplate.innerHTML = /* html */ `
<style>
  :host {
    --space: 44px;

    display: block;
    height: var(--space);
    width: var(--space);
  }

  * {
    box-sizing: border-box;
  }

  :focus {
    outline: var(--border-width-md) dotted var(--color-text);
    outline-offset: var(--border-width-sm);
  }
  
  .menuContainer {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background-color: var(--bg-color);
    z-index: 10;
    font-size: var(--font-size-h3);
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    clip-path: rect(0 100vw 0 0);
    scrollbar-width: thin;
    scrollbar-gutter: stable;
    transition: clip-path var(--duration-slow) var(--timing);
  }

  ::slotted(nav) {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0;
    transform: translateY(12.5vh);
    transition: opacity var(--duration-slow) var(--timing), transform var(--duration-slow) var(--timing);
  }

  [data-icons] {
    --space: var(--space-sm);

    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: var(--space);
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: var(--space);
    width: 100%;
    max-width: 100%;
    fill: var(--color-link);
  }

  [data-icons] > li {
    --space: 44px;
    display: flex;
    height: var(--space);
    width: var(--space);
  }

  .menuContainer section {
    display: none;
    margin-bottom: 16.6667vh;
  }

  .menuContainer.open {
    --bg-color: var(--color-bg-muted);

    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    visibility: visible;
    opacity: 1;
    clip-path: rect(0 100vw 100vh 0);
  }

  .menuContainer.open ::slotted(nav) {
    opacity: 1;
    transform: translateY(0);
  }

  .menuContainer.open section {
    display: block;
  }

  .toggleButton {
    --bg-color: transparent;
    --border-color: var(--color-link);
    --color: var(--color-link);

    position: relative;
    border-radius: 9999px;
    border: var(--border-width-sm) solid var(--border-color);
    padding: 0;
    height: var(--space);
    width: var(--space);
    background-color: var(--bg-color);
    color: var(--color);
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-normal);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-m);
    aspect-ratio: 1;
    overflow: hidden;
    transition: background-color var(--duration-slow) var(--timing),
      color var(--duration-slow) var(--timing);
  }

  .toggleButton:is(:hover, :focus) {
    --bg-color: var(--color-link);
    --border-color: var(--color-bg);
    --color: var(--color-bg);
  }

  .toggleButton > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: calc(var(--space-xs) * 2);
    padding: var(--space-xs);
    width: 100%;
    transition: transform var(--duration-slow) var(--timing);
  }

  .toggleButton svg {
    width: 100%;
    height: 100%;
    color: var(--color);
    aspect-ratio: 1;
  }

  .menuContainer.open + .toggleButton {
    --bg-color: var(--color-link);
    --color: var(--color-bg-muted);
    z-index: 11;
  }

  .menuContainer.open + .toggleButton > div {
    transform: translateY(-50%);
  }

  @media (min-width: 640px) {
    :host {
      height: auto;
      width: auto;
    }

    .menuContainer {
      position: static;
      display: block;
      visibility: visible;
      height: auto;
      width: 100%;
      opacity: 1;
      clip-path: unset;
    }

    .menuContainer ::slotted(nav) {
      font-size: var(--font-size-body);
      opacity: 1;
      transform: translateY(0);
      transition: unset;
    }

    .toggleButton {
      display: none;
    }
  }
</style>
<div class="menuContainer" id="menu-container" role="navigation">
  <slot name="menu"></slot>
  <slot name="footer"></slot>
</div>
<button type="button" aria-label="Toggle menu" aria-controls="menu-container" class="toggleButton">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" fill="none" width="26" height="26">
      <use href="/assets/icons/icons.sprite.svg#icon-menu" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" fill="none" width="26" height="26">
      <use href="/assets/icons/icons.sprite.svg#icon-close" />
    </svg>
  </div>
</button>
`;

class CollapsibleMenu extends HTMLElement {
  private readonly footerTemplate: HTMLTemplateElement;
  private readonly menuContainer: HTMLDivElement;
  private readonly toggleButton: HTMLButtonElement;

  private focusedIndex = -1;
  private focusableElements: HTMLElement[] = [];

  public shadowRoot: ShadowRoot;

  static get MAX_WIDTH() {
    return 640;
  }

  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(menuTemplate.content.cloneNode(true));

    const footerSlot = this.shadowRoot.querySelector(
      'slot[name="footer"]',
    ) as HTMLSlotElement;
    this.footerTemplate =
      footerSlot.assignedElements()[0] as HTMLTemplateElement;
    this.toggleButton = this.shadowRoot.querySelector(
      '.toggleButton',
    ) as HTMLButtonElement;
    this.menuContainer = this.shadowRoot.getElementById(
      'menu-container',
    ) as HTMLDivElement;
  }

  private handleAddKeydownHandler() {
    if (!this.onkeydown) {
      this.onkeydown = this.handleKeydown.bind(this);
      this.focusedIndex = 0;
    }
  }

  private handleRemoveKeydownHandler() {
    if (this.onkeydown) {
      this.onkeydown = null;
      this.focusedIndex = -1;
    }
  }

  private handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.handleToggle();
  }

  private handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        event.stopPropagation();
        this.focusedIndex <= 0
          ? this.setFocus(this.focusableElements.length - 1)
          : this.setFocus(this.focusedIndex - 1);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        event.stopPropagation();
        this.setFocus((this.focusedIndex + 1) % this.focusableElements.length);
        break;
      case 'Home':
      case 'PageUp':
        event.preventDefault();
        event.stopPropagation();
        this.setFocus(0);
        break;
      case 'End':
      case 'PageDown':
        event.preventDefault();
        event.stopPropagation();
        this.setFocus(this.focusableElements.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        this.handleToggle(false);
        this.focusedIndex === 0 && this.toggleButton.blur();
        break;
      case 'Tab':
        event.preventDefault();
        event.stopPropagation();
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
      case 'Enter':
      case ' ':
        if (
          this.focusedIndex === 0 &&
          this.menuContainer.classList.contains('open')
        ) {
          event.preventDefault();
          event.stopPropagation();
          this.handleToggle(false);
        }
        break;
      default:
        break;
    }
  }

  private handleResize(_event: Event) {
    this.handleToggle(false);

    if (window.innerWidth < CollapsibleMenu.MAX_WIDTH) {
      this.handleAddKeydownHandler();
    } else {
      this.handleRemoveKeydownHandler();
    }
  }

  private handleToggle(value?: boolean) {
    if (typeof value !== 'undefined') {
      value
        ? this.menuContainer.classList.add('open')
        : this.menuContainer.classList.remove('open');
    } else {
      this.menuContainer.classList.toggle('open');
    }
    if (this.menuContainer.classList.contains('open')) {
      document.body.style.overflowY = 'hidden';
      this.toggleButton.setAttribute('aria-expanded', 'true');

      window.innerWidth < CollapsibleMenu.MAX_WIDTH &&
        this.handleAddKeydownHandler();
    } else {
      document.body.style.removeProperty('overflow-y');
      this.toggleButton.setAttribute('aria-expanded', 'false');

      window.innerWidth < CollapsibleMenu.MAX_WIDTH &&
        this.handleRemoveKeydownHandler();
    }
  }

  private setFocus(index: number) {
    this.focusedIndex = index;
    index >= 0 &&
      this.focusableElements[index % this.focusableElements.length].focus();
  }

  connectedCallback() {
    this.menuContainer.appendChild(this.footerTemplate.content.cloneNode(true));

    const menuSlot = this.menuContainer.querySelector(
      'slot[name="menu"]',
    ) as HTMLSlotElement;
    const footerSlot = this.menuContainer.querySelector(
      'slot[name="footer"]',
    ) as HTMLSlotElement;

    const navElements = menuSlot
      .assignedElements()
      .reduce((acc: Element[], element: Element) => {
        const elements = element.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        return [...acc, ...elements] as HTMLElement[];
      }, []);

    const footerElements = footerSlot
      .assignedElements()
      .reduce((acc: Element[], element: Element) => {
        const elements = element.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        return [...acc, ...elements] as HTMLElement[];
      }, []);

    const socialElements = [
      ...this.menuContainer.querySelectorAll('a, button'),
    ] as HTMLElement[];

    this.focusableElements = [
      this.toggleButton,
      ...navElements,
      ...footerElements,
      ...socialElements,
    ];

    this.toggleButton.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  disconnectedCallback() {
    this.toggleButton.removeEventListener('click', this.handleClick.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ) {
    name === 'open' && this.handleToggle(newValue !== null);
  }
}

customElements.define('collapsible-menu', CollapsibleMenu);
