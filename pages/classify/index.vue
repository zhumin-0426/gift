<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder box-sz w100 pd-t-22 pd-r-22 pd-b-22 pd-l-22 bg-no-r">
			<view class="search dis-flex al-items-center jf-bw">
				<view class="cover" @click="jumpSearch"></view>
				<view class="integral-barter box-sz pd-r-22 pd-l-22 dis-flex al-items-center jf-bw bg-fff bd-r-30">
					<view class="search-icon mg-r-10">
						<image class="w100" src="/static/images/all-classify/search-icon.png" mode="widthFix"></image>
					</view>
					<input class="fon-24 col-333" type="text" value="" placeholder="积分换物" placeholder-class="search-pls" />
					<!-- <view class="scan-icon">
						<image class="w100" src="../../static/images/all-classify/scan.png" mode="widthFix"></image>
					</view> -->
				</view>
				<view class="integral-line dis-flex al-items-center fon-12 col-fff">
					<view class="integral-time integral-start-time box-sz bg-fff bd-r-30">
						<input class="ds-b w100 fon-24 col-333 txt-center" type="text" value="" placeholder="积分起点" placeholder-class="integral-line-pls" />
					</view>
					-
					<view class="integral-time integral-end-time box-sz bg-fff bd-r-30">
						<input class="ds-b w100 fon-24 col-333 txt-center" type="text" value="" placeholder="积分止点" placeholder-class="integral-line-pls" />
					</view>
					<view class="btn fon-28">搜索</view>
				</view>
			</view>
		</view>
		<view class="content pos-r">
			<!-- 侧边栏 -->
			<view class="side-bar pos-f bt-0 lf-0 fl-hd">
				<view class="side-bar-title dis-flex bg-fff pos-a tp-0 lf-0">
					<image class="mg-r-14" src="../../static/images/all-classify/title-icon.png" mode="widthFix"></image>
					<text class="fon-26 col-f13">推荐分类</text>
				</view>
				<view class="side-bar-box pos-a tp-0 lf-0 bt-0">
					<block v-for="(item,index) in sideBarList">
						<view :class="leftCurrentVal==index?'side-bar-item-active':'side-bar-item'" @click="sideBarChange" :data-id="index">{{item.urlName}}</view>
					</block>
				</view>
			</view>
			<!-- 分类商品 -->
			<view class="classify-goods box-sz pd-r-22 pos-a tp-0 rt-0">
				<!-- 轮播 -->
				<view class="adversing w100 fl-hd bd-r-14 fl-hd">
					<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000">
						<block v-if="sideBarList.length>0">
							<block v-for="(item,index) in sideBarList[leftCurrentVal].commodityKindlist[rightCurrentVal].imglist" :key="index">
								<swiper-item>
									<image :src="imageUrl+item" mode="widthFix"></image>
								</swiper-item>
							</block>
						</block>
					</swiper>
				</view>
				<!-- tab 商品分类 右 -->
				<view class="tab w100 dis-flex ">
					<block v-if="sideBarList.length>0">
						<block v-for="(item,index) in sideBarList[leftCurrentVal].commodityKindlist">
							<view :class="rightCurrentVal==index?'tab-item-active': 'tab-item'">
								<view class="cover" @click="changeTabObj" :data-id="index"></view>
								<view class="tab-item-txt fon-26 col-1a1">{{item.kindName}}</view>
								<view class="tab-item-line"></view>
							</view>
						</block>
					</block>
				</view>
				<view class="tab-obj pos-f bt-0 rt-0">
					<view class="goods-box w100 pos-a tp-0 bt-0">
						<block v-if="sideBarList.length>0">
							<block v-for="(item,index) in sideBarList[leftCurrentVal].commodityKindlist[rightCurrentVal].commoditylist" :key="index">
								<view class="goods w100 dis-flex jf-bw">
									<view class="cover" @click="jumpGoodsDel" :data-id="item.id"></view>
									<view class="goods-pic">
										<image :src="imageUrl+item.imgUrl" mode="widthFix"></image>
									</view>
									<view class="goods-msg">
										<view class="title fon-28 txt-justify txt-clamp-2">{{item.commodityName}} {{item.commodityDescribe}}</view>
										<view class="num ds-il-b pd-t-6 pd-b-6 pd-l-10 pd-r-10 fon-24 col-f13 txt-center bg-fff bd-r-10">限量
											{{item.maxNumber}} 份</view>
										<view class="integral w100 dis-flex al-items-center jf-bw">
											<view class="left fon-34 fon-w-b col-f13 dis-flex al-items-center"><text class="ds-b">{{item.defaultScore}}</text><text
												 class="ds-b fon-24 mg-l-12">积分</text></view>
											<view class="right fon-24 col-aea">{{item.salnum}}人已领</view>
										</view>
									</view>
								</view>
							</block>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- <tabBar :tabBarActive="tabBarActive"></tabBar> -->
	</view>
