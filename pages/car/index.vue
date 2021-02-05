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
					<block v-if="manageAct">
						管理
					</block>
					<block v-else>
						完成
					</block>
				</view>
			</view>
			<!--订单列表-->
			<block v-if="carListData.length>0">
				<block v-for="(item,index) in carListData" :key="index">
					<view class="order-wrapper">
						<view class="order-item">
							<view class="business">
								<view class="store-logo dis-flex al-items-center">
									<checkbox-group class="store-goods-all" @change="storeAllCheck(item)">
										<view :class="item.storeCheckAll==true?'cover-active':'cover'"></view>
										<checkbox style="opacity: 0;position:absolute;top:0;left:0;z-index:2;" value="item" :checked="item.storeCheckAll"></checkbox>
									</checkbox-group>
									<view class="business-logo">
										<image :src="imageUrl+item.supplierShowPic" mode="widthFix"></image>
									</view>
								</view>
								<!-- <view class="coupon">
									领劵
								</view> -->
							</view>
							<!-- 商品列表 -->
							<view class="goods" v-for="(goodsItem,goodsIndex) in item.commoditylist" :key="goodsIndex">
								<view class="cover" :data-id="goodsItem.id" @click="jumpGoodsDel"></view>
								<checkbox-group class="goods-check" @change="changeItemCheck(goodsItem)">
									<view :class="goodsItem.flag==true?'cover-active':'cover'"></view>
									<checkbox style="position:absolute;top:0;left:0;z-index:2;border: solid 1px blue;opacity: 0;" value="item"
									 :checked="goodsItem.flag"></checkbox>
								</checkbox-group>
								<view class="goods-icon">
									<image :src="imageUrl+goodsItem.commodityArgVO.imgUrl" mode="widthFix"></image>
								</view>
								<view class="goods-msg">
									<view class="title">{{goodsItem.commodityDescribe}}</view>
									<view class="promotion">
										<view class="title">
											促销
										</view>
										<block v-for="(promotionItem,promotionIndex) in goodsItem.promotelist" :key="promotionIndex">
											<view class="prompt txt-clamp-1">
												{{promotionItem.promoteTitle}}
											</view>
										</block>
									</view>
									<view class="integral-num">
										<view class="integral">
											<text>{{goodsItem.commodityArgVO.score}}</text><text>积分</text>
										</view>
									</view>
								</view>
								<view class="num">
									<view class="reduse" @click="reduseGoods(index,goodsIndex,goodsItem.shopCarId)">
										-
									</view>
									<input type="text" :value="goodsItem.carNum" @blur="inputChange($event,index,goodsIndex,goodsItem.shopCarId,goodsItem.hasnum,goodsItem.maxNumber)" />
									<view class="add" @click="addGoods(index,goodsIndex,goodsItem.shopCarId,goodsItem.hasnum,goodsItem.maxNumber)">
										+
									</view>
								</view>
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
					<text>{{total}}积分</text>
				</view>
				<view class="btn" @click="settlement">
					结算({{goodsTotal}})
				</view>
			</view>
			<view class="btn-warpper" v-else>
				<view class="collec-btn" @click="goodsCollect">
					加入收藏
				</view>
				<view class="delete-btn" @click="deleteGoods">
					删除
				</view>
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
				// 底部导航
				tabBarActive: {
					state: 4,
					roundLeft: "464rpx",
					mulchLeft: "464rpx",
					elementLeft: "496rpx"
				},
				// 管理
				manageAct: true,
				// 购物车列表
				carListData: [],
				// 全选
				allCheck: false,
				// 合计
				total: 0,
				// 商品总数量
				goodsTotal: 0
			}
		},
		onLoad() {
			this.initCarData();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			});
		},
		methods: {
			// 数据初始化
			initCarData: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				that.$http('/commodity/getShopCarList', {
					belongUserId:userid.id
				}, 'post').then(function(res) {
					console.log("购物车数据初始化=>", res.data.usersShopCarByList);
					if (res.statusCode == 200) {
						that.carListData = res.data.usersShopCarByList;
					}
				})
			},
			// 商品管理
			openManage: function() {
				this.manageAct = !this.manageAct
			},
			// 详情跳转
			jumpGoodsDel:function(e){
				let id = e.target.dataset.id;
				uni.navigateTo({
					url:'/pages/goodsDetail/index?id='+id
				})
			},
			// 商品数量减少
			reduseGoods: function(index, goodsIndex, id) {
				let carListData = this.carListData;
				let carNum = carListData[index].commoditylist[goodsIndex].carNum;
				if (carNum > 1) {
					carNum = carNum - 1;
					carListData[index].commoditylist[goodsIndex].carNum = carNum;
					this.changeGoodsNum(id, carNum);
				} else {
					this.$refs.msgPopup.open({
						type: 'warn',
						content: '亲，数量最小为1哦！',
						timeout: 3000,
						isClick: false
					});
				}
			},
			// 输入框监听事件
			inputChange: function(event, index, goodsIndex, id,haveBuyGoodsNum,maxGoodsNum) {
				let carListData = this.carListData;
				let carNum = carListData[index].commoditylist[goodsIndex].carNum;
				carNum = event.detail.value;
				// 为零时不限量
				if(Number(maxGoodsNum)==0){
					carListData[index].commoditylist[goodsIndex].carNum = Number(carNum);
					this.changeGoodsNum(id, carNum);	
				}else{
				    if(Number(carNum)<Number(maxGoodsNum)-Number(haveBuyGoodsNum)){
				       carListData[index].commoditylist[goodsIndex].carNum = Number(carNum);
				       this.changeGoodsNum(id, carNum);	
				    }else{
				    	this.$refs.msgPopup.open({
				    		type: 'err',
				    		content: '亲，超出兑换的最大数量了哦！',
				    		timeout: 3000,
				    		isClick: false
				    	});
				    }	
				}
			},
			// 添加
			addGoods: function(index, goodsIndex, id,haveBuyGoodsNum,maxGoodsNum) {
				let carListData = this.carListData;
				let carNum = carListData[index].commoditylist[goodsIndex].carNum;
				// 为零时不限量
				if(Number(maxGoodsNum)==0){
					carNum = carNum + 1;
					carListData[index].commoditylist[goodsIndex].carNum = carNum;
					this.changeGoodsNum(id, carNum);	
				}else{
				    if(carNum<Number(maxGoodsNum)-Number(haveBuyGoodsNum)){
				       carNum = carNum + 1;
				       carListData[index].commoditylist[goodsIndex].carNum = carNum;
				       this.changeGoodsNum(id, carNum);	
				    }else{
				    	this.$refs.msgPopup.open({
				    		type: 'err',
				    		content: '亲，超出兑换的最大数量了哦！',
				    		timeout: 3000,
				    		isClick: false
				    	});
				    }	
				}
			},
			// 商品数量增加/减少/输入
			changeGoodsNum: function(id, num) {
				const that = this;
				this.$http('/commodity/updateShopCarNum', {
					id: id,
					carNum: num
				}, 'post').then(function(res) {
					if (res.statusCode == 200 && res.data.status == "success") {}
				})
				this.totalHondel();
			},
			// 收藏商品
			goodsCollect: function() {
				const that = this;
				let arr = [];
				for (let i = 0; i < that.carListData.length; i++) {
					for (let x = 0; x < that.carListData[i].commoditylist.length; x++) {
						let flag = that.carListData[i].commoditylist[x].flag;
						let id = that.carListData[i].commoditylist[x].id
						if (flag) {
							arr.push(id)
						}
					}
				}
				console.log("arr", arr)
				let userid = uni.getStorageSync('wxUserInfo');
				that.$http('/users/saveUserCollect', {
					belongUserId: userid.id,
					collectCommodityIds: arr
				}, 'post').then(function(res) {
					if (res.statusCode == 200) {
						that.$refs.msgPopup.open({
							type: 'success',
							content: '亲，商品加入收藏成功哦！',
							timeout: 3000,
							isClick: false
						});
					}
				})
			},
			// 删除商品
			deleteGoods: function() {
				const that = this;
				let arr = [];
				for (let i = 0; i < that.carListData.length; i++) {
					for (let x = 0; x < that.carListData[i].commoditylist.length; x++) {
						let flag = that.carListData[i].commoditylist[x].flag;
						let id = that.carListData[i].commoditylist[x].shopCarId
						if (flag) {
							arr.push(id)
						}
					}
				}
				let ids = arr.join(',');
				that.$http('/commodity/delShopCarNum', {
					ids: ids
				}, 'post').then(function(res) {
					that.initCarData();
				})
				this.totalHondel();
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
					// 商家按钮
					let text = this.carListData[i].commoditylist.every((item) => {
						return item.flag === true;
					})
					if (text) {
						this.carListData[i].storeCheckAll = true;
					} else {
						this.carListData[i].storeCheckAll = false;
					}
					// 全选按钮
					if (this.carListData[i].storeCheckAll) {
						let bol = this.carListData.every(item => {
							return item.storeCheckAll === true;
						})
						if (bol) {
							this.allCheck = true;
						}
					} else {
						this.allCheck = false;
					}
				}
				this.totalHondel();
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
						this.carListData[h].commoditylist.forEach(item => {
							item.flag = true;
						})
					} else {
						this.allCheck = false;
						this.carListData[h].commoditylist.forEach(item => {
							item.flag = false;
						})
					}
				}
				this.totalHondel();
			},
			// 全选
			allChange: function() {
				this.allCheck = !this.allCheck;
				if (this.allCheck) {
					this.carListData.map(item => {
						item.storeCheckAll = true;
						item.commoditylist.map(item => {
							item.flag = true;
						})
					})
				} else {
					this.carListData.map(item => {
						item.storeCheckAll = false;
						item.commoditylist.map(item => {
							item.flag = false;
						})
					})
				}
				this.totalHondel();
			},
			// 合计
			totalHondel: function() {
				let total = 0;
				let goodsTotal = 0;
				for (let i = 0; i < this.carListData.length; i++) {
					for (let x = 0; x < this.carListData[i].commoditylist.length; x++) {
						let flag = this.carListData[i].commoditylist[x].flag;
						if (flag) {
							let num = this.carListData[i].commoditylist[x].carNum;
							let price = this.carListData[i].commoditylist[x].commodityArgVO.score;
							total += num * price;
							goodsTotal += Number(num);
						}
					}
				}
				this.total = total;
				this.goodsTotal = goodsTotal;
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
			},
			// 结算
			settlement: function() {
				let total = 0;
				let goodsTotal = 0;
				let arr = []
				for (let i = 0; i < this.carListData.length; i++) {
					for (let x = 0; x < this.carListData[i].commoditylist.length; x++) {
						let flag = this.carListData[i].commoditylist[x].flag;
						if (flag) {
							arr.push(this.carListData[i].commoditylist[x].shopCarId)
							let num = this.carListData[i].commoditylist[x].carNum;
							let price = this.carListData[i].commoditylist[x].commodityArgVO.score;
							total += num * price;
							goodsTotal += num;
						}
					}
				};
				if(arr.length>0){
					arr = arr.join(',')
					uni.navigateTo({
						url: "/pages/confirmOrder/index?goodsNum=" + goodsTotal + '&currentPage=car' + '&price=' + total +
							'&shopCarIds=' + arr
					})	
				}else{
					this.$refs.msgPopup.open({
						type: 'warn',
						content: '亲，您还没有选择商品哦！',
						timeout: 3000,
						isClick: false
					});
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
                        .cover{
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							z-index: 1;
						}
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
								z-index: 2;
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
									font-size: 26rpx;
									color: #1a1a1a;
									font-weight: bold;
									margin-right: 17rpx;
								}

								.prompt {
									background-color: #f1351b;
									border-radius: 5rpx;
									// padding: 3rpx;
									font-size: 26rpx;
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

							}
						}
						.num {
							width: 132rpx;
							display: flex;
							align-items: center;
							position: absolute;
							right: 22rpx;
							bottom: 0;
							z-index: 2;
						
							.reduse {
								width: 44rpx;
								height: 44rpx;
								line-height: 44rpx;
								background-color: #ffffff;
								text-align: center;
								font-size: 30rpx;
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
								font-size: 30rpx;
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
								font-size: 30rpx;
								line-height: 40rpx;
								letter-spacing: 0rpx;
								color: #1a1a1a;
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
