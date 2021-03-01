<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<block v-if="userpic.userpic">
				<view class="user-pic">
					<image :src="userpic.userpic" mode="widthFix"></image>
				</view>
			</block>
			<view class="title">
				我的发现
			</view>
			<view class="search" @click="jumpSearch">
				<view class="icon">
					<image src="../../static/images/collec/search-icon.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 关注动态 -->
			<view :class="dynamic==true?'focus-state-module-active':'focus-state-module'">
				<block v-if="foundBusiness.length>0">
					<view class="title">
						发现你关注的平台更新了动态哦 !
					</view>
					<view class="main">
						<view class="brand">
							<view class="brand-more" @click="moreDynamicOpen" :style="dynamic==false?'display:block':'display:none'">
								<image src="/static/images/found/brand-more.png" mode="widthFix"></image>
							</view>
							<block v-for="(item,index) in foundBusiness">
								<view class="brand-logo-item">
									<view class="cover" :data-id="index" @click="businessChange"></view>
									<view class="brand-logo">
										<image :src="imageUrl+item.supperLogo" mode="widthFix"></image>
									</view>
								</view>
							</block>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="txt-center fon-30 col-aea" style="line-height: 176rpx;">
						亲，暂无相关数据哦！
					</view>
				</block>
			</view>
			<!-- 指向 -->
			<view class="point-to">
				<view class="point-to-icon" @click="moreDynamicClose" :style="dynamic==true?'transform:rotate(180deg);':'transform:rotate(0deg)'">
					<image src="/static/images/found/point-to.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 指向内容 -->
			<block v-if="foundBusiness.length>0">
				<view class="point-to-main">
					<view class="top">
						<view class="business-logo">
							<image :src="imageUrl+foundBusiness[currentBusiness].supplierShowPic" mode="widthFix"></image>
						</view>
					</view>
					<view class="goods-box dis-flex al-items-center">
						<block v-for="(goodsItem,goodsIndex) in foundBusiness[currentBusiness].commoditylist">
							<view class="goods mg-r-22">
								<view class="cover" :data-id="goodsItem.id" @click="jumpGoodsDel"></view>
								<view class="goods-icon">
									<image :src="imageUrl+goodsItem.imgUrl" mode="widthFix"></image>
								</view>
								<view class="goods-title txt-clamp-1">
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
						</block>
					</view>
				</view>
			</block>
			<!-- 更多关注 -->
			<view class="tab">
				<view class="tab-item" v-for="item in tabItem" :key="item.id" @click="changeTabObj">{{item.txt}}</view>
			</view>
			<view class="tab-obj">
				<block v-if="systemRcm.length>0">
					<block v-for="(item,index) in systemRcm">
						<view class="tab-obj-item">
							<view class="business">
								<view class="business-logo">
									<image :src="imageUrl+item.supplierShowPic" mode="widthFix"></image>
								</view>
								<view :data-id="item.id" class="focusOn" @click="clickFocus">
									关注
								</view>
							</view>
							<view class="adversing">
								<image :src="imageUrl+item.tjpic" :data-id="item.tjcomid" @click="jumpGoodsDel" mode="widthFix"></image>
							</view>
							<view class="goods-data">
								<view class="left">
									<view class="goods-get">
										<view class="goods-get-icon">
											<image src="/static/images/collec/goods-get-icon.png" mode="widthFix"></image>
										</view>
										<text>{{item.salnum}}人已领</text>
									</view>
								</view>
								<view class="right">
									<view class="like">
										<view class="like-icon">
											<view class="cover" :data-id="item.id" :data-islike="item.ishasLike" @click="giveLike"></view>
											<block v-if="item.ishasLike>0">
												<image src="/static/images/collec/like-icon-active.png" mode="widthFix"></image>
											</block>
											<block v-else>
												<image src="/static/images/collec/like-icon.png" mode="widthFix"></image>
											</block>
										</view>
										<text>{{item.goodsuppercount}}</text>
										<text>点赞</text>
									</view>
									<!-- #ifdef MP-WEIXIN -->
									<view class="share">
										<view class="share-icon">
											<image src="/static/images/collec/share-icon.png" mode="widthFix"></image>
										</view>
										<text>分享</text>
									</view>
									<!--  #endif -->
								</view>
							</view>
						</view>
					</block>
				</block>
				<block v-else>
					<view class="no-content">
						<image src="../../static/images/no_content.png" mode=""></image>
						<view class="txt">亲,暂无相关数据哦!</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 消息提示 -->
		<mpopup ref="msgPopup" :isdistance="true"></mpopup>
		<!-- 底部导航 -->
		<tabBar :tabBarActive="tabBarActive"></tabBar>
	</view>
