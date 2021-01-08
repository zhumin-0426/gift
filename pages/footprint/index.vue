<template>
	<view class="container">
		<view class="footprint-main" v-for="(item,index) in myFooterPrint">
			<view class="top">
				<view class="business-logo">
					<image :src="imageUrl+item.supperLogo" mode="widthFix"></image>
				</view>
			</view>
			<view class="goods-warpper">
				<view class="goods" v-for="(goodsItem,goodsIndex) in item.commoditylist" :key="goodsIndex">
					<view class="goods-icon">
						<image :src="imageUrl+goodsItem.imglist[0].imgUrl" mode="widthFix"></image>
					</view>
					<view class="goods-title">
						{{goodsItem.commodityName}}
					</view>
					<view class="integral">
						<view class="integral-icon">
							<image src="/static/images/found/integral-icon.png" mode="widthFix"></image>
						</view>
						<view class="num">
							{{goodsItem.defaultScore}}
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
				// 图片路径
				imageUrl: "",
				myFooterPrint: []
			}
		},
		onLoad() {
			this.footerPrint()
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			footerPrint: function() {
				const that = this;
				this.$http('/users/getCommodityCollect', {}, 'post').then(function(res) {
					console.log(res);
					if (res.data.status == 'success') {
						that.myFooterPrint = res.data.commodityCollectByList
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f6f6;
	}

	.container {
		box-sizing: border-box;
		width: 100%;
		padding: 22rpx;

		.footprint-main {
			box-sizing: border-box;
			width: 100%;
			padding: 22rpx;
			background-color: #fff;
			border-radius: 15rpx;

			.top {
				width: 100%;
				padding-bottom: 22rpx;

				.business-logo {
					width: 293rpx;

					image {
						width: 100%;
					}
				}
			}

			.goods-warpper {
				width: 100%;
				display: flex;
				justify-content: space-between;
				white-space: nowrap;
				overflow-y: hidden;
				overflow-x: scroll;
				&::-webkit-scrollbar{
					display: one;
				}
				.goods {
					width: 170rpx;
                    margin-right: 33rpx;
					.goods-icon {
						width: 170rpx;
						height: 170rpx;
						border-radius: 5rpx;
						overflow: hidden;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}

					.goods-title {
						font-size: 24rpx;
						line-height: 40rpx;
						letter-spacing: 0rpx;
						margin: 23rpx 0 0rpx 0;
						color: #1a1a1a;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						word-break: break-all;
					}

					.integral {
						display: flex;
						align-items: center;

						.integral-icon {
							width: 29rpx;
							height: 25rpx;
							display: inline-block;
							margin-right: 7rpx;
							margin-top: -3rpx;

							image {
								display: block;
								width: 100%;
								height: 100%;
							}
						}

						.num {
							font-size: 24rpx;
							color: #ff8400;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
