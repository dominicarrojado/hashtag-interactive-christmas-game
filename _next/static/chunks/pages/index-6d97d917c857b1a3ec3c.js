(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2637:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return H}});var r=n(7294),o=n(7759),a=n.n(o),c=n(2809);function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=n(4954),l=n.n(s),u=n(5893),m=["className","children"];function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){(0,c.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p=function(e){var t=e.className,n=e.children,r=i(e,m);return(0,u.jsx)("button",g(g({},r),{},{type:"button",className:"".concat(l().btn," ").concat(t||""),children:n}))};var h=function(e){var t=e.btnOnClick;return(0,u.jsx)("div",{className:a().gameStart,children:(0,u.jsx)(p,{onClick:t,children:"Start the game"})})};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function j(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e){return e.current}function y(e,t){return Math.floor(Math.random()*(t-e+1))+e}var x=n(3569),v=n.n(x),_=["className","active","children"];function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){(0,c.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var S=function(e){var t=e.className,n=e.active,r=(e.children,i(e,_));return(0,u.jsx)("button",O(O({},r),{},{type:"button",className:"".concat(v().tile," ").concat(n?v().active:""," ").concat(t||""),"data-active":n?"1":"0"}))},k=n(2624),N=n(371),B=n.n(N);var P=function(){var e=(0,r.useRef)(0),t=(0,r.useRef)(0),n=(0,r.useRef)([]),o=(0,r.useRef)(0),a=(0,r.useRef)(!1),c=(0,r.useState)(!1),i=c[0],s=c[1],l=(0,r.useState)("..."),m=l[0],f=l[1],g=(0,r.useState)(0),p=g[0],h=g[1],d=(0,r.useState)(-1),x=d[0],v=d[1],_=(0,r.useState)(!1),w=_[0],O=_[1],N=function e(n,r){t.current=window.setTimeout((function(){if(n===r.length)return o.current=0,s(!0),void f("Your turn...");v(r[n]),t.current=window.setTimeout((function(){v(-1),e(n+1,r)}),k.kB)}),k.kB)},P=function(){var e=y(0,8),t=b(n);t=[].concat(j(t),[e]),n.current=t,a.current=!1,s(!1),f("..."),N(0,t)},T=function(){n.current=[],v(-1),O(!1),h(0),function(){var t=3,n=function(){f("Game starting in ".concat(t,"..."))};n(),e.current=window.setInterval((function(){t-=1,n(),-1===t&&(clearInterval(e.current),P())}),k.fc)}(),window.scrollTo(0,document.body.scrollHeight)},M=function(e){if(!b(a)){var r=b(n),c=b(o);r[c]===e?(!function(){var e=y(0,k.JF-1);f(k.DR[e])}(),h((function(e){return e+10})),c===r.length-1?(a.current=!0,t.current=window.setTimeout(P,k.kB)):o.current=c+1):(v(r[c]),O(!0),s(!1),f("Wrong!"))}};return(0,r.useEffect)((function(){return T(),function(){window.clearInterval(b(e)),window.clearTimeout(b(t))}}),[]),(0,u.jsxs)("div",{className:B().gameMain,children:[(0,u.jsxs)("div",{className:B().gameStatus,children:[(0,u.jsx)("span",{"data-testid":"info",children:m}),w&&(0,u.jsxs)(u.Fragment,{children:[" ",(0,u.jsx)("button",{type:"button",className:B().gameRetry,onClick:T,children:"Play again?"})]})]}),(0,u.jsx)("div",{className:B().gameTiles,children:[[0,1,2],[3,4,5],[6,7,8]].map((function(e,t){return(0,u.jsx)("div",{className:B().gameRow,children:e.map((function(e){return(0,u.jsx)(S,{active:e===x,disabled:!i,className:2===e?B().tileSpecial:void 0,onClick:function(){return M(e)},"data-testid":"tile"},"tile-".concat(e))}))},"row-".concat(t))}))}),(0,u.jsxs)("div",{className:B().gameScore,children:[(0,u.jsx)("div",{children:"Score"}),(0,u.jsx)("div",{className:B().gameScoreValue,"data-testid":"score",children:p})]})]})},T=n(9602),M=n.n(T),E=n(5057),R=n.n(E);var D=function(){var e=(0,r.useState)(!1),t=e[0],n=e[1];return(0,u.jsx)("section",{className:"".concat(M().gameBlock," ").concat(R().block),children:t?(0,u.jsx)(P,{}):(0,u.jsx)(h,{btnOnClick:function(){window.setTimeout((function(){n(!0)}),k.aZ)}})})},A=n(6012),C=n.n(A);var I=function(){return(0,u.jsxs)("section",{className:"".concat(C().infoBlock," ").concat(R().block),children:[(0,u.jsx)("div",{children:(0,u.jsx)("a",{href:"/hashtag-interactive-website/",className:C().companyLogo,children:(0,u.jsx)("img",{src:"/images/logo-hashtag-interactive.png",alt:"Hashtag Interactive logo",width:"115",height:"31",draggable:!1})})}),(0,u.jsx)("h1",{className:C().infoBlockTitle,children:(0,u.jsx)("img",{src:"/images/logo-holly-jolly-memory-game.png",alt:"Holly Jolly Memory Game logo",width:"459",height:"145",className:"",draggable:!1})}),(0,u.jsxs)("p",{className:C().infoBlockText,children:["Made a lot of memories this year? ",(0,u.jsx)("br",{}),"Then this should be right up your alley! ",(0,u.jsx)("br",{}),"Follow the button that lights up and repeat the ",(0,u.jsx)("br",{}),"same sequence to move on to the next level. ",(0,u.jsx)("br",{}),"Of course, it gets more challenging with every round.",(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"Think you're up for it? Aim for the highest score!"]})]})},q=n(9008);var G=function(){return(0,u.jsxs)(q.default,{children:[(0,u.jsx)("meta",{charSet:"utf-8"}),(0,u.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1, maximum-scale=1"}),(0,u.jsx)("meta",{name:"theme-color",content:"#000000"}),(0,u.jsx)("meta",{name:"description",content:k.Pb}),(0,u.jsx)("meta",{name:"author",content:k.Z9}),(0,u.jsx)("link",{rel:"canonical",href:k.cG}),(0,u.jsx)("link",{rel:"icon",href:"".concat(k.c0,"/favicon.ico")}),(0,u.jsx)("link",{rel:"manifest",href:"".concat(k.cG,"manifest.json")}),(0,u.jsx)("meta",{property:"og:locale",content:"en_US"}),(0,u.jsx)("meta",{property:"og:type",content:"website"}),(0,u.jsx)("meta",{property:"og:title",content:k.fB}),(0,u.jsx)("meta",{property:"og:description",content:k.Pb}),(0,u.jsx)("meta",{property:"og:url",content:k.cG}),(0,u.jsx)("meta",{property:"og:site_name",content:k.fB}),(0,u.jsx)("meta",{property:"og:image",content:k.T5}),(0,u.jsx)("meta",{property:"og:image:secure_url",content:k.T5}),(0,u.jsx)("meta",{property:"og:image:width",content:"".concat(k.Y$)}),(0,u.jsx)("meta",{property:"og:image:height",content:"".concat(k.Mv)}),(0,u.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,u.jsx)("meta",{name:"twitter:description",content:k.Pb}),(0,u.jsx)("meta",{name:"twitter:title",content:k.fB}),(0,u.jsx)("meta",{name:"twitter:image",content:k.T5}),(0,u.jsx)("title",{children:k.fB})]})};var H=function(){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(G,{}),(0,u.jsx)(I,{}),(0,u.jsx)(D,{})]})}},6057:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2637)}])},4954:function(e){e.exports={btn:"button_btn__2_x4a"}},9602:function(e){e.exports={gameBlock:"gameBlock_gameBlock__yKM3K"}},371:function(e){e.exports={gameMain:"gameMain_gameMain__2stS5",gameStatus:"gameMain_gameStatus__SH9hR",gameRetry:"gameMain_gameRetry__33Ddn",gameTiles:"gameMain_gameTiles__SjxSh",gameRow:"gameMain_gameRow__2jjLq",tileSpecial:"gameMain_tileSpecial__1AOTS",gameScore:"gameMain_gameScore__1OKuJ",gameScoreValue:"gameMain_gameScoreValue__1qJ0I"}},7759:function(e){e.exports={gameStart:"gameStart_gameStart__2kbZl"}},6012:function(e){e.exports={infoBlock:"infoBlock_infoBlock__3u6E9",companyLogo:"infoBlock_companyLogo__YoomO",infoBlockTitle:"infoBlock_infoBlockTitle__3ki3C",infoBlockText:"infoBlock_infoBlockText__3HkQu"}},3569:function(e){e.exports={tile:"tile_tile__25cqp",active:"tile_active__3qDr2"}}},function(e){e.O(0,[774,888,179],(function(){return t=6057,e(e.s=t);var t}));var t=e.O();_N_E=t}]);