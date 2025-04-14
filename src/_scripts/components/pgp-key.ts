const pgpKeyTemplate = document.createElement('template');
pgpKeyTemplate.innerHTML = /* html */ `
<style>
  :host {
    display: inline-block;
    position: relative;
  }

  * {
    box-sizing: border-box;
  }

  :focus {
    outline: var(--border-width-md) dotted var(--color-bg-muted);
    outline-offset: var(--border-width-sm);
  }

  code {
    flex: 1 1 auto;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: var(--space-xs) var(--space-sm);
    text-wrap: nowrap;
  }

  button {
    --space: var(--space-xs);

    position: relative;
    border-radius: 9999px;
    border: var(--border-width-md) solid var(--border-color, transparent);
    padding: 0;
    height: var(--size, 44px);
    width: var(--size, 44px);
    font-size: var(--font-size);
    background-color: var(--bg-color, transparent);
    color: var(--color);
    aspect-ratio: 1;
    overflow: hidden;
    transition: background-color var(--duration-slow) var(--timing), color var(--duration-slow) var(--timing), border-color var(--duration-slow) var(--timing);
  }

  button:is(:hover, :focus) {
    --color: var(--color-link);
    --border-color: var(--color-link);

    cursor: pointer;
  }
  
  button#close {
    padding: var(--space);
  }

  button > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: calc(var(--space) * 2);
    padding: var(--space);
    width: 100%;
    transition: transform var(--duration-slow) var(--timing);
  }

  svg {
    flex: 1 0 auto;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
  }

  button.success {
    --bg-color: var(--color-link);
    --color: var(--color-text);
    --border-color: var(--color-link);
  }

  button.success > div {
    transform: translateY(-50%);
  }

  .buttons {
    display: flex;
    gap: var(--space-xs);
    padding: var(--space-xs);
  }

  #modal {
    --bg-color: var(--color-text-muted);
    --color-border: var(--color-text-muted);
    --color: var(--color-bg);
    --color-link: var(--color-secondary-muted);
    --font-size: var(--font-size-body);
    --gap: var(--space-xs);
    --space: var(--space-xs);
    --width: calc(100vw - var(--padding-container) * 2);

    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap);
    border-radius: var(--border-radius);
    border: var(--border-width-md) solid var(--color-border);
    box-shadow: 0px 10px 25px -5px hsl(0 0 0 / 0.9);
    padding: var(--space-xs);
    bottom: calc(100% + var(--space));
    left: 0;
    height: auto;
    width: var(--width);
    max-width: var(--width);
    background-color: var(--bg-color);
    color: var(--color);
    font-size: var(--font-size);
    transform: translateY(var(--space-md));
    opacity: 0;
    visibility: hidden;
    clip-path: rect(0 0 0 0);
    transition: transform var(--duration-slow) var(--timing), opacity var(--duration-slow) var(--timing);
    z-index: 30;
  }

  #modal::before {
    content: '';
    position: absolute;
    top: 100%;
    left: var(--space-lg);
    transform: translateX(-50%);
    border-width: var(--space-sm);
    border-style: solid;
    border-color: var(--color-border) transparent transparent transparent;
  }

  #modal.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    clip-path: none;
  }

  @media (min-width: 640px) {
    #modal {
      --gap: var(--space-md);

      min-width: 360px;
      width: auto;
    }
  }

  @media (min-width: 848px) {
    #modal {
      --gap: var(--space-lg);
      --width: calc(var(--max-width) - var(--padding-container) * 2);
    }
  }
</style>
<div>
<slot name="anchor"></slot>
<aside id="modal" role="dialog" aria-label="PGP Key Actions">
  <code></code>
  <div class="buttons">
    <button type="button" id="download" title="Download">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" aria-hidden="true" role="presentation">
        <use xlink:href="/assets/icons/icons.sprite.svg#icon-download"></use>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" aria-hidden="true" role="presentation">
        <use xlink:href="/assets/icons/icons.sprite.svg#icon-check"></use>
      </svg>
    </div>
    </button>
    <button type="button" id="copy" title="Copy">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" aria-hidden="true" role="presentation">
        <use xlink:href="/assets/icons/icons.sprite.svg#icon-copy"></use>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" aria-hidden="true" role="presentation">
        <use xlink:href="/assets/icons/icons.sprite.svg#icon-check"></use>
      </svg>
    </div>
    </button>
    <button type="button" id="close" title="Close">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" aria-hidden="true" role="presentation">
      <use xlink:href="/assets/icons/icons.sprite.svg#icon-close"></use>
    </svg></button>
  </div>
</aside>
</div>
`;

