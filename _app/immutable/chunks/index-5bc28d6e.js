function x(){}const ct=t=>t;function lt(t,e){for(const n in e)t[n]=e[n];return t}function W(t){return t()}function I(){return Object.create(null)}function $(t){t.forEach(W)}function T(t){return typeof t=="function"}function Lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function ot(t){return Object.keys(t).length===0}function ut(t,...e){if(t==null)return x;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function zt(t,e,n){t.$$.on_destroy.push(ut(e,n))}function Bt(t,e,n,i){if(t){const r=Q(t,e,n,i);return t[0](r)}}function Q(t,e,n,i){return t[1]&&i?lt(n.ctx.slice(),t[1](i(e))):n.ctx}function Rt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(e.dirty.length,r.length);for(let c=0;c<s;c+=1)u[c]=e.dirty[c]|r[c];return u}return e.dirty|r}return e.dirty}function Tt(t,e,n,i,r,u){if(r){const s=Q(e,n,i,u);t.p(s,r)}}function qt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}const U=typeof window<"u";let at=U?()=>window.performance.now():()=>Date.now(),q=U?t=>requestAnimationFrame(t):x;const b=new Set;function V(t){b.forEach(e=>{e.c(t)||(b.delete(e),e.f())}),b.size!==0&&q(V)}function ft(t){let e;return b.size===0&&q(V),{promise:new Promise(n=>{b.add(e={c:t,f:n})}),abort(){b.delete(e)}}}let D=!1;function dt(){D=!0}function _t(){D=!1}function ht(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function mt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<e.length;o++){const d=e[o];d.claim_order!==void 0&&l.push(d)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const o=e[l].claim_order,d=(r>0&&e[n[r]].claim_order<=o?r+1:ht(1,r,h=>e[n[h]].claim_order,o))-1;i[l]=n[d]+1;const a=d+1;n[a]=l,r=Math.max(a,r)}const u=[],s=[];let c=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(u.push(e[l-1]);c>=l;c--)s.push(e[c]);c--}for(;c>=0;c--)s.push(e[c]);u.reverse(),s.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<s.length;l++){for(;o<u.length&&s[l].claim_order>=u[o].claim_order;)o++;const d=o<u.length?u[o]:null;t.insertBefore(s[l],d)}}function pt(t,e){t.appendChild(e)}function X(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function yt(t){const e=Z("style");return gt(X(t),e),e.sheet}function gt(t,e){return pt(t.head||t,e),e.sheet}function bt(t,e){if(D){for(mt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Ft(t,e,n){D&&!n?bt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Y(t){t.parentNode&&t.parentNode.removeChild(t)}function Ht(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Z(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function It(){return F(" ")}function Gt(){return F("")}function Jt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function xt(t){return Array.from(t.childNodes)}function $t(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function tt(t,e,n,i,r=!1){$t(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),c}}for(let s=t.claim_info.last_index-1;s>=0;s--){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,c}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function wt(t,e,n,i){return tt(t,r=>r.nodeName===e,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const c=r.attributes[s];n[c.name]||u.push(c.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Wt(t,e,n){return wt(t,e,n,Z)}function vt(t,e){return tt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>F(e),!0)}function Qt(t){return vt(t," ")}function Ut(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Vt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Xt(t,e,n){t.classList[n?"add":"remove"](e)}function et(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function Yt(t,e){return new t(e)}const j=new Map;let M=0;function Et(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Nt(t,e){const n={stylesheet:yt(e),rules:{}};return j.set(t,n),n}function G(t,e,n,i,r,u,s,c=0){const l=16.666/i;let o=`{
`;for(let y=0;y<=1;y+=l){const g=e+(n-e)*u(y);o+=y*100+`%{${s(g,1-g)}}
`}const d=o+`100% {${s(n,1-n)}}
}`,a=`__svelte_${Et(d)}_${c}`,h=X(t),{stylesheet:f,rules:_}=j.get(h)||Nt(h,t);_[a]||(_[a]=!0,f.insertRule(`@keyframes ${a} ${d}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${a} ${i}ms linear ${r}ms 1 both`,M+=1,a}function kt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?u=>u.indexOf(e)<0:u=>u.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),M-=r,M||At())}function At(){q(()=>{M||(j.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&Y(e)}),j.clear())})}let N;function E(t){N=t}function H(){if(!N)throw new Error("Function called outside component initialization");return N}function Zt(t){H().$$.on_mount.push(t)}function te(t){H().$$.after_update.push(t)}function ee(){const t=H();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const u=et(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,u)}),!u.defaultPrevented}return!0}}function ne(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const v=[],J=[],C=[],K=[],nt=Promise.resolve();let R=!1;function it(){R||(R=!0,nt.then(rt))}function ie(){return it(),nt}function P(t){C.push(t)}const z=new Set;let A=0;function rt(){const t=N;do{for(;A<v.length;){const e=v[A];A++,E(e),Ct(e.$$)}for(E(null),v.length=0,A=0;J.length;)J.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];z.has(n)||(z.add(n),n())}C.length=0}while(v.length);for(;K.length;)K.pop()();R=!1,z.clear(),E(t)}function Ct(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}let w;function St(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function B(t,e,n){t.dispatchEvent(et(`${e?"intro":"outro"}${n}`))}const S=new Set;let p;function re(){p={r:0,c:[],p}}function se(){p.r||$(p.c),p=p.p}function jt(t,e){t&&t.i&&(S.delete(t),t.i(e))}function ce(t,e,n,i){if(t&&t.o){if(S.has(t))return;S.add(t),p.c.push(()=>{S.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Mt={duration:0};function le(t,e,n,i){const r={direction:"both"};let u=e(t,n,r),s=i?0:1,c=null,l=null,o=null;function d(){o&&kt(t,o)}function a(f,_){const m=f.b-s;return _*=Math.abs(m),{a:s,b:f.b,d:m,duration:_,start:f.start,end:f.start+_,group:f.group}}function h(f){const{delay:_=0,duration:m=300,easing:y=ct,tick:g=x,css:O}=u||Mt,L={start:at()+_,b:f};f||(L.group=p,p.r+=1),c||l?l=L:(O&&(d(),o=G(t,s,f,m,_,y,O)),f&&g(0,1),c=a(L,m),P(()=>B(t,f,"start")),ft(k=>{if(l&&k>l.start&&(c=a(l,m),l=null,B(t,c.b,"start"),O&&(d(),o=G(t,s,c.b,c.duration,0,y,u.css))),c){if(k>=c.end)g(s=c.b,1-s),B(t,c.b,"end"),l||(c.b?d():--c.group.r||$(c.group.c)),c=null;else if(k>=c.start){const st=k-c.start;s=c.a+c.d*y(st/c.duration),g(s,1-s)}}return!!(c||l)}))}return{run(f){T(u)?St().then(()=>{u=u(r),h(f)}):h(f)},end(){d(),c=l=null}}}function oe(t){t&&t.c()}function ue(t,e){t&&t.l(e)}function Pt(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||P(()=>{const s=t.$$.on_mount.map(W).filter(T);t.$$.on_destroy?t.$$.on_destroy.push(...s):$(s),t.$$.on_mount=[]}),u.forEach(P)}function Dt(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ot(t,e){t.$$.dirty[0]===-1&&(v.push(t),it(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ae(t,e,n,i,r,u,s,c=[-1]){const l=N;E(t);const o=t.$$={fragment:null,ctx:[],props:u,update:x,not_equal:r,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:I(),dirty:c,skip_bound:!1,root:e.target||l.$$.root};s&&s(o.root);let d=!1;if(o.ctx=n?n(t,e.props||{},(a,h,...f)=>{const _=f.length?f[0]:h;return o.ctx&&r(o.ctx[a],o.ctx[a]=_)&&(!o.skip_bound&&o.bound[a]&&o.bound[a](_),d&&Ot(t,a)),h}):[],o.update(),d=!0,$(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){dt();const a=xt(e.target);o.fragment&&o.fragment.l(a),a.forEach(Y)}else o.fragment&&o.fragment.c();e.intro&&jt(t.$$.fragment),Pt(t,e.target,e.anchor,e.customElement),_t(),rt()}E(l)}class fe{$destroy(){Dt(this,1),this.$destroy=x}$on(e,n){if(!T(n))return x;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!ot(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ie as A,x as B,Bt as C,bt as D,Tt as E,qt as F,Rt as G,zt as H,ct as I,Xt as J,Jt as K,Ht as L,P as M,le as N,ne as O,ee as P,fe as S,It as a,Ft as b,Qt as c,se as d,Gt as e,jt as f,re as g,Y as h,ae as i,te as j,Z as k,Wt as l,xt as m,Kt as n,Zt as o,Vt as p,F as q,vt as r,Lt as s,ce as t,Ut as u,Yt as v,oe as w,ue as x,Pt as y,Dt as z};
