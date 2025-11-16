// Inject RTL Fix Code
(function() {
  const id = 'rtl-fix';
  if (document.getElementById(id)) return;
  
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400..700&family=Readex+Pro:wght@160..700&display=swap');
    .cm-editor, .cm-scroller, .cm-content, .cm-line, .rendered-markdown, .page-content {
      direction: rtl !important;
      text-align: right !important;
      font-family: "Noto Naskh Arabic", "Readex Pro", sans-serif !important;
      font-optical-sizing: auto !important;
      font-variation-settings: "HEXP" 0 !important;
    }
    .cm-line::before, .rendered-markdown p::before, .rendered-markdown li::before {
      content: "\\200F"; width: 0; height: 0;
    }
    .cm-line.ltr-line, .rendered-markdown p.ltr-line {
      direction: ltr !important; text-align: left !important;
    }
    .cm-line.ltr-line::before, .rendered-markdown p.ltr-line::before { content: none !important; }
    pre, code, table, .cm-inline-code { direction: ltr !important; text-align: left !important; }
  `;
  
  const s = document.createElement('style');
  s.id = id;
  s.textContent = css;
  document.head.appendChild(s);
  
  document.querySelectorAll('.cm-editor, .sb-editor, .rendered-markdown, .page-content')
    .forEach(el => el.setAttribute('dir', 'rtl'));
  
  const isEng = txt => {
    const clean = txt.replace(/[\s\d\p{P}\p{S}]/gu, '');
    return clean && !/[\u0600-\u06FF\u0750-\u077F]/.test(clean);
  };
  
  const detect = () => {
    document.querySelectorAll('.cm-line, .rendered-markdown p').forEach(el => {
      isEng(el.textContent || '') ? el.classList.add('ltr-line') : el.classList.remove('ltr-line');
    });
  };
  
  detect();
  new MutationObserver(detect).observe(document.body, { childList: true, subtree: true, characterData: true });
})();
