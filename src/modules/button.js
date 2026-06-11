export class JLButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['theme', 'variant', 'stripes', 'animated', 'size'];
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
    const theme = this.getAttribute('theme') || 'primary';
    const variant = this.getAttribute('variant') || 'flat';
    const stripes = this.getAttribute('stripes') || 'none'; // 'none', 'fill', 'border'
    const animated = this.getAttribute('animated') === 'true';

    if (this.getAttribute('theme') !== theme) this.setAttribute('theme', theme);
    if (this.getAttribute('variant') !== variant) this.setAttribute('variant', variant);

    const hasStripes = stripes === 'fill' || stripes === 'border';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --btn-bg: var(--surface-fill, #3498db);
          --btn-text: var(--surface-text, #ffffff);
          --btn-border: var(--border-color, #2980b9);
          --btn-radius: var(--surface-radius, 4px);
          --btn-shadow: var(--surface-shadow, none);
          --btn-border-width: var(--border-width, 1px);
        }

        .btn-container {
          position: relative;
          background: ${stripes === 'fill' ? 'var(--btn-bg)' : 'var(--btn-bg)'};
          border-radius: var(--btn-radius);
          box-shadow: var(--btn-shadow);
          overflow: hidden;
          cursor: pointer;
          user-select: none;
          font-family: inherit;
          /* If no stripe border, use standard CSS border */
          border: ${stripes === 'border' ? 'none' : 'var(--btn-border-width) solid var(--btn-border)'};
        }

        /* 3D Convex Overlay */
        .btn-container::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 50%;
          background: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.05));
          opacity: var(--overlay-convex-opacity, 0);
          pointer-events: none;
          z-index: 4;
        }

        .stripe-layer {
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          z-index: 1;
          pointer-events: none;
          display: ${hasStripes ? 'block' : 'none'};
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

        .btn-content {
          position: relative;
          z-index: 2;
          display: block;
          padding: 8px 16px;
          color: var(--btn-text);
          text-align: center;
          /* If stripe border, we use margin as the border, and background covers the center */
          margin: ${stripes === 'border' ? 'var(--btn-border-width)' : '0'};
          background: ${stripes === 'border' ? 'var(--btn-bg)' : 'transparent'};
          /* If border, we need to match radius slightly smaller to look seamless */
          border-radius: ${stripes === 'border' ? 'calc(var(--btn-radius) - var(--btn-border-width))' : '0'};
        }

        .btn-container:hover {
          filter: brightness(1.1);
        }
        
        .btn-container:active {
          transform: translateY(2px);
        }
      </style>

      <div class="btn-container">
        <div class="stripe-layer"></div>
        <div class="btn-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
