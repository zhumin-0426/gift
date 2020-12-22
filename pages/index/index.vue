<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="top">
				<view class="logo">
					<image src="/static/images/index/logo.png" mode="widthFix"></image>
				</view>
				<view class="search">
					<view class="search-icon">
						<image class="search-icon" src="/static/images/index/search-icon.png" mode="widthFix"></image>
					</view>
					<input class="search-ipt" type="text" value="" placeholder="搜索" placeholder-class="search-pls" />
					<view class="scan">
						<image class="scan" src="/static/images/index/scan.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="user-pic">
					<image src="../../static/images/index/user-pic.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 轮播 -->
			<view class="swipe-warpper">
				<swiper class="swiper" indicator-dots="true" circular="true" autoplay="true" interval="2000" duration="500"
				 indicator-color="#f7f7f7" indicator-active-color="#ff0000">
					<swiper-item v-for="(bannerItem,bannerIndex) in bannerList" :key="bannerIndex">
						<view class="swiper-item">
							<image style="width: 100%;" :src="imageUrl+bannerItem.bannerPic" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="content">
			<!-- 导航栏 -->
			<view class="nav">
				<view class="nav-item" v-for="(navItem,navIndex) in navList" :key="navIndex">
					<navigator hover-class="none">
						<view class="nav-item-icon">
							<image :src="imageUrl+navItem.imgUrl" mode="widthFix"></image>
						</view>
						<text>{{navItem.urlName}}</text>
					</navigator>
				</view>
			</view>
			<!-- 信息栏 -->
			<view class="tig-bar">
				<view class="tig-icon">
					<image src="../../static/images/index/tig-icon.png" mode="widthFix"></image>
				</view>
				<view class="tig-txt">
					<view class="tig-txt-title">
						最新消息
					</view>
					<view class="tig-txt-main">
						"NIKE ADIDAS 进驻顺的积分..."
					</view>
				</view>
				<view class="tig-more">
					更多
				</view>
			</view>
			<!-- 商品栏 -->
			<view class="goods-bar">
				<view class="goods-bar-item">
					<image src="../../static/images/index/goods-bar-item1.png" mode="widthFix"></image>
				</view>
				<view class="goods-bar-item">
					<image src="../../static/images/index/goods-bar-item2.png" mode="widthFix"></image>
				</view>
				<view class="goods-bar-item">
					<image src="../../static/images/index/goods-bar-item3.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 广告 -->
			<view class="adversing">
				<image src="/static/images/index/adversing.png" mode="widthFix"></image>
			</view>
			<!-- 商品列表 -->
			<view class="goods-list">
				<view class="tab">
					<view @click="changeTabObj(item.id,index)" :class="item.id==currentTabObj?'tab-item-active':'tab-item'" v-for="(item,index) in goodsListTab"
					 :key="index">
						<view class="tab-item-title">{{item.title}}</view>
						<view class="tab-item-prompt">{{item.titleDesc}}</view>
						<view class="tab-item-line"></view>
					</view>
				</view>
				<view class="tab-change-obj">
					<view class="goods" v-for="(goodsItem,goodsIndex) in goodsListObj" :key="goodsIndex">
						<image src="/static/images/index/goods1.png" mode="widthFix"></image>
						<view class="goods-title">
							CANEN 韩国小眼正太 护航
							者儿童座椅 无焊接一体成型
						</view>
						<view class="exchange-btn">
							热门兑换
						</view>
						<view class="goods-msg">
							<view class="left">
								<image src="/static/images/index/integral-icon.png" mode="widthFix"></image>
								<text>2800积分</text>
							</view>
							<view class="right">
								10万<text>+ </text>人兑换
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
		components:{
			tabBar
		},
		data() {
			return {
				// 图片路径
				imageUrl:"",
				// 轮播
				bannerList:[],
				// 导航
				navList:[],
				// 商品列表tab
				goodsListTab: [],
				currentTabObj: 1,
				// 商品列表 obj
				goodsListObj:[],
				goodsListid:0,
				// 底部导航
				tabBarActive: {
					state:1,
				    roundLeft:"14rpx",
					mulchLeft:"14rpx",
					elementLeft:"46rpx"
				}
			}
		},
		created(){
			this.getIndexData();
			this.$nextTick(function(){
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			getIndexData:function(){
				const that = this;
				this.$http("/index/getIndexList",{},"post").then(function(res){
					if(res.statusCode==200){
						console.log("首页数据请求",res);
						// 轮播
						that.bannerList = res.data.indexList.bannerlist;
						// 导航
						that.navList = res.data.indexList.iconlist[0].iconurllist;
						// 商品列表tab
						that.goodsListTab =  res.data.indexList.linklist;
						// 商品列表obj
						that.goodsListObj =  res.data.indexList.linklist[0].commoditylist;
					}
				})
			},
			changeTabObj: function(id,index) {
				this.currentTabObj = id;
				this.goodsListObj = this.goodsListTab[index].commoditylist;
			},
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
			height: 500rpx;
			padding: 0 22rpx;
			background-image: url(../../static/images/index/herder-pic.png);
			background-repeat: no-repeat;
			background-size: 100%;

			.top {
				padding: 22rpx 0;
				display: flex;
				justify-content: space-between;

				.logo {
					width: 140rpx;
					display: flex;

					image {
						max-width: 100%;
						align-self: center;
					}
				}

				.search {

					width: 430rpx;
					height: 60rpx;
					padding: 0 22rpx;
					background-color: #ffffff;
					border-radius: 30rpx;
					border: solid 1rpx #f2f2f2;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.search-icon {
						width: 36rpx;
						display: flex;

						image {
							max-width: 100%;
							align-self: center;

						}
					}

					.search-ipt {
						width: 70%;
					}

					.search-pls {
						font-size: 24rpx;
						color: #a3a3a3;
					}

					.scan {
						width: 36rpx;
						display: flex;

						image {
							max-width: 100%;
							align-self: center;
						}
					}
				}

				.user-pic {
					width: 60rpx;
					display: flex;

					image {
						max-width: 100%;
						align-self: center;
					}
				}
			}

			.swipe-warpper {
				width: 706rpx;
				margin: 0 auto;
			}
		}

		.content {
			box-sizing: border-box;
			width: 100%;
			padding: 0 22rpx;
			padding-bottom: 138rpx;

			.nav {
				box-sizing: border-box;
				width: 100%;
				margin-bottom: 25rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.nav-item {
					width: 25%;
					margin-bottom: 45rpx;
					text-align: center;

					.nav-item-icon {
						width: 100%;

						image {
							max-width: 60rpx;
						}
					}

					text {
						font-size: 26rpx;
						color: #000000;
					}
				}
			}

			.tig-bar {
				box-sizing: border-box;
				width: 706rpx;
				height: 86rpx;
				padding: 0 22rpx;
				background-image: linear-gradient(90deg,
					#ff3f5a 0%,
					#ff8e66 66%),
					linear-gradient(#ffffff,
					#ffffff);
				background-blend-mode: normal,
					normal;
				box-shadow: inset 0rpx 38rpx 0rpx 0rpx rgba(255, 255, 255, 0.25);
				border-radius: 43rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tig-icon {
					width: 44rpx;

					image {
						display: block;
						max-width: 100%;
					}
				}

				.tig-txt {
					width: 85%;
					font-size: 26rpx;
					color: #fff;
					display: flex;
					align-items: center;

					.tig-txt-title {
						margin-right: 40rpx;
					}

					.tig-txt-main {
						width: 70%;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						word-break: break-all;
					}
				}

				.tig-more {
					font-size: 26rpx;
					color: #ff415a;
				}
			}

			.goods-bar {
				width: 100%;
				margin: 70rpx 0 28rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.goods-bar-item {
					width: 225rpx;
					height: 349rpx;
					background-color: #ffffff;
					border-radius: 15rpx;

					image {
						display: block;
						max-width: 100%;
					}
				}
			}

			.adversing {
				width: 100%;
				margin-bottom: 29rpx;

				image {
					width: 100%;
				}
			}

			.goods-list {
				width: 100%;

				.tab {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.tab-item {
						text-align: center;

						.tab-item-title {
							font-size: 30rpx;
							color: #1a1a1a;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							font-weight: bold;
						}

						.tab-item-prompt {
							font-size: 24rpx;
							line-height: 50rpx;
							letter-spacing: -0.2rpx;
							color: #aeaeae;
						}

					}

					.tab-item-active {
						text-align: center;

						.tab-item-title {
							font-size: 38rpx;
							color: #ff8400;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							font-weight: bold;
						}

						.tab-item-prompt {
							font-size: 24rpx;
							line-height: 50rpx;
							letter-spacing: -0.2rpx;
							color: #ff8400;
						}

						.tab-item-line {
							width: 25rpx;
							height: 5rpx;
							background-color: #ff8400;
							border-radius: 2.5rpx;
							margin: 0 auto;
						}
					}
				}

				.tab-change-obj {
					width: 100%;
					margin-top: 30rpx;
					margin-bottom: 17rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.goods {
						box-sizing: border-box;
						width: 345rpx;
						overflow: hidden;
						background-color: #fff;
						border-radius: 15rpx;

						image {
							display: block;
							max-width: 100%;
						}

						.goods-title {
							padding: 22rpx;
							font-size: 24rpx;
							line-height: 32rpx;
							letter-spacing: -0.2rpx;
							color: #000000;
							text-align: justify;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							word-break: break-all;
						}

						.exchange-btn {
							float: left;
							padding: 3rpx 4rpx;
							margin: 0 0 22rpx 22rpx;
							background-color: #ffffff;
							border-radius: 5rpx;
							border: solid 2rpx #e61010;
							font-size: 18rpx;
							line-height: 32rpx;
							color: #e61010;
							text-align: center;
						}

						.goods-msg {
							box-sizing: border-box;
							width: 100%;
							padding: 0 22rpx 22rpx 22rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.left {
								display: flex;
								align-items: center;

								image {
									max-width: 25rpx;
									margin-right: 10rpx;
								}

								text {
									font-size: 20rpx;
									line-height: 36rpx;
									color: #ff8400;
								}
							}

							.right {
								font-size: 20rpx;
								line-height: 36rpx;
								color: #aeaeae;

								text {
									font-size: 16rpx;
									line-height: 36rpx;
									color: #aeaeae;
									position: relative;
									top: -10rpx;
								}
							}
						}
					}
				}
			}
		}

	}
</style>
