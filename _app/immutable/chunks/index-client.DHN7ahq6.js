import{a1 as D,a2 as re,a3 as ne,a4 as P,a5 as ae,F as w,a6 as N,a7 as h,j as y,A as C,a8 as te,a9 as ie,Q,o as V,aa as K,q as F,ab as M,w as S,D as W,E as J,ac as se,ad as fe,C as ue,W as U,x as X,ae as le,af as ce,g as T,P as de,ag as oe,ah as ve,ai as _e,aj as he,M as Y,ak as k,al as be,l as $,am as me,an as ee,ao as ye,ap as H,aq as Pe,ar as we,as as Ee,I as ge,e as O,d as Re}from"./runtime.8DRQmZkI.js";import{c as xe}from"./store.CWYOoqNF.js";function x(e,r=null,l){if(typeof e!="object"||e===null||D in e)return e;const d=ie(e);if(d!==re&&d!==ne)return e;var t=new Map,s=Q(e),v=P(0);s&&t.set("length",P(e.length));var o;return new Proxy(e,{defineProperty(f,n,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&ae();var i=t.get(n);return i===void 0?(i=P(a.value),t.set(n,i)):w(i,x(a.value,o)),!0},deleteProperty(f,n){var a=t.get(n);if(a===void 0)n in f&&t.set(n,P(h));else{if(s&&typeof n=="string"){var i=t.get("length"),u=Number(n);Number.isInteger(u)&&u<i.v&&w(i,u)}w(a,h),Z(v)}return!0},get(f,n,a){var b;if(n===D)return e;var i=t.get(n),u=n in f;if(i===void 0&&(!u||(b=N(f,n))!=null&&b.writable)&&(i=P(x(u?f[n]:h,o)),t.set(n,i)),i!==void 0){var c=y(i);return c===h?void 0:c}return Reflect.get(f,n,a)},getOwnPropertyDescriptor(f,n){var a=Reflect.getOwnPropertyDescriptor(f,n);if(a&&"value"in a){var i=t.get(n);i&&(a.value=y(i))}else if(a===void 0){var u=t.get(n),c=u==null?void 0:u.v;if(u!==void 0&&c!==h)return{enumerable:!0,configurable:!0,value:c,writable:!0}}return a},has(f,n){var c;if(n===D)return!0;var a=t.get(n),i=a!==void 0&&a.v!==h||Reflect.has(f,n);if(a!==void 0||C!==null&&(!i||(c=N(f,n))!=null&&c.writable)){a===void 0&&(a=P(i?x(f[n],o):h),t.set(n,a));var u=y(a);if(u===h)return!1}return i},set(f,n,a,i){var I;var u=t.get(n),c=n in f;if(s&&n==="length")for(var b=a;b<u.v;b+=1){var m=t.get(b+"");m!==void 0?w(m,h):b in f&&(m=P(h),t.set(b+"",m))}u===void 0?(!c||(I=N(f,n))!=null&&I.writable)&&(u=P(void 0),w(u,x(a,o)),t.set(n,u)):(c=u.v!==h,w(u,x(a,o)));var E=Reflect.getOwnPropertyDescriptor(f,n);if(E!=null&&E.set&&E.set.call(i,a),!c){if(s&&typeof n=="string"){var A=t.get("length"),g=Number(n);Number.isInteger(g)&&g>=A.v&&w(A,g+1)}Z(v)}return!0},ownKeys(f){y(v);var n=Reflect.ownKeys(f).filter(u=>{var c=t.get(u);return c===void 0||c.v!==h});for(var[a,i]of t)i.v!==h&&!(a in f)&&n.push(a);return n},setPrototypeOf(){te()}})}function Z(e,r=1){w(e,e.v+r)}function B(e){throw new Error("lifecycle_outside_component")}function Ne(e,r,l,d=null,t=!1){S&&W();var s=e,v=null,o=null,f=null,n=t?J:0;V(()=>{if(f===(f=!!r()))return;let a=!1;if(S){const i=s.data===se;f===i&&(s=fe(),ue(s),U(!1),a=!0)}f?(v?K(v):v=F(()=>l(s)),o&&M(o,()=>{o=null})):(o?K(o):d&&(o=F(()=>d(s))),v&&M(v,()=>{v=null})),a&&U(!0)},n),S&&(s=X)}function qe(e,r,l){S&&W();var d=e,t,s;V(()=>{t!==(t=r())&&(s&&(M(s),s=null),t&&(s=F(()=>l(d,t))))},J),S&&(d=X)}function z(e,r){return e===r||(e==null?void 0:e[D])===r}function Le(e={},r,l,d){return le(()=>{var t,s;return ce(()=>{t=s,s=[],T(()=>{e!==l(...s)&&(r(e,...s),t&&z(l(...t),e)&&r(null,...t))})}),()=>{de(()=>{s&&z(l(...s),e)&&r(null,...s)})}}),e}const Ie={get(e,r){if(!e.exclude.includes(r))return y(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,l){return r in e.special||(e.special[r]=pe({get[r](){return e.props[r]}},r,ee)),e.special[r](l),H(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),H(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function Ce(e,r){return new Proxy({props:e,exclude:r,special:{},version:P(0)},Ie)}function G(e){for(var r=C,l=C;r!==null&&!(r.f&(_e|he));)r=r.parent;try{return Y(r),e()}finally{Y(l)}}function pe(e,r,l,d){var j;var t=(l&Pe)!==0,s=!k||(l&be)!==0,v=(l&we)!==0,o=(l&Ee)!==0,f=!1,n;v?[n,f]=xe(()=>e[r]):n=e[r];var a=(j=N(e,r))==null?void 0:j.set,i=d,u=!0,c=!1,b=()=>(c=!0,u&&(u=!1,o?i=T(d):i=d),i);n===void 0&&d!==void 0&&(a&&s&&oe(),n=b(),a&&a(n));var m;if(s)m=()=>{var _=e[r];return _===void 0?b():(u=!0,c=!1,_)};else{var E=G(()=>(t?$:me)(()=>e[r]));E.f|=ve,m=()=>{var _=y(E);return _!==void 0&&(i=void 0),_===void 0?i:_}}if(!(l&ee))return m;if(a){var A=e.$$legacy;return function(_,R){return arguments.length>0?((!s||!R||A||f)&&a(R?m():_),_):m()}}var g=!1,I=!1,q=ge(n),p=G(()=>$(()=>{var _=m(),R=y(q);return g?(g=!1,I=!0,R):(I=!1,q.v=_)}));return t||(p.equals=ye),function(_,R){if(arguments.length>0){const L=R?y(p):s&&v?x(_):_;return p.equals(L)||(g=!0,w(q,L),c&&i!==void 0&&(i=L),T(()=>y(p))),_}return y(p)}}function Se(e){O===null&&B(),k&&O.l!==null?Te(O).m.push(e):Re(()=>{const r=T(e);if(typeof r=="function")return r})}function Fe(e){O===null&&B(),Se(()=>()=>T(e))}function Oe(e,r,{bubbles:l=!1,cancelable:d=!1}={}){return new CustomEvent(e,{detail:r,bubbles:l,cancelable:d})}function Me(){const e=O;return e===null&&B(),(r,l,d)=>{var s;const t=(s=e.s.$$events)==null?void 0:s[r];if(t){const v=Q(t)?t.slice():[t],o=Oe(r,l,d);for(const f of v)f.call(e.x,o);return!o.defaultPrevented}return!0}}function Te(e){var r=e.l;return r.u??(r.u={a:[],b:[],m:[]})}export{x as a,Le as b,qe as c,Me as d,Fe as e,Ne as i,Ce as l,Se as o,pe as p};