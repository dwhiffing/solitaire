(this.webpackJsonpsolitaire=this.webpackJsonpsolitaire||[]).push([[0],{172:function(e,t,n){},174:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),c=n(53),a=n.n(c),u=n(4),o=n(3),s=n(58),l=n(54),d=n.n(l),f=n(55),m=n.n(f),p=n(56),v=n.n(p),x="987654321".split("").map((function(e){return[{value:Number(e),suit:0},{value:Number(e),suit:1},{value:Number(e),suit:2},{value:Number(e),suit:3}]})).flat(),h=("987654321".split("").map((function(e){return{value:Number(e),suit:0}})).concat("987654321".split("").map((function(e){return{value:Number(e),suit:1}}))),function(){return m()(d()(x),6).map((function(e,t){return e.map((function(e,n){return Object(u.a)({},e,{cardPileIndex:n,pileIndex:t})}))})).flat().map((function(e,t){return Object(u.a)({},e,{index:t})}))}),b=function(e){return e.filter((function(t,n){return!e[n+1]||t===e[n+1]+1})).length===e.length},I=function(e,t,n){var i=E(t,e);if(t.isFinished||!n||n.isFinished)return e;var r=i.length-t.cardPileIndex,c=1===r&&!t.isCheat&&!n.isCheat,a=t.value!==n.value-1&&!n.isEmpty,o=i.slice(t.cardPileIndex,t.cardPileIndex+r),l=n.isEmpty||!n.isCheat&&b([n.value].concat(Object(s.a)(o.map((function(e){return e.value})))));return e.map((function(e){if(e.pileIndex!==t.pileIndex||t.pileIndex===n.pileIndex)return e;if(!o.map((function(e){return e.index})).includes(e.index))return e;if((l||c)&&!Number.isNaN(n.pileIndex)){var i=n.cardPileIndex+o.findIndex((function(t){return t.index===e.index}))+1;return Object(u.a)({},e,{pileIndex:n.pileIndex,cardPileIndex:i,isCheat:a})}return e}))};function j(e,t){var n=!1;return e&&(n=e.pileIndex===t.pileIndex&&e.cardPileIndex<=t.cardPileIndex),n}var E=function(e,t){return t.filter((function(t){return t.pileIndex===e.pileIndex})).sort((function(e,t){return e.cardPileIndex-t.cardPileIndex}))},O=function(e,t){if(!e)return null;if(e.isEmpty)return e;var n=E(e,t);return e=n[n.length-1],P(e,t)},y=function(e,t){var n=E(e,t),i=n.map((function(e){return e.value})).slice(e.cardPileIndex,n.length);return b(i)},w=function(e,t){Object(i.useEffect)((function(){return window.addEventListener(e,t),function(){return window.removeEventListener(e,t)}}),[e,t])},g=function(e,t,n){var i,r=document.elementFromPoint(e,t);if(r&&r.parentElement){var c=r.parentElement.dataset.index;if(c)i=n[+c];else{var a={cardPileIndex:-1,pileIndex:+r.parentElement.dataset.pileindex,isEmpty:!0};if(0===E(a,n).length)return Object(u.a)({},a,{},N(a))}}return P(i,n)},P=function(e,t){return e?Object(u.a)({},e,{},N(e),{canMove:y(e,t),isActive:j(e,t)}):null},M=function(){var e,t,n=Object(i.useRef)(Date.now()),r=Object(i.useRef)(),c=Object(i.useState)({startTime:Date.now(),timeGone:0,difference:0}),a=Object(o.a)(c,2),s=a[0],l=a[1],d=function(){l((function(e){return Object(u.a)({},e,{timeGone:e.timeGone+(Date.now()-n.current)})})),r.current=setInterval((function(){l((function(e){return Object(u.a)({},e,{difference:Date.now()-e.startTime-e.timeGone})}))}),100)},f=function(){n.current=Date.now(),clearInterval(r.current)};return Object(i.useEffect)((function(){return d(),f}),[]),e="visibilitychange",t=function(){return document.hidden?f():d()},Object(i.useEffect)((function(){return document.addEventListener(e,t),function(){return document.removeEventListener(e,t)}}),[e,t]),{minutes:Math.floor(s.difference/1e3/60%60),seconds:Math.floor(s.difference/1e3%60),reset:function(){n.current=Date.now(),l({startTime:Date.now(),timeGone:0,difference:0})}}},S=function(){var e=document.querySelector(".card"),t=Math.min(document.documentElement.clientWidth,740),n=e?e.clientWidth:t/6,i=(t-6*n)/7,r=n+i,c=Math.min(28,Math.max(window.innerHeight/16,25)),a=Math.min(200,Math.max(window.innerHeight/8,40));return document.documentElement.clientWidth>900&&(a=3*(c=Math.min(50,Math.max(window.innerHeight/16,25)))),{width:r,height:c,yBuffer:a,xBuffer:i}},N=function(e){var t=S(),n=t.width,i=t.height,r=t.yBuffer,c=t.xBuffer,a=(document.documentElement.clientWidth-6*n)/2-c/2;return{x:c+e.pileIndex*n+a,y:e.isEmpty?r:r+(e.isFinished?0:e.cardPileIndex*i)}},Y=n(7),R=["spades","clubs","hearts","diamonds"],X={stiffness:200,damping:20},k=function(e){var t=e.card,n=e.activeCard,i=e.onRest,c=void 0===i?function(){}:i,a=e.mouseX,u=void 0===a?0:a,o=e.mouseY,s=void 0===o?0:o,l=e.isPressed,d=S().height,f=N(t),m=f.x,p=f.y,v=t.isActive&&l,x=v?d*Math.abs(n.cardPileIndex-t.cardPileIndex):0,h=v?u:Object(Y.spring)(m,X),b=v?s+x:Object(Y.spring)(p,X),I=Object(Y.spring)(t.isCheat?22:0,X),j=Object(Y.spring)(t.isActive?1.185:1,X),E=v?35+t.cardPileIndex:t.cardPileIndex;return r.a.createElement(Y.Motion,{style:{x:h,y:b,r:I,s:j},onRest:c},(function(e){var n=e.x,i=e.y,c=e.r,a=e.s;return r.a.createElement(A,{card:t,style:{transform:"translate3d(".concat(n,"px, ").concat(i,"px, 0) rotate(").concat(c,"deg) scale(").concat(a,")"),zIndex:E}})}))},A=function(e){var t=e.card,n=e.style,i=void 0===n?{}:n,c=["card","rank".concat(t.value),t.isFinished&&"finished",t.canMove&&"can-move",t.isActive&&"disable-touch",t.isEmpty&&"empty",R[t.suit]];return r.a.createElement("div",{"data-index":t.index,"data-pileindex":t.pileIndex,className:c.join(" "),style:i},r.a.createElement("div",{className:"face"}),r.a.createElement("div",{className:"back"}),r.a.createElement("div",{className:"click",style:{position:"absolute",top:0,left:"-40%",height:"160%",width:"170%"}}))},C=(n(172),n(57)),D=n.n(C);function F(e){var t=e.onReset,n=e.hasWon,c=Object(i.useRef)(!1),a=M();return Object(i.useEffect)((function(){n&&!c.current&&(c.current=!0,setTimeout((function(){alert("You win! Your final time was ".concat(a.minutes," minutes, ").concat(a.seconds," seconds")),a.reset(),t(),c.current=!1}),1e3))}),[n,t,a]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{width:80}},r.a.createElement("span",null,"Solitaire")),r.a.createElement("div",{style:{width:80,textAlign:"center"}},r.a.createElement("span",null,"".concat(a.minutes.toString().padStart(2,"0")+":").concat(a.seconds.toString().padStart(2,"0")))),r.a.createElement("div",{style:{width:80,textAlign:"center"}},r.a.createElement("span",{onClick:function(){window.confirm("Start a new game?")&&(t(),a.reset())}},"+")))}var W={mouseY:0,mouseX:0};var B=function(){var e=Object(i.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(W),s=Object(o.a)(a,2),l=s[0],d=s[1],f=Object(i.useRef)({x:0,y:0}),m=Object(i.useRef)({x:0,y:0}),p=Object(i.useState)([]),x=Object(o.a)(p,2),b=x[0],E=x[1],P=Object(i.useState)(!1),M=Object(o.a)(P,2),S=M[0],N=M[1],Y=Object(i.useState)(h()),R=Object(o.a)(Y,2),X=R[0],A=R[1],C=Object(i.useState)(!1),B=Object(o.a)(C,2),G=B[0],T=B[1];return Object(i.useEffect)((function(){var e=function(e){return Object.values(v()(e,(function(e){return e.pileIndex}))).map((function(e){return e.sort((function(e,t){return e.cardPileIndex-t.cardPileIndex}))})).map((function(e){return{pile:e.map((function(e){return e.value})).join(""),index:e[0].pileIndex}})).filter((function(e){return"987654321"===e.pile})).map((function(e){return e.index}))}(X);G||e.length===b.length||(e.length>=4&&T(!0),setTimeout((function(){return E(e)}),500))}),[X,b,G]),w("resize",D()(function(){var e=Object(i.useState)(0),t=Object(o.a)(e,2)[1];return function(){return t((function(e){return++e}))}}(),500)),w("pointerup",(function(e){var t=e.clientX,i=e.clientY,r=Math.abs(f.current.x-t),a=Math.abs(f.current.y-i),u=r>15||a>15;if(m.current={x:0,y:0},N(!1),n){var o=g(t,i,X);(o=O(o,X))&&A(I(X,n,o)),u&&c(null)}})),w("pointerdown",(function(e){var t=e.clientX,i=e.clientY;N(!0);var r=g(t,i,X);if(!r)return c(null);if(n){var a=O(r,X);A(I(X,n,a)),c(null)}else!r.isActive&&r.canMove&&c(r);var u=r.y,o=r.x;f.current={x:t,y:i},m.current={x:t-r.x,y:i-r.y},d({mouseX:o,mouseY:u})})),w("pointermove",(function(e){var t=e.clientY,n=e.clientX,i=t-m.current.y,r=n-m.current.x;d({mouseY:i,mouseX:r})})),r.a.createElement("div",{className:"container"},r.a.createElement(F,{hasWon:G,onReset:function(){A(h()),T(!1)}}),[0,1,2,3,4,5].map((function(e){return r.a.createElement(k,{key:"pile-".concat(e),card:{cardPileIndex:-1,pileIndex:e,isEmpty:!0}})})),X.map((function(e,t){return r.a.createElement(k,{key:"card-".concat(t),card:Object(u.a)({},e,{isActive:j(n,e),canMove:y(e,X),isFinished:b.includes(e.pileIndex)}),activeCard:n,isPressed:S,mouseX:l.mouseX,mouseY:l.mouseY})})))};a.a.render(r.a.createElement(B,null),document.getElementById("root"))},59:function(e,t,n){e.exports=n(174)}},[[59,1,2]]]);
//# sourceMappingURL=main.9e90671b.chunk.js.map