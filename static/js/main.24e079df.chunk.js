(this.webpackJsonpsolitaire=this.webpackJsonpsolitaire||[]).push([[0],{172:function(e,n,t){},174:function(e,n,t){"use strict";t.r(n);var r=t(0),i=t.n(r),c=t(53),a=t.n(c),u=t(4),o=t(3),s=t(58),l=t(54),d=t.n(l),f=t(55),m=t.n(f),v=t(56),p=t.n(v),x="987654321".split("").map((function(e){return[{value:Number(e),suit:0},{value:Number(e),suit:1},{value:Number(e),suit:2},{value:Number(e),suit:3}]})).flat(),b=("987654321".split("").map((function(e){return{value:Number(e),suit:0}})).concat("987654321".split("").map((function(e){return{value:Number(e),suit:1}}))),function(){return m()(d()(x),6).map((function(e,n){return e.map((function(e,t){return Object(u.a)({},e,{cardPileIndex:t,pileIndex:n})}))})).flat().map((function(e,n){return Object(u.a)({},e,{index:n})}))}),h=function(e){return e.filter((function(n,t){return!e[t+1]||n===e[t+1]+1})).length===e.length},I=function(e,n,t){var r=E(n,e);if(n.isFinished||!t||t.isFinished)return e;var i=r.length-n.cardPileIndex,c=1===i&&!n.isCheat&&!t.isCheat,a=n.value!==t.value-1&&!t.isEmpty,o=r.slice(n.cardPileIndex,n.cardPileIndex+i),l=t.isEmpty||!t.isCheat&&h([t.value].concat(Object(s.a)(o.map((function(e){return e.value})))));return e.map((function(e){if(e.pileIndex!==n.pileIndex||n.pileIndex===t.pileIndex)return e;if(!o.map((function(e){return e.index})).includes(e.index))return e;if((l||c)&&!Number.isNaN(t.pileIndex)){var r=t.cardPileIndex+o.findIndex((function(n){return n.index===e.index}))+1;return Object(u.a)({},e,{pileIndex:t.pileIndex,cardPileIndex:r,isCheat:a})}return e}))};function j(e,n){var t=!1;return e&&(t=e.pileIndex===n.pileIndex&&e.cardPileIndex<=n.cardPileIndex),t}var E=function(e,n){return n.filter((function(n){return n.pileIndex===e.pileIndex})).sort((function(e,n){return e.cardPileIndex-n.cardPileIndex}))},O=function(e,n){if(!e)return null;if(e.isEmpty)return e;var t=E(e,n);return e=t[t.length-1],P(e,n)},y=function(e,n){var t=E(e,n),r=t.map((function(e){return e.value})).slice(e.cardPileIndex,t.length);return h(r)},g=function(e,n){Object(r.useEffect)((function(){return window.addEventListener(e,n),function(){return window.removeEventListener(e,n)}}),[e,n])},w=function(e,n,t){var r,i=document.elementFromPoint(e,n);if(i&&i.parentElement){var c=i.parentElement.dataset.index;if(c)r=t[+c];else{var a={cardPileIndex:-1,pileIndex:+i.parentElement.dataset.pileindex,isEmpty:!0};if(0===E(a,t).length)return Object(u.a)({},a,{},N(a))}}return P(r,t)},P=function(e,n){return e?Object(u.a)({},e,{},N(e),{canMove:y(e,n),isActive:j(e,n)}):null},S=function(){var e,n,t=Object(r.useRef)(Date.now()),i=Object(r.useRef)(),c=Object(r.useState)({startTime:Date.now(),timeGone:0,difference:0}),a=Object(o.a)(c,2),s=a[0],l=a[1],d=function(){l((function(e){return Object(u.a)({},e,{timeGone:e.timeGone+(Date.now()-t.current)})})),i.current=setInterval((function(){l((function(e){return Object(u.a)({},e,{difference:Date.now()-e.startTime-e.timeGone})}))}),100)},f=function(){t.current=Date.now(),clearInterval(i.current)};return Object(r.useEffect)((function(){return d(),f}),[]),e="visibilitychange",n=function(){return document.hidden?f():d()},Object(r.useEffect)((function(){return document.addEventListener(e,n),function(){return document.removeEventListener(e,n)}}),[e,n]),{minutes:Math.floor(s.difference/1e3/60%60),seconds:Math.floor(s.difference/1e3%60),reset:function(){t.current=Date.now(),l({startTime:Date.now(),timeGone:0,difference:0})}}},M=function(){var e=document.querySelector(".card"),n=e?e.clientWidth:document.documentElement.clientWidth/6,t=(document.documentElement.clientWidth-6*n)/7,r=n+t,i=Math.min(38,Math.max(window.innerHeight/16,25)),c=2*i;return document.documentElement.clientWidth>1e3&&(c=3*(i=Math.min(50,Math.max(window.innerHeight/16,25)))),{width:r,height:i,yBuffer:c,xBuffer:t}},N=function(e){var n=M(),t=n.width,r=n.height,i=n.yBuffer;return{x:n.xBuffer+e.pileIndex*t,y:e.isEmpty?i:i+(e.isFinished?0:e.cardPileIndex*r)}},Y=t(7),R=["spades","clubs","hearts","diamonds"],X={stiffness:200,damping:20},A=function(e){var n=e.card,t=e.activeCard,r=e.onRest,c=void 0===r?function(){}:r,a=e.mouseX,u=void 0===a?0:a,o=e.mouseY,s=void 0===o?0:o,l=e.isPressed,d=M().height,f=N(n),m=f.x,v=f.y,p=n.isActive&&l,x=p?d*Math.abs(t.cardPileIndex-n.cardPileIndex):0,b=p?u:Object(Y.spring)(m,X),h=p?s+x:Object(Y.spring)(v,X),I=Object(Y.spring)(n.isCheat?22:0,X),j=Object(Y.spring)(n.isActive?1.185:1,X),E=p?35+n.cardPileIndex:n.cardPileIndex;return i.a.createElement(Y.Motion,{style:{x:b,y:h,r:I,s:j},onRest:c},(function(e){var t=e.x,r=e.y,c=e.r,a=e.s;return i.a.createElement(C,{card:n,style:{transform:"translate3d(".concat(t,"px, ").concat(r,"px, 0) rotate(").concat(c,"deg) scale(").concat(a,")"),zIndex:E}})}))},C=function(e){var n=e.card,t=e.style,r=void 0===t?{}:t,c=["card","rank".concat(n.value),n.isFinished&&"finished",n.canMove&&"can-move",n.isActive&&"disable-touch",n.isEmpty&&"empty",R[n.suit]];return i.a.createElement("div",{"data-index":n.index,"data-pileindex":n.pileIndex,className:c.join(" "),style:r},i.a.createElement("div",{className:"face"}),i.a.createElement("div",{className:"back"}))},k=(t(172),t(57)),D=t.n(k);function F(e){var n=e.onReset,t=e.hasWon,c=Object(r.useRef)(!1),a=S();return Object(r.useEffect)((function(){t&&!c.current&&(c.current=!0,setTimeout((function(){alert("You win! Your final time was ".concat(a.minutes," minutes, ").concat(a.seconds," seconds")),a.reset(),n(),c.current=!1}),1e3))}),[t,n,a]),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{width:80}},i.a.createElement("span",null,"Solitaire")),i.a.createElement("div",{style:{width:80,textAlign:"center"}},i.a.createElement("span",null,"".concat(a.minutes.toString().padStart(2,"0")+":").concat(a.seconds.toString().padStart(2,"0")))),i.a.createElement("div",{style:{width:80,textAlign:"center"}},i.a.createElement("span",{onClick:function(){window.confirm("Start a new game?")&&(n(),a.reset())}},"+")))}var W={mouseY:0,mouseX:0};var B=function(){var e=Object(r.useState)(null),n=Object(o.a)(e,2),t=n[0],c=n[1],a=Object(r.useState)(W),s=Object(o.a)(a,2),l=s[0],d=s[1],f=Object(r.useRef)({x:0,y:0}),m=Object(r.useRef)({x:0,y:0}),v=Object(r.useState)([]),x=Object(o.a)(v,2),h=x[0],E=x[1],P=Object(r.useState)(!1),S=Object(o.a)(P,2),M=S[0],N=S[1],Y=Object(r.useState)(b()),R=Object(o.a)(Y,2),X=R[0],C=R[1],k=Object(r.useState)(!1),B=Object(o.a)(k,2),G=B[0],T=B[1];return Object(r.useEffect)((function(){var e=function(e){return Object.values(p()(e,(function(e){return e.pileIndex}))).map((function(e){return e.sort((function(e,n){return e.cardPileIndex-n.cardPileIndex}))})).map((function(e){return{pile:e.map((function(e){return e.value})).join(""),index:e[0].pileIndex}})).filter((function(e){return"987654321"===e.pile})).map((function(e){return e.index}))}(X);G||e.length===h.length||(e.length>=4&&T(!0),setTimeout((function(){return E(e)}),500))}),[X,h,G]),g("resize",D()(function(){var e=Object(r.useState)(0),n=Object(o.a)(e,2)[1];return function(){return n((function(e){return++e}))}}(),500)),g("pointerup",(function(e){var n=e.clientX,r=e.clientY,i=Math.abs(f.current.x-n),a=Math.abs(f.current.y-r),u=i>15||a>15;if(m.current={x:0,y:0},N(!1),t){var o=w(n,r,X);(o=O(o,X))&&C(I(X,t,o)),u&&c(null)}})),g("pointerdown",(function(e){var n=e.clientX,r=e.clientY;N(!0);var i=w(n,r,X);if(!i)return c(null);if(t){var a=O(i,X);C(I(X,t,a)),c(null)}else!i.isActive&&i.canMove&&c(i);var u=i.y,o=i.x;f.current={x:n,y:r},m.current={x:n-i.x,y:r-i.y},d({mouseX:o,mouseY:u})})),g("pointermove",(function(e){var n=e.clientY,t=e.clientX,r=n-m.current.y,i=t-m.current.x;d({mouseY:r,mouseX:i})})),i.a.createElement("div",{className:"container"},i.a.createElement(F,{hasWon:G,onReset:function(){C(b()),T(!1)}}),[0,1,2,3,4,5].map((function(e){return i.a.createElement(A,{key:"pile-".concat(e),card:{cardPileIndex:-1,pileIndex:e,isEmpty:!0}})})),X.map((function(e,n){return i.a.createElement(A,{key:"card-".concat(n),card:Object(u.a)({},e,{isActive:j(t,e),canMove:y(e,X),isFinished:h.includes(e.pileIndex)}),activeCard:t,isPressed:M,mouseX:l.mouseX,mouseY:l.mouseY})})))};a.a.render(i.a.createElement(B,null),document.getElementById("root"))},59:function(e,n,t){e.exports=t(174)}},[[59,1,2]]]);
//# sourceMappingURL=main.24e079df.chunk.js.map