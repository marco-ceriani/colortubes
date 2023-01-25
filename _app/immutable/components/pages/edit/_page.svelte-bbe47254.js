import{S as ie,i as ue,s as ae,k as y,a as P,l as E,m as C,c as D,h as m,n as k,J as I,p as K,b as d,D as q,K as M,B as X,L as Q,P as _e,q as N,r as O,u as he,w as S,x as U,y as G,f as H,t as F,z as J,H as me}from"../../../chunks/index-5bc28d6e.js";import{h as B}from"../../../chunks/singletons-2d098f24.js";import{b as fe}from"../../../chunks/paths-d538d824.js";import{B as pe,a as W,T as Y,c as Z}from"../../../chunks/game-e6546d15.js";B.disable_scroll_handling;const ge=B.goto;B.invalidate;B.invalidateAll;B.preload_data;B.preload_code;B.before_navigate;B.after_navigate;function x(n,e,s){const l=n.slice();return l[8]=e[s],l}function ee(n){let e,s=(n[0][n[8]]||"")+"",l,o=`var(--clr-wtr${n[8]>=0?n[8]:"-none"})`,c,r;function t(){return n[5](n[8])}return{c(){e=y("button"),l=N(s),this.h()},l(i){e=E(i,"BUTTON",{class:!0});var f=C(e);l=O(f,s),f.forEach(m),this.h()},h(){k(e,"class","cell svelte-1smq6qh"),I(e,"curr",n[8]===n[1]),I(e,"extra",n[0][n[8]]>4),K(e,"--color",o)},m(i,f){d(i,e,f),q(e,l),c||(r=M(e,"click",t),c=!0)},p(i,f){n=i,f&1&&s!==(s=(n[0][n[8]]||"")+"")&&he(l,s),f&6&&I(e,"curr",n[8]===n[1]),f&5&&I(e,"extra",n[0][n[8]]>4)},d(i){i&&m(e),c=!1,r()}}}function $e(n){let e,s,l,o,c,r=n[2],t=[];for(let i=0;i<r.length;i+=1)t[i]=ee(x(n,r,i));return{c(){e=y("div");for(let i=0;i<t.length;i+=1)t[i].c();s=P(),l=y("button"),this.h()},l(i){e=E(i,"DIV",{class:!0});var f=C(e);for(let _=0;_<t.length;_+=1)t[_].l(f);s=D(f),l=E(f,"BUTTON",{class:!0});var a=C(l);a.forEach(m),f.forEach(m),this.h()},h(){k(l,"class","cell empty svelte-1smq6qh"),I(l,"curr",n[1]===null),K(l,"--color","var(--clr-wtr-none)"),k(e,"class","palette svelte-1smq6qh")},m(i,f){d(i,e,f);for(let a=0;a<t.length;a+=1)t[a].m(e,null);q(e,s),q(e,l),o||(c=M(l,"click",n[6]),o=!0)},p(i,[f]){if(f&15){r=i[2];let a;for(a=0;a<r.length;a+=1){const _=x(i,r,a);t[a]?t[a].p(_,f):(t[a]=ee(_),t[a].c(),t[a].m(e,s))}for(;a<t.length;a+=1)t[a].d(1);t.length=r.length}f&2&&I(l,"curr",i[1]===null)},i:X,o:X,d(i){i&&m(e),Q(t,i),o=!1,c()}}}function de(n,e,s){const l=_e();let{numColors:o=17}=e,{counts:c={}}=e;const r=Array(o).fill().map((_,z)=>z+1);let t=null;function i(_){s(1,t=_),l("color-pick",_)}const f=_=>i(_),a=()=>i(null);return n.$$set=_=>{"numColors"in _&&s(4,o=_.numColors),"counts"in _&&s(0,c=_.counts)},[c,t,r,i,o,f,a]}class ve extends ie{constructor(e){super(),ue(this,e,de,$e,ae,{numColors:4,counts:0})}}function be(n){const e=n.length<=6?n.length:n.length<=14?(n.length+1)/2:5,s=[];for(let l=0;l<n.length;l+=e)s.push(n.slice(l,l+e));return s}function te(n,e,s){const l=n.slice();return l[15]=e[s],l}function le(n,e,s){const l=n.slice();return l[18]=e[s],l}function ne(n,e,s){const l=n.slice();return l[21]=e[s],l[23]=s,l}function ke(n){let e;return{c(){e=N("Reset")},l(s){e=O(s,"Reset")},m(s,l){d(s,e,l)},d(s){s&&m(e)}}}function we(n){let e;return{c(){e=N("Discard")},l(s){e=O(s,"Discard")},m(s,l){d(s,e,l)},d(s){s&&m(e)}}}function ye(n){let e;return{c(){e=N("Play")},l(s){e=O(s,"Play")},m(s,l){d(s,e,l)},d(s){s&&m(e)}}}function Ee(n){let e,s,l,o,c,r;return e=new W({props:{$$slots:{default:[ke]},$$scope:{ctx:n}}}),e.$on("click",n[5]),l=new W({props:{href:fe+"/",$$slots:{default:[we]},$$scope:{ctx:n}}}),c=new W({props:{disabled:!n[3],$$slots:{default:[ye]},$$scope:{ctx:n}}}),c.$on("click",n[8]),{c(){S(e.$$.fragment),s=P(),S(l.$$.fragment),o=P(),S(c.$$.fragment)},l(t){U(e.$$.fragment,t),s=D(t),U(l.$$.fragment,t),o=D(t),U(c.$$.fragment,t)},m(t,i){G(e,t,i),d(t,s,i),G(l,t,i),d(t,o,i),G(c,t,i),r=!0},p(t,i){const f={};i&16777216&&(f.$$scope={dirty:i,ctx:t}),e.$set(f);const a={};i&16777216&&(a.$$scope={dirty:i,ctx:t}),l.$set(a);const _={};i&8&&(_.disabled=!t[3]),i&16777216&&(_.$$scope={dirty:i,ctx:t}),c.$set(_)},i(t){r||(H(e.$$.fragment,t),H(l.$$.fragment,t),H(c.$$.fragment,t),r=!0)},o(t){F(e.$$.fragment,t),F(l.$$.fragment,t),F(c.$$.fragment,t),r=!1},d(t){J(e,t),t&&m(s),J(l,t),t&&m(o),J(c,t)}}}function se(n){let e,s=`var(--clr-wtr${n[18].levels[n[23]]||""})`,l,o;function c(){return n[9](n[18],n[23])}return{c(){e=y("div"),this.h()},l(r){e=E(r,"DIV",{class:!0}),C(e).forEach(m),this.h()},h(){k(e,"class","block svelte-jgsu2c"),K(e,"background-color",s)},m(r,t){d(r,e,t),l||(o=M(e,"click",c),l=!0)},p(r,t){n=r,t&4&&s!==(s=`var(--clr-wtr${n[18].levels[n[23]]||""})`)&&K(e,"background-color",s)},d(r){r&&m(e),l=!1,o()}}}function oe(n){let e,s=Array(4),l=[];for(let o=0;o<s.length;o+=1)l[o]=se(ne(n,s,o));return{c(){e=y("div");for(let o=0;o<l.length;o+=1)l[o].c();this.h()},l(o){e=E(o,"DIV",{class:!0});var c=C(e);for(let r=0;r<l.length;r+=1)l[r].l(c);c.forEach(m),this.h()},h(){k(e,"class","tube svelte-jgsu2c")},m(o,c){d(o,e,c);for(let r=0;r<l.length;r+=1)l[r].m(e,null)},p(o,c){if(c&132){s=Array(4);let r;for(r=0;r<s.length;r+=1){const t=ne(o,s,r);l[r]?l[r].p(t,c):(l[r]=se(t),l[r].c(),l[r].m(e,null))}for(;r<l.length;r+=1)l[r].d(1);l.length=s.length}},d(o){o&&m(e),Q(l,o)}}}function re(n){let e,s,l=n[15],o=[];for(let c=0;c<l.length;c+=1)o[c]=oe(le(n,l,c));return{c(){e=y("div");for(let c=0;c<o.length;c+=1)o[c].c();s=P(),this.h()},l(c){e=E(c,"DIV",{class:!0});var r=C(e);for(let t=0;t<o.length;t+=1)o[t].l(r);s=D(r),r.forEach(m),this.h()},h(){k(e,"class","tubes-row svelte-jgsu2c")},m(c,r){d(c,e,r);for(let t=0;t<o.length;t+=1)o[t].m(e,null);q(e,s)},p(c,r){if(r&132){l=c[15];let t;for(t=0;t<l.length;t+=1){const i=le(c,l,t);o[t]?o[t].p(i,r):(o[t]=oe(i),o[t].c(),o[t].m(e,s))}for(;t<o.length;t+=1)o[t].d(1);o.length=l.length}},d(c){c&&m(e),Q(o,c)}}}function Ce(n){let e,s,l,o,c,r,t,i,f,a,_,z,b,V,T,A,R,$;o=new pe({props:{$$slots:{default:[Ee]},$$scope:{ctx:n}}}),b=new ve({props:{counts:n[1]}}),b.$on("color-pick",n[6]);let p=n[2],h=[];for(let u=0;u<p.length;u+=1)h[u]=re(te(n,p,u));return{c(){e=y("h2"),s=N("Edit Puzzle"),l=P(),S(o.$$.fragment),c=P(),r=y("div"),t=y("label"),i=N("Num. Tubes"),f=P(),a=y("input"),z=P(),S(b.$$.fragment),V=P(),T=y("div");for(let u=0;u<h.length;u+=1)h[u].c();this.h()},l(u){e=E(u,"H2",{});var g=C(e);s=O(g,"Edit Puzzle"),g.forEach(m),l=D(u),U(o.$$.fragment,u),c=D(u),r=E(u,"DIV",{});var w=C(r);t=E(w,"LABEL",{for:!0});var L=C(t);i=O(L,"Num. Tubes"),L.forEach(m),f=D(w),a=E(w,"INPUT",{type:!0,name:!0,min:!0,max:!0,class:!0}),w.forEach(m),z=D(u),U(b.$$.fragment,u),V=D(u),T=E(u,"DIV",{});var v=C(T);for(let j=0;j<h.length;j+=1)h[j].l(v);v.forEach(m),this.h()},h(){k(t,"for","num_tubes"),k(a,"type","number"),k(a,"name","num_tubes"),k(a,"min","5"),k(a,"max","15"),a.value=_=n[0].length,k(a,"class","svelte-jgsu2c")},m(u,g){d(u,e,g),q(e,s),d(u,l,g),G(o,u,g),d(u,c,g),d(u,r,g),q(r,t),q(t,i),q(r,f),q(r,a),d(u,z,g),G(b,u,g),d(u,V,g),d(u,T,g);for(let w=0;w<h.length;w+=1)h[w].m(T,null);A=!0,R||($=M(a,"change",n[4]),R=!0)},p(u,[g]){const w={};g&16777224&&(w.$$scope={dirty:g,ctx:u}),o.$set(w),(!A||g&1&&_!==(_=u[0].length)&&a.value!==_)&&(a.value=_);const L={};if(g&2&&(L.counts=u[1]),b.$set(L),g&132){p=u[2];let v;for(v=0;v<p.length;v+=1){const j=te(u,p,v);h[v]?h[v].p(j,g):(h[v]=re(j),h[v].c(),h[v].m(T,null))}for(;v<h.length;v+=1)h[v].d(1);h.length=p.length}},i(u){A||(H(o.$$.fragment,u),H(b.$$.fragment,u),A=!0)},o(u){F(o.$$.fragment,u),F(b.$$.fragment,u),A=!1},d(u){u&&m(e),u&&m(l),J(o,u),u&&m(c),u&&m(r),u&&m(z),J(b,u),u&&m(V),u&&m(T),Q(h,u),R=!1,$()}}}function ce(n,e=0){return Array(n).fill().map((s,l)=>({id:e+l,levels:["","","",""]}))}function Te(n){return n.length<4?n.concat(new Array(4-n.length).fill("")):n}function Pe(n,e,s){let l;me(n,Z,$=>s(11,l=$));let o=l,c=[o],r=null,t={},i=!1;function f($){const p=$.target.value;if(p<o.length&&s(0,o=o.slice(0,p)),p>o.length){const h=p-o.length;s(0,o=[...o,...ce(h,o.length)])}}function a(){s(0,o=ce(10))}function _($){return $.map(p=>{const h=p.levels.indexOf("");return h>=0?new Y(p.id,p.levels.slice(0,h)):p})}function z($){r=$.detail}function b($,p){console.debug(`apply color ${r} to tube ${$} level ${p}`);const h=o[$],u=Te([...h.levels]);u[p]=r||"";const g=[...o];g[$]=new Y(h.id,u),s(0,o=g)}function V(){const $={};for(const p of o)for(const h of p.levels)h&&($[h]=++$[h]||1);return $}function T($){const p=new Set(Object.values(t));return p.size===1&&p.has(4)}function A(){i&&(Z.set(_(o)),ge(fe+"/"))}const R=($,p)=>b($.id,p);return n.$$.update=()=>{n.$$.dirty&1&&s(2,c=be(o)),n.$$.dirty&1&&s(1,t=V()),n.$$.dirty&2&&s(3,i=T())},[o,t,c,i,f,a,z,b,A,R]}class Ae extends ie{constructor(e){super(),ue(this,e,Pe,Ce,ae,{})}}export{Ae as default};
