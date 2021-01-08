<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- 状态栏 -->
		<view class="order-status">
			<view class="order-status-item" :class="orderStatusCode==item.params?'status-item-active':''" v-for="(item,index) in orderStatusList" :key="index">
				{{item.title}}
			</view>
		</view>
		<view class="main">
			<view class="order-wrapper">
				<view class="order-item">
					<view class="business">
						<view class="business-logo">
							<image src="/static/images/order/business-logo.png" mode="widthFix"></image>
						</view>
						<view class="coupon">
							等待买家兑换
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon1.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
						</view>
					</view>
					<view class="btn">
						待兑换
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
							等待买家兑换
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon2.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
						</view>
					</view>
					<view class="goods">
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon3.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<mpopup ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				goodsNum: 1,
				startDate: "2018-05-02",
				endDate: "2022-09-20",
				defaultDate:"9",
				// 订单状态
				orderStatusList:[
					{title:"待兑换",params:"all"},
					{title:"待发货",params:""},
					{title:"待收货",params:""},
					{title:"待评价",params:""},
					{title:"退换修",params:""}
				],
				orderStatusCode:'all'
			}
		},
		comments: {

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
		.order-status{
		    box-sizing: border-box;
			width: 100%;
			padding: 0 33rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.order-status-item{
				font-size: 28rpx;
				padding: 22rpx 0;
			}
			.status-item-active{
			    border-bottom: solid 4rpx rgb(255, 80, 0);
				color: rgb(255, 80, 0);
			}
		}
		.main {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;

			.order-wrapper {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 32rpx;

				.order-item {
					box-sizing: border-box;
					width: 100%;
					padding: 22rpx 0;
					overflow: hidden;

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
							color: rgb(255, 80, 0);
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
						}
					}
					.btn{
						float: right;
						border: solid 1rpx rgb(255, 80, 0);
						font-size: 26rpx;
						color: rgb(255, 80, 0);
						padding: 5rpx 10rpx;
						border-radius: 30rpx;
						margin-right: 22rpx;
					}
				}

				.order-item:first-child .goods:first-child {
					border: none;
				}
			}
		}
	}
</style>
