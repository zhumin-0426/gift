<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="top">
				<view class="title">
					个人中心
				</view>
				<view class="vip-ID">
					会员ID：007
				</view>
			</view>
			<view class="middle">
				<view class="user-pic">
					<image src="../../static/images/user/user-pic.jpeg" mode="widthFix"></image>
					<view class="vip-icon">
						v2
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="user-name">
					慕容嘎嘎
				</view>
				<view class="user-set">
					<image src="../../static/images/user/set-icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 活动模块 -->
			<view class="activity-module">
				<view class="left">
					<view class="integral">
						<view class="integral-icon">
							<image src="../../static/images/user/integral-icon.png" mode="widthFix"></image>
						</view>
						<text>积分</text>
						<text>23368</text>
					</view>
					<view class="coupon">
						<view class="num">
							0
						</view>
						<view class="txt">
							优惠卷
						</view>
					</view>
				</view>
				<view class="right">
					<view class="top-up-icon">
						<image src="/static/images/user/top-up.png" mode="widthFix"></image>
					</view>
					<view class="txt">
						积分充值
					</view>
				</view>
			</view>
			<!-- 订单状态模块 -->
			<view class="order-module">
				<view class="top">
					<view class="title">
						我的订单
					</view>
					<view class="all-order">
						全部订单
					</view>
				</view>
				<view class="order-state">
					<view class="order-state-item">
						<view class="state-item-icon">
							<image src="/static/images/user/order-item-icon1.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待兑换
						</view>
					</view>
					<view class="order-state-item">
						<view class="state-item-icon">
							<image src="/static/images/user/order-item-icon2.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待发货
						</view>
					</view>
					<view class="order-state-item">
						<view class="state-item-icon">
							<image src="/static/images/user/order-item-icon3.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待收货
						</view>
					</view>
					<view class="order-state-item">
						<view class="state-item-icon">
							<image src="/static/images/user/order-item-icon4.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待评价
						</view>
					</view>
					<view class="order-state-item">
						<view class="state-item-icon">
							<image src="/static/images/user/order-item-icon5.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							退换修
						</view>
					</view>
				</view>
			</view>
			<!-- 广告 -->
			<view class="adversing">
				<swiper :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<image src="../../static/images/user/adversing.png" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 链接栏 -->
			<view class="nav-bar">
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon1.png" mode="widthFix"></image>
						</view>
						<view class="title">
							面对面送积分
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon2.png" mode="widthFix"></image>
						</view>
						<view class="title">
							输入ID号送积分
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon3.png" mode="widthFix"></image>
						</view>
						<view class="title">
							积分充值记录
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon4.png" mode="widthFix"></image>
						</view>
						<view class="title">
							积分收付记录
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon5.png" mode="widthFix"></image>
						</view>
						<view class="title">
							我的购物车
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon6.png" mode="widthFix"></image>
						</view>
						<view class="title">
							我的关注
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon7.png" mode="widthFix"></image>
						</view>
						<view class="title">
							我的足迹
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon8.png" mode="widthFix"></image>
						</view>
						<view class="title">
							收货地址管理
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item" style="margin-bottom: 23rpx;">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon9.png" mode="widthFix"></image>
						</view>
						<view class="title">
							会员资料设置
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon10.png" mode="widthFix"></image>
						</view>
						<view class="title">
							收藏
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon11.png" mode="widthFix"></image>
						</view>
						<view class="title">
							客服
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<tabBar :tabBarActive="tabBarActive"></tabBar>
	</view>
</template>

