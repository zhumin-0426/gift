<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="user-pic">
				<image src="../../static/images/index/user-pic.png" mode="widthFix"></image>
			</view>
			<view class="title">
				我的收藏
			</view>
			<view class="search">
				<view class="icon">
					<image src="../../static/images/collec/search-icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="collec-item">
				<view class="business">
					<view class="business-logo">
						<image src="/static/images/collec/business-logo.png" mode="widthFix"></image>
					</view>
					<view class="focusOn">
						关注
					</view>
				</view>
				<view class="adversing">
					<image src="/static/images/collec/adversing.png" mode="widthFix"></image>
				</view>
				<view class="goods-data">
					<view class="left">
						<view class="goods-get">
							<view class="goods-get-icon">
								<image src="/static/images/collec/goods-get-icon.png" mode="widthFix"></image>
							</view>
							<text>246人已领</text>
						</view>
					</view>
					<view class="right">
						<view class="like">
							<view class="like-icon">
								<image src="/static/images/collec/like-icon.png" mode="widthFix"></image>
							</view>
							<text>3066</text>
							<text>点赞</text>
						</view>
						<view class="share" @click="shareOpen">
							<view class="share-icon">
								<image src="/static/images/collec/share-icon.png" mode="widthFix"></image>
							</view>
							<text>分享</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 分享栏 -->
		<uni-popup ref="popup" type="bottom">
			<view class="share-application">
				<view class="title">
					分享到
				</view>
				<view class="app-warpper">
					<view class="app-item">
						<view class="pic">
							<image src="/static/images/collec/qq.png" mode="widthFix"></image>
						</view>
						<view class="txt">
							QQ
						</view>
					</view>
					<view class="app-item">
						<view class="pic">
							<image src="/static/images/collec/wx.png" mode="widthFix"></image>
						</view>
						<view class="txt">
							微信
						</view>
					</view>
					<view class="app-item">
						<view class="pic">
							<image src="/static/images/collec/friends.png" mode="widthFix"></image>
						</view>
						<view class="txt">
							微信
						</view>
					</view>
				</view>
				<view class="concel" @click="shareClose">
					取消
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {}
		},
		created() {

		},
		methods: {
			shareOpen() {
				this.$refs.popup.open()
			},
			shareClose() {
				this.$refs.popup.close()
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

		.herder {
			box-sizing: border-box;
			width: 100%;
			padding: 22rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.user-pic {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background-color: #ffffff;
				overflow: hidden;

				image {
					display: block;
					width: 100%;
				}
			}

			.title {
				font-size: 28.06rpx;
				line-height: 40rpx;
				letter-spacing: 0rpx;
				color: #1a1a1a;
			}

			.search {
				.icon {
					width: 27rpx;
					height: 27rpx;

					image {
						display: block;
						width: 100%;
					}
				}
			}
		}

		.content {
			box-sizing: border-box;
			width: 100%;
			padding: 38rpx 22rpx;

			.collec-item {
				box-sizing: border-box;
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				padding: 22rpx;
				margin-bottom: 22rpx;

				.business {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.business-logo {
						width: 148rpx;

						image {
							max-width: 148rpx;
						}
					}

					.focusOn {
						width: 88rpx;
						height: 33rpx;
						background-color: #f1351b;
						border-radius: 5rpx;
						font-size: 20rpx;
						line-height: 32rpx;
						letter-spacing: -0.2rpx;
						color: #ffffff;
						text-align: center;
					}
				}

				.adversing {
					width: 662rpx;
					height: 250rpx;
					border-radius: 8rpx;
					margin-top: 15rpx;
					overflow: hidden;

					image {
						display: block;
						width: 100%;
					}
				}

				.goods-data {
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 22rpx;
					justify-content: space-between;

					.left {
						.goods-get {
							display: flex;
							align-items: center;

							.goods-get-icon {
								width: 32rpx;
								height: 32rpx;
								margin-right: 12rpx;

								image {
									display: block;
									width: 100%;
								}
							}

							text {
								font-size: 20rpx;
								line-height: 32rpx;
								letter-spacing: 0rpx;
								color: #1a1a1a;
							}
						}
					}

					.right {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.like {
							display: flex;
							align-items: center;
							margin-right: 34rpx;

							.like-icon {
								width: 34rpx;
								height: 29rpx;
								margin-right: 12rpx;

								image {
									display: block;
									width: 100%;
								}
							}

							text {
								font-size: 20rpx;
								color: #aeaeae;
							}
						}

						.share {
							display: flex;
							align-items: center;

							.share-icon {
								width: 34rpx;
								height: 29rpx;
								margin-right: 12rpx;
								margin-top: -7rpx;

								image {
									display: block;
									width: 100%;
								}
							}

							text {
								font-size: 20rpx;
								color: #aeaeae;
							}
						}
					}
				}
			}
		}

		.share-application {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;
			background-color: #fff;

			.title {
				width: 100%;
				line-height: 50rpx;
				text-align: center;
				font-size: 30rpx;
				margin-bottom: 33rpx;
			}

			.app-warpper {
				width: 70%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.app-item {
					text-align: center;

					.pic {
						width: 50rpx;
						height: 50rpx;
						margin: 0 auto;
						margin-bottom: 10rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.txt {
						font-size: 24rpx;
					}
				}
			}

			.concel {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 50rpx;
				text-align: center;
				background-color: #F5F5F5;
				color: #333;
				margin-top: 33rpx;
				font-size: 30rpx;
			}

		}
	}
</style>
