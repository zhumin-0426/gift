(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-editor"],{"03d5":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-05a258bc]{background-color:#f6f6f6}.container .status_bar[data-v-05a258bc]{height:0;width:100%}.container .address-moudle[data-v-05a258bc]{box-sizing:border-box;width:100%;padding:%?33?%}.container .address-moudle .title[data-v-05a258bc]{width:100%;font-size:%?24?%;color:#999;margin-bottom:%?22?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.container .address-moudle .title .delete[data-v-05a258bc]{color:#d8b072}.container .address-moudle .warpper[data-v-05a258bc]{box-sizing:border-box;width:100%;padding:%?22?%;background-color:#fff;border-radius:%?15?%}.container .address-moudle .warpper .block[data-v-05a258bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#333;padding-bottom:%?22?%;border-bottom:solid %?1?% #f5f5f5;margin-bottom:%?22?%}.container .address-moudle .warpper .block uni-text[data-v-05a258bc]{font-size:%?30?%;margin-right:%?100?%}.container .address-moudle .warpper .block uni-input[data-v-05a258bc]{font-size:%?26?%}.container .address-moudle .warpper .scope[data-v-05a258bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.container .address-moudle .warpper .scope .scope-editor[data-v-05a258bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.container .address-moudle .warpper .scope .address-icon[data-v-05a258bc]{width:%?40?%;height:%?40?%;float:right}.container .address-moudle .warpper .scope .address-icon uni-image[data-v-05a258bc]{width:100%}.container .btn[data-v-05a258bc]{width:90%;line-height:%?80?%;text-align:center;border-radius:%?15?%;position:fixed;bottom:%?22?%;left:50%;margin-left:-45%;background-color:#d8b072;font-size:%?36?%;color:#fff}.container .btn[data-v-05a258bc]::after{border:none}body.?%PAGE?%[data-v-05a258bc]{background-color:#f6f6f6}",""]),e.exports=t},"0cb5":function(e,t,i){"use strict";i.r(t);var a=i("aef9"),n=i("3e46");for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("2f2c");var d,o=i("f0c5"),r=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"48dbc7a4",null,!1,a["a"],d);t["default"]=r.exports},"1c09":function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return a}));var a={simpleAddress:i("8f2a").default,uniPopup:i("6eee").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"container"},[a("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"status_bar"}),a("v-uni-view",{staticClass:"get-goods-user address-moudle"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-view",[e._v("收货人")]),a("v-uni-view",{staticClass:"delete",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.delAddress.apply(void 0,arguments)}}},[e._v("删除")])],1),a("v-uni-view",{staticClass:"warpper"},[a("v-uni-view",{staticClass:"name block"},[a("v-uni-text",[e._v("姓名")]),a("v-uni-input",{attrs:{type:"text",value:e.name,name:"name",placeholder:"请输入您的姓名"}})],1),a("v-uni-view",{staticClass:"phone block"},[a("v-uni-text",[e._v("电话")]),a("v-uni-input",{attrs:{type:"text",value:e.phone,name:"phone",placeholder:"请输入您的电话号码"}})],1)],1)],1),a("v-uni-view",{staticClass:"get-goods-address address-moudle"},[a("v-uni-view",{staticClass:"title"},[e._v("收获地址")]),a("v-uni-view",{staticClass:"warpper"},[a("v-uni-view",{staticClass:"scope block",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openAddres.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"scope-editor"},[a("v-uni-text",[e._v("地区信息")]),a("v-uni-input",{attrs:{type:"text",value:e.address,name:"address",disabled:"true",placeholder:"请选择省市区"}})],1),a("v-uni-view",{staticClass:"address-icon"},[a("v-uni-image",{attrs:{src:i("164d"),mode:"widthFix"}})],1)],1),a("v-uni-view",{staticClass:"detail-address block"},[a("v-uni-text",[e._v("详细地址")]),a("v-uni-input",{attrs:{type:"text",value:e.detailAddress,name:"detailAddress",placeholder:"请输入您的详细地址"}})],1),a("v-uni-view",{staticClass:"address-default block"},[a("v-uni-text",[e._v("默认地址")]),a("v-uni-switch",{attrs:{checked:e.checked,name:"defaultAddress"}})],1)],1)],1),a("v-uni-button",{staticClass:"btn",attrs:{"form-type":"submit"}},[e._v("保存并使用")]),a("simple-address",{ref:"simpleAddress",attrs:{pickerValueDefault:e.cityPickerValueDefault,themeColor:"#007AFF"},on:{onConfirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)}}})],1),a("uni-popup",{ref:"popup",attrs:{type:"dialog"}},[a("uni-popup-dialog",{attrs:{type:"input",title:"提示",content:"确定删除该地址吗？",duration:2e3,"before-close":!0},on:{close:function(t){arguments[0]=t=e.$handleEvent(t),e.close.apply(void 0,arguments)},confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.confirm.apply(void 0,arguments)}}})],1)],1)},s=[]},"2f2c":function(e,t,i){"use strict";var a=i("93c5"),n=i.n(a);n.a},"2f80":function(e,t,i){"use strict";var a=i("4ea4");i("ac1f"),i("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("8f2a")),s=a(i("6eee")),d=a(i("0cb5")),o={components:{simpleAddress:n.default,uniPopup:s.default,uniPopupDialog:d.default},data:function(){return{cityPickerValueDefault:[0,0,1],pickerText:"",name:"",phone:"",detailAddress:"",checked:!1,address:"",addressMsg:{},addressId:""}},onLoad:function(e){this.addressId=e.id,this.addressBackPlay()},methods:{openAddres:function(){this.cityPickerValueDefault=[0,0,0],this.$refs.simpleAddress.open()},onConfirm:function(e){console.log(e),this.addressMsg=e,this.address=e.label},addressBackPlay:function(){var e=this;this.$http("/address/getUsersAddress",{id:e.addressId},"post").then((function(t){console.log("回显",t),e.cityPickerValueDefault=[t.data.usersAddressById.addressProviceCode,t.data.usersAddressById.addressCityCode,t.data.usersAddressById.addressAreaCode],e.address=t.data.usersAddressById.addressProvice+"-"+t.data.usersAddressById.addressCity+"-"+t.data.usersAddressById.addressArea,e.name=t.data.usersAddressById.addressUsername,e.phone=t.data.usersAddressById.addressPhone,e.detailAddress=t.data.usersAddressById.addressDetail,e.checked=1==t.data.usersAddressById.addressIsDefault}))},delAddress:function(){this.$refs.popup.open()},close:function(e){e()},confirm:function(e){var t=this;this.$http("/address/delUsersAddress",{id:t.addressId},"post").then((function(e){uni.navigateBack({delta:1})})),e()},formSubmit:function(e){var t=this,i=e.detail.value;if(console.log(i),""!=i.name)if(""!=i.phone)if(""!=i.address)if(""!=i.detailAddress){var a=uni.getStorageSync("wxUserInfo");this.$http("/address/saveUsersAddress",{id:t.addressId,belongUserId:a.id,addressDetail:i.detailAddress,addressPhone:i.phone,addressUsername:i.name,addressProvice:t.address.split("-")[0],addressCity:t.address.split("-")[1],addressArea:t.address.split("-")[2],addressProviceCode:t.addressMsg.provinceCode,addressCityCode:t.addressMsg.cityCode,addressAreaCode:t.addressMsg.areaCode,addressIsDefault:i.defaultAddress?"1":"2"},"post").then((function(e){uni.navigateBack({delta:1})}))}else uni.showModal({title:"提示",content:"请输入您的详细地址"});else uni.showModal({title:"提示",content:"请选择省,市,区！"});else uni.showModal({title:"提示",content:"请输入您的手机号！"});else uni.showModal({title:"提示",content:"请输入您的收货姓名！"})}}};t.default=o},"3e46":function(e,t,i){"use strict";i.r(t);var a=i("cc3b"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},"5e13":function(e,t,i){"use strict";i.r(t);var a=i("2f80"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},"6f05":function(e,t,i){var a=i("03d5");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("38e32f6f",a,!0,{sourceMap:!1,shadowMode:!1})},7731:function(e,t,i){"use strict";i.r(t);var a=i("1c09"),n=i("5e13");for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("b8c6");var d,o=i("f0c5"),r=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"05a258bc",null,!1,a["a"],d);t["default"]=r.exports},"93c5":function(e,t,i){var a=i("d641");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("5bc90227",a,!0,{sourceMap:!1,shadowMode:!1})},aef9:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"uni-popup-dialog"},[i("v-uni-view",{staticClass:"uni-dialog-title"},[i("v-uni-text",{staticClass:"uni-dialog-title-text",class:["uni-popup__"+e.dialogType]},[e._v(e._s(e.title))])],1),i("v-uni-view",{staticClass:"uni-dialog-content"},["base"===e.mode?i("v-uni-text",{staticClass:"uni-dialog-content-text"},[e._v(e._s(e.content))]):i("v-uni-input",{staticClass:"uni-dialog-input",attrs:{type:"text",placeholder:e.placeholder,focus:e.focus,placeholder:"请输入内容"},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}})],1),i("v-uni-view",{staticClass:"uni-dialog-button-group"},[i("v-uni-view",{staticClass:"uni-dialog-button",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.close.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"uni-dialog-button-text"},[e._v("取消")])],1),i("v-uni-view",{staticClass:"uni-dialog-button uni-border-left",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onOk.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"uni-dialog-button-text uni-button-color"},[e._v("确定")])],1)],1)],1)},s=[]},b8c6:function(e,t,i){"use strict";var a=i("6f05"),n=i.n(a);n.a},cc3b:function(e,t,i){"use strict";i("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"uniPopupDialog",props:{value:{type:[String,Number],default:""},placeholder:{type:[String,Number],default:"请输入内容"},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:"提示"},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1}},data:function(){return{dialogType:"error",focus:!1,val:""}},inject:["popup"],watch:{type:function(e){this.dialogType=e},mode:function(e){"input"===e&&(this.dialogType="info")},value:function(e){this.val=e}},created:function(){this.popup.mkclick=!1,"input"===this.mode?(this.dialogType="info",this.val=this.value):this.dialogType=this.type},mounted:function(){this.focus=!0},methods:{onOk:function(){var e=this;this.$emit("confirm",(function(){e.popup.close(),"input"===e.mode&&(e.val=e.value)}),"input"===this.mode?this.val:"")},close:function(){var e=this;this.beforeClose?this.$emit("close",(function(){e.popup.close()})):this.popup.close()}}};t.default=a},d641:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".uni-popup-dialog[data-v-48dbc7a4]{width:300px;border-radius:15px;background-color:#fff}.uni-dialog-title[data-v-48dbc7a4]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding-top:15px;padding-bottom:5px}.uni-dialog-title-text[data-v-48dbc7a4]{font-size:16px;font-weight:500}.uni-dialog-content[data-v-48dbc7a4]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:5px 15px 15px 15px}.uni-dialog-content-text[data-v-48dbc7a4]{font-size:14px;color:#6e6e6e}.uni-dialog-button-group[data-v-48dbc7a4]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;border-top-color:#f5f5f5;border-top-style:solid;border-top-width:1px}.uni-dialog-button[data-v-48dbc7a4]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:45px}.uni-border-left[data-v-48dbc7a4]{border-left-color:#f0f0f0;border-left-style:solid;border-left-width:1px}.uni-dialog-button-text[data-v-48dbc7a4]{font-size:14px}.uni-button-color[data-v-48dbc7a4]{color:#007aff}.uni-dialog-input[data-v-48dbc7a4]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:14px}.uni-popup__success[data-v-48dbc7a4]{color:#4cd964}.uni-popup__warn[data-v-48dbc7a4]{color:#f0ad4e}.uni-popup__error[data-v-48dbc7a4]{color:#dd524d}.uni-popup__info[data-v-48dbc7a4]{color:#909399}",""]),e.exports=t}}]);