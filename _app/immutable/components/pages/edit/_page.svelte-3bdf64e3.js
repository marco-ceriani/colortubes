import{S as oe,i as re,s as ce,k as v,a as D,l as k,m as y,c as q,h,n as d,K as B,p as U,b as $,E as A,L as M,C as H,M as F,Q as ae,q as L,r as R,u as ie,x as O,y as j,z as I,f as S,t as V,A as G,I as fe}from"../../../chunks/index-3657e411.js";import{j as P}from"../../../chunks/singletons-c7b435d6.js";import{b as ue}from"../../../chunks/paths-267500fe.js";import{N as _e,B as he,d as me,a as K,T as J,G as pe,c as W}from"../../../chunks/game-55f24ee4.js";P.disable_scroll_handling;const be=P.goto;P.invalidate;P.invalidateAll;P.preload_data;P.preload_code;P.before_navigate;P.after_navigate;function X(s,e,o){const l=s.slice();return l[7]=e[o],l}function Y(s){let e,o=(s[0][s[7]]||"")+"",l,n=`var(--clr-wtr${s[7]>=0?s[7]:"-none"})`,a,c;function t(){return s[4](s[7])}return{c(){e=v("button"),l=L(o),this.h()},l(u){e=k(u,"BUTTON",{class:!0});var _=y(e);l=R(_,o),_.forEach(h),this.h()},h(){d(e,"class","cell svelte-1smq6qh"),B(e,"curr",s[7]===s[1]),B(e,"extra",s[0][s[7]]>4),U(e,"--color",n)},m(u,_){$(u,e,_),A(e,l),a||(c=M(e,"click",t),a=!0)},p(u,_){s=u,_&1&&o!==(o=(s[0][s[7]]||"")+"")&&ie(l,o),_&6&&B(e,"curr",s[7]===s[1]),_&5&&B(e,"extra",s[0][s[7]]>4)},d(u){u&&h(e),a=!1,c()}}}function ge(s){let e,o,l,n,a,c=s[2],t=[];for(let u=0;u<c.length;u+=1)t[u]=Y(X(s,c,u));return{c(){e=v("div");for(let u=0;u<t.length;u+=1)t[u].c();o=D(),l=v("button"),this.h()},l(u){e=k(u,"DIV",{class:!0});var _=y(e);for(let p=0;p<t.length;p+=1)t[p].l(_);o=q(_),l=k(_,"BUTTON",{class:!0});var i=y(l);i.forEach(h),_.forEach(h),this.h()},h(){d(l,"class","cell empty svelte-1smq6qh"),B(l,"curr",s[1]===null),U(l,"--color","var(--clr-wtr-none)"),d(e,"class","palette svelte-1smq6qh")},m(u,_){$(u,e,_);for(let i=0;i<t.length;i+=1)t[i].m(e,null);A(e,o),A(e,l),n||(a=M(l,"click",s[5]),n=!0)},p(u,[_]){if(_&15){c=u[2];let i;for(i=0;i<c.length;i+=1){const p=X(u,c,i);t[i]?t[i].p(p,_):(t[i]=Y(p),t[i].c(),t[i].m(e,o))}for(;i<t.length;i+=1)t[i].d(1);t.length=c.length}_&2&&B(l,"curr",u[1]===null)},i:H,o:H,d(u){u&&h(e),F(t,u),n=!1,a()}}}function $e(s,e,o){const l=ae();let{counts:n={}}=e;const a=Array(_e).fill().map((i,p)=>p+1);let c=null;function t(i){o(1,c=i),l("color-pick",i)}const u=i=>t(i),_=()=>t(null);return s.$$set=i=>{"counts"in i&&o(0,n=i.counts)},[n,c,a,t,u,_]}class de extends oe{constructor(e){super(),re(this,e,$e,ge,ce,{counts:0})}}function Z(s,e,o){const l=s.slice();return l[15]=e[o],l}function x(s,e,o){const l=s.slice();return l[18]=e[o],l}function ee(s,e,o){const l=s.slice();return l[21]=e[o],l[23]=o,l}function ve(s){let e;return{c(){e=L("Reset")},l(o){e=R(o,"Reset")},m(o,l){$(o,e,l)},d(o){o&&h(e)}}}function ke(s){let e;return{c(){e=L("Discard")},l(o){e=R(o,"Discard")},m(o,l){$(o,e,l)},d(o){o&&h(e)}}}function we(s){let e;return{c(){e=L("Play")},l(o){e=R(o,"Play")},m(o,l){$(o,e,l)},d(o){o&&h(e)}}}function ye(s){let e,o,l,n,a,c;return e=new K({props:{$$slots:{default:[ve]},$$scope:{ctx:s}}}),e.$on("click",s[5]),l=new K({props:{href:ue+"/",$$slots:{default:[ke]},$$scope:{ctx:s}}}),a=new K({props:{disabled:!s[3],$$slots:{default:[we]},$$scope:{ctx:s}}}),a.$on("click",s[8]),{c(){O(e.$$.fragment),o=D(),O(l.$$.fragment),n=D(),O(a.$$.fragment)},l(t){j(e.$$.fragment,t),o=q(t),j(l.$$.fragment,t),n=q(t),j(a.$$.fragment,t)},m(t,u){I(e,t,u),$(t,o,u),I(l,t,u),$(t,n,u),I(a,t,u),c=!0},p(t,u){const _={};u&16777216&&(_.$$scope={dirty:u,ctx:t}),e.$set(_);const i={};u&16777216&&(i.$$scope={dirty:u,ctx:t}),l.$set(i);const p={};u&8&&(p.disabled=!t[3]),u&16777216&&(p.$$scope={dirty:u,ctx:t}),a.$set(p)},i(t){c||(S(e.$$.fragment,t),S(l.$$.fragment,t),S(a.$$.fragment,t),c=!0)},o(t){V(e.$$.fragment,t),V(l.$$.fragment,t),V(a.$$.fragment,t),c=!1},d(t){G(e,t),t&&h(o),G(l,t),t&&h(n),G(a,t)}}}function te(s){let e,o=`var(--clr-wtr${s[18].levels[s[23]]||""})`,l,n;function a(){return s[9](s[18],s[23])}return{c(){e=v("div"),this.h()},l(c){e=k(c,"DIV",{class:!0}),y(e).forEach(h),this.h()},h(){d(e,"class","block svelte-jgsu2c"),U(e,"background-color",o)},m(c,t){$(c,e,t),l||(n=M(e,"click",a),l=!0)},p(c,t){s=c,t&4&&o!==(o=`var(--clr-wtr${s[18].levels[s[23]]||""})`)&&U(e,"background-color",o)},d(c){c&&h(e),l=!1,n()}}}function le(s){let e,o=Array(4),l=[];for(let n=0;n<o.length;n+=1)l[n]=te(ee(s,o,n));return{c(){e=v("div");for(let n=0;n<l.length;n+=1)l[n].c();this.h()},l(n){e=k(n,"DIV",{class:!0});var a=y(e);for(let c=0;c<l.length;c+=1)l[c].l(a);a.forEach(h),this.h()},h(){d(e,"class","tube svelte-jgsu2c")},m(n,a){$(n,e,a);for(let c=0;c<l.length;c+=1)l[c].m(e,null)},p(n,a){if(a&132){o=Array(4);let c;for(c=0;c<o.length;c+=1){const t=ee(n,o,c);l[c]?l[c].p(t,a):(l[c]=te(t),l[c].c(),l[c].m(e,null))}for(;c<l.length;c+=1)l[c].d(1);l.length=o.length}},d(n){n&&h(e),F(l,n)}}}function ne(s){let e,o,l=s[15],n=[];for(let a=0;a<l.length;a+=1)n[a]=le(x(s,l,a));return{c(){e=v("div");for(let a=0;a<n.length;a+=1)n[a].c();o=D(),this.h()},l(a){e=k(a,"DIV",{class:!0});var c=y(e);for(let t=0;t<n.length;t+=1)n[t].l(c);o=q(c),c.forEach(h),this.h()},h(){d(e,"class","tubes-row svelte-jgsu2c")},m(a,c){$(a,e,c);for(let t=0;t<n.length;t+=1)n[t].m(e,null);A(e,o)},p(a,c){if(c&132){l=a[15];let t;for(t=0;t<l.length;t+=1){const u=x(a,l,t);n[t]?n[t].p(u,c):(n[t]=le(u),n[t].c(),n[t].m(e,o))}for(;t<n.length;t+=1)n[t].d(1);n.length=l.length}},d(a){a&&h(e),F(n,a)}}}function Ee(s){let e,o,l,n,a,c,t,u,_,i,p,w,E,N,z;e=new he({props:{$$slots:{default:[ye]},$$scope:{ctx:s}}}),i=new de({props:{counts:s[1]}}),i.$on("color-pick",s[6]);let T=s[2],g=[];for(let r=0;r<T.length;r+=1)g[r]=ne(Z(s,T,r));return{c(){O(e.$$.fragment),o=D(),l=v("div"),n=v("label"),a=L("Num. Tubes"),c=D(),t=v("input"),_=D(),O(i.$$.fragment),p=D(),w=v("div");for(let r=0;r<g.length;r+=1)g[r].c();this.h()},l(r){j(e.$$.fragment,r),o=q(r),l=k(r,"DIV",{});var f=y(l);n=k(f,"LABEL",{for:!0});var m=y(n);a=R(m,"Num. Tubes"),m.forEach(h),c=q(f),t=k(f,"INPUT",{type:!0,name:!0,min:!0,max:!0,class:!0}),f.forEach(h),_=q(r),j(i.$$.fragment,r),p=q(r),w=k(r,"DIV",{});var C=y(w);for(let b=0;b<g.length;b+=1)g[b].l(C);C.forEach(h),this.h()},h(){d(n,"for","num_tubes"),d(t,"type","number"),d(t,"name","num_tubes"),d(t,"min","5"),d(t,"max","20"),t.value=u=s[0].tubes.length,d(t,"class","svelte-jgsu2c")},m(r,f){I(e,r,f),$(r,o,f),$(r,l,f),A(l,n),A(n,a),A(l,c),A(l,t),$(r,_,f),I(i,r,f),$(r,p,f),$(r,w,f);for(let m=0;m<g.length;m+=1)g[m].m(w,null);E=!0,N||(z=M(t,"change",s[4]),N=!0)},p(r,[f]){const m={};f&16777224&&(m.$$scope={dirty:f,ctx:r}),e.$set(m),(!E||f&1&&u!==(u=r[0].tubes.length)&&t.value!==u)&&(t.value=u);const C={};if(f&2&&(C.counts=r[1]),i.$set(C),f&132){T=r[2];let b;for(b=0;b<T.length;b+=1){const Q=Z(r,T,b);g[b]?g[b].p(Q,f):(g[b]=ne(Q),g[b].c(),g[b].m(w,null))}for(;b<g.length;b+=1)g[b].d(1);g.length=T.length}},i(r){E||(S(e.$$.fragment,r),S(i.$$.fragment,r),E=!0)},o(r){V(e.$$.fragment,r),V(i.$$.fragment,r),E=!1},d(r){G(e,r),r&&h(o),r&&h(l),r&&h(_),G(i,r),r&&h(p),r&&h(w),F(g,r),N=!1,z()}}}function se(s,e=0){return Array(s).fill().map((o,l)=>({id:e+l,levels:["","","",""]}))}function Te(s){return s.length<4?s.concat(new Array(4-s.length).fill("")):s}function Ce(s,e,o){let l;fe(s,W,r=>o(11,l=r));let n=l,a=[n.tubes],c=null,t={},u=!1;function _(r){const f=r.target.value;if(f<n.tubes.length&&o(0,n.tubes=n.tubes.slice(0,f),n),f>n.tubes.length){const m=f-n.tubes.length;o(0,n.tubes=[...n.tubes,...se(m,n.tubes.length)],n)}}function i(){o(0,n.tubes=se(n.tubes.length),n)}function p(r){return r.map(f=>{const m=f.levels.indexOf("");return m>=0?new J(f.id,f.levels.slice(0,m)):f})}function w(r){c=r.detail}function E(r,f){console.debug(`apply color ${c} to tube ${r} level ${f}`);const m=n.tubes[r],C=Te([...m.levels]);C[f]=c||"";const b=[...n.tubes];b[r]=new J(m.id,C),o(0,n.tubes=b,n)}function N(){const r={};for(const f of n.tubes)for(const m of f.levels)m&&(r[m]=++r[m]||1);return r}function z(r){const f=new Set(Object.values(t));return f.size===1&&f.has(4)}function T(){if(u){const r=new pe(p(n.tubes));W.set(r),be(ue+"/")}}const g=(r,f)=>E(r.id,f);return s.$$.update=()=>{s.$$.dirty&1&&o(2,a=me(n.tubes)),s.$$.dirty&1&&o(1,t=N(n.tubes)),s.$$.dirty&2&&o(3,u=z())},[n,t,a,u,_,i,w,E,T,g]}class Be extends oe{constructor(e){super(),re(this,e,Ce,Ee,ce,{})}}export{Be as default};