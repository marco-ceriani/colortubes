import{I as Q,S as j,i as J,s as Y,k as I,a as N,q as M,l as y,m as D,h as m,c as C,r as V,n as E,J as H,b as $,D as k,K as _e,f as d,g as P,d as R,u as O,t as v,L as U,p as z,M as he,N as A,O as ge,P as me,w as q,x as G,y as L,z as W,B as X,e as K,H as be,o as de}from"../../chunks/index-5bc28d6e.js";import{b as pe}from"../../chunks/paths-d538d824.js";import{B as ve,G as F,a as T,c as Z,r as $e}from"../../chunks/game-093220d5.js";function ke(o){const e=o-1;return e*e*e+1}function x(o,{delay:e=0,duration:t=400,easing:l=Q}={}){const n=+getComputedStyle(o).opacity;return{delay:e,duration:t,easing:l,css:s=>`opacity: ${s*n}`}}function ee(o,{delay:e=0,duration:t=400,easing:l=ke,x:n=0,y:s=0,opacity:i=0}={}){const u=getComputedStyle(o),f=+u.opacity,a=u.transform==="none"?"":u.transform,c=f*(1-i);return{delay:e,duration:t,easing:l,css:(h,r)=>`
			transform: ${a} translate(${(1-h)*n}px, ${(1-h)*s}px);
			opacity: ${f-c*r}`}}function te(o,e,t){const l=o.slice();return l[5]=e[t],l}function le(o){let e,t,l=`var(--clr-wtr${o[5]})`,n;return{c(){e=I("div"),this.h()},l(s){e=y(s,"DIV",{class:!0}),D(e).forEach(m),this.h()},h(){E(e,"class","waterblock svelte-13yaq6d"),z(e,"background-color",l)},m(s,i){$(s,e,i),n=!0},p(s,i){o=s,i&1&&l!==(l=`var(--clr-wtr${o[5]})`)&&z(e,"background-color",l)},i(s){n||(s&&he(()=>{t||(t=A(e,ee,{y:-200,duration:200,easing:Q},!0)),t.run(1)}),n=!0)},o(s){s&&(t||(t=A(e,ee,{y:-200,duration:200,easing:Q},!1)),t.run(0)),n=!1},d(s){s&&m(e),s&&t&&t.end()}}}function we(o){let e,t,l,n,s,i,u=o[0].name+"",f,a,c,h,r=o[0].levels,_=[];for(let g=0;g<r.length;g+=1)_[g]=le(te(o,r,g));const w=g=>v(_[g],1,1,()=>{_[g]=null});return{c(){e=I("div"),t=I("div"),l=I("div"),n=N();for(let g=0;g<_.length;g+=1)_[g].c();s=N(),i=I("h4"),f=M(u),this.h()},l(g){e=y(g,"DIV",{class:!0});var p=D(e);t=y(p,"DIV",{class:!0,selectable:!0});var b=D(t);l=y(b,"DIV",{class:!0}),D(l).forEach(m),n=C(b);for(let B=0;B<_.length;B+=1)_[B].l(b);b.forEach(m),s=C(p),i=y(p,"H4",{class:!0});var S=D(i);f=V(S,u),S.forEach(m),p.forEach(m),this.h()},h(){E(l,"class","plug svelte-13yaq6d"),E(t,"class","tube svelte-13yaq6d"),E(t,"selectable",o[3]),H(t,"selected",o[1]),H(t,"highlight",o[2]),H(t,"unplugged",!o[0].done),E(i,"class","svelte-13yaq6d"),E(e,"class","tube-slot")},m(g,p){$(g,e,p),k(e,t),k(t,l),k(t,n);for(let b=0;b<_.length;b+=1)_[b].m(t,null);k(e,s),k(e,i),k(i,f),a=!0,c||(h=_e(t,"click",o[4]),c=!0)},p(g,[p]){if(p&1){r=g[0].levels;let b;for(b=0;b<r.length;b+=1){const S=te(g,r,b);_[b]?(_[b].p(S,p),d(_[b],1)):(_[b]=le(S),_[b].c(),d(_[b],1),_[b].m(t,null))}for(P(),b=r.length;b<_.length;b+=1)w(b);R()}(!a||p&8)&&E(t,"selectable",g[3]),(!a||p&2)&&H(t,"selected",g[1]),(!a||p&4)&&H(t,"highlight",g[2]),(!a||p&1)&&H(t,"unplugged",!g[0].done),(!a||p&1)&&u!==(u=g[0].name+"")&&O(f,u)},i(g){if(!a){for(let p=0;p<r.length;p+=1)d(_[p]);a=!0}},o(g){_=_.filter(Boolean);for(let p=0;p<_.length;p+=1)v(_[p]);a=!1},d(g){g&&m(e),U(_,g),c=!1,h()}}}function Ee(o,e,t){let{tube:l}=e,{selected:n=!1}=e,{highlight:s=!1}=e,{selectable:i}=e;function u(f){ge.call(this,o,f)}return o.$$set=f=>{"tube"in f&&t(0,l=f.tube),"selected"in f&&t(1,n=f.selected),"highlight"in f&&t(2,s=f.highlight),"selectable"in f&&t(3,i=f.selectable)},[l,n,s,i,u]}class Ie extends j{constructor(e){super(),J(this,e,Ee,we,Y,{tube:0,selected:1,highlight:2,selectable:3})}}function se(o,e,t){const l=o.slice();return l[9]=e[t],l}function ne(o,e,t){const l=o.slice();return l[12]=e[t],l}function oe(o){let e,t;function l(){return o[6](o[12])}return e=new Ie({props:{tube:o[12],selected:o[0]===o[12].id,selectable:o[3](o[12].id,o[0]),highlight:o[1]===o[12].id}}),e.$on("click",l),{c(){q(e.$$.fragment)},l(n){G(e.$$.fragment,n)},m(n,s){L(e,n,s),t=!0},p(n,s){o=n;const i={};s&4&&(i.tube=o[12]),s&5&&(i.selected=o[0]===o[12].id),s&5&&(i.selectable=o[3](o[12].id,o[0])),s&6&&(i.highlight=o[1]===o[12].id),e.$set(i)},i(n){t||(d(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){W(e,n)}}}function re(o){let e,t,l,n=o[9],s=[];for(let u=0;u<n.length;u+=1)s[u]=oe(ne(o,n,u));const i=u=>v(s[u],1,1,()=>{s[u]=null});return{c(){e=I("div");for(let u=0;u<s.length;u+=1)s[u].c();t=N(),this.h()},l(u){e=y(u,"DIV",{class:!0});var f=D(e);for(let a=0;a<s.length;a+=1)s[a].l(f);t=C(f),f.forEach(m),this.h()},h(){E(e,"class","tubes-row svelte-1m5libu")},m(u,f){$(u,e,f);for(let a=0;a<s.length;a+=1)s[a].m(e,null);k(e,t),l=!0},p(u,f){if(f&31){n=u[9];let a;for(a=0;a<n.length;a+=1){const c=ne(u,n,a);s[a]?(s[a].p(c,f),d(s[a],1)):(s[a]=oe(c),s[a].c(),d(s[a],1),s[a].m(e,t))}for(P(),a=n.length;a<s.length;a+=1)i(a);R()}},i(u){if(!l){for(let f=0;f<n.length;f+=1)d(s[f]);l=!0}},o(u){s=s.filter(Boolean);for(let f=0;f<s.length;f+=1)v(s[f]);l=!1},d(u){u&&m(e),U(s,u)}}}function ye(o){let e,t,l=o[2],n=[];for(let i=0;i<l.length;i+=1)n[i]=re(se(o,l,i));const s=i=>v(n[i],1,1,()=>{n[i]=null});return{c(){e=I("div");for(let i=0;i<n.length;i+=1)n[i].c();this.h()},l(i){e=y(i,"DIV",{class:!0});var u=D(e);for(let f=0;f<n.length;f+=1)n[f].l(u);u.forEach(m),this.h()},h(){E(e,"class","tubes-container")},m(i,u){$(i,e,u);for(let f=0;f<n.length;f+=1)n[f].m(e,null);t=!0},p(i,[u]){if(u&31){l=i[2];let f;for(f=0;f<l.length;f+=1){const a=se(i,l,f);n[f]?(n[f].p(a,u),d(n[f],1)):(n[f]=re(a),n[f].c(),d(n[f],1),n[f].m(e,null))}for(P(),f=l.length;f<n.length;f+=1)s(f);R()}},i(i){if(!t){for(let u=0;u<l.length;u+=1)d(n[u]);t=!0}},o(i){n=n.filter(Boolean);for(let u=0;u<n.length;u+=1)v(n[u]);t=!1},d(i){i&&m(e),U(n,i)}}}function De(o,e,t){const l=me();let{tubes:n}=e,{selected:s=null}=e,{highlight:i=null}=e,u=[];function f(r){const _=r.length<=6?r.length:r.length<=14?(r.length+1)/2:5,w=[];for(let g=0;g<r.length;g+=_)w.push(n.slice(g,g+_));return w}function a(r){return s===r?!0:!(n[r].done||s===null&&n[r].empty||s!==null&&n[r].full)}function c(r){a(r)&&l("select",r)}const h=r=>c(r.id);return o.$$set=r=>{"tubes"in r&&t(5,n=r.tubes),"selected"in r&&t(0,s=r.selected),"highlight"in r&&t(1,i=r.highlight)},o.$$.update=()=>{o.$$.dirty&32&&t(2,u=f(n))},[s,i,u,a,c,n,h]}class Se extends j{constructor(e){super(),J(this,e,De,ye,Y,{tubes:5,selected:0,highlight:1})}}function fe(o,e,t){const l=o.slice();return l[2]=e[t],l}function ue(o){let e,t,l=o[2].amount+"",n,s=`var(--clr-wtr${o[2].color})`,i,u=o[2].fromId+"",f,a,c=o[2].toId+"",h;return{c(){e=I("li"),t=I("span"),n=M(l),i=M(" from "),f=M(u),a=M(" to "),h=M(c),this.h()},l(r){e=y(r,"LI",{class:!0});var _=D(e);t=y(_,"SPAN",{class:!0});var w=D(t);n=V(w,l),w.forEach(m),i=V(_," from "),f=V(_,u),a=V(_," to "),h=V(_,c),_.forEach(m),this.h()},h(){E(t,"class","amount svelte-5cl2gs"),z(t,"background-color",s),E(e,"class","svelte-5cl2gs")},m(r,_){$(r,e,_),k(e,t),k(t,n),k(e,i),k(e,f),k(e,a),k(e,h)},p(r,_){_&2&&l!==(l=r[2].amount+"")&&O(n,l),_&2&&s!==(s=`var(--clr-wtr${r[2].color})`)&&z(t,"background-color",s),_&2&&u!==(u=r[2].fromId+"")&&O(f,u),_&2&&c!==(c=r[2].toId+"")&&O(h,c)},d(r){r&&m(e)}}}function Me(o){let e,t,l,n,s,i=o[1],u=[];for(let f=0;f<i.length;f+=1)u[f]=ue(fe(o,i,f));return{c(){e=I("div"),t=I("h3"),l=M(o[0]),n=N(),s=I("ol");for(let f=0;f<u.length;f+=1)u[f].c();this.h()},l(f){e=y(f,"DIV",{class:!0});var a=D(e);t=y(a,"H3",{});var c=D(t);l=V(c,o[0]),c.forEach(m),n=C(a),s=y(a,"OL",{class:!0});var h=D(s);for(let r=0;r<u.length;r+=1)u[r].l(h);h.forEach(m),a.forEach(m),this.h()},h(){E(s,"class","svelte-5cl2gs"),E(e,"class","log svelte-5cl2gs")},m(f,a){$(f,e,a),k(e,t),k(t,l),k(e,n),k(e,s);for(let c=0;c<u.length;c+=1)u[c].m(s,null)},p(f,[a]){if(a&1&&O(l,f[0]),a&2){i=f[1];let c;for(c=0;c<i.length;c+=1){const h=fe(f,i,c);u[c]?u[c].p(h,a):(u[c]=ue(h),u[c].c(),u[c].m(s,null))}for(;c<u.length;c+=1)u[c].d(1);u.length=i.length}},i:X,o:X,d(f){f&&m(e),U(u,f)}}}function Ve(o,e,t){let{title:l="Moves"}=e,{moves:n=[]}=e;return o.$$set=s=>{"title"in s&&t(0,l=s.title),"moves"in s&&t(1,n=s.moves)},[l,n]}class Be extends j{constructor(e){super(),J(this,e,Ve,Me,Y,{title:0,moves:1})}}function Ne(o){let e,t,l,n,s,i;return{c(){e=I("div"),t=I("h2"),l=M(o[0]),this.h()},l(u){e=y(u,"DIV",{class:!0});var f=D(e);t=y(f,"H2",{});var a=D(t);l=V(a,o[0]),a.forEach(m),f.forEach(m),this.h()},h(){E(e,"class",n="modal "+(o[1]||"")+" svelte-alsri9")},m(u,f){$(u,e,f),k(e,t),k(t,l),i=!0},p(u,[f]){(!i||f&1)&&O(l,u[0]),(!i||f&2&&n!==(n="modal "+(u[1]||"")+" svelte-alsri9"))&&E(e,"class",n)},i(u){i||(he(()=>{s||(s=A(e,x,{delay:100},!0)),s.run(1)}),i=!0)},o(u){s||(s=A(e,x,{delay:100},!1)),s.run(0),i=!1},d(u){u&&m(e),u&&s&&s.end()}}}function Ce(o,e,t){let{message:l}=e,{result:n}=e;return o.$$set=s=>{"message"in s&&t(0,l=s.message),"result"in s&&t(1,n=s.result)},o.$$.update=()=>{o.$$.dirty&2&&console.log(n),o.$$.dirty&2&&t(0,l=n==="win"?"🏅 You Win 🏅":"You lose 😞")},[l,n]}class qe extends j{constructor(e){super(),J(this,e,Ce,Ne,Y,{message:0,result:1})}}function Ge(){return new Worker(""+new URL("../../workers/solve-worker-a18bb6af.js",import.meta.url).href)}function Le(o){let e;return{c(){e=M("Custom")},l(t){e=V(t,"Custom")},m(t,l){$(t,e,l)},d(t){t&&m(e)}}}function We(o){let e;return{c(){e=M("New")},l(t){e=V(t,"New")},m(t,l){$(t,e,l)},d(t){t&&m(e)}}}function He(o){let e;return{c(){e=M("Reset")},l(t){e=V(t,"Reset")},m(t,l){$(t,e,l)},d(t){t&&m(e)}}}function ie(o){let e,t;return e=new T({props:{$$slots:{default:[Oe]},$$scope:{ctx:o}}}),e.$on("click",o[9]),{c(){q(e.$$.fragment)},l(l){G(e.$$.fragment,l)},m(l,n){L(e,l,n),t=!0},p(l,n){const s={};n&16384&&(s.$$scope={dirty:n,ctx:l}),e.$set(s)},i(l){t||(d(e.$$.fragment,l),t=!0)},o(l){v(e.$$.fragment,l),t=!1},d(l){W(e,l)}}}function Oe(o){let e;return{c(){e=M("Solve")},l(t){e=V(t,"Solve")},m(t,l){$(t,e,l)},d(t){t&&m(e)}}}function ce(o){let e,t;return e=new T({props:{$$slots:{default:[Pe]},$$scope:{ctx:o}}}),e.$on("click",o[11]),{c(){q(e.$$.fragment)},l(l){G(e.$$.fragment,l)},m(l,n){L(e,l,n),t=!0},p(l,n){const s={};n&16384&&(s.$$scope={dirty:n,ctx:l}),e.$set(s)},i(l){t||(d(e.$$.fragment,l),t=!0)},o(l){v(e.$$.fragment,l),t=!1},d(l){W(e,l)}}}function Pe(o){let e;return{c(){e=M("💡")},l(t){e=V(t,"💡")},m(t,l){$(t,e,l)},d(t){t&&m(e)}}}function Re(o){let e,t,l,n,s,i,u,f,a;e=new T({props:{href:pe+"/edit",$$slots:{default:[Le]},$$scope:{ctx:o}}}),l=new T({props:{$$slots:{default:[We]},$$scope:{ctx:o}}}),l.$on("click",o[7]),s=new T({props:{$$slots:{default:[He]},$$scope:{ctx:o}}}),s.$on("click",o[8]);let c=o[1]&&o[5].length==0&&ie(o),h=o[5].length>0&&ce(o);return{c(){q(e.$$.fragment),t=N(),q(l.$$.fragment),n=N(),q(s.$$.fragment),i=N(),c&&c.c(),u=N(),h&&h.c(),f=K()},l(r){G(e.$$.fragment,r),t=C(r),G(l.$$.fragment,r),n=C(r),G(s.$$.fragment,r),i=C(r),c&&c.l(r),u=C(r),h&&h.l(r),f=K()},m(r,_){L(e,r,_),$(r,t,_),L(l,r,_),$(r,n,_),L(s,r,_),$(r,i,_),c&&c.m(r,_),$(r,u,_),h&&h.m(r,_),$(r,f,_),a=!0},p(r,_){const w={};_&16384&&(w.$$scope={dirty:_,ctx:r}),e.$set(w);const g={};_&16384&&(g.$$scope={dirty:_,ctx:r}),l.$set(g);const p={};_&16384&&(p.$$scope={dirty:_,ctx:r}),s.$set(p),r[1]&&r[5].length==0?c?(c.p(r,_),_&34&&d(c,1)):(c=ie(r),c.c(),d(c,1),c.m(u.parentNode,u)):c&&(P(),v(c,1,1,()=>{c=null}),R()),r[5].length>0?h?(h.p(r,_),_&32&&d(h,1)):(h=ce(r),h.c(),d(h,1),h.m(f.parentNode,f)):h&&(P(),v(h,1,1,()=>{h=null}),R())},i(r){a||(d(e.$$.fragment,r),d(l.$$.fragment,r),d(s.$$.fragment,r),d(c),d(h),a=!0)},o(r){v(e.$$.fragment,r),v(l.$$.fragment,r),v(s.$$.fragment,r),v(c),v(h),a=!1},d(r){W(e,r),r&&m(t),W(l,r),r&&m(n),W(s,r),r&&m(i),c&&c.d(r),r&&m(u),h&&h.d(r),r&&m(f)}}}function ae(o){let e,t;return e=new qe({props:{result:o[2].status}}),{c(){q(e.$$.fragment)},l(l){G(e.$$.fragment,l)},m(l,n){L(e,l,n),t=!0},p(l,n){const s={};n&4&&(s.result=l[2].status),e.$set(s)},i(l){t||(d(e.$$.fragment,l),t=!0)},o(l){v(e.$$.fragment,l),t=!1},d(l){W(e,l)}}}function Te(o){let e,t,l,n,s,i,u,f,a;e=new ve({props:{$$slots:{default:[Re]},$$scope:{ctx:o}}}),n=new Se({props:{tubes:o[2].tubes,selected:o[0],selectable:o[3],highlight:o[6]}}),n.$on("select",o[10]),i=new Be({props:{moves:o[4]}});let c=o[2].status&&ae(o);return{c(){q(e.$$.fragment),t=N(),l=I("div"),q(n.$$.fragment),s=N(),q(i.$$.fragment),u=N(),c&&c.c(),f=K(),this.h()},l(h){G(e.$$.fragment,h),t=C(h),l=y(h,"DIV",{class:!0});var r=D(l);G(n.$$.fragment,r),s=C(r),G(i.$$.fragment,r),r.forEach(m),u=C(h),c&&c.l(h),f=K(),this.h()},h(){E(l,"class","cols-2 svelte-m2jv0k")},m(h,r){L(e,h,r),$(h,t,r),$(h,l,r),L(n,l,null),k(l,s),L(i,l,null),$(h,u,r),c&&c.m(h,r),$(h,f,r),a=!0},p(h,[r]){const _={};r&16418&&(_.$$scope={dirty:r,ctx:h}),e.$set(_);const w={};r&4&&(w.tubes=h[2].tubes),r&1&&(w.selected=h[0]),r&8&&(w.selectable=h[3]),r&64&&(w.highlight=h[6]),n.$set(w);const g={};r&16&&(g.moves=h[4]),i.$set(g),h[2].status?c?(c.p(h,r),r&4&&d(c,1)):(c=ae(h),c.c(),d(c,1),c.m(f.parentNode,f)):c&&(P(),v(c,1,1,()=>{c=null}),R())},i(h){a||(d(e.$$.fragment,h),d(n.$$.fragment,h),d(i.$$.fragment,h),d(c),a=!0)},o(h){v(e.$$.fragment,h),v(n.$$.fragment,h),v(i.$$.fragment,h),v(c),a=!1},d(h){W(e,h),h&&m(t),h&&m(l),W(n),W(i),h&&m(u),c&&c.d(h),h&&m(f)}}}function je(o,e,t){let l;be(o,Z,b=>t(12,l=b));let n,s=new F(l),i=null,u,f=[],a=[],c=null;de(async()=>{t(1,n=new Ge),t(1,n.onmessage=function(b){t(5,a=b.data.actions),console.log(a)},n)});function h(){console.debug("generating new game"),Z.set($e()),t(2,s=new F(l)),t(4,f=[]),t(5,a=[]),t(6,c=null)}function r(){t(2,s=new F(l)),t(0,i=null),t(4,f=[]),t(5,a=[]),t(6,c=null)}function _(){n.postMessage(s)}function w(b){const S=b.detail;if(i===null)t(0,i=S),console.debug(`selecting ${i}`);else if(i===S)console.debug(`deselecting ${i}`),t(0,i=null);else{if(g(i,S),a.length>0){const B=a[0];S===B.toIndex&&i===B.fromIndex?t(5,a=a.slice(1)):t(5,a=[])}t(0,i=null),t(6,c=null)}}function g(b,S){try{const B=s.historyEntry({from:b,to:S});t(2,s=s.applyMove({from:b,to:S})),console.debug(`applied move ${JSON.stringify(B)}`),t(4,f=[...f,B])}catch(B){console.log(B.message)}}function p(){a.length>0&&(t(0,i=a[0].fromIndex),t(6,c=a[0].toIndex))}return o.$$.update=()=>{o.$$.dirty&1&&t(3,u=i?"non-full":"non-empty")},[i,n,s,u,f,a,c,h,r,_,w,p]}class Ae extends j{constructor(e){super(),J(this,e,je,Te,Y,{})}}export{Ae as default};
