import React, { useRef, useEffect } from 'react';

const ShadowPreview = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create shadow root only once
    let shadowRoot = containerRef.current.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = containerRef.current.attachShadow({ mode: 'open' });
    }

    // Inject HTML + custom styles into Shadow DOM
    shadowRoot.innerHTML = `
      <style>
        /* Reset */
        :host { all: initial; }
        * { box-sizing: border-box; }

        /* Typography */
        body, div { font-family: sans-serif; font-size: 14px; color: #111; line-height: 1.6; }
        h1 { font-size: 2.25rem; font-weight: bold; margin-bottom: 1rem; }
        h2 { font-size: 1.875rem; font-weight: bold; margin-bottom: 0.85rem; }
        p { margin-bottom: 1rem; }
        a { color: #2563eb; text-decoration: underline; }
        a:hover { color: #1d4ed8; }

        /* Code blocks */
        pre {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.875rem;
        }
        code {
          background: #e5e7eb;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }

        /* Images */
        img { max-width: 100%; height: auto; border-radius: 0.375rem; margin-bottom: 1rem; }

        /* Tables */
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #d1d5db; padding: 0.5rem; }
        th { background: #f3f4f6; }
      </style>
      <div>${content}</div>
    `;
  }, [content]);

  return <div ref={containerRef}></div>;
};

export default ShadowPreview;
