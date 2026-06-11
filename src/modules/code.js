export class JLCode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['theme', 'variant', 'mac-frame', 'language', 'stripes', 'animated'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const theme = this.getAttribute('theme') || 'dark';
    const variant = this.getAttribute('variant') || 'flat';
    const macFrame = this.getAttribute('mac-frame') === 'true';
    const lang = this.getAttribute('language') || '';
    const stripes = this.getAttribute('stripes') === 'true';
    const animated = this.getAttribute('animated') === 'true';

    if (this.getAttribute('theme') !== theme) this.setAttribute('theme', theme);
    if (this.getAttribute('variant') !== variant) this.setAttribute('variant', variant);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          --code-bg: var(--surface-base, #1e1e1e);
          --code-text: var(--surface-text, #d4d4d4);
          --code-border: var(--border-color, #333);
          --code-radius: var(--surface-radius, 8px);
          --code-shadow: var(--surface-shadow, 0 4px 6px rgba(0,0,0,0.3));
          --code-border-width: var(--border-width, 3px);
        }

        .code-outer {
          position: relative;
          background: var(--code-border);
          border-radius: var(--code-radius);
          box-shadow: var(--code-shadow);
          overflow: hidden;
        }

        /* 3D Convex Overlay for the whole block */
        .code-outer::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 50%;
          background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.02));
          opacity: var(--overlay-convex-opacity, 0);
          pointer-events: none;
          z-index: 10;
        }

        .stripe-layer {
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          z-index: 1;
          pointer-events: none;
          display: ${stripes ? 'block' : 'none'};
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 1rem,
            var(--overlay-stripe-color, rgba(255,255,255,0.2)) 1rem,
            var(--overlay-stripe-color, rgba(255,255,255,0.2)) 2rem
          );
          background-size: 200% 200%;
          ${animated ? 'animation: moveStripes var(--transition-speed, 2s) linear infinite;' : ''}
        }

        @keyframes moveStripes {
          100% { background-position: 2.828rem 0; }
        }

        .code-inner {
          position: relative;
          z-index: 2;
          background: var(--code-bg);
          color: var(--code-text);
          border-radius: calc(var(--code-radius) - var(--code-border-width));
          /* The margin exposes the outer wrapper acting as the border */
          margin: var(--code-border-width);
          overflow: hidden;
          text-align: left;
        }

        .mac-header {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mac-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .lang-badge {
          margin-left: auto;
          font-family: monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        pre {
          margin: 0;
          padding: 20px;
          overflow-x: auto;
        }

        code {
          font-family: 'Fira Code', 'Courier New', Courier, monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      </style>

      <div class="code-outer">
        <div class="stripe-layer"></div>
        <div class="code-inner">
          ${macFrame ? `
          <div class="mac-header">
            <div class="mac-dots">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
            </div>
            ${lang ? `<div class="lang-badge">${lang}</div>` : ''}
          </div>
          ` : ''}
          <pre><code><slot></slot></code></pre>
        </div>
      </div>
    `;
  }
}
