// ==UserScript==
// @name         MailBait Auto Check
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Vinkt automatisch alle checkboxes aan op mailbait.run (client-side only) ✅
// @match        https://mailbait.info/run
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){
  'use strict';

  const setChecked = (el)=>{
    try{
      if(el && el.type === 'checkbox' && !el.checked){
        el.checked = true;
        // fire change event so the site notices
        el.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }catch(e){/* ignore */}
  };

  const checkAll = ()=> {
    document.querySelectorAll('input[type="checkbox"]').forEach(setChecked);
  };

  // initial pass
  checkAll();

  // observe for dynamically added checkboxes (some UIs render later)
  const mo = new MutationObserver((mutations)=>{
    for(const m of mutations){
      m.addedNodes.forEach(node=>{
        if(node.nodeType !== 1) return;
        if(node.matches && node.matches('input[type="checkbox"]')) setChecked(node);
        node.querySelectorAll && node.querySelectorAll('input[type="checkbox"]').forEach(setChecked);
      });
    }
  });
  mo.observe(document.body, {childList:true, subtree:true});

  // handy toggle hotkey: Ctrl+Shift+A (toggles observer and runs a pass)
  let enabled = true;
  window.addEventListener('keydown', e=>{
    if(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a'){
      enabled = !enabled;
      if(enabled){
        checkAll();
        mo.observe(document.body, {childList:true, subtree:true});
        alert('Auto-check ON ✅');
      }else{
        mo.disconnect();
        alert('Auto-check OFF ⛔');
      }
    }
  });

})();
