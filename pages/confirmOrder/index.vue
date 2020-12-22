<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="main">
			<view class="user-msg">
				<view class="top">
					<view class="name">
						欧阳欧阳
					</view>
					<view class="phone">
						13531322355
					</view>
					<view class="state">
						默认
					</view>
				</view>
				<view class="bottom">
					<view class="address">
						佛山市 顺德区 容桂街道 丰宁路9号 顺的网络 3楼
					</view>
					<view class="next-icon">
						<image src="/static/images/confirm-order/next.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<!-- 商品 -->
			<view class="order-wrapper">
				<view class="order-item">
					<view class="business">
						<view class="business-logo">
							<image src="/static/images/order/business-logo.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon1.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
							<view class="integral-num">
								<view class="num">
									x2
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="order-wrapper">
				<view class="order-item">
					<view class="business">
						<view class="business-logo">
							<image src="/static/images/order/business-logo.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon1.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
							<view class="integral-num">
								<view class="num">
									x2
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="order-msg">
				<view class="integral fle">
					<view class="integral-txt">
						兑换所需积分
					</view>
					<view class="integral-val">
						12000积分
					</view>
				</view>
				<view class="freight fle">
					<view class="freight-txt">
						运费
					</view>
					<view class="freight-val">
						免运费
					</view>
				</view>
				<view class="activity fle">
					<view class="activity-txt">
						优惠活动
					</view>
					<view class="right">
						<view class="activity-val">
							满减200
						</view>
						<view class="next-icon">
							<image src="/static/images/confirm-order/next.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="footer">
			<view class="goods">
				<text>总2件，合计：</text>
				<text>18000</text>
				<text>积分</text>
			</view>
			<view class="btn">
				去兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

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

		.main {
			box-sizing: border-box;
			width: 100%;
			padding: 22rpx 33rpx;
			padding-bottom: 150rpx;

			.user-msg {
				box-sizing: border-box;
				width: 100%;
				background-color: #ffffff;
				border-radius: 15rpx;
				padding: 33rpx 22rpx;
				margin-bottom: 22rpx;

				.top {
					display: flex;
					align-items: center;

					.name {
						font-size: 28rpx;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
						font-weight: bolder;
					}

					.phone {
						font-size: 24rpx;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #afafaf;
						margin: 0 21rpx;
					}

					.state {
						font-size: 20rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #ffffff;
						padding: 4rpx 13rpx;
						background-color: #f1351b;
						border-radius: 14rpx;
					}
				}

				.bottom {
					width: 100%;
					margin-top: 21rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.address {
						font-size: 12rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
					}

					.next-icon {
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

			.order-wrapper {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 32rpx;
				margin-bottom: 22rpx;

				.order-item {
					box-sizing: border-box;
					width: 100%;
					padding: 22rpx 0;

					.business {
						box-sizing: border-box;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 22rpx;

						.business-logo {
							width: 297rpx;

							image {
								display: block;
								width: 100%;
							}
						}

					}

					.goods {
						box-sizing: border-box;
						width: 100%;
						margin-top: 33rpx;
						padding: 33rpx 37rpx 0 66rpx;
						display: flex;
						justify-content: space-between;

						.goods-icon {
							width: 182rpx;
							height: 182rpx;
							border-radius: 10rpx;
							overflow: hidden;

							image {
								display: block;
								width: 100%;
							}
						}

						.goods-msg {
							width: 379rpx;

							.title {
								font-size: 28rpx;
								color: #1a1a1a;
								text-align: justify;
								letter-spacing: 0rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								word-break: break-all;
							}

							.integral-num {
								width: 100%;
								overflow: hidden;


								.num {
									margin-top: 59rpx;
									width: 44rpx;
									height: 44rpx;
									float: right;
									background-color: #f5f5f5;
									text-align: center;
									border-radius: 5rpx;
									font-size: 20rpx;
									font-weight: normal;
									font-stretch: normal;
									line-height: 40rpx;
									letter-spacing: 0rpx;
									color: #afafaf;
								}
							}
						}
					}
				}

				.order-item:first-child .goods:first-child {
					border: none;
				}
			}

			.order-msg {
				box-sizing: border-box;
				width: 100%;
				background-color: #fff;
				padding: 33rpx 24rpx;
				border-radius: 15rpx;

				.fle {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 33.333rpx;
					letter-spacing: 0rpx;
					color: #1a1a1a;
					font-weight: bold;

				}

				.freight {
					margin: 66rpx 0;
				}

				.activity {
					width: 100%;

					.right {
						display: flex;
						align-items: center;

						.activity-val {
							color: #f1351b;
							margin-right: 44rpx;
						}

						.next-icon {
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
		}

		.footer {
			box-sizing: border-box;
			padding: 16rpx 33rpx;
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #1a1a1a;

				text:first-child+text {
					color: #f1351b;
					margin: 0 10rpx 0 20rpx;
				}

				text:first-child+text+text {
					color: #f1351b;
					font-size: 20rpx;
				}
			}

			.btn {
				width: 250rpx;
				height: 88rpx;
				background-color: #f1351b;
				border-radius: 44rpx;
				font-size: 28rpx;
				line-height: 88rpx;
				text-align: center;
				color: #ffffff;
			}
		}
	}
</style>
