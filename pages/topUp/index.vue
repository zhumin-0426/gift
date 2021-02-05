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
					<navigator :url="'/pages/topUp/pay/pay?integral='+integral">
						<view class="btn-lk">
							在线充值 >
						</view>
					</navigator>
				</view>
				<!-- <view class="right">
					<view class="title">
						余额
					</view>
					<view class="integral">
						<text>85</text><text>¥</text>
					</view>
				</view> -->
			</view>
		</view>
		<view class="lk-list">
			<navigator url="/pages/integralTopUpHis/index">
				<view class="lk-item" v-for="(item,index) in lkList" :key="index">
					<view class="txt">
						{{item.txt}}
					</view>
					<view class="next">
						<image src="../../static/images/top-up/next.png" mode="widthFix"></image>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lkList: [{
					txt: "交易记录"
				}, ],
				integral: ""
			}
		},
		onShow() {
			this.initUserData();
		},
		methods: {
			initUserData: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				this.userid = userid.id;
				that.$http('/users/getUserCenter', {
					id: userid.id
				}, 'post').then(function(res) {
					if (res.data.status == "success") {
						that.integral = res.data.getuser.userScore;
					}
				})
			},
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

			.card {
				box-sizing: border-box;
				width: 100%;
				padding: 54rpx 44rpx;
				border-radius: 8rpx 55rpx 8rpx 8rpx;
				background-image: url(../../static/images/top-up/bag2.png);
				background-position: 0;
				background-repeat: no-repeat;
				background-size: 100%;
				box-shadow: 0rpx 9rpx 28.8rpx 3.2rpx rgba(31, 105, 252, 0.4);
				display: flex;

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
					margin-left: 100rpx;

					.title {
						font-size: 24rpx;
						color: #ccdbfc;
					}

					.integral {
						font-size: 75rpx;
						color: #fefefe;

						text:last-child {
							font-size: 29.17rpx;
							color: #fefefe;
							// margin-left: 10rpx;
						}
					}
				}
			}
		}

		.lk-list {
			box-sizing: border-box;

			.lk-item {
				box-sizing: border-box;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 33rpx;
				padding: 24rpx 42rpx;
				background-image: url(../../static/images/top-up/line.png);
				background-repeat: no-repeat;
				background-size: 10rpx 25rpx;
				background-position: 31rpx 34rpx;

				.txt {
					font-size: 29.17rpx;
					color: #2d2d2d;
					margin-left: 18rpx;
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

			.lk-item:first-child {
				margin-bottom: 20rpx;
				background-color: #f4f4f4;
				box-shadow: 0rpx 9rpx 19.1rpx 1.9rpx rgba(93, 93, 93, 0.2);
			}
		}
	}
</style>
