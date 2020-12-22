<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="search">
				<view class="integral-barter">
					<view class="search-icon">
						<image src="/static/images/all-classify/search-icon.png" mode="widthFix"></image>
					</view>
					<input type="text" value="" placeholder="积分换物" placeholder-class="search-pls" />
					<view class="scan-icon">
						<image src="../../static/images/all-classify/scan.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="integral-line">
					<view class="integral-time integral-start-time">
						<input type="text" value="" placeholder="积分起点" placeholder-class="integral-line-pls" />
					</view>
					-
					<view class="integral-time integral-end-time">
						<input type="text" value="" placeholder="积分止点" placeholder-class="integral-line-pls" />
					</view>
					<view class="btn">搜索</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 侧边栏 -->
			<view class="side-bar">
				<view class="side-bar-title">
					<image src="../../static/images/all-classify/title-icon.png" mode="widthFix"></image>
					<text>推荐分类</text>
				</view>
				<view class="side-bar-box">
					<view class="side-bar-item">家居家纺</view>
					<view class="side-bar-item">运动户外</view>
					<view class="side-bar-item">汽车用品</view>
					<view class="side-bar-item">休闲零食</view>
					<view class="side-bar-item">家居厨具</view>
					<view class="side-bar-item">美妆洗护</view>
					<view class="side-bar-item">酒水饮品</view>
					<view class="side-bar-item">茶具茶叶</view>
					<view class="side-bar-item">箱包皮具</view>
					<view class="side-bar-item">服饰鞋帽</view>
					<view class="side-bar-item">电脑数码</view>
					<view class="side-bar-item">家电手机</view>
				</view>
			</view>
			<!-- 分类商品 -->
			<view class="classify-goods">
				<!-- 轮播 -->
				<view class="adversing">
					<swiper :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item>
							<view class="swiper-item">
								<image src="../../static/images/all-classify/adversing.png" mode="widthFix"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<!-- tab 商品分类 右 -->
				<view class="tab">
					<view @click="changeTabObj(index)" :class="index==rightTabObj?'tab-item-active':'tab-item'" v-for="(item,index) in rightTabClassify"
					 :key="index">
						<view class="tab-item-txt">{{item.txt}}</view>
						<view class="tab-item-line"></view>
					</view>
				</view>
				<view class="tab-obj">
					<view class="goods-box">
						<view class="goods">
							<view class="goods-pic">
								<image src="../../static/images/all-classify/goods1.png" mode="widthFix"></image>
							</view>
							<view class="goods-msg">
								<view class="title">同林鸟 静音铝框包角差旅出行拉杆箱 玫瑰金 20寸</view>
								<view class="num">限量500份</view>
								<view class="integral">
									<view class="left"><text>6000</text><text>积分</text></view>
									<view class="right">246人已领</view>
								</view>
							</view>
						</view>
						<view class="goods">
							<view class="goods-pic">
								<image src="../../static/images/all-classify/goods2.png" mode="widthFix"></image>
							</view>
							<view class="goods-msg">
								<view class="title">同林鸟 静音铝框包角差旅出行拉杆箱 玫瑰金 20寸</view>
								<view class="num">限量500份</view>
								<view class="integral">
									<view class="left"><text>6000</text><text>积分</text></view>
									<view class="right">246人已领</view>
								</view>
							</view>
						</view>
						<view class="goods">
							<view class="goods-pic">
								<image src="../../static/images/all-classify/goods3.png" mode="widthFix"></image>
							</view>
							<view class="goods-msg">
								<view class="title">同林鸟 静音铝框包角差旅出行拉杆箱 玫瑰金 20寸</view>
								<view class="num">限量500份</view>
								<view class="integral">
									<view class="left"><text>6000</text><text>积分</text></view>
									<view class="right">246人已领</view>
								</view>
							</view>
						</view>
						<view class="goods">
							<view class="goods-pic">
								<image src="../../static/images/all-classify/goods4.png" mode="widthFix"></image>
							</view>
							<view class="goods-msg">
								<view class="title">同林鸟 静音铝框包角差旅出行拉杆箱 玫瑰金 20寸</view>
								<view class="num">限量500份</view>
								<view class="integral">
									<view class="left"><text>6000</text><text>积分</text></view>
									<view class="right">246人已领</view>
								</view>
							</view>
						</view>
						<view class="goods">
							<view class="goods-pic">
								<image src="../../static/images/all-classify/goods2.png" mode="widthFix"></image>
							</view>
							<view class="goods-msg">
								<view class="title">同林鸟 静音铝框包角差旅出行拉杆箱 玫瑰金 20寸</view>
								<view class="num">限量500份</view>
								<view class="integral">
									<view class="left"><text>6000</text><text>积分</text></view>
									<view class="right">246人已领</view>
								</view>
							</view>
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
				rightTabClassify: [{
						txt: "拉杆箱"
					},
					{
						txt: "背包"
					},
					{
						txt: "手提包"
					},
					{
						txt: "皮带"
					},
					{
						txt: "领带"
					},
					{
						txt: "领带"
					}
				],
				rightTabObj: 0,
				// 底部导航
				tabBarActive: {
					state: 2,
					roundLeft: "168rpx",
					mulchLeft: "168rpx",
					elementLeft: "198rpx"
				}
			}
		},
		methods: {
			changeTabObj: function(index) {
				console.log(index)
				this.rightTabObj = index
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
			box-sizing: border-box;
			width: 100%;
			height: 308rpx;
			padding: 22rpx;
			background-image: url(../../static/images/all-classify/classify-container-pic.png);
			background-repeat: no-repeat;
			background-size: 100% 308rpx;

			.search {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.integral-barter {
					box-sizing: border-box;
					width: 300rpx;
					height: 60rpx;
					padding: 0 22rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					background-color: #fff;
					border-radius: 30rpx;
					border: solid 1rpx #f2f2f2;

					.search-icon {
						width: 35rpx;
						margin-right: 10rpx;

						image {
							display: block;
							width: 100%;
						}
					}

					input {
						font-size: 24rpx;
						color: #333;
					}

					.search-pls {
						font-size: 24rpx;
						color: #a3a3a3;
					}

					.scan-icon {
						width: 35rpx;

						image {
							display: block;
							width: 100%;
						}

					}
				}

				.integral-line {
					display: flex;
					align-items: center;
					font-size: 12rpx;
					color: #fff;

					.integral-time {
						box-sizing: border-box;
						width: 130rpx;
						height: 56rpx;
						margin: 0 25rpx 0 10rpx;
						background-color: #fff;
						border-radius: 30rpx;

						input {
							display: block;
							width: 100%;
							height: inherit;
							line-height: 60rpx;
							font-size: 24rpx;
							color: #333;
							text-align: center;
						}

						.integral-line-pls {
							font-size: 24rpx;
							color: #a3a3a3;
						}
					}
				}
			}
		}

		.content {
			position: relative;
			top: -135rpx;

			.side-bar {
				width: 213rpx;
				position: fixed;
				top: 250rpx;
				bottom: 0;
				left: 0;
				overflow: hidden;

				.side-bar-title {
					margin-bottom: 32rpx;
					display: flex;
					padding: 0 0 0 32rpx;
					background-color: #fff;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 999;

					image {
						display: block;
						width: 34rpx;
						margin-right: 15rpx;
					}

					text {
						font-size: 26rpx;
						color: #f1351b;
					}
				}

				.side-bar-box {
					padding-top: 64rpx;
					z-index: 90;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					overflow-y: auto;
					padding-bottom: 108rpx;
					-webkit-overflow-scrolling: touch;


					.side-bar-item {
						box-sizing: border-box;
						width: inherit;
						padding: 32rpx 0 32rpx 32rpx;
						font-size: 25rpx;
						color: #000000;
					}
				}
			}

			.classify-goods {
				box-sizing: border-box;
				width: 537rpx;
				padding-right: 22rpx;
				position: absolute;
				top: 0;
				right: 0;

				.adversing {
					width: 100%;
					height: 170rpx;
					overflow: hidden;

					image {
						display: block;
						width: 100%;
					}
				}

				.tab {
					width: 100%;
					display: flex;
					justify-content: space-between;
					white-space: nowrap;
					overflow-y: hidden;
					overflow-x: scroll;

					&::-webkit-scrollbar {
						display: none;
					}

					.tab-item {
						padding: 36rpx 44rpx 62rpx 0;

						.tab-item-txt {
							font-size: 24rpx;
							color: #1a1a1a;
						}
					}

					.tab-item-active {
						padding: 36rpx 44rpx 62rpx 0;

						.tab-item-txt {
							font-size: 24rpx;
							color: #f1351b;
						}

						.tab-item-line {
							width: 32rpx;
							height: 5rpx;
							margin: 0 auto;
							margin-top: 12rpx;
							background-color: #f1351b;
							border-radius: 2.5rpx;
						}
					}
				}

				.tab-obj {
					width: 515rpx;
					position: fixed;
					top: 480rpx;
					bottom: 0;
					right: 0;

					.goods-box {
						width: 100%;
						z-index: 90;
						position: absolute;
						top: 0;
						bottom: 0;
						right: 22rpx;
						overflow-y: auto;
						padding-bottom: 108rpx;
						-webkit-overflow-scrolling: touch;

						.goods {
							width: 100%;
							margin-bottom: 43rpx;
							display: flex;
							justify-content: space-between;

							.goods-pic {
								width: 160rpx;
								height: 160rpx;
								border-radius: 15rpx;

								image {
									display: block;
									width: 100%;
									height: 100%;
								}
							}

							.goods-msg {
								width: 292rpx;

								.title {
									font-size: 22rpx;
									line-height: 32rpx;
									color: #000000;
									text-align: justify;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
									word-break: break-all;
								}

								.num {
									display: inline-block;
									padding: 7rpx 11rpx;
									margin: 10rpx 0 22rpx 0;
									background-color: #ffffff;
									border-radius: 10rpx;
									border: solid 1rpx #f1341b;
									font-size: 18rpx;
									line-height: 32rpx;
									color: #f1351b;
									text-align: center;
								}

								.integral {
									width: 100%;
									display: flex;
									align-items: center;
									justify-content: space-between;

									.left {
										font-size: 35rpx;
										font-weight: bold;
										line-height: 32rpx;
										color: #f1351b;
										display: flex;
										align-items: center;

										text {
											display: block;
										}

										text:last-child {
											margin-left: 10rpx;
											font-size: 12rpx;
											font-weight: normal;
										}
									}

									.right {
										font-size: 16rpx;
										line-height: 32rpx;
										color: #aeaeae;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
