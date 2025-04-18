const expanderTemplate = document.createElement('template');
expanderTemplate.innerHTML = /* html */ `
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  * {
    box-sizing: border-box;
  }

  :focus {
    outline: var(--border-width-md) dotted var(--color-text);
    outline-offset: var(--border-width-sm);
  }

  button {
    --padding-x: var(--space-sm);
    --padding-y: var(--space-sm);

    position: relative;
    border: var(--border-width-sm) solid var(--color-link);
    border-radius: var(--border-radius);
    padding: var(--padding-y) var(--padding-x);
    color: var(--color-link);
    text-transform: uppercase;
    font-size: var(--font-size-h4);
    letter-spacing: var(--letter-spacing-m);
    background-color: transparent;
  }

  #contents {
    display: block;
    height: var(--height, 0);
    width: 100%;
    visibility: hidden;
    overflow: hidden;
    clip-path: rect(0 0 0 0);
    transition: height var(--duration-slow) var(--timing);
  }

  #contents.open {
    visibility: visible;
    overflow: visible;
    clip-path: none;
  }
</style>
<div id="contents">
  <slot name="contents"></slot>
</div>
<button type="button" aria-controls="contents">Open</button>
`;

class ExpanderButton extends HTMLElement {
  private readonly button: HTMLButtonElement;
  private readonly contents: HTMLDivElement;
  private readonly height: number;

  public shadowRoot: ShadowRoot;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(expanderTemplate.content.cloneNode(true));

    this.button = this.shadowRoot.querySelector('button') as HTMLButtonElement;
    this.contents = this.shadowRoot.querySelector(
      '#contents',
    ) as HTMLDivElement;

    const slot = this.shadowRoot.querySelector(
      'slot[name="contents"]',
    ) as HTMLSlotElement;
    const contents = slot.assignedElements()[0] as HTMLElement;
    this.height = contents.scrollHeight;
  }

  connectedCallback() {
    this.button.setAttribute('aria-expanded', 'false');
    this.button.innerText = this.getAttribute('text') ?? 'Open';
    this.button.addEventListener('click', () => this.toggle(true));
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', () => this.toggle(true));
  }

  toggle(value: boolean) {
    if (value) {
      this.contents.classList.add('open');
      this.button.remove();
      this.contents.style.setProperty('--height', `${this.height}px`);
    }
  }

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'open') {
      this.toggle(newValue === 'true');
    }
    if (name === 'text') {
      this.button.innerText = newValue;
    }
  }
}

customElements.define('expander-button', ExpanderButton);