<script>
	import tabBar from '../../components/footer.vue'
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				// 底部导航
				tabBarActive: {
					state: 5,
					roundLeft: "614rpx",
					mulchLeft: "614rpx",
					elementLeft: "646rpx"
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f6f6;
	}

	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.herder {
			box-sizing: border-box;
			padding: 46rpx 22rpx;
			width: 100%;
			height: 387rpx;
			background-image: url(../../static/images/user/herder-pic.png);
			background-position: 0 0;
			background-repeat: no-repeat;
			background-size: 100% 250rpx;
			background-color: #fff;

			.top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 28.06rpx;
					color: #ffffff;
				}

				.vip-ID {
					padding: 10rpx 20rpx;
					background-color: rgba(0, 0, 0, 0.3);
					border-radius: 40rpx;
					font-size: 24rpx;
					color: #ffffff;
				}
			}

			.middle {
				width: 100%;
				margin-top: 15rpx;
				background-image: url(../../static/images/user/rund.png);
				background-repeat: no-repeat;
				background-position: 560rpx 70rpx;
				background-size: 103rpx 15rpx;

				.user-pic {
					width: 168rpx;
					height: 168rpx;
					border: solid 5rpx #f6f6f6;
					border-radius: 50%;
					margin: 0 auto;
					position: relative;

					image {
						display: block;
						width: 168rpx;
						height: 168rpx;
						border-radius: 50%;
					}

					.vip-icon {
						position: absolute;
						top: 0;
						right: -28rpx;
						border-radius: 50%;
						z-index: 999;
						width: 45rpx;
						height: 45rpx;
						background-color: #000000;
						border: solid 3rpx #ffca57;
						font-size: 20rpx;
						line-height: 40rpx;
						text-align: center;
						line-height: 45rpx;
						color: #ffc74e;
					}
				}
			}

			.bottom {
				text-align: center;
				position: relative;
				top: 23rpx;

				.user-name {
					font-size: 28rpx;
					line-height: 32rpx;
					letter-spacing: -0.3rpx;
					color: #1a1a1a;
				}

				.user-set {
					width: 30rpx;
					height: 26rpx;
					position: absolute;
					top: 5rpx;
					right: 0;

					image {
						display: block;
						max-width: 100%;
						max-height: 100%;
					}
				}
			}
		}

		.content {
			box-sizing: border-box;
			width: 100%;
			padding: 22rpx 33rpx;
			padding-bottom: 120rpx;

			.activity-module {
				box-sizing: border-box;
				width: 100%;
				padding: 0 0 0 21rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 15rpx;

				.left {
					box-sizing: border-box;
					width: 75%;
					padding: 27rpx 44rpx 32rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-right: 1rpx #f5f5f5 solid;

					.integral {
						overflow: hidden;
						display: flex;
						align-items: center;

						.integral-icon {
							width: 40rpx;
							height: 40rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						text {
							display: block;
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #afafaf;
							margin: 0 42rpx 0 13rpx;
						}

						text:last-child {
							margin: 0;
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #f1351b;
							font-weight: bold;
						}
					}

					.coupon {
						.num {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #f1351b;
							font-weight: bold;
							text-align: center;
							margin-bottom: 25rpx;
						}

						.txt {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #afafaf;
						}
					}
				}

				.right {
					width: 25%;
					text-align: center;

					.top-up-icon {
						width: 30rpx;
						height: 30rpx;
						margin: 0 auto;
						margin-bottom: 25rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}

					.txt {
						font-size: 28rpx;
						line-height: 32rpx;
						letter-spacing: -0.3rpx;
						color: #afafaf;
					}
				}
			}

			.order-module {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin: 22rpx 0 47rpx 0;

				.top {
					box-sizing: border-box;
					width: 100%;
					padding: 32rpx 22rpx 20rpx 22rpx;
					border-bottom: solid 1rpx #f5f5f5;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.title {
						font-size: 28rpx;
						line-height: 32rpx;
						letter-spacing: -0.3rpx;
						color: #1a1a1a;
					}

					.all-order {
						font-size: 24rpx;
						line-height: 32rpx;
						letter-spacing: -0.2rpx;
						color: #1a1a1a;
					}
				}

				.order-state {
					box-sizing: border-box;
					width: 100%;
					padding: 22rpx 27rpx 33rpx 22rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.order-state-item {
						text-align: center;

						.state-item-icon {
							width: 41rpx;
							height: 41rpx;
							margin: 0 auto;
							margin-bottom: 20rpx;

							image {
								display: block;
								max-width: 100%;
							}
						}

						.state-item-txt {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #1a1a1a;
						}
					}
				}
			}

			.adversing {
				width: 684rpx;
				height: 180rpx;
				border: solid 1rpx #fff;
				border-radius: 15rpx;
				margin-bottom: 44rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.nav-bar {
				width: 100%;

				.nav-bar-item {
					box-sizing: border-box;
					width: 100%;
					padding: 27rpx 23rpx 27rpx 19rpx;
					background-color: #fff;
					border-radius: 15rpx;
					margin-bottom: 15rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						align-items: center;

						.icon {
							width: 41rpx;
							height: 41rpx;
							margin-right: 17rpx;

							image {
								display: block;
								max-width: 100%;
							}
						}

						.title {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #1a1a1a;
						}
					}

					.right {
						width: 10rpx;
						height: 18rpx;

						image {
							display: block;
							max-width: 100%;
						}
					}
				}
			}
		}
	}
</style>
