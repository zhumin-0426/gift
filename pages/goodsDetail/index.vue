<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="top dis-flex al-items-center">
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
					<view class="title">{{goodsDetailData.commodityName}} {{goodsDetailData.commodityDescribe}}
						<view class="goods-limited-num">
							限量{{goodsDetailData.maxNumber}}套
						</view>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="share" @click="shareOpen">
						<image src="/static/images/goods-detail/share.png" mode="widthFix"></image>
					</view>
					<!--  #endif -->
				</view>
				<view class="middle dis-flex al-items-center">
					<view class="integral dis-flex">
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
						<view class="progress-act" :style="'width:'+proportion">

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
				<view class="service block">
					<view class="cover" @click="service"></view>
					<view class="service-icon block-icon">
						<image src="/static/images/goods-detail/service.png" mode="widthFix"></image>
					</view>
					<view class="name">客服</view>
				</view>
				<navigator url="/pages/car/index" hover-class="none">
					<view class="car block">
						<view class="round">{{carNum}}</view>
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
						<image :src="imageUrl+argModel.imgUrl" mode="widthFix"></image>
					</view>
					<view class="exchange-msg">
						<view class="integral">
							<text>{{argModel.score}}</text><text>积分</text>
						</view>
						<view class="title">
							{{goodsDetailData.commodityName}} {{choseModel}}
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
							<input type="text" :value="goodsNum" @input="onInput"/>
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
	export default {
		components: {
			mpopup
		},
		data() {
			return {
				carNum: "",
				navList: false,
				goodsDetailData: {},
				bannerList: [],
				imageUrl: "",
				selType: "",
				goodsModul: [],
				goods_spec_arr: [],
				goodsNum: 1,
				goodsId: "",
				updata: true,
				choseDetailData: [], //选择的容器
				argModel: {}, //规格对象
				choseModel: "",
				totalCarNum: 0,
				proportion: ""
			}
		},
		onLoad(option) {
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
			this.goodsId = option.id;
			this.initDetailData(option.id)
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
				let userid = uni.getStorageSync('wxUserInfo');
				// if (userid.id) {
				    this.$refs.exchangePopup.open();
				    this.selType = type;
				    this.getGoodsModel();	
				// }else{
				// 	window.location.href = "http://lipinhui.28888753.cn/before/users/getUserCode";
				// }
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
			initDetailData: function(id) {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				that.$http("/commodity/getCommodity", {
					userid:4,
					id: id
				}, "post").then(function(res) {
					console.log(res);
					if (res.data.status == "success") {
						that.goodsDetailData = res.data.commodityById;
						// 计算占比
						let num = that.goodsDetailData.salnum;
						let total = that.goodsDetailData.salnum + that.goodsDetailData.leftNum;
						that.proportion = that.getPercent(num, total);
						// 轮播
						that.bannerList = res.data.commodityById.imglist;
						that.carNum = res.data.carnum
					}
				})
			},
			// 计算百分比
			getPercent: function(num, total) {
				num = parseFloat(num);
				total = parseFloat(total);
				if (isNaN(num) || isNaN(total)) {
					return "-";
				}
				return total <= 0 ? "0%" : Math.round((num / total) * 10000) / 100.0 + "%";
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
			// 商品属性
			getGoodsModel: function() {
				const that = this;
				this.$http("/commodity/getCommodityModel", {
					belongCommodityId: that.goodsDetailData.id
				}, "post").then(function(res) {
					console.log("商品型号", res);
					if (res.data.status == "success") {
						that.goodsModul = res.data.modelList;
						that.choseDetailData = res.data.modelList; //缓存
						// 商品属性初始化
						for (let i in that.goodsModul) {
							if (i > 0) {
								that.choseDetailData[i].childrenlist = that.goodsModul[0].childrenlist[0].childrenlist
							}
							if (i > 1) {
								that.choseDetailData[i].childrenlist = that.choseDetailData[i - 1].childrenlist[0].childrenlist;
							}
							for (let j in that.choseDetailData[i].childrenlist) {
								if (j < 1) {
									that.choseDetailData[i].childrenlist[0].checked = true;
									that.goods_spec_arr[i] = that.choseDetailData[i].childrenlist[0].id;
								}
							}
							that.choseModel += that.choseDetailData[i].childrenlist[0].modelName;
						}
						that.argModel = JSON.parse(JSON.stringify(that.choseDetailData[(that.goodsModul.length - 1)].childrenlist[0].commodityArgVO));
						console.log(that.choseDetailData);
						console.log(that.argModel);
					}
				})
			},
			// 属性切换
			atrChage: function(event) {
				let itemindex = parseInt(event.currentTarget.dataset.itemindex), //父循环下标
					attrindex = parseInt(event.currentTarget.dataset.attrindex), //子循环下标
					choseDetailData = this.choseDetailData;
				for (let i in choseDetailData) {
					if ((i - 1) == itemindex) { //如果是下一级
						choseDetailData[itemindex + 1].childrenlist = choseDetailData[i - 1].childrenlist[attrindex].childrenlist;
					} else if (i > itemindex) { //如果选择下标大于父循环下标	
						choseDetailData[i].childrenlist = choseDetailData[i - 1].childrenlist[0].childrenlist;
					}
					for (let j in choseDetailData[i].childrenlist) {
						if (itemindex == i) {
							choseDetailData[i].childrenlist[j].checked = false;
							if (attrindex == j) {
								choseDetailData[i].childrenlist[attrindex].checked = true;
							}
						}
						if (i > itemindex) {
							choseDetailData[i].childrenlist[j].checked = false;
						}
						if (choseDetailData[i].childrenlist[j].checked == true) {
							this.goods_spec_arr[i] = choseDetailData[i].childrenlist[j].id;
						}
					}
					if (i > itemindex) {
						choseDetailData[i].childrenlist[0].checked = true;
					}

				}
				this.updata = false;
				this.updata = true;
				this.choseModel = "";
				this.choseDetailData = choseDetailData;
				//获取型号
				for (let i in this.choseDetailData) {
					for (let j in this.choseDetailData[i].childrenlist) {
						if (this.choseDetailData[i].childrenlist[j].checked == true) {
							this.choseModel += this.choseDetailData[i].childrenlist[j].modelName + " ";
							//判断为最后一个
							if ((parseInt(i) + 1) >= this.choseDetailData.length) {
								this.argModel = JSON.parse(JSON.stringify(this.choseDetailData[i].childrenlist[j].commodityArgVO)); //赋值到模型对象
							}
						}
					}
				}
				console.log(this.argModel);
			},
			//input监听
			onInput:function(e){
				this.goodsNum = Number(e.target.value)
			},
			// 确定按钮
			confirmGoods: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				switch (this.selType) {
					case "addCar":
						this.$http("/commodity/saveShopCar", {
							belongUserId: userid.id,
							belongCommodityId: that.goodsDetailData.id,
							belongArgId: that.argModel.id,
							belongSupperId: that.goodsDetailData.commoditySupplier,
							costPrice: that.argModel.score,
							carNum: that.goodsNum,
							comNum:that.goodsDetailData.maxNumber
						}, "post").then(function(res) {
							console.log("res=>", res)
							if (res.statusCode == 200) {
								if(res.data.status=="ismax"){
									that.$refs.msgPopup.open({
										type: 'err',
										content: '亲，您超出兑换的最大数量了哦！',
										timeout: 3000,
										isClick: false
									});
								}else{
								    that.closePopup();
								    that.initDetailData(that.goodsId);
								    that.$refs.msgPopup.open({
								    	type: 'success',
								    	content: '亲，加入购物车哦！',
								    	timeout: 3000,
								    	isClick: false
								    });	
								}
							}
						})
						break;
					case "exchange":
						that.closePopup();
						uni.navigateTo({
							url: "/pages/confirmOrder/index?goodsNum=" + that.goodsNum + '&modelId=' + that.argModel.id + '&goodsId=' +
								that.goodsId + '&currentPage=goodsDetail' + '&price=' + that.argModel.score
						})
						break;
					default:
						throw new Error("confirm event error")
				}
			},
			// 客服
			service: function() {
				uni.showModal({
					title: '客服电话',
					content: '18820854754',
					showCancel: false,
					confirmText: "取消",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
						// width: 545rpx;
						width: 100%;
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
						margin-top: 10rpx;

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
					position: relative;

					.cover {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 1;
					}

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
