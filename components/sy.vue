<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder w100 box-sz pd-l-22 pd-r-22">
			<view class="top dis-flex jf-bw lf-0 tp-0 pd-t-22 pd-b-22">
				<view class="logo dis-flex">
					<image src="/static/images/index/logo.png" mode="widthFix"></image>
				</view>
				<view class="search pd-r-22 pd-l-22 bg-fff dis-flex al-items-center jf-bw bd-r-60">
					<view class="cover" @click="jumpSearch"></view>
					<view class="search-icon dis-flex">
						<image class="search-icon" src="/static/images/index/search-icon.png" mode="widthFix"></image>
					</view>
					<input class="search-ipt" type="text" value="" placeholder="搜索" placeholder-class="search-pls" />
					<view class="scan dis-flex">
						<image class="scan w100" src="/static/images/index/scan.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="user-pic dis-flex">
					<image src="../static/images/index/user-pic.png" mode="widthFix"></image>
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
			<view class="nav dis-flex mg-b-24 flx-w w100 jf-bw">
				<view class="nav-item mg-b-44 txt-center" v-for="(navItem,navIndex) in navList" :key="navIndex">
					<navigator :url="'/pages/goodsList/index?id='+navItem.id" hover-class="none">
						<view class="nav-item-icon w100">
							<image :src="imageUrl+navItem.imgUrl" mode="widthFix"></image>
						</view>
						<text>{{navItem.urlName}}</text>
					</navigator>
				</view>
			</view>
			<!-- 信息栏 -->
			<view class="tig-bar box-sz pd-l-22 pd-r-22 bd-r-42 dis-flex al-items-center jf-bw">
				<uni-notice-bar speed="50" style="width: 100%;height: 100%;padding: 0;margin: 0;" background-color="transparent" color="#fff" moreColor="#ff415a" scrollable="true" showIcon="true" :showGetMore="true" moreText="更多" single="true" :text="systemMsg.msgTitle" @getmore="getmore"></uni-notice-bar>
			</view>
			<!-- 热门推荐 -->
			<view class="goods-bar w100 dis-flex al-items-center jf-bw mg-t-70 mg-b-28">
				<view class="goods-bar-item bg-fff bd-r-14" v-for="(recommendGoodsItem,recommendGoodsIndex) in recommendGoods" :key="recommendGoodsIndex"
				 @click="jumpGoodsDel($event)" :data-id="recommendGoodsItem.id">
					<image class="w100 ds-b" :src="imageUrl+recommendGoodsItem.recommendPic" mode="widthFix"></image>
				</view>
			</view>
			<!-- 广告 -->
			<view class="adversing w100 mg-b-28">
				<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration">
					<block v-for="(item,index) in advList" :key="index">
						<swiper-item>
							<image class="w100" :src="imageUrl+item.salesPic" mode="widthFix"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- 商品列表 -->
			<view class="goods-list">
				<view class="tab w100 dis-flex flx-w jf-bw">
					<view @click="changeTabObj(item.id)" :class="item.id==currentTabObj?'tab-item-active':'tab-item'" v-for="(item,index) in goodsListTab"
					 :key="index">
						<view class="tab-item-title">{{item.title}}</view>
						<view class="tab-item-prompt">{{item.titleDesc}}</view>
						<view class="tab-item-line"></view>
					</view>
				</view>
				<view class="tab-change-obj w100 mg-t-30 mg-b-16 dis-flex flx-w jf-bw">
					<view class="goods box-sz fl-hd bg-fff bd-r-14 mg-b-22" :data-id="goodsItem.id" @click="jumpGoodsDel($event)"
					 v-for="(goodsItem,goodsIndex) in goodsListObj" :key="goodsIndex">
						<view class="goods-pic">
							<image class="ds-b" :src="imageUrl+goodsItem.imgUrl" mode="widthFix"></image>
						</view>
						<view class="goods-title pd-t-22 pd-r-22 pd-b-22 pd-l-22 fon-24 txt-justify txt-clamp-2">
							{{goodsItem.commodityName}}
						</view>
						<view class="exchange-btn fl-l pd-b-2 pd-t-2 pd-l-4 pd-r-4 mg-b-22 mg-l-22 bg-fff bd-r-4 fon-28 col-e61 txt-center">
							热门兑换
						</view>
						<view class="goods-msg box-sz w100 pd-b-22 pd-l-22 pd-r-22 dis-flex al-items-center jf-bw">
							<view class="left dis-flex al-items-center">
								<image class="mg-r-10" src="/static/images/index/integral-icon.png" mode="widthFix"></image>
								<text class="fon-24 col-ff8 txt-clamp-1">{{goodsItem.defaultScore}}积分</text>
							</view>
							<view class="right fon-24 col-aea txt-clamp-1">
								{{goodsItem.salnum}}人兑换
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<!-- <tabBar :tabBarActive="tabBarActive"></tabBar> -->
	</view>
</template>

