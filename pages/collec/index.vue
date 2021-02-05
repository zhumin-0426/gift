<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="content">
			<block v-if="collecList.length>0">
				<block v-for="(item,index) in collecList" :key="index">
					<view class="collec-item">
						<view class="business">
							<view class="business-logo">
								<image :src="imageUrl+item.commodityVO.logo" mode="widthFix"></image>
							</view>
							<view class="calcel-collec" :data-id="item.id" @click="removeCollec">
								取消收藏
							</view>
						</view>
						<view class="adversing">
							<image :src="imageUrl+item.commodityVO.imglist[0].imgUrl" mode="widthFix"></image>
						</view>
						<view class="goods-data">
							<view class="left">
								<view class="goods-get">
									<view class="goods-get-icon">
										<image src="/static/images/collec/goods-get-icon.png" mode="widthFix"></image>
									</view>
									<text>{{item.commodityVO.salnum}}人已领</text>
								</view>
							</view>
							<view class="right">
								<block v-if="item.commodityVO.isgood>0">
									<view class="like-active">
										<view class="like-icon">
											<image :data-isgood="item.commodityVO.isgood" :data-id="item.commodityVO.id" @click="giveLike" src="/static/images/collec/like-icon-active.png"
											 mode="widthFix"></image>
										</view>
										<text>{{item.commodityVO.goodcount}}</text>
										<text>点赞</text>
									</view>
								</block>
								<block v-else>
									<view class="like">
										<view class="like-icon">
											<image :data-isgood="item.commodityVO.isgood" :data-id="item.commodityVO.id" @click="giveLike" src="/static/images/collec/like-icon.png"
											 mode="widthFix"></image>
										</view>
										<text>{{item.commodityVO.goodcount}}</text>
										<text>点赞</text>
									</view>
								</block>
								<!-- #ifdef MP-WEIXIN -->
								<view class="share" @click="shareOpen">
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
			return {
				// 图片路径
				imageUrl: "",
				collecList: []
			}
		},
		onLoad() {
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
			this.initCollecData();
		},
		methods: {
			shareOpen() {
				this.$refs.popup.open()
			},
			shareClose() {
				this.$refs.popup.close()
			},
			// 我的收藏
			initCollecData: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				this.$http('/users/getUserCollect', {belongUserId:userid.id}, 'post').then(function(res) {
					if (res.data.status == 'success') {
						that.collecList = res.data.userCollectByList
					}
				})
			},
			// 取消收藏
			removeCollec: function(e) {
				const that = this;
				const id = e.target.dataset.id;
				that.$http('/users/cancelUserCollect', {
					id: id
				}, 'post').then(function(res) {
					that.initCollecData();
				})
			},
			// 点赞
			giveLike: function(e) {
				console.log("a")
				const that = this;
				const id = e.target.dataset.id;
				const isgood = e.target.dataset.isgood;
				let userid = uni.getStorageSync('wxUserInfo');
				that.$http('/users/setCollectGood', {
					collectCommodityId: Number(id),
					userid:userid.id,
					isgood:Number(isgood)
				}, 'post').then(function(res) {
					console.log("res",res)
					that.initCollecData();
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
						width: 44rpx;
						height: 44rpx;

						image {
							display: block;
							width: 44rpx;
							height: 44rpx;
						}
					}

					.calcel-collec {
						padding: 5rpx 10rpx;
						height: 33rpx;
						background-color: #aeaeae;
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
					border-radius: 8rpx;
					margin-top: 15rpx;
					overflow: hidden;

					image {
						display: block;
						width: 100%;
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
								// height: 29rpx;
								margin-right: 12rpx;

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

						.like-active {
							display: flex;
							align-items: center;
							margin-right: 34rpx;

							.like-icon {
								width: 34rpx;
								// height: 29rpx;
								margin-right: 12rpx;

								image {
									display: block;
									width: 100%;
								}
							}

							text {
								font-size: 26rpx;
								color: #FF0000;
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
