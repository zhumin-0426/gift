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
				我的发现
			</view>
			<view class="search">
				<view class="icon">
					<image src="../../static/images/collec/search-icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 关注动态 -->
			<view :class="dynamic==true?'focus-state-module-active':'focus-state-module'">
				<view class="title">
					发现你关注的品牌更新了动态哦 !
				</view>
				<view class="main">
					<view class="brand">
						<view class="brand-more" @click="moreDynamicOpen" :style="dynamic==false?'display:block':'display:none'">
							<image src="/static/images/found/brand-more.png" mode="widthFix"></image>
						</view>
						<view class="brand-logo-item">
							<view class="brand-logo">
								<image src="/static/images/found/logo1.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="brand-logo-item">
							<view class="brand-logo">
								<image src="/static/images/found/logo2.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="brand-logo-item">
							<view class="brand-logo">
								<image src="/static/images/found/logo3.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="brand-logo-item">
							<view class="brand-logo">
								<image src="/static/images/found/logo4.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="brand-logo-item">
							<view class="brand-logo">
								<image src="/static/images/found/logo5.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="brand-logo-item">
							<view class="brand-logo">
								<image src="/static/images/found/logo3.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="brand-logo-item">
							<view class="brand-logo">
								<image src="/static/images/found/3.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 指向 -->
			<view class="point-to">
				<view class="point-to-icon" @click="moreDynamicClose" :style="dynamic==true?'transform:rotate(180deg);':'transform:rotate(0deg)'">
					<image src="/static/images/found/point-to.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 指向内容 -->
			<view class="point-to-main">
				<view class="top">
					<view class="business-logo">
						<image src="/static/images/found/business-logo.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="goods">
					<view class="goods-icon">
						<image src="/static/images/found/goods-icon.png" mode="widthFix"></image>
					</view>
					<view class="goods-title">
						粉红色的芭蕾粉红色的芭蕾
					</view>
					<view class="integral">
						<view class="integral-icon">
							<image src="/static/images/found/integral-icon.png" mode="widthFix"></image>
						</view>
						<view class="num">
							2600
						</view>
					</view>
				</view>
			</view>
			<!-- 更多关注 -->
			<view class="tab">
				<view class="tab-item" v-for="item in tabItem" :key="item.id" @click="changeTabObj">{{item.txt}}</view>
			</view>
			<view class="tab-obj">
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
						<view class="share">
							<view class="share-icon">
								<image src="/static/images/collec/share-icon.png" mode="widthFix"></image>
							</view>
							<text>分享</text>
						</view>
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
				dynamic: false,
				tabItem: [{
						txt: "推荐",
						id: "1"
					},
					{
						txt: "直播",
						id: "2"
					},
					{
						txt: "视频",
						id: "3"
					}
				],
				// 底部导航
				tabBarActive: {
					state: 3,
					roundLeft: "316rpx",
					mulchLeft: "316rpx",
					elementLeft: "346rpx"
				},
				// 我的发现
				myFoundData: []
			}
		},
		onLoad() {
			this.myFound()
		},
		methods: {
			moreDynamicOpen: function() {
				this.dynamic = true;
			},
			moreDynamicClose: function() {
				this.dynamic = false;
			},
			// 我的发现
			myFound: function() {
				const that = this;
				this.$http('/users/getUserFollow', {}, 'post').then(function(res) {
					console.log("我的发现", res);
					if (res.data.status == 'success') {
						that.myFoundData = res.data.usersFollowByList
					}
				})
			},
			// 关注
			clickFocus: function() {
				this.$http('/users/saveFollow', {
					followSupperId: ""
				}, 'post').then(function(res) {
					console.log('关注',res)
				})
			},
			// 点赞
			giveLike: function() {
				this.$http('/users/setCollectGood', {
					collectCommodityId: "",
				}, 'post').then(function(res) {
					console.log('点赞',res)
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
			padding-bottom: 130rpx;

			.focus-state-module {
				box-sizing: border-box;
				width: 100%;
				height: 200rpx;
				padding: 22rpx;
				background-color: #fff;
				border-radius: 15rpx;
				overflow: hidden;

				.title {
					font-size: 28rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 40rpx;
					letter-spacing: 0rpx;
					color: #000000;
				}

				.main {
					width: 100%;

					.brand {
						box-sizing: border-box;
						width: 100%;
						padding: 21rpx;
						display: flex;
						flex-wrap: wrap;
						margin-left: -25rpx;
						position: relative;

						.brand-more {
							width: 18rpx;
							height: 6rpx;
							position: absolute;
							top: 70rpx;
							right: 0;

							image {
								display: block;
								width: 100%;
								height: 100%;
							}
						}

						.brand-logo-item {
							width: 20%;
							margin-bottom: 27rpx;

							.brand-logo {
								width: 100rpx;
								height: 100rpx;
								border-radius: 50%;
								overflow: hidden;

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

			.focus-state-module-active {
				box-sizing: border-box;
				width: 100%;
				padding: 22rpx;
				background-color: #fff;
				border-radius: 15rpx;
				overflow: hidden;

				.title {
					font-size: 28rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 40rpx;
					letter-spacing: 0rpx;
					color: #000000;
				}

				.main {
					width: 100%;

					.brand {
						box-sizing: border-box;
						width: 100%;
						padding: 22rpx 0;
						display: flex;
						flex-wrap: wrap;
						position: relative;

						.brand-more {
							width: 18rpx;
							height: 6rpx;
							position: absolute;
							top: 70rpx;
							right: 0;

							image {
								display: block;
								width: 100%;
								height: 100%;
							}
						}

						.brand-logo-item {
							width: 20%;
							margin-bottom: 27rpx;

							.brand-logo {
								width: 100rpx;
								height: 100rpx;
								border-radius: 50%;
								overflow: hidden;

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

			.point-to {
				box-sizing: border-box;
				width: 100%;
				padding: 14rpx 0 14rpx 62rpx;

				.point-to-icon {
					width: 20rpx;
					height: 14rpx;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}

			.point-to-main {
				width: 100%;
				box-sizing: border-box;
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

				.goods {
					width: 170rpx;

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
						margin: 23rpx 0;
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
						}
					}
				}
			}

			.tab {
				display: flex;
				align-items: center;
				padding: 44rpx 0 31rpx 0;

				.tab-item {
					margin-right: 45rpx;
					font-size: 28rpx;
				}
			}

			.tab-obj {
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
	}
</style>
