<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="top display-flex">
				<view class="previou" @click="backPage">
					<image src="/static/images/goods-detail/previou.png" mode="widthFix"></image>
				</view>
				<view class="nav-list" @click="openSubmenu">
					<image src="/static/images/goods-detail/nav-list.png" mode=""></image>
				</view>
			</view>

			<view class="banner">
				<swiper style="height: 1050rpx;" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(bannerItem,bannerIndex) in bannerList" :key="bannerIndex">
						<image :src="imageUrl+bannerItem.imgUrl" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<view :class="navList==true?'submenu-active':'submenu'">
				<navigator url="/pages/index/index" hover-class="none">
					<view class="item">
						<view class="item-icon">
							<image src="/static/images/goods-detail/submenu-index.png" mode="widthFix"></image>
						</view>
						<text>首页</text>
					</view>
				</navigator>
				<navigator url="/pages/car/index" hover-class="none">
					<view class="item">
						<view class="item-icon">
							<image src="/static/images/goods-detail/submenu-car.png" mode="widthFix"></image>
						</view>
						<text>购物车</text>
					</view>
				</navigator>
				<navigator url="/pages/user/index" hover-class="none">
					<view class="item">
						<view class="item-icon">
							<image src="/static/images/goods-detail/submenu-user.png" mode="widthFix"></image>
						</view>
						<text>个人中心</text>
					</view>
				</navigator>
			</view>
		</view>
		<view class="content">
			<view class="goods-msg">
				<view class="top">
					<view class="title">{{goodsDetailData.commodityDescribe}}
						<view class="goods-limited-num">
							限量{{goodsDetailData.maxNumber}}套
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
							{{goodsDetailData.defaultScore}}
						</view>
						<view class="integral-unit">
							积分
						</view>
					</view>
					<view class="goods-num">
						剩余{{goodsDetailData.leftNum}}套
					</view>
				</view>
				<view class="bottom">
					<view class="progress">
						<view class="progress-prompt">
							{{goodsDetailData.salnum}}人已领
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
				<view class="html" v-html="goodsDetailData.commodityDetail">

				</view>
			</view>
		</view>
		<view class="footer">
			<view class="link-bar">
				<navigator url="/pages/index/index" hover-class="none">
					<view class="shop block">
						<view class="shop-icon block-icon">
							<image src="/static/images/goods-detail/shop.png" mode="widthFix"></image>
						</view>
						<view class="name">店铺</view>
					</view>
				</navigator>
				<navigator url="" hover-class="none">
					<view class="service block">
						<view class="service-icon block-icon">
							<image src="/static/images/goods-detail/service.png" mode="widthFix"></image>
						</view>
						<view class="name">客服</view>
					</view>
				</navigator>
				<navigator url="/pages/car/index" hover-class="none">
					<view class="car block">
						<view class="round">0</view>
						<view class="car-icon block-icon">
							<image src="/static/images/goods-detail/car.png" mode="widthFix"></image>
						</view>
						<view class="name">购物车</view>
					</view>
				</navigator>
			</view>
			<view class="add-car-btn" @click="openPopup('addCar')">
				加入购物车
			</view>
			<view class="exchange-btn" @click="openPopup('exchange')">
				立即兑换
			</view>
		</view>
		<!-- 立即兑换 -->
		<uni-popup ref="exchangePopup" type="bottom" style="z-index: 2;">
			<view class="exchangeWarpper">
				<view class="top">
					<view class="delete-icon" @click="closePopup">
						<image src="/static/images/goods-detail/delete.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="goods-msg">
					<view class="goods-icon">
						<image src="/static/images/goods-detail/goods-icon.png" mode="widthFix"></image>
					</view>
					<view class="exchange-msg">
						<view class="integral">
							<text>6000</text><text>积分</text>
						</view>
						<view class="title">
							绿恒源 全棉印花四件套 HYX-020TJ 绿罗伊
						</view>
					</view>
				</view>
				<view class="goods-atr">
					<view class="atr" v-for="(item,index) in goodsModul" :key="index">
						<view class="title">
							{{item.modelName}}
						</view>
						<view class="tab" v-if="updata">
							<view class="tab-item" v-for="(modelItem,modelIndex) in item.childrenlist" :key="modelIndex" :class="modelItem.checked?'active':''"
							 @click="atrChage($event)" ref="tabItem" :data-itemIndex="index" :data-attrIndex="modelIndex">
								{{modelItem.modelName}}
							</view>
						</view>
					</view>
					<view class="num">
						<view class="title">
							兑换数量
						</view>
						<view class="num-change">
							<view class="reduce" @click="goodsNumReduce">-</view>
							<input type="text" :value="goodsNum" />
							<view class="add" @click="goodsNumAdd">+</view>
						</view>
					</view>
				</view>
				<view class="confirm" @click="confirmGoods">确定</view>
			</view>
		</uni-popup>
		<!-- 分享 -->
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
		<!-- 消息提示 -->
		<mpopup ref="msgPopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from 'components/xuan-popup/xuan-popup.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			mpopup
		},
		data() {
			return {
				navList: false,
				goodsDetailData: {},
				bannerList: [],
				imageUrl: "",
				selType: "",
				goodsModul: [],
				goods_spec_arr: [],
				goodsNum: 1,
				goodsId: "",
				updata: true
			}
		},
		onLoad(option) {
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
			this.goodsId = option.id;
			this.getDetailData(option.id)
		},
		methods: {
			// 返回上一页
			backPage: function() {
				this.$router.go(-1)
			},
			// 小视窗
			openSubmenu: function() {
				this.navList = !this.navList
			},
			// 底部窗口
			openPopup: function(type) {
				this.$refs.exchangePopup.open();
				this.selType = type;
				this.getGoodsModel();

			},
			closePopup: function() {
				this.$refs.exchangePopup.close()
			},
			// 分享
			shareOpen: function() {
				this.$refs.popup.open()
			},
			shareClose: function() {
				this.$refs.popup.close()
			},
			// 获取详情数据
			getDetailData: function(id) {
				const that = this;
				this.$http("/commodity/getCommodity", {
					id: id
				}, "post").then(function(res) {
					console.log(res);
					if (res.data.status == "success") {
						that.goodsDetailData = res.data.commodityById;
						// 轮播
						that.bannerList = res.data.commodityById.imglist;
					}
				})
			},
			// 属性切换
			atrChage: function(event) {
				let itemindex = event.currentTarget.dataset.itemindex,
					attrindex = event.currentTarget.dataset.attrindex,
					goodsModul = this.goodsModul;
				for (let i in goodsModul) {
					for (let j in goodsModul[i].childrenlist) {
						if (itemindex == i) {
							goodsModul[i].childrenlist[j].checked = false;
							if (attrindex == j) {
								goodsModul[i].childrenlist[attrindex].checked = true;
								this.goods_spec_arr[i] = goodsModul[i].childrenlist[attrindex].belongModelId;
							}
						}
					}
				}
				this.updata = false;
				this.updata = true;
				this.goodsModul = goodsModul;
			},
			// 商品数量减少
			goodsNumReduce: function() {
				--this.goodsNum
				if (this.goodsNum < 1) {
					this.$refs.msgPopup.open({
						type: 'warn',
						content: '亲，数量最小为1哦！',
						timeout: 3000,
						isClick: false
					});
					this.goodsNum = 1
				}
			},
			// 商品数量增加
			goodsNumAdd: function() {
				++this.goodsNum
			},
			// 商品型号
			getGoodsModel: function() {
				const that = this;
				this.$http("/commodity/getCommodityModel", {
					belongCommodityId: that.goodsDetailData.id
				}, "post").then(function(res) {
					console.log("商品型号", res);
					if (res.data.status == "success") {
						that.goodsModul = res.data.modelList;
						// 商品属性初始化
						for (let i in that.goodsModul) {
							for (let j in that.goodsModul[i].childrenlist) {
								if (j < 1) {
									that.goodsModul[i].childrenlist[0].checked = true;
									that.goods_spec_arr[i] = that.goodsModul[i].childrenlist[0].belongModelId;
								}
							}
						}
					}
				})
			},
			// 确定按钮
			confirmGoods: function() {
				console.log(this.$refs.tabItem);
				let tabItem = this.$refs.tabItem;
				let modelId = Number(tabItem.pop().$el.dataset.id);
				console.log(modelId)
				const that = this;
				switch (this.selType) {
					case "addCar":
						this.$http("/commodity/saveShopCar", {
							belongCommodityId: that.goodsDetailData.id,
							belongArgId: modelId,
							belongSupperId: that.goodsDetailData.commoditySupplier,
							carNum: that.goodsNum
						}, "post").then(function(res) {
							console.log("加入购物车", res)
						})
						break;
					case "exchange":
						uni.navigateTo({
							url: "/pages/confirmOrder/index?goodsNum=" + that.goodsNum + '&modelId=' + modelId + '&goodsId=' + that.goodsId
						})
						break;
					default:
						throw new Error("confirm event error")
				}
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
				z-index: 1;
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
					height: 40rpx;

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
				padding-bottom: 138rpx;

				.title {
					box-sizing: border-box;
					width: 100%;
					padding: 43rpx 33rpx;
				}
			}
		}

		.footer {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #fff;
			display: flex;
			z-index: 2;

			.link-bar {
				box-sizing: border-box;
				width: 40%;
				padding: 22rpx 14rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.block {
					.block-icon {
						width: 50rpx;
						height: 50rpx;
						margin-bottom: 12rpx;

						image {
							display: block;
							width: 100%;
						}
					}

					.name {
						font-size: 24rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 32rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
					}
				}

				.car {
					position: relative;

					.round {
						position: absolute;
						width: 25rpx;
						height: 25rpx;
						background-color: #ff0000;
						font-size: 20rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 32rpx;
						letter-spacing: 0rpx;
						color: #ffffff;
						border-radius: 50%;
						text-align: center;
						line-height: 25rpx;
						left: 38rpx;
						top: -6rpx;
						z-index: 99;
					}
				}
			}

			.add-car-btn {
				width: 30%;
				background-color: #ff4800;
				font-size: 36rpx;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0rpx;
				color: #ffffff;
				text-align: center;
				line-height: 138rpx;
			}

			.exchange-btn {
				width: 30%;
				background-color: #ff8500;
				font-size: 36rpx;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0rpx;
				color: #ffffff;
				text-align: center;
				line-height: 138rpx;
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

		.exchangeWarpper {
			box-sizing: border-box;
			width: 100%;
			height: 1200rpx;
			padding: 22rpx;
			background-color: #fff;
			border-radius: 15rpx 15rpx 0 0;

			.top {
				width: 100%;
				overflow: hidden;

				.delete-icon {
					width: 44rpx;
					height: 44rpx;
					float: right;

					image {
						display: block;
						width: 100%;
					}
				}
			}

			.goods-msg {
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 68rpx;

				.goods-icon {
					width: 188rpx;
					height: 188rpx;
					border-radius: 10rpx;
					overflow: hidden;

					image {
						display: block;
						width: 100%;
					}
				}

				.exchange-msg {
					width: 60%;
					margin-left: 44rpx;

					.integral {
						font-size: 40rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 32rpx;
						letter-spacing: 0rpx;
						color: #f1351b;
						margin-bottom: 32rpx;
						display: flex;
						align-items: baseline;

						text:last-child {
							font-size: 24rpx;
							font-weight: normal;
							font-stretch: normal;
							line-height: 32rpx;
							letter-spacing: 0rpx;
							color: #f1351b;
							margin-left: 11rpx;
						}
					}

					.title {
						font-size: 28rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 40rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
					}
				}
			}

			.goods-atr {
				width: 100%;
				height: 750rpx;
				overflow-x: hidden;
				/*x轴禁止滚动*/
				overflow-y: scroll;

				/*y轴滚动*/
				.atr {
					margin-bottom: 44rpx;
					width: 100%;

					.title {
						width: 100%;
						text-align: left;
						font-size: 28rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 40rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
						margin-bottom: 43rpx;
					}

					.tab {
						width: 100%;
						display: flex;
						flex-wrap: wrap;

						.tab-item {
							padding: 9rpx 42rpx 9rpx 42rpx;
							font-size: 28rpx;
							color: #1a1a1a;
							background-color: #f5f5f5;
							border-radius: 30rpx;
							margin-right: 22rpx;
							margin-bottom: 22rpx
						}

						.active {
							padding: 9rpx 42rpx 9rpx 42rpx;
							color: #fff;
							background-color: #f1351b;
						}
					}
				}

				.num {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 40rpx;

					.title {
						font-size: 28rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 40rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
					}

					.num-change {
						display: flex;
						align-items: center;
						width: 30%;

						.reduce {
							font-size: 32rpx;
							font-weight: normal;
							font-stretch: normal;
							line-height: 40rpx;
							letter-spacing: 0rpx;
							color: #afafaf;
						}

						input {
							width: 120rpx;
							height: 66rpx;
							background-color: #f5f5f5;
							border-radius: 15rpx;
							text-align: center;
							margin: 0 23rpx;
						}
					}
				}
			}

			.confirm {
				width: 684rpx;
				height: 88rpx;
				background-color: #f1351b;
				border-radius: 15rpx;
				margin: 0 auto;
				text-align: center;
				line-height: 88rpx;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0rpx;
				color: #ffffff;
				margin-top: 20rpx
			}
		}
	}
</style>
