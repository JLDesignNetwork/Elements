export class JLPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['theme', 'variant', 'open', 'stripes', 'animated'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  close() {
    this.removeAttribute('open');
  }

  render() {
    const theme = this.getAttribute('theme') || 'primary';
    const variant = this.getAttribute('variant') || 'flat';
    const isOpen = this.hasAttribute('open');
    const stripes = this.getAttribute('stripes') === 'true';
    const animated = this.getAttribute('animated') === 'true';

    if (this.getAttribute('theme') !== theme) this.setAttribute('theme', theme);
    if (this.getAttribute('variant') !== variant) this.setAttribute('variant', variant);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --popup-bg: var(--surface-base, #ffffff);
          --popup-text: var(--surface-text, #333333);
          --popup-border: var(--border-color, #cccccc);
          --popup-radius: var(--surface-radius, 8px);
          --popup-shadow: var(--surface-shadow, 0 10px 25px rgba(0,0,0,0.5));
          --popup-border-width: var(--border-width, 3px);
        }

        .backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 9998;
          opacity: ${isOpen ? '1' : '0'};
          pointer-events: ${isOpen ? 'auto' : 'none'};
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-outer {
          position: relative;
          background: var(--popup-border);
          border-radius: var(--popup-radius);
          box-shadow: var(--popup-shadow);
          max-width: 90%;
          width: 500px;
          z-index: 9999;
          transform: ${isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-20px)'};
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
        }

        /* 3D Convex Overlay if variant requires it */
        .modal-outer::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 50%;
          background: linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.02));
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

        .modal-inner {
          position: relative;
          z-index: 2;
          background: var(--popup-bg);
          color: var(--popup-text);
          border-radius: calc(var(--popup-radius) - var(--popup-border-width));
          margin: var(--popup-border-width);
          padding: 30px;
          overflow: hidden;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          color: var(--popup-text);
          font-size: 1.5rem;
          opacity: 0.5;
          cursor: pointer;
          transition: opacity 0.2s;
          z-index: 10;
        }

        .close-btn:hover {
          opacity: 1;
        }
      </style>

      <div class="backdrop">
        <div class="modal-outer" id="modal-content">
          <div class="stripe-layer"></div>
          <div class="modal-inner">
            <button class="close-btn">&times;</button>
            <slot></slot>
          </div>
        </div>
      </div>
    `;

    const backdrop = this.shadowRoot.querySelector('.backdrop');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    const modalContent = this.shadowRoot.querySelector('#modal-content');

    // Click outside to close
    backdrop.addEventListener('click', (e) => {
      if (!modalContent.contains(e.target) && e.target !== modalContent) {
        this.close();
      }
    });

    closeBtn.addEventListener('click', () => {
      this.close();
    });
  }
}
