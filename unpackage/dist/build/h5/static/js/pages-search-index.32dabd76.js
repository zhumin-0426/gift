(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-index"],{1404:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"search-wrapper"},[a("v-uni-view",{staticClass:"top w100 bg-fff dis-flex al-items-center jf-bw box-sz bd-r-14"},[a("v-uni-view",{staticClass:"icon"},[a("v-uni-image",{staticClass:"w100",attrs:{src:i("d014"),mode:"widthFix"}})],1),a("v-uni-input",{staticClass:"ipt fon-28 col-333",attrs:{type:"text",placeholder:"请输入您要搜索的商品!"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"btn fon-30 col-fff bg-ff4 txt-center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.jumpGoodsList.apply(void 0,arguments)}}},[t._v("搜索")])],1),a("v-uni-view",{staticClass:"history"},[a("v-uni-view",{staticClass:"title dis-flex al-items-center jf-bw"},[a("v-uni-view",{staticClass:"fon-30 col-1a1"},[t._v("最近搜索")]),a("v-uni-image",{attrs:{src:i("6b9d"),mode:"widthFix"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.deleteHistory.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"history-wrapper dis-flex flx-w"},[t.recentSearch.length>0?[t._l(t.recentSearch,(function(e){return[a("v-uni-view",{staticClass:"item bd-r-60 mg-r-10 mg-b-16",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.historyJump(e)}}},[t._v(t._s(e))])]}))]:[a("v-uni-view",{staticClass:"w100 txt-center fon-30 col-aea"},[t._v("暂无搜索记录")])]],2)],1)],1)],1)},c=[]},2948:function(t,e,i){"use strict";i.r(e);var a=i("51a8"),n=i.n(a);for(var c in a)"default"!==c&&function(t){i.d(e,t,(function(){return a[t]}))}(c);e["default"]=n.a},"51a8":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{iptVal:"",recentSearch:[]}},onLoad:function(){},onShow:function(){this.getHistory()},methods:{onInput:function(t){this.iptVal=t.detail.value},getHistory:function(){var t=wx.getStorageSync("recentSearch");this.recentSearch=t,console.log(this.recentSearch)},jumpGoodsList:function(){var t=this;if(t.iptVal){var e=wx.getStorageSync("recentSearch")||[];e.unshift(t.iptVal),wx.setStorageSync("recentSearch",e),uni.navigateTo({url:"/pages/goodsList/index?id="+t.iptVal+"&pageName=search"})}},historyJump:function(t){uni.navigateTo({url:"/pages/goodsList/index?id="+t+"&pageName=search"})},deleteHistory:function(){uni.removeStorageSync("recentSearch"),this.getHistory()}}};e.default=a},"697c2":function(t,e,i){"use strict";i.r(e);var a=i("1404"),n=i("2948");for(var c in n)"default"!==c&&function(t){i.d(e,t,(function(){return n[t]}))}(c);i("b10f");var r,o=i("f0c5"),s=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"6147b7cc",null,!1,a["a"],r);e["default"]=s.exports},"6b9d":function(t,e,i){t.exports=i.p+"static/img/delete.f31f6436.png"},"79c7":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-6147b7cc]{background-color:#f6f6f6}.search-wrapper[data-v-6147b7cc]{padding:%?32?% %?22?%}.search-wrapper .top .icon[data-v-6147b7cc]{width:%?33?%;padding:%?10?%}.search-wrapper .top .ipt[data-v-6147b7cc]{width:80%}.search-wrapper .top .btn[data-v-6147b7cc]{width:%?140?%;height:%?66?%;line-height:%?66?%;border-radius:0 %?14?% %?14?% 0}.search-wrapper .history[data-v-6147b7cc]{margin-top:%?30?%}.search-wrapper .history .title[data-v-6147b7cc]{margin-bottom:%?30?%}.search-wrapper .history .title uni-image[data-v-6147b7cc]{width:%?28?%}.search-wrapper .history .item[data-v-6147b7cc]{padding:%?5?% %?30?%;background-color:#fff;border:solid %?1?% #dcdcdc}body.?%PAGE?%[data-v-6147b7cc]{background-color:#f6f6f6}",""]),t.exports=e},b10f:function(t,e,i){"use strict";var a=i("df59"),n=i.n(a);n.a},d014:function(t,e,i){t.exports=i.p+"static/img/search-icon.24912797.png"},df59:function(t,e,i){var a=i("79c7");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("d762981c",a,!0,{sourceMap:!1,shadowMode:!1})}}]);