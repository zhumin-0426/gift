<template>
	<view class="container">
		<view class="top">

		</view>
		<view class="main">
			<view class="out-integral" @click="openOutPopup">
				转出积分
			</view>
			<view class="get-integral" data-val="get" @click="openGetPopup">
				接收积分
			</view>
			<image src="@/static/images/integral/yellow.png" mode="widthFix"></image>
		</view>
		<!-- 接收积分 -->
		<view class="get-integral-popup" v-show="getPopupAct==1?true:false" @click="closeGetPopup">
			<view class="popup">
				<view class="title">接收积分二维码</view>
				<view class="code">
				    <image :src="src" mode=""></image>
				</view>
				<!-- <view class="bottom"><text>会员ID : 007</text><text>姓名 : OUYANG</text></view> -->
			</view>
		</view>
		<!-- 转出积分 -->
		<view class="out-integral-popup" v-show="outPopupAct==1?true:false">
			<view class="popup">
				<view class="title">转出积分</view>
				<view class="fon-28">剩余积分：<text>{{integral}}</text></view>
				<view class="fon-28">请输入转出的积分：</view>
				<input type="text" @input="onInput"/>
				<button type="default" class="confirm" data-val="send" @click="openGetPopup">确定</button>
				<view class="cancel" @click="closeOutPopup">取消</view>
			</view>
		</view>
		<!-- 二维码生成器 -->
		<tki-qrcode class="qrcode" v-if="ifShow" :showLoading="false" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				getPopupAct: 0,
				outPopupAct: 0,
				sendVal:"",
				integral:"",
				// 二维码
				ifShow: true,
				val: '', // 要生成的二维码值
				size: 180, // 二维码大小
				unit: 'px', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '../../static/images/index/logo.png', // 二维码图标
				iconsize: 60, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		onLoad(options) {
			this.integral = options.integral;
		},
		methods: {
			onInput:function(e){
				this.sendVal = e.detail.value;
			},
			// 转出积分
			openOutPopup: function() {
				this.outPopupAct = 1
			},
			closeOutPopup: function() {
				this.outPopupAct = 0
			},
			// 获取积分
			openGetPopup: function(e) {
				let stutusVal = e.target.dataset.val;
				let userid = uni.getStorageSync('wxUserInfo');
				if(stutusVal=="send"){
					console.log("send")
					this.outPopupAct = 0;
					this.getPopupAct = 1;
					this.val = "http://lipinhui.28888753.cn/IntegralShop/backstage/GetPay.jsp?get_userid="+userid.id+'&isPay=2'+'&payValue='+this.sendVal
					const that = this;
					setTimeout(function(){
						that.$refs.qrcode._makeCode();
					},0)
				}else{
					this.getPopupAct = 1;
					this.val = "http://lipinhui.28888753.cn/IntegralShop/backstage/Pay.jsp?get_userid="+userid.id+'&isPay=2'
					const that = this;
					setTimeout(function(){
						that.$refs.qrcode._makeCode();
					},0)
				}
			},
			closeGetPopup: function() {
				this.getPopupAct = 0
			},
			// 二维码
			qrR(res) {
				this.src = res
			}
		}
	}
</script>

<style lang="less">
	.container {
		.qrcode{
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.top {
			width: 100%;
			height: 22rpx;
			background-color: #d8b072;
		}

		.main {
			width: 100%;

			.out-integral {
				width: 596rpx;
				height: 283rpx;
				line-height: 283rpx;
				text-align: center;
				border-radius: 15rpx;
				font-size: 40rpx;
				color: #ffffff;
				margin: 0 auto;
				margin-top: 66rpx;
				margin-bottom: 47rpx;
				background-image: url('../../static/images/integral/out.png');
				background-size: 100%;
				background-repeat: no-repeat;
				background-position: 0 0;
			}

			.get-integral {
				width: 596rpx;
				height: 283rpx;
				line-height: 283rpx;
				text-align: center;
				border-radius: 15rpx;
				font-size: 40rpx;
				color: #ffffff;
				margin: 0 auto;
				margin-top: 66rpx;
				background-image: url('../../static/images/integral/get.png');
				background-size: 100%;
				background-repeat: no-repeat;
				background-position: 0 0;
			}

			image {
				display: block;
				width: 300rpx;
				margin: 0 auto;
			}
		}

		.out-integral-popup {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.5);

			.popup {
				width: 662rpx;
				height: 500rpx;
				background-color: #ffffff;
				border-radius: 15rpx;
				position: relative;
				top: 50%;
				left: 50%;
				margin-left: -331rpx;
				margin-top: -240rpx;
				overflow: hidden;

				.title {
					width: 100%;
					height: 84rpx;
					line-height: 84rpx;
					font-size: 32rpx;
					font-weight: normal;
					font-stretch: normal;
					letter-spacing: 0rpx;
					color: #1a1a1a;
					text-align: center;
					background-color: #f6f6f6;
					margin-bottom: 42rpx;
				}

				.fon-28 {
					box-sizing: border-box;
					width: 100%;
					padding: 0 33rpx;
					margin-bottom: 20rpx;
				}

				input {
					box-sizing: border-box;
					width: 596rpx;
					padding: 0 20rpx;
					height: 88rpx;
					background-color: #ffffff;
					border-radius: 15rpx;
					border: solid 2rpx #afafaf;
					margin: 0 auto;
				}

				.confirm {
					width: 300rpx;
					height: 66rpx;
					background-color: #0097de;
					border-radius: 15rpx;
					font-size: 32rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 66rpx;
					letter-spacing: 0rpx;
					color: #ffffff;
					margin: 23rpx auto;
				}

				.cancel {
					width: 100%;
					text-align: center;
					font-size: 28rpx;
					color: #afafaf;
				}
			}
		}

		.get-integral-popup {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;

			.popup {
				width: 596rpx;
				height: 596rpx;
				background-color: #ffffff;
				border-radius: 15rpx;
				position: relative;
				top: 50%;
				left: 50%;
				margin-left: -298rpx;
				margin-top: -298rpx;
				overflow: hidden;

				.title {
					width: 100%;
					height: 84rpx;
					line-height: 84rpx;
					font-size: 32rpx;
					font-weight: normal;
					font-stretch: normal;
					letter-spacing: 0rpx;
					color: #1a1a1a;
					text-align: center;
					background-color: #f6f6f6;
					margin-bottom: 42rpx;
				}

				.code {
					width: 360rpx;
					height: 361rpx;
					margin: 0 auto;
					overflow: hidden;
					position: relative;
					image{
						width: 100%;
						height: 100%;
					}
				}

				.bottom {
					width: 363rpx;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 24rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 40rpx;
					letter-spacing: 0rpx;
					color: #afafaf;
					margin-top: 40rpx;
				}
			}
		}
	}
</style>
