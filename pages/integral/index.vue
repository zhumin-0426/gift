<template>
	<view class="container">
		<view class="top">

		</view>
		<view class="main">
			<view class="out-integral" @click="openOutPopup">
				转出积分
			</view>
			<view class="get-integral" @click="openGetPopup">
				接收积分
			</view>
			<image src="@/static/images/integral/yellow.png" mode="widthFix"></image>
		</view>
		<!-- 接收积分 -->
		<view class="get-integral-popup" v-show="getPopupAct==1?true:false" @click="closeGetPopup">
			<view class="popup">
				<view class="title">接收积分二维码</view>
				<view class="code"></view>
				<view class="bottom"><text>会员ID : 007</text><text>姓名 : OUYANG</text></view>
			</view>
		</view>
		<!-- 转出积分 -->
		<view class="out-integral-popup" v-show="outPopupAct==1?true:false">
			<view class="popup">
				<view class="title">转出积分</view>
				<view class="fon-28">剩余积分：<text>0</text></view>
				<view class="fon-28">请输入转出的积分：</view>
				<input type="text" value="" />
				<button type="default" class="confirm">确定</button>
				<view class="cancel" @click="closeOutPopup">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getPopupAct: 0,
				outPopupAct: 0
			}
		},
		methods: {
			// 转出积分
			openOutPopup: function() {
				this.outPopupAct = 1
			},
			closeOutPopup: function() {
				this.outPopupAct = 0
			},
			// 获取积分
			openGetPopup: function() {
				this.getPopupAct = 1
			},
			closeGetPopup: function() {
				this.getPopupAct = 0
			}
		}
	}
</script>

<style lang="less">
	.container {
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
				background-image:url('../../static/images/integral/out.png');
				background-size:100%;
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
				background-image:url('../../static/images/integral/get.png');
				background-size:100%;
				background-repeat: no-repeat;
				background-position: 0 0;
			}
		    image{
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
					background-color: #1a1a1a;
					margin: 0 auto;
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
