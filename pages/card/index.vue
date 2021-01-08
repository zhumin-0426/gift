<template>
	<view class="container">
		<view class="tab">
			<view class="tab-item tab-item-active">
				未使用
			</view>
			<view class="tab-item">
				已使用
			</view>
			<view class="tab-item">
				已失效
			</view>
		</view>
		<view class="tab-obj">
			<view class="card-warpper">
				<view class="left-rund">

				</view>
				<view class="right-rund">

				</view>
				<view class="card">
					<view class="left">
						<view class="card-money">
							<text>¥</text>
							<text>100</text>
						</view>
						<view class="prompt">
							<view class="title">
								优惠卷
							</view>
							<view class="txt">
								满1000元可用
							</view>
						</view>
					</view>
					<view class="right">
						<view class="btn">
							使用
						</view>
						<view class="date">
							2019.05.15-2020.05.15
						</view>
					</view>
				</view>
			</view>
			<view class="card-warpper">
				<view class="left-rund">

				</view>
				<view class="right-rund">

				</view>
				<view class="card">
					<view class="left">
						<view class="card-money">
							<text>¥</text>
							<text>200</text>
						</view>
						<view class="prompt">
							<view class="title">
								优惠卷
							</view>
							<view class="txt">
								满1000元可用
							</view>
						</view>
					</view>
					<view class="right">
						<view class="btn">
							使用
						</view>
						<view class="date">
							2019.05.15-2020.05.15
						</view>
					</view>
				</view>
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
		onLoad(){
			this.getCardList()
		},
		methods: {
            getCardList:function(){
				this.$http('/coupon/getCouponList',{
					couponBelongComid:"1"
				},"post").then(function(res){
					console.log("res",res)
				})
			}
		}
	}
</script>

<style lang="less">
	.container {
		.tab {
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx 0 30rpx;
			border-bottom: solid 1rpx #cacaca;
			border-top: solid 1rpx #cacaca;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			color: #333;

			.tab-item {
				width: 33.33%;
				height: 100%;
				line-height: 100rpx;
				text-align: center;
			}

			.tab-item.tab-item-active {
				border-bottom: solid 2rpx #d8b072;
			}
		}

		.tab-obj {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;

			.card-warpper {
				position: relative;
				overflow: hidden;
				margin-bottom: 33rpx;

				.left-rund {
					width: 20rpx;
					height: 20rpx;
					border: solid 1rpx #c9c8cd;
					border-radius: 50%;
					position: absolute;
					left: -12rpx;
					top: 50%;
					margin-top: -10rpx;
					background-color: #fff;
					z-index: 999;
				}

				.right-rund {
					width: 20rpx;
					height: 20rpx;
					border: solid 1rpx #d8b072;
					border-radius: 50%;
					position: absolute;
					right: -12rpx;
					top: 50%;
					margin-top: -10rpx;
					background-color: #fff;
					z-index: 999;
				}

				.card {
					border: solid 1rpx #d8b072;
					border-radius: 14rpx;
					display: flex;
					overflow: hidden;
					position: relative;

					.left {
						box-sizing: border-box;
						width: 60%;
						padding: 22rpx 33rpx;
						background-color: #d8b072;
						display: flex;
						align-items: center;

						.card-money {
							color: #fff;

							text:first-child {
								font-size: 40rpx;
							}

							text:last-child {
								font-size: 60rpx;
								font-weight: bold;
								margin-right: 22rpx;
							}
						}

						.prompt {
							color: #fff;

							.title {
								font-size: 40rpx;
							}

							.txt {
								font-size: 24rpx;
							}
						}
					}

					.right {
						width: 40%;
						padding: 22rpx 0;
						text-align: center;

						.btn {
							width: 148rpx;
							height: 57rpx;
							line-height: 57rpx;
							text-align: center;
							color: #FFF;
							border-radius: 50rpx;
							font-size: 30rpx;
							margin: 0 auto;
							background-color: #d8b072;
							margin-bottom: 11rpx;
						}

						.date {
							font-size: 10rpx;
							color: #d8b072;
						}
					}
				}
			}
		}
	}
</style>
