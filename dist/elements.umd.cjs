(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports):typeof define==`function`&&define.amd?define([`exports`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e.Elements={}))})(this,function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function t(e,t){customElements.get(e)||customElements.define(e,t)}var n=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}static get observedAttributes(){return[`value`,`max`,`theme`,`variant`,`stripes`,`animated`,`size`]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get value(){return parseFloat(this.getAttribute(`value`))||0}get max(){return parseFloat(this.getAttribute(`max`))||100}get percentage(){return Math.min(100,Math.max(0,this.value/this.max*100))}render(){let e=this.getAttribute(`theme`)||`primary`,t=this.getAttribute(`variant`)||`flat`,n=this.getAttribute(`stripes`)===`true`,r=this.getAttribute(`animated`)===`true`;this.setAttribute(`theme`,e),this.setAttribute(`variant`,t),this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          height: var(--meter-height, 30px);
          background-color: var(--surface-base, #555);
          border: var(--border-width, 1px) solid var(--border-color, #000);
          border-radius: var(--surface-radius, 0px);
          box-shadow: var(--surface-shadow, none);
          overflow: hidden;
          z-index: 1;
        }

        :host([size="sm"]) { --meter-height: 15px; }
        :host([size="lg"]) { --meter-height: 45px; }

        .fill-layer {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: ${this.percentage}%;
          background: var(--surface-fill, #3498db);
          transition: width 0.3s ease-out;
          z-index: 2;
        }

        .stripe-layer {
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          z-index: 3;
          pointer-events: none;
        }

        .stripe-layer.stripes {
          background-size: 50px 50px;
          background-image: linear-gradient(
            135deg,
            var(--overlay-stripe-color) 25%,
            transparent 25%,
            transparent 50%,
            var(--overlay-stripe-color) 50%,
            var(--overlay-stripe-color) 75%,
            transparent 75%,
            transparent
          );
        }

        .stripe-layer.animated {
          animation: candystripe var(--transition-speed, 2s) linear infinite;
        }

        .convex-overlay {
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          z-index: 4;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 40%,
            rgba(0, 0, 0, 0.1) 60%,
            rgba(0, 0, 0, 0.2) 100%
          );
          opacity: var(--overlay-convex-opacity, 0);
          pointer-events: none;
        }

        .text-layer {
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--surface-text, #fff);
          font-family: monospace;
          font-weight: bold;
          z-index: 5;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        @keyframes candystripe {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
      </style>

      <div class="fill-layer"></div>
      <div class="stripe-layer ${n?`stripes`:``} ${r?`animated`:``}"></div>
      <div class="convex-overlay"></div>
      <div class="text-layer"><slot></slot></div>
    `}},r=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: inline-block;
          padding: 8px 16px;
          background-color: var(--surface-fill, #3498db);
          color: var(--surface-text, #fff);
          border: var(--border-width, 1px) solid var(--border-color, #000);
          border-radius: var(--surface-radius, 4px);
          box-shadow: var(--surface-shadow, none);
          cursor: pointer;
          font-family: inherit;
        }
      </style>
      <slot></slot>
    `}},i=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          background-color: var(--surface-base, #2c3e50);
          color: var(--surface-text, #ecf0f1);
          padding: 16px;
          border-radius: var(--surface-radius, 4px);
          font-family: monospace;
          overflow-x: auto;
        }
      </style>
      <slot></slot>
    `}},a=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: none; /* hidden by default */
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: var(--surface-base, #fff);
          padding: 24px;
          border-radius: var(--surface-radius, 8px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          z-index: 1000;
        }
        :host([open]) {
          display: block;
        }
      </style>
      <slot></slot>
    `}};t(`jl-meter`,n),t(`jl-button`,r),t(`jl-code`,i),t(`jl-popup`,a),e.JLButton=r,e.JLCode=i,e.JLMeter=n,e.JLPopup=a});