</template>

<script>
	import tabBar from '../../components/footer.vue';
	import mpopup from 'components/xuan-popup/xuan-popup.vue';
	export default {
		components: {
			tabBar,
			mpopup
		},
		data() {
			return {
				// 图片路径
				imageUrl: "",
				dynamic: false,
				tabItem: [{
					txt: "推荐",
					id: "1"
				}],
				// 底部导航
				tabBarActive: {
					state: 3,
					roundLeft: "316rpx",
					mulchLeft: "316rpx",
					elementLeft: "346rpx"
				},
				// 我的发现
				foundBusiness: [],
				currentBusiness: 0,
				// 系统推荐
				systemRcm: [],
				// 获取头像
				userpic: ""
			}
		},
		onLoad() {
			this.initFoundData();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			moreDynamicOpen: function() {
				this.dynamic = true;
			},
			moreDynamicClose: function() {
				this.dynamic = false;
			},
			// 我的发现
			initFoundData: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				that.userpic = uni.getStorageSync('wxUserInfo');
				that.$http('/dynamic/getUserDynamicList', {
					belongUserId: userid.id
				}, 'post').then(function(res) {
					console.log("我的发现", res);
					if (res.statusCode == 200) {
						that.foundBusiness = res.data.usersFollowByList;
						that.systemRcm = res.data.commoditySupplierByList;
					}
				})
			},
			// 商家切换
			businessChange: function(e) {
				console.log("e", e);
				let id = e.target.dataset.id;
				this.currentBusiness = id;
			},
			// 关注
			clickFocus: function(e) {
				const that = this;
				let id = e.target.dataset.id;
				let userid = uni.getStorageSync('wxUserInfo');
				that.$http('/users/saveFollow', {
					followSupperId: id,
					belongUserId: userid.id
				}, 'post').then(function(res) {
					if (res.statusCode == 200) {
						that.$refs.msgPopup.open({
							type: 'warn',
							content: '亲，关注成功哦！',
							timeout: 3000,
							isClick: false
						});
						that.initFoundData()
					}
				})
			},
			// 点赞
			giveLike: function(e) {
				const that = this;
				let id = e.target.dataset.id;
				let islike = e.target.dataset.islike;
				let userid = uni.getStorageSync('wxUserInfo');
				this.$http('/users/setSupplierGood', {
					userid: userid.id,
					id: id,
					ishasLike: Number(islike)
				}, 'post').then(function(res) {
					console.log('点赞', res);
					if (res.statusCode == 200) {
						that.initFoundData()
					}
				})
			},
			// 搜索跳转
			jumpSearch: function() {
				uni.navigateTo({
					url: "/pages/search/index"
				})
			},
			// 商品详情
			jumpGoodsDel: function(e) {
				let id = e.target.dataset.id;
				uni.navigateTo({
					url: "/pages/goodsDetail/index?id=" + id
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
							position: relative;

							.cover {
								position: absolute;
								top: 0;
								right: 0;
								bottom: 0;
								left: 0;
								z-index: 99;
							}

							.brand-logo {
								width: 100rpx;
								height: 100rpx;

								image {
									display: block;
									width: 100%;
									height: 100% !important;
									border-radius: 50%;
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
						width: 290rpx;
						height: 44rpx;

						image {
							max-width: 100%;
							max-height: 44rpx;
						}
					}
				}

				.goods-box {
					white-space: nowrap;
					overflow-y: hidden;
					overflow-x: scroll;

					&::-webkit-scrollbar {
						display: none
					}

					.goods {
						width: 170rpx;
						position: relative;

						.cover {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							z-index: 1;
						}

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
							font-size: 28rpx;
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
								font-size: 26rpx;
								color: #ff8400;
							}
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


			.tab-obj-item {
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
						width: 290rpx;
						height: 44rpx;

						image {
							max-width: 100%;
							max-height: 100%;
						}
					}

					.focusOn {
						width: 88rpx;
						height: 33rpx;
						background-color: #f1351b;
						border-radius: 5rpx;
						font-size: 28rpx;
						line-height: 32rpx;
						letter-spacing: -0.2rpx;
						color: #ffffff;
						text-align: center;
					}
				}

				.adversing {
					width: 662rpx;
					height: 250rpx;
					margin-top: 15rpx;

					image {
						display: block;
						width: 100%;
						border-radius: 8rpx;
						height: 100% !important;
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
								font-size: 26rpx;
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
								position: relative;

								.cover {
									position: absolute;
									top: 0;
									right: 0;
									bottom: 0;
									left: 0;
									z-index: 1;
								}

								image {
									display: block;
									width: 100%;
								}
							}

							text {
								font-size: 26rpx;
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
