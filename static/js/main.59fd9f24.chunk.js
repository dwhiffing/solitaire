(this.webpackJsonpsolitaire=this.webpackJsonpsolitaire||[]).push([[0],{174:function(e,t,n){},176:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),c=n(54),a=n.n(c),u=n(4),o=n(3),l=n(59),s=n(55),d=n.n(s),f=n(56),m=n.n(f),p=n(7),v=n.n(p),x=n(57),h=n.n(x),b="987654321".split("").map((function(e){return[{value:Number(e),suit:0},{value:Number(e),suit:1},{value:Number(e),suit:2},{value:Number(e),suit:3}]})).flat(),I=("987654321".split("").map((function(e){return{value:Number(e),suit:0}})).concat("987654321".split("").map((function(e){return{value:Number(e),suit:1}}))),function(){return m()(d()(b),6).map((function(e,t){return e.map((function(e,n){return Object(u.a)({},e,{cardPileIndex:n,pileIndex:t})}))})).flat().map((function(e,t){return Object(u.a)({},e,{index:t})}))}),j=function(e){return e.filter((function(t,n){return!e[n+1]||t===e[n+1]+1})).length===e.length},E=function(e,t,n){var i=y(t,e);if(t.isFinished||!n||n.isFinished)return e;var r=i.length-t.cardPileIndex,c=1===r&&!t.isCheat&&!n.isCheat,a=t.value!==n.value-1&&!n.isEmpty,o=i.slice(t.cardPileIndex,t.cardPileIndex+r),s=n.isEmpty||!n.isCheat&&j([n.value].concat(Object(l.a)(o.map((function(e){return e.value})))));return e.map((function(e){if(e.pileIndex!==t.pileIndex||t.pileIndex===n.pileIndex)return e;if(!o.map((function(e){return e.index})).includes(e.index))return e;if((s||c)&&!Number.isNaN(n.pileIndex)){var i=n.cardPileIndex+o.findIndex((function(t){return t.index===e.index}))+1;return Object(u.a)({},e,{pileIndex:n.pileIndex,cardPileIndex:i,isCheat:a})}return e}))};function O(e,t){var n=!1;return e&&(n=e.pileIndex===t.pileIndex&&e.cardPileIndex<=t.cardPileIndex),n}var y=function(e,t){return t.filter((function(t){return t.pileIndex===e.pileIndex})).sort((function(e,t){return e.cardPileIndex-t.cardPileIndex}))},g=function(e,t){if(!e)return null;if(e.isEmpty)return e;var n=y(e,t);return e=n[n.length-1],N(e,t)},w=function(e,t){var n=y(e,t),i=n.map((function(e){return e.value})).slice(e.cardPileIndex,n.length);return j(i)},P=function(e,t){Object(i.useEffect)((function(){return window.addEventListener(e,t),function(){return window.removeEventListener(e,t)}}),[e,t])},S=function(e,t,n){var i,r=document.elementFromPoint(e,t);if(r&&r.parentElement){var c=r.parentElement.dataset.index;if(c)i=n[+c];else{var a={cardPileIndex:-1,pileIndex:+r.parentElement.dataset.pileindex,isEmpty:!0};if(0===y(a,n).length)return Object(u.a)({},a,{},R(a))}}return N(i,n)},N=function(e,t){return e?Object(u.a)({},e,{},R(e,y(e,t).length),{canMove:w(e,t),isActive:O(e,t)}):null},Y=function(){var e,t,n=Object(i.useRef)(Date.now()),r=Object(i.useRef)(),c=Object(i.useState)({startTime:Date.now(),timeGone:0,difference:0}),a=Object(o.a)(c,2),l=a[0],s=a[1],d=function(){s((function(e){return Object(u.a)({},e,{timeGone:e.timeGone+(Date.now()-n.current)})})),r.current=setInterval((function(){s((function(e){return Object(u.a)({},e,{difference:Date.now()-e.startTime-e.timeGone})}))}),100)},f=function(){n.current=Date.now(),clearInterval(r.current)};return Object(i.useEffect)((function(){return d(),f}),[]),e="visibilitychange",t=function(){return document.hidden?f():d()},Object(i.useEffect)((function(){return document.addEventListener(e,t),function(){return document.removeEventListener(e,t)}}),[e,t]),{minutes:Math.floor(l.difference/1e3/60%60),seconds:Math.floor(l.difference/1e3%60),reset:function(){n.current=Date.now(),s({startTime:Date.now(),timeGone:0,difference:0})}}},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=v()(document.documentElement.clientWidth,740),n=v()(document.documentElement.clientHeight,740),i=document.querySelector(".card"),r=i.clientWidth,c=i.clientHeight,a=(t-6*r)/7,u=r+a,o=n<500?v()(1.75*(e-9),0,10):0,l=n/15,s=t>400?40:20,d=v()(l-o,s),f=v()((n-(6.5*d+c))/2,40,1e3);return{width:u,height:d,yBuffer:f,xBuffer:a}},R=function(e,t){var n=M(t),i=n.width,r=n.height,c=n.yBuffer,a=n.xBuffer,u=(document.documentElement.clientWidth-(6*i-a))/2;return{x:e.pileIndex*i+u,y:e.isEmpty?c:c+(e.isFinished?0:e.cardPileIndex*r)}},X=n(8),k=["spades","clubs","hearts","diamonds"],A={stiffness:200,damping:20},B=function(e){var t=e.card,n=e.activeCard,i=e.pileSize,c=e.onRest,a=void 0===c?function(){}:c,u=e.mouseX,o=void 0===u?0:u,l=e.mouseY,s=void 0===l?0:l,d=e.isPressed,f=M(i),m=f.height,p=f.xBuffer,v=f.width,x=R(t,i),h=x.x,b=x.y,I=t.isActive&&d,j=I?m*Math.abs(n.cardPileIndex-t.cardPileIndex):0,E=I?o:Object(X.spring)(h,A),O=I?s+j:Object(X.spring)(b,A),y=Object(X.spring)(t.isCheat?22:0,A),g=Object(X.spring)(t.isActive?1.185:1,A),w=I?35+t.cardPileIndex:t.cardPileIndex;return r.a.createElement(X.Motion,{style:{x:E,y:O,r:y,s:g},onRest:a},(function(e){var n=e.x,i=e.y,c=e.r,a=e.s;return r.a.createElement(C,{card:t,width:v,xBuffer:p,style:{transform:"translate3d(".concat(n,"px, ").concat(i,"px, 0) rotate(").concat(c,"deg) scale(").concat(a,")"),zIndex:w}})}))},C=function(e){var t=e.card,n=e.width,i=e.xBuffer,c=e.style,a=void 0===c?{}:c,u=["card","rank".concat(t.value),t.isFinished&&"finished",t.canMove&&"can-move",t.isActive&&"disable-touch",t.isEmpty&&"empty",k[t.suit]];return r.a.createElement("div",{"data-index":t.index,"data-pileindex":t.pileIndex,className:u.join(" "),style:a},r.a.createElement("div",{className:"face"}),r.a.createElement("div",{className:"back"}),r.a.createElement("div",{className:"click",style:{position:"absolute",top:0,left:-i,height:"160%",width:n+i}}))},D=(n(174),n(58)),F=n.n(D);function G(e){var t=e.onReset,n=e.hasWon,c=Object(i.useRef)(!1),a=Y();return Object(i.useEffect)((function(){n&&!c.current&&(c.current=!0,setTimeout((function(){alert("You win! Your final time was ".concat(a.minutes," minutes, ").concat(a.seconds," seconds")),a.reset(),t(),c.current=!1}),1e3))}),[n,t,a]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{width:80}},r.a.createElement("span",null,"Solitaire")),r.a.createElement("div",{style:{width:80,textAlign:"center"}},r.a.createElement("span",null,"".concat(a.minutes.toString().padStart(2,"0")+":").concat(a.seconds.toString().padStart(2,"0")))),r.a.createElement("div",{style:{width:80,textAlign:"center"}},r.a.createElement("span",{onClick:function(){window.confirm("Start a new game?")&&(t(),a.reset())}},"+")))}var T={mouseY:0,mouseX:0};var W=function(){var e=Object(i.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(T),l=Object(o.a)(a,2),s=l[0],d=l[1],f=Object(i.useRef)({x:0,y:0}),m=Object(i.useRef)({x:0,y:0}),p=Object(i.useState)([]),v=Object(o.a)(p,2),x=v[0],b=v[1],j=Object(i.useState)(!1),N=Object(o.a)(j,2),Y=N[0],M=N[1],R=Object(i.useState)(I()),X=Object(o.a)(R,2),k=X[0],A=X[1],C=Object(i.useState)(!1),D=Object(o.a)(C,2),W=D[0],z=D[1];return Object(i.useEffect)((function(){var e=function(e){return Object.values(h()(e,(function(e){return e.pileIndex}))).map((function(e){return e.sort((function(e,t){return e.cardPileIndex-t.cardPileIndex}))})).map((function(e){return{pile:e.map((function(e){return e.value})).join(""),index:e[0].pileIndex}})).filter((function(e){return"987654321"===e.pile})).map((function(e){return e.index}))}(k);W||e.length===x.length||(e.length>=4&&z(!0),setTimeout((function(){return b(e)}),500))}),[k,x,W]),P("resize",F()(function(){var e=Object(i.useState)(0),t=Object(o.a)(e,2)[1];return function(){return t((function(e){return++e}))}}(),500)),P("pointerup",(function(e){var t=e.clientX,i=e.clientY,r=Math.abs(f.current.x-t),a=Math.abs(f.current.y-i),u=r>15||a>15;if(m.current={x:0,y:0},M(!1),n){var o=S(t,i,k);(o=g(o,k))&&A(E(k,n,o)),u&&c(null)}})),P("pointerdown",(function(e){var t=e.clientX,i=e.clientY,r=S(t,i,k);if(!r)return c(null);if(n){var a=g(r,k);A(E(k,n,a)),c(null)}else!r.isActive&&r.canMove&&c(r);var u=r.y,o=r.x;f.current={x:t,y:i},m.current={x:t-r.x,y:i-r.y},M(!0),d({mouseX:o,mouseY:u})})),P("pointermove",(function(e){var t=e.clientY,n=e.clientX,i=t-m.current.y,r=n-m.current.x;d({mouseY:i,mouseX:r})})),r.a.createElement("div",{className:"container"},r.a.createElement(G,{hasWon:W,onReset:function(){A(I()),z(!1)}}),[0,1,2,3,4,5].map((function(e){return r.a.createElement(B,{key:"pile-".concat(e),card:{cardPileIndex:-1,pileIndex:e,isEmpty:!0}})})),k.map((function(e,t){return r.a.createElement(B,{key:"card-".concat(t),card:Object(u.a)({},e,{isActive:O(n,e),canMove:w(e,k),isFinished:x.includes(e.pileIndex)}),pileSize:y(e,k).length,activeCard:n,isPressed:Y,mouseX:s.mouseX,mouseY:s.mouseY})})))};a.a.render(r.a.createElement(W,null),document.getElementById("root"))},60:function(e,t,n){e.exports=n(176)}},[[60,1,2]]]);
//# sourceMappingURL=main.59fd9f24.chunk.js.map