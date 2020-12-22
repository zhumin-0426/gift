<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="top display-flex">
				<view class="previou">
					<image src="/static/images/goods-detail/previou.png" mode="widthFix"></image>
				</view>
				<view class="nav-list" @click="openSubmenu">
					<image src="/static/images/goods-detail/nav-list.png" mode=""></image>
				</view>
			</view>

			<view class="banner">
				<swiper style="height: 1050rpx;" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<image src="/static/images/goods-detail/banner1.png" mode="widthFix"></image>
					</swiper-item>
					<swiper-item>
						<image src="/static/images/goods-detail/banner1.png" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<view :class="navList==true?'submenu-active':'submenu'">
				<view class="item">
					<view class="item-icon">
						<image src="/static/images/goods-detail/submenu-index.png" mode="widthFix"></image>
					</view>
					<text>首页</text>
				</view>
				<view class="item">
					<view class="item-icon">
						<image src="/static/images/goods-detail/submenu-car.png" mode="widthFix"></image>
					</view>
					<text>购物车</text>
				</view>
				<view class="item">
					<view class="item-icon">
						<image src="/static/images/goods-detail/submenu-user.png" mode="widthFix"></image>
					</view>
					<text>个人中心</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="goods-msg">
				<view class="top">
					<view class="title">绿恒源 全棉印花四件套 HYX-020TJ 绿罗伊<view class="goods-limited-num">
							限量500套
						</view>
					</view>
					<view class="share" @click="shareOpen">
						<image src="/static/images/goods-detail/share.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="middle display-flex">
					<view class="integral display-flex">
						<view class="integral-icon">
							<image src="/static/images/goods-detail/integral-icon.png" mode="widthFix"></image>
						</view>
						<view class="integral-txt">
							6000
						</view>
						<view class="integral-unit">
							积分
						</view>
					</view>
					<view class="goods-num">
						剩余174套
					</view>
				</view>
				<view class="bottom">
					<view class="progress">
						<view class="progress-prompt">
							362人已领
							<view class="angle">

							</view>
						</view>
						<view class="progress-act">

						</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="main">
				<view class="title">
					商品介绍
				</view>
			</view>
		</view>
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
			return {
				navList: false
			}
		},
		methods: {
			openSubmenu: function() {
				this.navList = !this.navList
			},
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
	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.herder {
			width: 100%;
			position: relative;

			.top {
				box-sizing: border-box;
				width: 100%;
				padding: 0 33rpx;
				position: absolute;
				top: 66rpx;
				z-index: 999;
				justify-content: space-between;

				.previou {
					width: 60rpx;
					height: 60rpx;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}

				.nav-list {
					width: 37rpx;
					height: 7rpx;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}

			.submenu {
				display: none;
			}

			.submenu-active {
				position: absolute;
				right: 33rpx;
				top: 120rpx;
				background-color: rgba(0, 0, 0, 0.5);
				color: #fff;
				padding: 33rpx 22rpx;
				border-radius: 15rpx;
				display: block;
				transition: all 1s;

				.item {
					font-size: 24rpx;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;

					.item-icon {
						width: 30rpx;
						height: 30rpx;
						margin-right: 22rpx;

						image {
							display: block;
							width: 100%;
						}
					}
				}
			}

			.banner {
				width: 100%;
				height: 1050rpx;

				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}

		.content {

			.goods-msg {
				box-sizing: border-box;
				width: 100%;
				padding: 44rpx 33rpx;

				.top {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.title {
						width: 545rpx;
						font-size: 40rpx;
						line-height: 52rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
						text-align: justify;

						.goods-limited-num {
							display: inline-block;
							border-radius: 10rpx;
							border: solid 2rpx #f1341b;
							font-size: 24rpx;
							line-height: 32rpx;
							letter-spacing: 0rpx;
							color: #f1351b;
							padding: 7rpx 10rpx 7rpx 10rpx;
							text-align: center;
							margin-top: -4rpx;
							margin-left: 10rpx;
						}
					}

					.share {
						width: 42rpx;
						height: 40rpx;
						margin-top: 4rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}

				.middle {
					width: 100%;
					justify-content: space-between;

					.integral {
						margin: 47rpx 0;

						.integral-icon {
							width: 40rpx;
							height: 41rpx;
							margin-right: 13rpx;

							image {
								display: block;
								width: 100%;
								height: 100%;
							}
						}

						.integral-txt,
						.integral-unit {
							font-size: 40rpx;
							font-weight: normal;
							font-stretch: normal;
							line-height: 32rpx;
							letter-spacing: 0rpx;
							color: #f1351b;
							font-weight: bold;
						}

						.integral-unit {
							font-size: 24rpx;
							font-weight: normal;
							line-height: 32rpx;
							letter-spacing: 0rpx;
							color: #f1351b;
							margin-left: 13rpx;
						}
					}

					.goods-num {
						font-size: 24rpx;
						line-height: 32rpx;
						letter-spacing: 0rpx;
						color: #a7a7a7;
					}
				}

				.bottom {
					width: 100%;
					margin-top: 50rpx;

					.progress {
						width: 100%;
						height: 8rpx;
						background-color: #dddddd;
						border-radius: 4rpx;
						position: relative;

						.progress-prompt {
							display: inline-block;
							position: relative;
							top: -80rpx;
							background-color: #ff8c00;
							border-radius: 5rpx;
							padding: 7rpx 10rpx;
							font-size: 20rpx;
							line-height: 32rpx;
							letter-spacing: 0rpx;
							color: #ffffff;

							.angle {
								width: 0;
								height: 0;
								border: 8rpx solid;
								border-color: transparent transparent #ff8c00;
								position: absolute;
								transform: rotateX(180deg);
								left: 50%;
								margin-left: -8rpx;
								bottom: -15rpx;
							}
						}

						.progress-act {
							width: 70%;
							height: 8rpx;
							position: absolute;
							z-index: 1;
							top: 0;
							left: 0;
							background-color: #ff8c00;
							border-radius: 4rpx;
						}
					}
				}
			}

			.line {
				width: 750rpx;
				height: 17rpx;
				background-color: #f6f6f6;
			}

			.main {
				width: 100%;

				.title {
					box-sizing: border-box;
					width: 100%;
					padding: 43rpx 33rpx;
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