class PGPKey extends HTMLElement {
  private readonly closeButton: HTMLButtonElement;
  private readonly copyButton: HTMLButtonElement;
  private readonly downloadButton: HTMLButtonElement;
  private readonly fingerprint: string;
  private readonly link: HTMLAnchorElement;
  private readonly modal: HTMLDivElement;

  private copyTimeout: number | null = null;
  private downloadTimeout: number | null = null;
  private key: string | null = null;

  public shadowRoot: ShadowRoot;
  public static readonly delay = 2000;
  public static readonly keyPath = '/pgp/public.asc';

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(pgpKeyTemplate.content.cloneNode(true));

    this.closeButton = this.shadowRoot.querySelector(
      '#close',
    ) as HTMLButtonElement;
    this.copyButton = this.shadowRoot.querySelector(
      '#copy',
    ) as HTMLButtonElement;
    this.downloadButton = this.shadowRoot.querySelector(
      '#download',
    ) as HTMLButtonElement;
    const slot = this.shadowRoot.querySelector(
      'slot[name="anchor"]',
    ) as HTMLSlotElement;
    this.link = slot.assignedElements()[0] as HTMLAnchorElement;
    this.modal = this.shadowRoot.querySelector('#modal') as HTMLDivElement;

    this.fingerprint = this.getAttribute('fingerprint') ?? '';
    this.fingerprint = this.fingerprint
      .slice(-8)
      .replace(/(.{4})/g, '$1 ')
      .trim();

    this.link.setAttribute('aria-haspopup', 'dialog');
    this.link.setAttribute('aria-expanded', 'false');
    this.link.setAttribute('aria-controls', 'modal');
    this.modal.querySelector('code')!.innerText = this.fingerprint;
  }

  private async fetchKey(): Promise<void> {
    const response = await fetch(PGPKey.keyPath);
    if (!response.ok) {
      this.disconnectedCallback();
      throw new Error(`Failed to fetch PGP key: ${response.statusText}`);
    }

    this.key = await response.text();
  }

  private async handleClick(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.key) {
      await this.fetchKey();
    }

    this.link.setAttribute('aria-expanded', 'true');
    this.modal.classList.add('open');
  }

  private handleClose(_event: Event): void {
    this.link.setAttribute('aria-expanded', 'false');
    this.modal.classList.remove('open');
  }

  private async handleCopy(_event: Event): Promise<void> {
    this.copyTimeout && clearTimeout(this.copyTimeout);
    await navigator.clipboard.writeText(this.key as string);

    this.copyButton.classList.add('success');
    this.copyTimeout = window.setTimeout(() => {
      this.copyButton.classList.remove('success');
      this.copyTimeout = null;
    }, PGPKey.delay);
  }

  private handleDownload(_event: Event): void {
    this.downloadTimeout && clearTimeout(this.downloadTimeout);

    const blob = new Blob([this.key as string], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.link.getAttribute('download') ?? 'public.asc';
    // document.body.appendChild(a);
    a.click();
    // document.body.removeChild(a);
    URL.revokeObjectURL(url);
    a.remove();

    this.downloadButton.classList.add('success');
    this.downloadTimeout = window.setTimeout(() => {
      this.downloadButton.classList.remove('success');
      this.downloadTimeout = null;
    }, PGPKey.delay);
  }

  public connectedCallback(): void {
    this.closeButton.addEventListener('click', this.handleClose.bind(this));
    this.copyButton.addEventListener('click', this.handleCopy.bind(this));
    this.downloadButton.addEventListener(
      'click',
      this.handleDownload.bind(this),
    );
    this.link.addEventListener('click', this.handleClick.bind(this));
  }

  public disconnectedCallback(): void {
    this.closeButton.removeEventListener('click', this.handleClose.bind(this));
    this.copyButton.removeEventListener('click', this.handleCopy.bind(this));
    this.downloadButton.removeEventListener(
      'click',
      this.handleDownload.bind(this),
    );
    this.link.removeEventListener('click', this.handleClick.bind(this));
  }
}

customElements.define('pgp-key', PGPKey);
