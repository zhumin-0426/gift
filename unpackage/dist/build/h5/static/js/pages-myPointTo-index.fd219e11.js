(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-myPointTo-index"],{3146:function(t,a,n){"use strict";n.r(a);var i=n("39d1"),o=n("d7c6");for(var e in o)"default"!==e&&function(t){n.d(a,t,(function(){return o[t]}))}(e);n("cf64");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"7a65770c",null,!1,i["a"],r);a["default"]=c.exports},"39d1":function(t,a,n){"use strict";var i;n.d(a,"b",(function(){return o})),n.d(a,"c",(function(){return e})),n.d(a,"a",(function(){return i}));var o=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"content"},[t.businessLogo!=[]?[n("v-uni-view",{staticClass:"focus-state-module"},[n("v-uni-view",{staticClass:"title"},[t._v("我关注的品牌")]),n("v-uni-view",{staticClass:"main"},[n("v-uni-view",{staticClass:"brand"},[t._l(t.businessLogo,(function(a,i){return[n("v-uni-view",{key:i+"_0",staticClass:"brand-logo-item"},[n("v-uni-view",{staticClass:"brand-logo"},[n("v-uni-image",{attrs:{src:t.imageUrl+a.supplierLogo,mode:"widthFix"}})],1)],1)]}))],2)],1)],1)]:[n("v-uni-view",[t._v("暂无关注！")])]],2)],1)},e=[]},"6ed0":function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={data:function(){return{imageUrl:"",businessLogo:[]}},onLoad:function(){this.myPointData(),this.$nextTick((function(){this.imageUrl=this.$url.imageUrl}))},methods:{myPointData:function(){var t=this;this.$http("/users/getUserFollow",{},"post").then((function(a){console.log("我的关注",a),200==a.statusCode&&(t.businessLogo=a.data.commoditySupplierByList)}))}}};a.default=i},"9c35":function(t,a,n){var i=n("f6a9");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("bc9c71bc",i,!0,{sourceMap:!1,shadowMode:!1})},cf64:function(t,a,n){"use strict";var i=n("9c35"),o=n.n(i);o.a},d7c6:function(t,a,n){"use strict";n.r(a);var i=n("6ed0"),o=n.n(i);for(var e in i)"default"!==e&&function(t){n.d(a,t,(function(){return i[t]}))}(e);a["default"]=o.a},f6a9:function(t,a,n){var i=n("24fb");a=i(!1),a.push([t.i,"uni-page-body[data-v-7a65770c]{background-color:#f6f6f6}.container .status_bar[data-v-7a65770c]{height:0;width:100%}.container .content[data-v-7a65770c]{box-sizing:border-box;width:100%;padding:%?38?% %?22?%}.container .content .focus-state-module[data-v-7a65770c]{box-sizing:border-box;width:100%;padding:%?22?%;background-color:#fff;border-radius:%?15?%}.container .content .focus-state-module .main[data-v-7a65770c]{width:100%}.container .content .focus-state-module .main .title[data-v-7a65770c]{font-size:%?28?%;font-weight:400;font-stretch:normal;line-height:%?40?%;letter-spacing:%?0?%;color:#000}.container .content .focus-state-module .main .brand[data-v-7a65770c]{box-sizing:border-box;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;position:relative;margin-top:%?33?%}.container .content .focus-state-module .main .brand .brand-logo-item[data-v-7a65770c]{width:20%;margin-bottom:%?27?%}.container .content .focus-state-module .main .brand .brand-logo-item .brand-logo[data-v-7a65770c]{width:%?100?%;height:%?100?%;border-radius:50%;overflow:hidden}.container .content .focus-state-module .main .brand .brand-logo-item .brand-logo uni-image[data-v-7a65770c]{display:block;width:100%;height:100%}body.?%PAGE?%[data-v-7a65770c]{background-color:#f6f6f6}",""]),t.exports=a}}]);