</template>

<script>
	// import tabBar from '../../components/footer.vue'
	export default {
		components: {
			// tabBar
		},
		data() {
			return {
				// 图片路径
				imageUrl: "",
				sideBarList: [],
				leftCurrentVal: 0,
				rightCurrentVal: 0,
				// 底部导航
				tabBarActive: {
					state: 2,
					roundLeft: "168rpx",
					mulchLeft: "168rpx",
					elementLeft: "198rpx"
				}
			}
		},
		onLoad() {
			this.initClassifyData();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			initClassifyData: function() {
				const that = this;
				that.$http('/commodity/getAllCommodityKind', {}, 'post').then(function(res) {
					console.log("商品分类数据初始化", res);
					that.sideBarList = res.data.allKind;
					console.log(that.sideBarList[0].commodityKindlist)
				})
			},
			// 左边侧边栏
			sideBarChange: function(e) {
				console.log("e", e)
				let id = e.target.dataset.id;
				this.leftCurrentVal = id;
			},
			// 属性切换
			changeTabObj: function(e) {
				console.log('e', e)
				let id = e.target.dataset.id;
				this.rightCurrentVal = id;
			},
			// 搜索跳转
			jumpSearch: function() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			// 商品详情跳转
			jumpGoodsDel: function(e) {
				let id = e.target.dataset.id;
				uni.navigateTo({
					url: '/pages/goodsDetail/index?id=' + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.herder {
			height: 308rpx;
			background-image: url(../../static/images/all-classify/classify-container-pic.png);
			background-size: 100% 308rpx;


			.search {
				position: relative;

				.cover {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 999;
				}

				.integral-barter {
					width: 300rpx;
					height: 60rpx;
					border: solid 1rpx #f2f2f2;

					.search-icon {
						width: 35rpx;
					}

					.scan-icon {
						width: 35rpx;
					}
				}
			}

			.integral-time {
				width: 130rpx;
				height: 56rpx;
				margin: 0 25rpx 0 10rpx;

				input {
					height: inherit;
					line-height: 60rpx;
				}

				.integral-line-pls {
					font-size: 24rpx;
					color: #a3a3a3;
				}
			}

		}

		.content {
			top: -135rpx;

			.side-bar {
				width: 213rpx;
				top: 250rpx;
				overflow: hidden;

				.side-bar-title {
					padding: 0 0 32rpx 32rpx;
					z-index: 999;

					image {
						width: 34rpx;
					}
				}

				.side-bar-box {
					padding-top: 64rpx;
					z-index: 90;
					overflow-y: auto;
					padding-bottom: 108rpx;
					-webkit-overflow-scrolling: touch;


					.side-bar-item {
						width: inherit;
						padding: 32rpx 0 32rpx 32rpx;
						font-size: 26rpx;
						box-sizing: border-box;
					}

					.side-bar-item-active {
						width: inherit;
						padding: 32rpx 0 32rpx 32rpx;
						font-size: 26rpx;
						color: #f1351b;
						box-sizing: border-box;
					}

					&::-webkit-scrollbar {
						display: none
					}
				}
			}

			.classify-goods {
				width: 537rpx;

				.adversing {
					height: 170rpx;

					.swiper {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100% !important;
						}
					}
				}

				.tab {
					white-space: nowrap;
					overflow-y: hidden;
					overflow-x: scroll;

					&::-webkit-scrollbar {
						display: none;
					}

					.tab-item {
						padding: 36rpx 44rpx 62rpx 0;
						position: relative;

						.cover {
							position: absolute;
							top: 0;
							left: 0;
							bottom: 0;
							right: 0;
						}
					}

					.tab-item-active {
						padding: 36rpx 44rpx 62rpx 0;
						position: relative;

						.cover {
							position: absolute;
							top: 0;
							left: 0;
							bottom: 0;
							right: 0;
						}

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
					top: 480rpx;

					.goods-box {
						z-index: 90;
						right: 22rpx;
						overflow-y: auto;
						padding-bottom: 108rpx;
						-webkit-overflow-scrolling: touch;

						.goods {
							margin-bottom: 43rpx;
							position: relative;

							.cover {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								z-index: 999;
							}

							.goods-pic {
								width: 160rpx;
								height: 160rpx;
								border-radius: 15rpx;

								image {
									width: 100%;
									height: 100% !important;
								}
							}

							.goods-msg {
								width: 292rpx;

								.title {
									line-height: 32rpx;
								}

								.num {
									margin: 10rpx 0 22rpx 0;
									border: solid 1rpx #f1341b;
									line-height: 32rpx;
								}

								.integral {
									width: 100%;
									display: flex;
									align-items: center;
									justify-content: space-between;

									.left {
										line-height: 32rpx;

										text:last-child {
											font-weight: normal;
										}
									}

									.right {
										line-height: 32rpx;
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
