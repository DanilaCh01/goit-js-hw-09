!function(){var t=document.body,e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");a.disabled=!0;var d=null;e.addEventListener("click",(function(){e.disabled=!0,a.disabled=!1,d=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),a.addEventListener("click",(function(){e.disabled=!1,a.disabled=!0,clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.37035704.js.map