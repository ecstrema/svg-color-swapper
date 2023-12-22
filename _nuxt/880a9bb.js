(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{273:function(t,e,r){var content=r(286);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(67).default)("10b0d5c8",content,!0,{sourceMap:!1})},285:function(t,e,r){"use strict";r(273)},286:function(t,e,r){var o=r(66)((function(i){return i[1]}));o.push([t.i,"svg{height:100%;width:100%}",""]),o.locals={},t.exports=o},288:function(t,e,r){"use strict";r.r(e);r(52),r(274),r(47),r(27),r(16),r(29),r(276),r(194),r(46),r(39),r(28),r(26),r(35),r(50),r(51);var o=r(1),l=r(279),n=r.n(l);function c(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return d(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,n=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return n=t.done,t},e:function(t){c=!0,l=t},f:function(){try{n||null==r.return||r.return()}finally{if(c)throw l}}}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}var f=Object(o.b)({__name:"index",setup:function(t){var svg=Object(o.d)(null),e=Object(o.d)([]);function r(t,e){if(e(t),t.children.length>0)for(var o=0,l=Array.from(t.children);o<l.length;o++){r(l[o],e)}}function l(){if(svg.value){e.value=[];var t={};for(var o in r(svg.value,(function(e){var r=e.style.fill;""===r&&(r=e.getAttribute("fill")||"");if(r&&"none"!==r&&""!==r)try{var o=n()(r).hex().toUpperCase();t[o]?t[o].filled.push(e):t[o]={filled:[e],stroked:[],originalColor:o,newFillColor:o,newStrokeColor:o}}catch(t){console.log(r+" is not a valid color. It will be ignored. Note that gradients are not supported.")}var l=e.style.stroke;""===l&&(l=e.getAttribute("stroke")||"");if(l&&"none"!==l&&""!==l)try{var c=n()(l).hex().toUpperCase();t[c]?t[c].stroked.push(e):t[c]={filled:[],stroked:[e],originalColor:c,newFillColor:c,newStrokeColor:c}}catch(t){console.log(l+" is not a valid color. It will be ignored. Note that gradients are not supported.")}})),t)e.value.push(t[o])}}return Object(o.c)(l),{__sfc:!0,svg:svg,colorData:e,updateStroke:function(t){var e,r=c(t.stroked);try{for(r.s();!(e=r.n()).done;){e.value.style.stroke=t.newStrokeColor}}catch(t){r.e(t)}finally{r.f()}},updateFill:function(t){var e,r=c(t.filled);try{for(r.s();!(e=r.n()).done;){e.value.style.fill=t.newFillColor}}catch(t){r.e(t)}finally{r.f()}},recursively:r,updateColors:l,fileChanged:function(t){var e,r=null===(e=t.target.files)||void 0===e?void 0:e[0];if(r){var o=new FileReader;o.onload=function(t){svg.value&&(t.target&&"string"==typeof t.target.result?(svg.value.innerHTML=t.target.result,l()):alert("Something went wrong."))},o.onerror=function(){alert("Something went wrong.")},o.readAsText(r)}},download:function(){if(svg.value){var t=svg.value.outerHTML,e=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),r=URL.createObjectURL(e),o=document.createElement("a");o.href=r,o.download="recolored.svg",document.body.appendChild(o),o.click(),document.body.removeChild(o)}}}}}),v=(r(285),r(63)),component=Object(v.a)(f,(function(){var t=this,e=t._self._c,r=t._self._setupProxy;return e("div",{staticClass:"m-0 p-5 flex items-center flex-col h-[100vh]"},[e("h1",{staticClass:"text-2xl"},[t._v("SVG Color Swapper")]),t._v(" "),e("p",{staticClass:"text-gray-500 dark:text-gray-300"},[t._v("\n    A simple tool to change the color of SVGs\n  ")]),t._v(" "),e("div",{staticClass:"flex flex-grow justify-between gap-4"},[e("div",[e("input",{staticClass:"mt-5 w-full rounded-md bg-gray-100 dark:bg-blue-500 p-2 text-center",attrs:{type:"file",accept:"image/svg+xml"},on:{change:r.fileChanged}}),t._v(" "),e("div",{staticClass:"grid gap-1 mt-5 grid-flow-col place-items-center",style:{gridTemplateRows:"repeat("+(Object.keys(r.colorData).length+1)+", 1fr)"}},[e("div",{staticClass:"text-center text-bold text-lg"},[t._v("Original")]),t._v(" "),t._l(r.colorData,(function(t,r){return e("div",{key:r+"original",staticClass:"rounded-sm h-full w-full",style:{backgroundColor:t.originalColor||"transparent"}})})),t._v(" "),e("div",{staticClass:"text-center text-bold text-lg"},[t._v("New Stroke")]),t._v(" "),t._l(r.colorData,(function(o,l){return e("div",{key:l+"stroke"},[o.stroked.length>0?e("input",{directives:[{name:"model",rawName:"v-model",value:o.newStrokeColor,expression:"color.newStrokeColor"}],attrs:{type:"color"},domProps:{value:o.newStrokeColor},on:{input:[function(e){e.target.composing||t.$set(o,"newStrokeColor",e.target.value)},function(){return r.updateStroke(o)}]}}):t._e()])})),t._v(" "),e("div",{staticClass:"text-center text-bold text-lg"},[t._v("New Fill")]),t._v(" "),t._l(r.colorData,(function(o,l){return e("div",{key:l+"fill"},[o.filled.length>0?e("input",{directives:[{name:"model",rawName:"v-model",value:o.newFillColor,expression:"color.newFillColor"}],attrs:{type:"color"},domProps:{value:o.newFillColor},on:{input:[function(e){e.target.composing||t.$set(o,"newFillColor",e.target.value)},function(){return r.updateFill(o)}]}}):t._e()])}))],2),t._v(" "),e("button",{staticClass:"mt-5 py-2 w-full rounded-md bg-blue-500 text-center",on:{click:r.download}},[t._v("\n        Download\n      ")])]),t._v(" "),e("div",{ref:"svg",staticClass:"h-full grow"},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"-60 -60 120 120","stroke-width":"2"}},[e("g",{attrs:{fill:"none"}},[e("ellipse",{attrs:{stroke:"#66899a",rx:"6",ry:"44"}}),t._v(" "),e("ellipse",{attrs:{stroke:"#e1d85d",rx:"6",ry:"44",transform:"rotate(-66)"}}),t._v(" "),e("ellipse",{attrs:{stroke:"#80a3cf",rx:"6",ry:"44",transform:"rotate(66)"}}),t._v(" "),e("circle",{attrs:{stroke:"#4b541f",r:"44"}})]),t._v(" "),e("g",{attrs:{fill:"#66899a",stroke:"white"}},[e("circle",{attrs:{fill:"#80a3cf",r:"13"}}),t._v(" "),e("circle",{attrs:{cy:"-44",r:"9"}}),t._v(" "),e("circle",{attrs:{cx:"-40",cy:"18",r:"9"}}),t._v(" "),e("circle",{attrs:{cx:"40",cy:"18",r:"9"}})])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);