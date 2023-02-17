import{J as K,S as Y,i as z,s as A,k as I,a as B,q as O,l as y,m as D,h as m,c as C,r as P,n as w,K as T,b as v,E as V,L as ce,f as d,g as j,d as q,u as fe,t as $,M as Q,p as U,N as ie,O as J,P as ae,Q as he,x as N,y as M,z as W,A as G,e as L,I as _e,o as ge}from"../../chunks/index-3657e411.js";import{b as me}from"../../chunks/paths-267500fe.js";import{B as be,a as H,c as F,r as de}from"../../chunks/game-7e39a389.js";function pe(s){const e=s-1;return e*e*e+1}function X(s,{delay:e=0,duration:t=400,easing:l=K}={}){const n=+getComputedStyle(s).opacity;return{delay:e,duration:t,easing:l,css:r=>`opacity: ${r*n}`}}function Z(s,{delay:e=0,duration:t=400,easing:l=pe,x:n=0,y:r=0,opacity:c=0}={}){const u=getComputedStyle(s),o=+u.opacity,i=u.transform==="none"?"":u.transform,a=o*(1-c);return{delay:e,duration:t,easing:l,css:(g,f)=>`
			transform: ${i} translate(${(1-g)*n}px, ${(1-g)*r}px);
			opacity: ${o-a*f}`}}function x(s,e,t){const l=s.slice();return l[5]=e[t],l}function ee(s){let e,t,l=`var(--clr-wtr${s[5]})`,n;return{c(){e=I("div"),this.h()},l(r){e=y(r,"DIV",{class:!0}),D(e).forEach(m),this.h()},h(){w(e,"class","waterblock svelte-1ioo7u3"),U(e,"background-color",l)},m(r,c){v(r,e,c),n=!0},p(r,c){s=r,c&1&&l!==(l=`var(--clr-wtr${s[5]})`)&&U(e,"background-color",l)},i(r){n||(r&&ie(()=>{t||(t=J(e,Z,{y:-200,duration:200,easing:K},!0)),t.run(1)}),n=!0)},o(r){r&&(t||(t=J(e,Z,{y:-200,duration:200,easing:K},!1)),t.run(0)),n=!1},d(r){r&&m(e),r&&t&&t.end()}}}function $e(s){let e,t,l,n,r,c,u=s[0].name+"",o,i,a,g,f=s[0].levels,h=[];for(let _=0;_<f.length;_+=1)h[_]=ee(x(s,f,_));const S=_=>$(h[_],1,1,()=>{h[_]=null});return{c(){e=I("div"),t=I("div"),l=I("div"),n=B();for(let _=0;_<h.length;_+=1)h[_].c();r=B(),c=I("h4"),o=O(u),this.h()},l(_){e=y(_,"DIV",{class:!0});var b=D(e);t=y(b,"DIV",{class:!0,selectable:!0});var p=D(t);l=y(p,"DIV",{class:!0}),D(l).forEach(m),n=C(p);for(let E=0;E<h.length;E+=1)h[E].l(p);p.forEach(m),r=C(b),c=y(b,"H4",{class:!0});var k=D(c);o=P(k,u),k.forEach(m),b.forEach(m),this.h()},h(){w(l,"class","plug svelte-1ioo7u3"),w(t,"class","tube svelte-1ioo7u3"),w(t,"selectable",s[3]),T(t,"selected",s[1]),T(t,"highlight",s[2]),T(t,"unplugged",!s[0].done),w(c,"class","svelte-1ioo7u3"),w(e,"class","tube-slot")},m(_,b){v(_,e,b),V(e,t),V(t,l),V(t,n);for(let p=0;p<h.length;p+=1)h[p].m(t,null);V(e,r),V(e,c),V(c,o),i=!0,a||(g=ce(t,"click",s[4]),a=!0)},p(_,[b]){if(b&1){f=_[0].levels;let p;for(p=0;p<f.length;p+=1){const k=x(_,f,p);h[p]?(h[p].p(k,b),d(h[p],1)):(h[p]=ee(k),h[p].c(),d(h[p],1),h[p].m(t,null))}for(j(),p=f.length;p<h.length;p+=1)S(p);q()}(!i||b&8)&&w(t,"selectable",_[3]),(!i||b&2)&&T(t,"selected",_[1]),(!i||b&4)&&T(t,"highlight",_[2]),(!i||b&1)&&T(t,"unplugged",!_[0].done),(!i||b&1)&&u!==(u=_[0].name+"")&&fe(o,u)},i(_){if(!i){for(let b=0;b<f.length;b+=1)d(h[b]);i=!0}},o(_){h=h.filter(Boolean);for(let b=0;b<h.length;b+=1)$(h[b]);i=!1},d(_){_&&m(e),Q(h,_),a=!1,g()}}}function ve(s,e,t){let{tube:l}=e,{selected:n=!1}=e,{highlight:r=!1}=e,{selectable:c}=e;function u(o){ae.call(this,s,o)}return s.$$set=o=>{"tube"in o&&t(0,l=o.tube),"selected"in o&&t(1,n=o.selected),"highlight"in o&&t(2,r=o.highlight),"selectable"in o&&t(3,c=o.selectable)},[l,n,r,c,u]}class ke extends Y{constructor(e){super(),z(this,e,ve,$e,A,{tube:0,selected:1,highlight:2,selectable:3})}}function te(s,e,t){const l=s.slice();return l[9]=e[t],l}function le(s,e,t){const l=s.slice();return l[12]=e[t],l}function ne(s){let e,t;function l(){return s[6](s[12])}return e=new ke({props:{tube:s[12],selected:s[0]===s[12].id,selectable:s[3](s[12].id,s[0]),highlight:s[1]===s[12].id}}),e.$on("click",l),{c(){N(e.$$.fragment)},l(n){M(e.$$.fragment,n)},m(n,r){W(e,n,r),t=!0},p(n,r){s=n;const c={};r&4&&(c.tube=s[12]),r&5&&(c.selected=s[0]===s[12].id),r&5&&(c.selectable=s[3](s[12].id,s[0])),r&6&&(c.highlight=s[1]===s[12].id),e.$set(c)},i(n){t||(d(e.$$.fragment,n),t=!0)},o(n){$(e.$$.fragment,n),t=!1},d(n){G(e,n)}}}function se(s){let e,t,l,n=s[9],r=[];for(let u=0;u<n.length;u+=1)r[u]=ne(le(s,n,u));const c=u=>$(r[u],1,1,()=>{r[u]=null});return{c(){e=I("div");for(let u=0;u<r.length;u+=1)r[u].c();t=B(),this.h()},l(u){e=y(u,"DIV",{class:!0});var o=D(e);for(let i=0;i<r.length;i+=1)r[i].l(o);t=C(o),o.forEach(m),this.h()},h(){w(e,"class","tubes-row svelte-1m5libu")},m(u,o){v(u,e,o);for(let i=0;i<r.length;i+=1)r[i].m(e,null);V(e,t),l=!0},p(u,o){if(o&31){n=u[9];let i;for(i=0;i<n.length;i+=1){const a=le(u,n,i);r[i]?(r[i].p(a,o),d(r[i],1)):(r[i]=ne(a),r[i].c(),d(r[i],1),r[i].m(e,t))}for(j(),i=n.length;i<r.length;i+=1)c(i);q()}},i(u){if(!l){for(let o=0;o<n.length;o+=1)d(r[o]);l=!0}},o(u){r=r.filter(Boolean);for(let o=0;o<r.length;o+=1)$(r[o]);l=!1},d(u){u&&m(e),Q(r,u)}}}function we(s){let e,t,l=s[2],n=[];for(let c=0;c<l.length;c+=1)n[c]=se(te(s,l,c));const r=c=>$(n[c],1,1,()=>{n[c]=null});return{c(){e=I("div");for(let c=0;c<n.length;c+=1)n[c].c();this.h()},l(c){e=y(c,"DIV",{class:!0});var u=D(e);for(let o=0;o<n.length;o+=1)n[o].l(u);u.forEach(m),this.h()},h(){w(e,"class","tubes-container")},m(c,u){v(c,e,u);for(let o=0;o<n.length;o+=1)n[o].m(e,null);t=!0},p(c,[u]){if(u&31){l=c[2];let o;for(o=0;o<l.length;o+=1){const i=te(c,l,o);n[o]?(n[o].p(i,u),d(n[o],1)):(n[o]=se(i),n[o].c(),d(n[o],1),n[o].m(e,null))}for(j(),o=l.length;o<n.length;o+=1)r(o);q()}},i(c){if(!t){for(let u=0;u<l.length;u+=1)d(n[u]);t=!0}},o(c){n=n.filter(Boolean);for(let u=0;u<n.length;u+=1)$(n[u]);t=!1},d(c){c&&m(e),Q(n,c)}}}function Ee(s,e,t){const l=he();let{tubes:n}=e,{selected:r=null}=e,{highlight:c=null}=e,u=[];function o(f){const h=f.length<=6?f.length:f.length<=14?(f.length+1)/2:5,S=[];for(let _=0;_<f.length;_+=h)S.push(n.slice(_,_+h));return S}function i(f){return r===f?!0:!(n[f].done||r===null&&n[f].empty||r!==null&&n[f].full)}function a(f){i(f)&&l("select",f)}const g=f=>a(f.id);return s.$$set=f=>{"tubes"in f&&t(5,n=f.tubes),"selected"in f&&t(0,r=f.selected),"highlight"in f&&t(1,c=f.highlight)},s.$$.update=()=>{s.$$.dirty&32&&t(2,u=o(n))},[r,c,u,i,a,n,g]}class Ie extends Y{constructor(e){super(),z(this,e,Ee,we,A,{tubes:5,selected:0,highlight:1})}}function ye(s){let e,t,l,n,r,c;return{c(){e=I("div"),t=I("h2"),l=O(s[1]),this.h()},l(u){e=y(u,"DIV",{class:!0});var o=D(e);t=y(o,"H2",{});var i=D(t);l=P(i,s[1]),i.forEach(m),o.forEach(m),this.h()},h(){w(e,"class",n="modal "+(s[0]||"")+" svelte-alsri9")},m(u,o){v(u,e,o),V(e,t),V(t,l),c=!0},p(u,[o]){(!c||o&2)&&fe(l,u[1]),(!c||o&1&&n!==(n="modal "+(u[0]||"")+" svelte-alsri9"))&&w(e,"class",n)},i(u){c||(ie(()=>{r||(r=J(e,X,{delay:100},!0)),r.run(1)}),c=!0)},o(u){r||(r=J(e,X,{delay:100},!1)),r.run(0),c=!1},d(u){u&&m(e),u&&r&&r.end()}}}function De(s,e,t){let l,{result:n}=e;return s.$$set=r=>{"result"in r&&t(0,n=r.result)},s.$$.update=()=>{s.$$.dirty&1&&t(1,l=n==="win"?"🏅 You Win 🏅":"You lose 😞")},[n,l]}class Se extends Y{constructor(e){super(),z(this,e,De,ye,A,{result:0})}}function Ve(){return new Worker(""+new URL("../../workers/solve-worker-adfa78ed.js",import.meta.url).href)}function Be(s){let e;return{c(){e=O("New")},l(t){e=P(t,"New")},m(t,l){v(t,e,l)},d(t){t&&m(e)}}}function Ce(s){let e;return{c(){e=O("Custom")},l(t){e=P(t,"Custom")},m(t,l){v(t,e,l)},d(t){t&&m(e)}}}function Ne(s){let e;return{c(){e=O("Reset")},l(t){e=P(t,"Reset")},m(t,l){v(t,e,l)},d(t){t&&m(e)}}}function re(s){let e,t;return e=new H({props:{spin:s[2],$$slots:{default:[Me]},$$scope:{ctx:s}}}),e.$on("click",s[9]),{c(){N(e.$$.fragment)},l(l){M(e.$$.fragment,l)},m(l,n){W(e,l,n),t=!0},p(l,n){const r={};n&4&&(r.spin=l[2]),n&32768&&(r.$$scope={dirty:n,ctx:l}),e.$set(r)},i(l){t||(d(e.$$.fragment,l),t=!0)},o(l){$(e.$$.fragment,l),t=!1},d(l){G(e,l)}}}function Me(s){let e;return{c(){e=O("Solve")},l(t){e=P(t,"Solve")},m(t,l){v(t,e,l)},d(t){t&&m(e)}}}function oe(s){let e,t;return e=new H({props:{$$slots:{default:[We]},$$scope:{ctx:s}}}),e.$on("click",s[11]),{c(){N(e.$$.fragment)},l(l){M(e.$$.fragment,l)},m(l,n){W(e,l,n),t=!0},p(l,n){const r={};n&32768&&(r.$$scope={dirty:n,ctx:l}),e.$set(r)},i(l){t||(d(e.$$.fragment,l),t=!0)},o(l){$(e.$$.fragment,l),t=!1},d(l){G(e,l)}}}function We(s){let e;return{c(){e=O("💡")},l(t){e=P(t,"💡")},m(t,l){v(t,e,l)},d(t){t&&m(e)}}}function Ge(s){let e,t,l,n,r,c,u,o,i;e=new H({props:{$$slots:{default:[Be]},$$scope:{ctx:s}}}),e.$on("click",s[7]),l=new H({props:{href:me+"/edit",$$slots:{default:[Ce]},$$scope:{ctx:s}}}),r=new H({props:{$$slots:{default:[Ne]},$$scope:{ctx:s}}}),r.$on("click",s[8]);let a=s[1]&&s[5].length==0&&re(s),g=s[5].length>0&&oe(s);return{c(){N(e.$$.fragment),t=B(),N(l.$$.fragment),n=B(),N(r.$$.fragment),c=B(),a&&a.c(),u=B(),g&&g.c(),o=L()},l(f){M(e.$$.fragment,f),t=C(f),M(l.$$.fragment,f),n=C(f),M(r.$$.fragment,f),c=C(f),a&&a.l(f),u=C(f),g&&g.l(f),o=L()},m(f,h){W(e,f,h),v(f,t,h),W(l,f,h),v(f,n,h),W(r,f,h),v(f,c,h),a&&a.m(f,h),v(f,u,h),g&&g.m(f,h),v(f,o,h),i=!0},p(f,h){const S={};h&32768&&(S.$$scope={dirty:h,ctx:f}),e.$set(S);const _={};h&32768&&(_.$$scope={dirty:h,ctx:f}),l.$set(_);const b={};h&32768&&(b.$$scope={dirty:h,ctx:f}),r.$set(b),f[1]&&f[5].length==0?a?(a.p(f,h),h&34&&d(a,1)):(a=re(f),a.c(),d(a,1),a.m(u.parentNode,u)):a&&(j(),$(a,1,1,()=>{a=null}),q()),f[5].length>0?g?(g.p(f,h),h&32&&d(g,1)):(g=oe(f),g.c(),d(g,1),g.m(o.parentNode,o)):g&&(j(),$(g,1,1,()=>{g=null}),q())},i(f){i||(d(e.$$.fragment,f),d(l.$$.fragment,f),d(r.$$.fragment,f),d(a),d(g),i=!0)},o(f){$(e.$$.fragment,f),$(l.$$.fragment,f),$(r.$$.fragment,f),$(a),$(g),i=!1},d(f){G(e,f),f&&m(t),G(l,f),f&&m(n),G(r,f),f&&m(c),a&&a.d(f),f&&m(u),g&&g.d(f),f&&m(o)}}}function ue(s){let e,t;return e=new Se({props:{result:s[3].status}}),{c(){N(e.$$.fragment)},l(l){M(e.$$.fragment,l)},m(l,n){W(e,l,n),t=!0},p(l,n){const r={};n&8&&(r.result=l[3].status),e.$set(r)},i(l){t||(d(e.$$.fragment,l),t=!0)},o(l){$(e.$$.fragment,l),t=!1},d(l){G(e,l)}}}function Re(s){let e,t,l,n,r,c,u;e=new be({props:{$$slots:{default:[Ge]},$$scope:{ctx:s}}}),n=new Ie({props:{tubes:s[3].tubes,selected:s[0],selectable:s[4],highlight:s[6]}}),n.$on("select",s[10]);let o=s[3].status&&ue(s);return{c(){N(e.$$.fragment),t=B(),l=I("div"),N(n.$$.fragment),r=B(),o&&o.c(),c=L(),this.h()},l(i){M(e.$$.fragment,i),t=C(i),l=y(i,"DIV",{class:!0});var a=D(l);M(n.$$.fragment,a),a.forEach(m),r=C(i),o&&o.l(i),c=L(),this.h()},h(){w(l,"class","cols-2 svelte-m2jv0k")},m(i,a){W(e,i,a),v(i,t,a),v(i,l,a),W(n,l,null),v(i,r,a),o&&o.m(i,a),v(i,c,a),u=!0},p(i,[a]){const g={};a&32806&&(g.$$scope={dirty:a,ctx:i}),e.$set(g);const f={};a&8&&(f.tubes=i[3].tubes),a&1&&(f.selected=i[0]),a&16&&(f.selectable=i[4]),a&64&&(f.highlight=i[6]),n.$set(f),i[3].status?o?(o.p(i,a),a&8&&d(o,1)):(o=ue(i),o.c(),d(o,1),o.m(c.parentNode,c)):o&&(j(),$(o,1,1,()=>{o=null}),q())},i(i){u||(d(e.$$.fragment,i),d(n.$$.fragment,i),d(o),u=!0)},o(i){$(e.$$.fragment,i),$(n.$$.fragment,i),$(o),u=!1},d(i){G(e,i),i&&m(t),i&&m(l),G(n),i&&m(r),o&&o.d(i),i&&m(c)}}}function Oe(s,e,t){let l;_e(s,F,k=>t(13,l=k));let n,r=!1,c=l,u=null,o,i=[],a=[],g=null;ge(async()=>{t(1,n=new Ve),t(1,n.onmessage=function(k){k.data.result==="win"&&(t(5,a=k.data.actions),console.debug(a)),t(2,r=!1)},n)});function f(){console.debug("generating new game"),F.set(de()),t(3,c=l),i=[],t(5,a=[]),t(6,g=null)}function h(){t(3,c=l),t(0,u=null),i=[],t(5,a=[]),t(6,g=null)}function S(){n.postMessage(c),t(2,r=!0)}function _(k){const E=k.detail;if(u===null)t(0,u=E),console.debug(`selecting ${u}`);else if(u===E)console.debug(`deselecting ${u}`),t(0,u=null);else{if(b(u,E),a.length>0){const R=a[0];E===R.toIndex&&u===R.fromIndex?t(5,a=a.slice(1)):t(5,a=[])}t(0,u=null),t(6,g=null)}}function b(k,E){try{const R=c.historyEntry({from:k,to:E});t(3,c=c.applyMove({from:k,to:E})),console.debug(`applied move ${JSON.stringify(R)}`),i=[...i,R]}catch(R){console.log(R.message)}}function p(){a.length>0&&(t(0,u=a[0].fromIndex),t(6,g=a[0].toIndex))}return s.$$.update=()=>{s.$$.dirty&1&&t(4,o=u?"non-full":"non-empty")},[u,n,r,c,o,a,g,f,h,S,_,p]}class qe extends Y{constructor(e){super(),z(this,e,Oe,Re,A,{})}}export{qe as default};
