<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="main">
			<view class="date">
				<view class="date-month">
					{{defaultDate}}月
				</view>
				<view class="date-icon">
					<gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate">
					 <image src="/static/images/order/dete-icon.png" mode="widthFix"></image>
					</gpp-date-picker>
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
									<view class="reduce" @click="reduceGoodsNum">
										-
									</view>
									<input type="text" :value="goodsNum" />
									<view class="add" @click="addGoosNum">
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
									<view class="reduce" @click="reduceGoodsNum">
										-
									</view>
									<input type="text" :value="goodsNum" />
									<view class="add" @click="addGoosNum">
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
									<view class="reduce" @click="reduceGoodsNum">
										-
									</view>
									<input type="text" :value="goodsNum" />
									<view class="add" @click="addGoosNum">
										+
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<mpopup ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from 'components/xuan-popup/xuan-popup.vue';
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue";
	export default {
		components: {
			mpopup,
			gppDatePicker
		},
		data() {
			return {
				goodsNum: 1,
				startDate: "2018-05-02",
				endDate: "2022-09-20",
				defaultDate:"9"
			}
		},
		comments: {

		},
		methods: {
			reduceGoodsNum: function() {
				--this.goodsNum;
				if (this.goodsNum < 1) {
					this.$refs.mpopup.open({
						type: 'warn',
						content: '亲，数量最小为1哦！',
						timeout: 3000,
						isClick: false
					});
					this.goodsNum = 1
				}
			},
			addGoosNum: function() {
				++this.goodsNum
			},
			onCancel(e) {
				console.log(e);
			},
			onConfirm(e) {
				let selDate = e.dateValue.split('-')[1];
				if(selDate.charAt(0)=='0'){
					this.defaultDate = selDate.charAt(1);
				}else{
					this.defaultDate = selDate;
				}
			}
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

				.date-icon {
					width: 44rpx;
					height: 38rpx;

					image {
						display: block;
						max-width: 100%;
					}
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

									.reduce {
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
	}
</style>
