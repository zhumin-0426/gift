<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="main">
			<view class="date">
				<view class="date-month">
					8月
				</view>
				<view class="fon-24">
					管理
				</view>
			</view>
			<view class="order-wrapper">
				<view class="order-item">
					<view class="business">
						<view class="business-logo">
							<image src="/static/images/order/business-logo.png" mode="widthFix"></image>
						</view>
						<view class="coupon">
							领劵
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon1.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
							<view class="promotion">
								<view class="title">
									促销
								</view>
								<view class="prompt">
									每两套减200
								</view>
							</view>
							<view class="integral-num">
								<view class="integral">
									<text>12000</text><text>积分</text>
								</view>
								<view class="num">
									<view class="reduse">
										-
									</view>
									<input type="text" value="1" />
									<view class="add">
										+
									</view>
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
							<image src="/static/images/order/business-logo1.png" mode="widthFix"></image>
						</view>
						<view class="coupon">
							领劵
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon2.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
							<view class="promotion">
								<view class="title">
									促销
								</view>
								<view class="prompt">
									每两套减200
								</view>
							</view>
							<view class="integral-num">
								<view class="integral">
									<text>12000</text><text>积分</text>
								</view>
								<view class="num">
									<view class="reduse">
										-
									</view>
									<input type="text" value="1" />
									<view class="add">
										+
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon3.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
							<view class="promotion">
								<view class="title">
									促销
								</view>
								<view class="prompt">
									每两套减200
								</view>
							</view>
							<view class="integral-num">
								<view class="integral">
									<text>12000</text><text>积分</text>
								</view>
								<view class="num">
									<view class="reduse">
										-
									</view>
									<input type="text" value="1" />
									<view class="add">
										+
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="all-sel">
				全部
			</view>
			<view class="settlement">
				<view class="all-integral">
					<text>合计：</text>
					<text>1800积分</text>
				</view>
				<view class="btn">
					结算
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
					state:4,
				    roundLeft:"464rpx",
					mulchLeft:"464rpx",
					elementLeft:"496rpx"
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

		.main {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;
			padding-bottom: 250rpx;

			.date {
				width: 100%;
				margin-bottom: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.date-month {
					padding: 5rpx 15rpx;
					background-color: #ffffff;
					border-radius: 30rpx;
					border: solid 1rpx #e5e5e5;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #1a1a1a;
				}

				.fon-24 {
					font-size: 24rpx;
					line-height: 40rpx;
					letter-spacing: 0rpx;
					color: #afafaf;
				}
			}

			.order-wrapper {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 32rpx;

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

						.coupon {
							font-size: 24rpx;
							line-height: 40rpx;
							color: #1a1a1a;
						}
					}

					.goods {
						box-sizing: border-box;
						width: 100%;
						margin-top: 33rpx;
						padding: 33rpx 37rpx 0 66rpx;
						display: flex;
						justify-content: space-between;
						border-top: 1rpx solid #f5f5f5;

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

							.promotion {
								width: 100%;
								margin-top: 15rpx;
								margin-bottom: 15rpx;
								display: flex;
								align-items: center;

								.title {
									font-size: 20rpx;
									color: #1a1a1a;
									font-weight: bold;
									margin-right: 17rpx;
								}

								.prompt {
									background-color: #f1351b;
									border-radius: 5rpx;
									// padding: 3rpx;
									font-size: 20rpx;
									color: #ffffff;
								}
							}

							.integral-num {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.integral {
									text {
										font-size: 28rpx;
										line-height: 32rpx;
										color: #f1351b;
									}

									text:first-child {
										font-size: 28rpx;
										line-height: 32rpx;
										color: #f1351b;
										font-weight: bold;
										margin-right: 11rpx;
									}
								}

								.num {
									width: 132rpx;
									display: flex;
									align-items: center;

									.reduse {
										width: 44rpx;
										height: 44rpx;
										line-height: 44rpx;
										background-color: #ffffff;
										text-align: center;
										font-size: 24rpx;
										line-height: 40rpx;
										letter-spacing: 0rpx;
										color: #1a1a1a;
									}

									input {
										width: 44rpx;
										height: 44rpx;
										background-color: #f5f5f5;
										border-radius: 5rpx;
										text-align: center;
										font-size: 20rpx;
										line-height: 40rpx;
										letter-spacing: 0rpx;
										color: #1a1a1a;
									}

									.add {
										width: 44rpx;
										height: 44rpx;
										line-height: 44rpx;
										background-color: #ffffff;
										text-align: center;
										font-size: 24rpx;
										line-height: 40rpx;
										letter-spacing: 0rpx;
										color: #1a1a1a;
									}
								}
							}
						}
					}
				}

				.order-item:first-child .goods:first-child {
					border: none;
				}
			}
		}

		.footer {
			box-sizing: border-box;
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 108rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 22rpx 33rpx 35rpx 33rpx;

			.all-sel {
				font-size: 28rpx;
				color: #afafaf;
			}

			.settlement {
				display: flex;
				align-items: center;

				.all-integral {
					text {
						font-size: 24rpx;
						color: #f1351b;
					}

					text:first-child {
						font-size: 28rpx;
						color: #1a1a1a;
					}
				}

				.btn {
					width: 160rpx;
					height: 66rpx;
					background-color: #f1351b;
					border-radius: 33rpx;
					font-size: 28rpx;
					color: #ffffff;
					text-align: center;
					line-height: 66rpx;
					margin-left: 38rpx;
				}
			}
		}
	}
</style>
