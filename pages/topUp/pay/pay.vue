<template>
	<view class="container">
		<view class="herder">
			<view class="card">
				<view class="left">
					<view class="title">
						可用积分
					</view>
					<view class="integral">
						{{integral}}
					</view>
				</view>
				<!-- <view class="right">
					<view class="prompt-item">
						可用充值币：¥20
					</view>
					<view class="prompt-item" style="margin: 20rpx 0;">
						可用充值币：¥20
					</view>
					<view class="prompt-item">
						可用充值币：¥20
					</view>
				</view> -->
			</view>
			<view class="pay-money-list">
				<view :data-id="index" :class="currentVal==index?'active': 'pay-money-item'" v-for="(item,index) in moneyList" :key="index"
				 @click="tabChange">
					{{item.txt}}元
				</view>
			</view>
		</view>
		<view class="content">
			<view class="pay-way">
				<view :class="payType==index?'active':'pay-way-item'" v-for="(item,index) in lkList" :key="index">
					<view class="cover" :data-id="index" @click="payTypeChange"></view>
					<view class="icon">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="txt">
						{{item.txt}}
					</view>
					<view class="next">

					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn" @click="payMoney">
				立即充值
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneyList: [{
						txt: "30"
					},
					{
						txt: "50"
					},
					{
						txt: "100"
					},
					{
						txt: "300"
					},
					{
						txt: "500"
					},
					{
						txt: "1000"
					}
				],
				lkList: [{
						txt: "微信支付",
						icon: '../../../static/images/top-up/wx.png'
					},
					// {
					// 	txt: "支付宝",
					// 	icon: '../../../static/images/top-up/zfb.png'
					// }
				],
				currentVal: 0,
				price: "1.0",
				payType: 0,
				integral:""
			}
		},
		onLoad(options) {
			this.integral = options.integral;
		},
		methods: {
			tabChange: function(e) {
				let id = e.target.dataset.id;
				this.currentVal = id;
				this.price = this.moneyList[id].txt
			},
			payMoney: function() {
				const that = this;
				if (that.payType == 0) {
					// 微信支付 单位为分
					let userid = uni.getStorageSync('wxUserInfo');
					that.$http('/order/jspaymoney', {
						userid: userid.id,
						money: Number(that.price)*100
					}, 'post').then(function(res) {
						console.log("res", res);
						if (res.statusCode == 200) {
							WeixinJSBridge.invoke(
								'getBrandWCPayRequest', {
									"appId": res.data.appId, //公众号名称，由商户传入     
									"timeStamp": res.data.timeStamp, //时间戳，自1970年以来的秒数     
									"nonceStr": res.data.nonceStr, //随机串     
									"package": res.data.package,
									"signType": res.data.signType, //微信签名方式：     
									"paySign": res.data.paySign //微信签名 
								},
								function(res) {
									console.log("微信支付", res);
									if (res.err_msg == "get_brand_wcpay_request:ok") {
										// 使用以上方式判断前端返回,微信团队郑重提示：
										//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
									    uni.navigateBack({
									    	delta:1
									    })
									}
								});
							if (typeof WeixinJSBridge == "undefined") {
								if (document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								} else if (document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
									document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							} else {
								onBridgeReady();
							}
						}
					})
				} else {
					// 支付宝支付
					window.location.href = "http://lipinhui.28888753.cn/before/order/apiPayment?userid="+'4'+'&money='+that.price;
				}
			},
			payTypeChange: function(e) {
				console.log("e", e);
				let id = e.target.dataset.id;
				this.payType = id;
			}
		}
	}
</script>

<style lang="less">
	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.herder {
			padding: 62rpx 40rpx;
			padding-bottom: 22rpx;

			.card {
				box-sizing: border-box;
				width: 100%;
				padding: 56rpx 44rpx;
				border-radius: 8rpx 55rpx 8rpx 8rpx;
				background-image: url(../../../static/images/top-up/bag1.png);
				background-position: 0;
				background-repeat: no-repeat;
				background-size: 100%;
				box-shadow: 0rpx 9rpx 28.8rpx 3.2rpx rgba(31, 105, 252, 0.4);
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					color: #fff;

					.title {
						font-size: 24rpx;
						color: #ccdbfc;
					}

					.integral {
						font-size: 75rpx;
						color: #fefefe;
					}

					.btn-lk {
						width: 240rpx;
						height: 54rpx;
						background-color: #ffffff;
						border-radius: 12rpx;
						font-size: 28.03rpx;
						color: #5383f4;
						text-align: center;
						line-height: 54rpx;
					}
				}

				.right {
					.prompt-item {
						font-size: 24rpx;
						color: #ccdbfc;
						opacity: 0.8;
					}
				}
			}

			.pay-money-list {
				width: 100%;
				margin-top: 40rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.pay-money-item {
					width: 209rpx;
					height: 114rpx;
					background-color: #ffffff;
					border-radius: 3rpx;
					border: solid 2rpx #eeeeee;
					text-align: center;
					line-height: 114rpx;
					font-size: 35.42rpx;
					color: #1d1d1d;
					margin-bottom: 30rpx;
				}

				.active {
					width: 209rpx;
					height: 114rpx;
					background-color: #e7eefe;
					border-radius: 3rpx;
					border: solid 2rpx #3266c1;
					font-size: 35.42rpx;
					color: #3266c1;
					text-align: center;
					line-height: 114rpx;
				}
			}
		}

		.content {
			width: 100%;

			.pay-way {
				box-sizing: border-box;

				.pay-way-item {
					box-sizing: border-box;
					width: 100%;
					display: flex;
					align-items: center;
					padding: 0 33rpx;
					padding: 24rpx 42rpx;
					background-repeat: no-repeat;
					background-size: 44rpx 44rpx;
					background-position: 31rpx 24rpx;
					background-repeat: no-repeat;
					position: relative;
                    .icon{
						width: 44rpx;
						height: 44rpx;
						image{
							width: 100%;
							height: 100%!important;
						}
					}
					.cover {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
					}

					.txt {
						font-size: 29.17rpx;
						color: #5a5a5a;
						margin-left: 46rpx;
					}

					.next {

						width: 10rpx;
						height: 18rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}

				.active {
					box-sizing: border-box;
					width: 100%;
					display: flex;
					align-items: center;
					padding: 0 33rpx;
					padding: 24rpx 42rpx;
					background-repeat: no-repeat;
					background-size: 44rpx 44rpx;
					background-position: 31rpx 24rpx;
					background-repeat: no-repeat;
					background-color: #f1f1f1;
					box-shadow: 0rpx 9rpx 19.1rpx 1.9rpx rgba(93, 93, 93, 0.2);
					position: relative;
.icon{
						width: 44rpx;
						height: 44rpx;
						image{
							width: 100%;
							height: 100%!important;
						}
					}
					.cover {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
					}

					.txt {
						font-size: 29.17rpx;
						color: #5a5a5a;
						margin-left: 46rpx;
					}

					.next {

						width: 10rpx;
						height: 18rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.footer {
			width: 100%;
			margin-top: 100rpx;

			.btn {
				width: 670rpx;
				height: 70rpx;
				margin: 0 auto;
				background-image: linear-gradient(45deg,
					rgba(38, 114, 251, 0.87) 0%,
					rgba(4, 78, 253, 0.87) 100%),
					linear-gradient(#2672fb,
					#2672fb);
				background-blend-mode: normal,
					normal;
				border-radius: 5rpx;
				font-size: 29.17rpx;
				color: #ffffff;
				text-align: center;
				line-height: 70rpx;
			}
		}
	}
</style>