<script>
	// import tabBar from '../../components/footer.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			// tabBar,
			uniNoticeBar
		},
		data() {
			return {
				// 图片路径
				imageUrl: "",
				// 轮播
				bannerList: [],
				// 导航
				navList: [],
				// 推荐商品
				recommendGoods: [],
				// 商品列表tab
				goodsListTab: [],
				currentTabObj: 1,
				// 商品列表 obj
				goodsListObj: [],
				goodsListid: 0,
				// 广告
				advList:[],
				// 系统消息
				systemMsg:"",
				// 底部导航
				// tabBarActive: {
				// 	state: 1,
				// 	roundLeft: "14rpx",
				// 	mulchLeft: "14rpx",
				// 	elementLeft: "46rpx"
				// },
				autoplay: true,
				interval: 2000,
				duration: 500,
				//获取用户信息
				getusers:{}
			}
		},
		created(options) {
			// this.login(options);
			this.initIndexData();
			this.initGoodsData();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			//授权登录
			login:function(options){
				const that = this;
				this.$http("/users/saveUsers",{
					"code":options.code
				},"post").then(function(res){
					if(res.data.status=="success"){
						console.log(res);
						sessionStorage.setItem("getuser",res.data.getuser);
						that.getusers=JSON.parse(JSON.stringify(res.data.getuser))
					}
				}) 
			},
			// 首页数据
			initIndexData: function() {
				const that = this;
				this.$http("/index/getIndexList", {}, "post").then(function(res) {
					if (res.statusCode == 200) {
						console.log("首页数据请求", res);
						// 轮播
						that.bannerList = res.data.indexList.bannerlist;
						// 导航
						that.navList = res.data.indexList.iconlist[0].iconurllist;
						// 推荐商品
						that.recommendGoods = res.data.indexList.recommendlist;
						// 商品列表栏
						that.goodsListTab = res.data.indexList.linklist;
						// 广告
						that.advList = res.data.indexList.saleslist;
						// 系统消息
						that.systemMsg =  res.data.indexList.msglist[0];
					}
				})
			},
			// tab切换
			changeTabObj: function(id) {
				this.currentTabObj = id;
				this.initGoodsData(id);
			},
			// 商品列表
			initGoodsData: function(id = 1) {
				const that = this;
				that.$http("/index/getLiklistId", {
					id: id
				}, "post").then(function(res) {
					console.log("商品列表数据", res);
					if (res.statusCode == 200) {
						that.goodsListObj = res.data.getindex.commoditylist;
					}
				})
			},
			// 详情跳转
			jumpGoodsDel: function(event) {
				let id = event.currentTarget.dataset.id;
				uni.navigateTo({
					url: "/pages/goodsDetail/index?id=" + id
				})
			},
			// 搜索跳转
			jumpSearch: function() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			// 系统信息
			getmore:function(){
				uni.navigateTo({
					url:'/pages/notice/index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	// page {
	// 	background-color: #f6f6f6;
	// }

	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.herder {
			height: 500rpx;
			background-image: url(../static/images/index/herder-pic.png);
			background-repeat: no-repeat;
			background-size: 100%;

			.logo {
				width: 140rpx;

				image {
					max-width: 100%;
					align-self: center;
				}
			}

			.search {

				width: 430rpx;
				height: 60rpx;
				border: solid 1rpx #f2f2f2;
				position: relative;

				.cover {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					z-index: 999;
				}

				.search-icon {
					width: 36rpx;

					image {
						max-width: 100%;
						align-self: center;
					}
				}

				.search-ipt {
					width: 81%;
				}

				.search-pls {
					font-size: 24rpx;
					color: #a3a3a3;
				}

				.scan {
					width: 36rpx;

					image {
						align-self: center;
					}
				}
			}

			.user-pic {
				width: 60rpx;

				image {
					max-width: 100%;
					align-self: center;
				}
			}

			.swipe-warpper {
				width: 706rpx;
				height: 284rpx;
				margin: 0 auto;
				.swiper-item{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%!important;
						border-radius: 30rpx;
					}
				}
			}
		}

		.content {
			box-sizing: border-box;
			width: 100%;
			padding: 0 22rpx;
			padding-bottom: 138rpx;

			.nav-item {
				width: 25%;

				image {
					max-width: 60rpx;
				}

				text {
					font-size: 26rpx;
					color: #000000;
				}
			}

			.tig-bar {
				width: 706rpx;
				height: 86rpx;
				background-image: linear-gradient(90deg,
					#ff3f5a 0%,
					#ff8e66 66%),
					linear-gradient(#ffffff,
					#ffffff);
				background-blend-mode: normal,
					normal;
				box-shadow: inset 0rpx 38rpx 0rpx 0rpx rgba(255, 255, 255, 0.25);

				.tig-icon {
					width: 44rpx;

					image {
						display: block;
						max-width: 100%;
					}
				}

				.tig-txt {
					width: 85%;

					.tig-txt-main {
						width: 70%;
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

			.goods-bar-item {
				width: 225rpx;
				height: 349rpx;
			}
             .adversing{
				 height: 210rpx;
				 .swiper{
				 	width: 100%;
				 	height: 100%;
				 	image{
				 		width: 100%;
				 		height: 100%!important;
				 	}
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
					.goods {
						width: 345rpx;

						.goods-pic {
							width: 100%;
							height: 346rpx;

							image {
								width: 100%;
								height: 100% !important;
							}
						}

						.goods-title {
							line-height: 32rpx;
							letter-spacing: -0.2rpx;
						}

						.exchange-btn {
							border: solid 2rpx #e61010;
							line-height: 32rpx;
						}

						.left {
							image {
								max-width: 25rpx;
							}

							text {
								line-height: 36rpx;
							}
						}

						.right {
							line-height: 36rpx;
						}
					}
				}
			}
		}

	}
</style>
