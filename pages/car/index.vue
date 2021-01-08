<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="main">
			<view class="top">
				<view class="title">
					购物车
				</view>
				<view class="fon-28" @click="openManage">
					管理
				</view>
			</view>
			<!--订单列表-->
			<view class="order-wrapper" v-for="(item,index) in carListData" :key="index">
				<view class="order-item">
					<view class="business">
						<view class="store-logo dis-flex al-items-center">
							<checkbox-group class="store-goods-all" @change="storeAllCheck(item)">
								<view :class="item.storeCheckAll==true?'cover-active':'cover'"></view>
								<checkbox style="opacity: 0;position:absolute;top:0;left:0;z-index:2;" value="item" :checked="item.storeCheckAll"></checkbox>
							</checkbox-group>
							<view class="business-logo">
								<image src="/static/images/order/business-logo1.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="coupon">
							领劵
						</view>
					</view>
					<!-- 商品列表 -->
					<view class="goods" v-for="(goodsItem,goodsIndex) in item.goodsList" :key="goodsIndex">
						<checkbox-group class="goods-check" @change="changeItemCheck(goodsItem)">
							<view :class="goodsItem.flag==true?'cover-active':'cover'"></view>
							<checkbox style="position:absolute;top:0;left:0;z-index:2;border: solid 1px blue;opacity: 0;" value="item"
							 :checked="goodsItem.flag"></checkbox>
						</checkbox-group>
						<view class="goods-icon">
							<image src="/static/images/order/goods-icon2.png" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="title">{{goodsItem.goodsName}}绿恒源全棉印花四件套 HYX-020TJ绿罗伊</view>
							<view class="promotion">
								<view class="title">
									促销
								</view>
								<view class="prompt">
									每两套减200
								</view>
							</view>
							<view class="integral-num">
								<view class="integral">
									<text>12000</text><text>积分</text>
								</view>
								<view class="num">
									<view class="reduse" @click="reduseGoods(index,goodsIndex)">
										-
									</view>
									<input type="text" :value="goodsItem.goodsNum" @blur="inputChange($event,index,goodsIndex)" />
									<view class="add" @click="addGoods(index,goodsIndex)">
										+
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="left dis-flex al-items-center">
				<checkbox-group class="all-sel" @change="allChange">
					<view :class="allCheck==true?'cover-active':'cover'"></view>
					<checkbox style="position:absolute;top:0;left:0;z-index:2;border: solid 1px blue;opacity: 0;" value="cg" :checked="allCheck" />
				</checkbox-group>
				<view class="all-sel-txt fon-28 col-afa mg-l-20">
					全选
				</view>
			</view>
			<view class="settlement" v-if="manageAct">
				<view class="all-integral">
					<text>合计：</text>
					<text>1800积分</text>
				</view>
				<view class="btn">
					结算({{allNum}})
				</view>
			</view>
			<view class="btn-warpper" v-else>
				<view class="collec-btn">
					加入收藏
				</view>
				<view class="delete-btn">
					删除
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
				// 底部导航
				tabBarActive: {
					state: 4,
					roundLeft: "464rpx",
					mulchLeft: "464rpx",
					elementLeft: "496rpx"
				},
				// 	选择框颜色
				checkColor: "red",
				// 管理
				manageAct: true,
				// 购物车列表
				carListData: [{
						storeCheckAll: false,
						goodsList: [{
							flag: false,
							goodsName: "1",
							goodsNum: 3
						}]
					},
					{
						storeCheckAll: false,
						goodsList: [{
								flag: false,
								goodsName: "2",
								goodsNum: 4
							},
							{
								flag: false,
								goodsName: "3",
								goodsNum: 5
							},
							{
								flag: false,
								goodsName: "4",
								goodsNum: 6
							}
						]
					}
				],
				// 全选
				allCheck: false,
				// 总数量
				allNum: 0
			}
		},
		onLoad() {
			this.initData();
		},
		methods: {
			// 数据初始化
			initData: function() {
				this.$http('/commodity/getShopCarList', {}, 'post').then(function(res) {
					console.log("initData=>", res)
				})
			},
			// 商品管理
			openManage: function() {
				this.manageAct = !this.manageAct
			},
			// 商品数量减少
			reduseGoods: function(index, goodsIndex) {
				let carListData = this.carListData;
				let goodsNum = carListData[index].goodsList[goodsIndex].goodsNum;
				if (goodsNum > 1) {
					goodsNum = goodsNum - 1;
					carListData[index].goodsList[goodsIndex].goodsNum = goodsNum;
				} else {
					console.log("再减就没有了")
				}
			},
			// 输入框监听事件
			inputChange: function(event, index, goodsIndex) {
				let carListData = this.carListData;
				let goodsNum = carListData[index].goodsList[goodsIndex].goodsNum;
				goodsNum = event.detail.value;
				carListData[index].goodsList[goodsIndex].goodsNum = goodsNum;
			},
			// 添加
			addGoods: function(index, goodsIndex) {
				let carListData = this.carListData;
				let goodsNum = carListData[index].goodsList[goodsIndex].goodsNum;
				goodsNum = goodsNum + 1;
				carListData[index].goodsList[goodsIndex].goodsNum = goodsNum;
			},
			// 单选
			changeItemCheck: function(goodsItem) {
				goodsItem.flag = !goodsItem.flag;
				if (goodsItem.flag) {
					this.radioJudge()
				} else {
					this.radioJudge()
				}
			},
			// 单选判断
			radioJudge: function() {
				for (let i = 0; i < this.carListData.length; i++) {
					let text = this.carListData[i].goodsList.every((item) => {
						return item.flag === true;
					})
					if (text) {
						this.carListData[i].storeCheckAll = true;
					} else {
						this.carListData[i].storeCheckAll = false;
					}
				}
			},
			//店家全选
			storeAllCheck: function(item) {
				item.storeCheckAll = !item.storeCheckAll;
				if (item.storeCheckAll) {
					this.storeAllCheckJudge()
				} else {
					this.storeAllCheckJudge();
				}
			},
			//店家全选判断
			storeAllCheckJudge: function() {
				for (let h = 0; h < this.carListData.length; h++) {
					if (this.carListData[h].storeCheckAll) {
						let bol = this.carListData.every(item => {
							return item.storeCheckAll === true;
						})
						if (bol) {
							this.allCheck = true;
						}
						this.carListData[h].goodsList.forEach(item => {
							item.flag = true;
						})
					} else {
						this.allCheck = false;
						this.carListData[h].goodsList.forEach(item => {
							item.flag = false;
						})
					}
				}
			},
			// 全选
			allChange: function() {
				this.allCheck = !this.allCheck;
				if (this.allCheck) {
					this.carListData.map(item => {
						item.storeCheckAll = true;
						item.goodsList.map(item => {
							item.flag = true;
						})
					})
				} else {
					this.carListData.map(item => {
						item.storeCheckAll = false;
						item.goodsList.map(item => {
							item.flag = false;
						})
					})
				}
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

		.main {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;
			padding-bottom: 250rpx;

			.top {
				width: 100%;
				margin-bottom: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-size: 36rpx;
					color: #333;
				}

				.fon-28 {
					font-size: 28rpx;
					line-height: 40rpx;
					letter-spacing: 0rpx;
					color: #333;
				}
			}

			.order-wrapper {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 32rpx;

				.order-item {
					box-sizing: border-box;
					width: 100%;
					padding: 22rpx 0;

					.business {
						box-sizing: border-box;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 22rpx;

						.store-goods-all {
							position: relative;
							width: 26rpx;
							height: 26rpx;
							margin-right: 20rpx;

							.cover {
								position: absolute;
								top: 0;
								left: 0;
								width: 26rpx;
								height: 26rpx;
								background-image: url(../../static/images/car/check.png);
								background-size: 26rpx 26rpx;
								background-repeat: no-repeat;
								background-position: 0 0;
								z-index: 1;
							}

							.cover-active {
								position: absolute;
								top: 0;
								left: 0;
								width: 26rpx;
								height: 26rpx;
								background-image: url(../../static/images/car/check-active.png);
								background-size: 26rpx 26rpx;
								background-repeat: no-repeat;
								background-position: 0 0;
								z-index: 1;
							}
						}

						.business-logo {
							width: 297rpx;

							image {
								display: block;
								width: 100%;
							}
						}

						.coupon {
							font-size: 24rpx;
							line-height: 40rpx;
							color: #1a1a1a;
						}
					}

					.goods {
						box-sizing: border-box;
						width: 100%;
						margin-top: 33rpx;
						padding: 33rpx 37rpx 0 66rpx;
						display: flex;
						justify-content: space-between;
						border-top: 1rpx solid #f5f5f5;
						position: relative;

						.goods-check {
							position: relative;
							top: 80rpx;
							width: 26rpx;
							height: 26rpx;
							margin-right: 20rpx;

							.cover {
								position: absolute;
								top: 0;
								left: 0;
								width: 26rpx;
								height: 26rpx;
								background-image: url(../../static/images/car/check.png);
								background-size: 26rpx 26rpx;
								background-repeat: no-repeat;
								background-position: 0 0;
								z-index: 1;
							}

							.cover-active {
								position: absolute;
								top: 0;
								left: 0;
								width: 26rpx;
								height: 26rpx;
								background-image: url(../../static/images/car/check-active.png);
								background-size: 26rpx 26rpx;
								background-repeat: no-repeat;
								background-position: 0 0;
								z-index: 1;
							}
						}

						.goods-icon {
							width: 170rpx;
							height: 170rpx;
							border-radius: 10rpx;
							overflow: hidden;
							margin-right: 20rpx;

							image {
								display: block;
								width: 100%;
							}
						}

						.goods-msg {
							width: 379rpx;

							.title {
								font-size: 28rpx;
								color: #1a1a1a;
								text-align: justify;
								letter-spacing: 0rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								word-break: break-all;
							}

							.promotion {
								width: 100%;
								margin-top: 15rpx;
								margin-bottom: 15rpx;
								display: flex;
								align-items: center;

								.title {
									font-size: 20rpx;
									color: #1a1a1a;
									font-weight: bold;
									margin-right: 17rpx;
								}

								.prompt {
									background-color: #f1351b;
									border-radius: 5rpx;
									// padding: 3rpx;
									font-size: 20rpx;
									color: #ffffff;
								}
							}

							.integral-num {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.integral {
									text {
										font-size: 28rpx;
										line-height: 32rpx;
										color: #f1351b;
									}

									text:first-child {
										font-size: 28rpx;
										line-height: 32rpx;
										color: #f1351b;
										font-weight: bold;
										margin-right: 11rpx;
									}
								}

								.num {
									width: 132rpx;
									display: flex;
									align-items: center;

									.reduse {
										width: 44rpx;
										height: 44rpx;
										line-height: 44rpx;
										background-color: #ffffff;
										text-align: center;
										font-size: 24rpx;
										line-height: 40rpx;
										letter-spacing: 0rpx;
										color: #1a1a1a;
									}

									input {
										width: 44rpx;
										height: 44rpx;
										background-color: #f5f5f5;
										border-radius: 5rpx;
										text-align: center;
										font-size: 20rpx;
										line-height: 40rpx;
										letter-spacing: 0rpx;
										color: #1a1a1a;
									}

									.add {
										width: 44rpx;
										height: 44rpx;
										line-height: 44rpx;
										background-color: #ffffff;
										text-align: center;
										font-size: 24rpx;
										line-height: 40rpx;
										letter-spacing: 0rpx;
										color: #1a1a1a;
									}
								}
							}
						}
					}
				}

				.order-item:first-child .goods:first-child {
					border: none;
				}
			}
		}

		.footer {
			box-sizing: border-box;
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 108rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 22rpx 33rpx 35rpx 33rpx;
			z-index: 3;

			.all-sel {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #afafaf;
				position: relative;
				width: 26rpx;
				height: 26rpx;
				top: 2rpx;

				.cover {
					position: absolute;
					top: 0;
					left: 0;
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/car/check.png);
					background-size: 26rpx 26rpx;
					background-repeat: no-repeat;
					background-position: 0 0;
					z-index: 1;
				}

				.cover-active {
					position: absolute;
					top: 0;
					left: 0;
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/car/check-active.png);
					background-size: 26rpx 26rpx;
					background-repeat: no-repeat;
					background-position: 0 0;
					z-index: 1;
				}
			}

			.settlement {
				display: flex;
				align-items: center;

				.all-integral {
					text {
						font-size: 24rpx;
						color: #f1351b;
					}

					text:first-child {
						font-size: 28rpx;
						color: #1a1a1a;
					}
				}

				.btn {
					width: 160rpx;
					height: 66rpx;
					background-color: #f1351b;
					border-radius: 33rpx;
					font-size: 28rpx;
					color: #ffffff;
					text-align: center;
					line-height: 66rpx;
					margin-left: 38rpx;
				}
			}

			.btn-warpper {
				padding: 8rpx 0;
				display: flex;
				align-items: center;

				.collec-btn {
					border: solid 1rpx #FFA500;
					color: #FFA500;
					font-size: 24rpx;
					padding: 6rpx 20rpx;
					border-radius: 30rpx;
					margin-right: 22rpx;
				}

				.delete-btn {
					border: solid 1rpx #FF0000;
					color: #FF0000;
					font-size: 24rpx;
					padding: 6rpx 20rpx;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>
