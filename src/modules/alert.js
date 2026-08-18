export class JLAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['theme', 'variant', 'title', 'dismissible', 'stripes', 'animated'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  dismiss() {
    this.style.opacity = '0';
    this.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      this.remove();
    }, 300);
  }

  render() {
    const theme = this.getAttribute('theme') || 'primary';
    const variant = this.getAttribute('variant') || 'flat';
    const title = this.getAttribute('title') || '';
    const dismissible = this.getAttribute('dismissible') === 'true';
    const stripes = this.getAttribute('stripes') === 'true';
    const animated = this.getAttribute('animated') === 'true';

    if (this.getAttribute('theme') !== theme) {
      this.setAttribute('theme', theme);
    }
    if (this.getAttribute('variant') !== variant) {
      this.setAttribute('variant', variant);
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          --alert-bg: var(--surface-fill, #3498db);
          --alert-text: var(--surface-text, #ffffff);
          --alert-border: var(--border-color, #2980b9);
          --alert-radius: var(--surface-radius, 4px);
          --alert-shadow: var(--surface-shadow, none);
          /* Default to a thicker border for alerts so the left stripe is visible */
          --alert-border-width: var(--border-width, 3px);
        }

        .alert-outer {
          position: relative;
          background: var(--alert-border);
          border-radius: var(--alert-radius);
          box-shadow: var(--alert-shadow);
          overflow: hidden;
          font-family: inherit;
        }

        /* 3D Convex Overlay for the whole block */
        .alert-outer::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 50%;
          background: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.05));
          opacity: var(--overlay-convex-opacity, 0);
          pointer-events: none;
          z-index: 10;
        }

        .stripe-layer {
          position: absolute;
          top: 0; left: 0; bottom: 0; width: 100%;
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

        .alert-inner {
          position: relative;
          z-index: 2;
          background: var(--alert-bg);
          color: var(--alert-text);
          /* Push content to the right by the border-width to expose the left stripe */
          margin-left: ${stripes ? 'var(--alert-border-width)' : '0'};
          /* Apply border conditionally if we want a standard border without stripes */
          border: ${stripes ? 'none' : 'var(--alert-border-width) solid var(--alert-border)'};
          /* Adjust radius seamlessly */
          border-radius: ${stripes ? 'calc(var(--alert-radius) - var(--alert-border-width))' : 'var(--alert-radius)'};
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .content {
          flex: 1;
        }

        .title {
          font-weight: 800;
          margin-bottom: 5px;
          display: block;
          font-size: 1.1em;
          letter-spacing: 0.5px;
        }

        .message {
          font-weight: 400;
          font-size: 0.95em;
          opacity: 0.9;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--alert-text);
          opacity: 0.6;
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          padding: 0 0 0 15px;
          transition: opacity 0.2s;
          position: relative;
          z-index: 10;
        }
        
        .close-btn:hover {
          opacity: 1;
        }
      </style>

      <div class="alert-outer">
        <div class="stripe-layer"></div>
        <div class="alert-inner">
          <div class="content">
            ${title ? `<span class="title">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')}</span>` : ''}
            <div class="message"><slot></slot></div>
          </div>
          ${dismissible ? `<button class="close-btn">&times;</button>` : ''}
        </div>
      </div>
    `;

    if (dismissible) {
      const closeBtn = this.shadowRoot.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => this.dismiss());
    }
  }
}
