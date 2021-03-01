<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="main">
			<view class="user-msg">
				<block v-if="isHasAddress== 1">
					<view class="cover" @click="addressJump"></view>
					<view class="top">
						<view class="name">
							{{address.addressUsername}}
						</view>
						<view class="phone">
							{{address.addressPhone}}
						</view>
						<block v-if="address.addressIsDefault==1">
							<view class="state">
								默认
							</view>
						</block>
					</view>
					<view class="bottom">
						<view class="address">
							{{address.addressDetail}}
						</view>
						<view class="next-icon">
							<image src="/static/images/confirm-order/next.png" mode="widthFix"></image>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="get-user-address fon-28 col-aea dis-flex al-items-center" @click="getUserAddress">
						<view class="cover" @click="addressJump"></view>
						<image src="/static/images/confirm-order/add.png" mode="widthFix"></image>
						<view class="txt">
							添加收货地址
						</view>
					</view>
				</block>
			</view>
			<!-- 商品 -->
			<block v-for="(item,index) in goodsList" :key="index">
				<view class="order-wrapper">
					<view class="order-item">
						<view class="business">
							<view class="business-logo">
								<image :src=" imageUrl+item.supplierShowPic" mode="widthFix"></image>
							</view>
						</view>
						<block v-for="(goodsItem,goodsIndex) in item.commoditylist" :key="goodsIndex">
							<view class="goods">
								<view class="goods-icon">
									<image :src="imageUrl+goodsItem.imgUrl" mode="widthFix"></image>
								</view>
								<view class="goods-msg">
									<view class="title">{{goodsItem.commodityDescribe}}</view>
									<view class="integral-num">
										<view class="num">
											x{{goodsItem.carNum}}
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</block>
			<!-- 订单信息 -->
			<view class="order-msg">
				<view class="integral fle">
					<view class="integral-txt">
						兑换所需积分
					</view>
					<view class="integral-val">
						{{totalPrice}}积分
					</view>
				</view>
				<view class="freight fle">
					<view class="freight-txt">
						运费
					</view>
					<view class="freight-val">
						免运费
					</view>
				</view>
				<view class="activity fle" @click="cardJump">
					<view class="activity-txt">
						优惠活动
					</view>
					<view class="right">
						<block v-if="cardId!==''">
							<view class="activity-val">
								满减{{cardPrice}}
							</view>
						</block>
						<block v-else>
							<block v-if="countCouponRecord>0">
								<view class="next-icon">
									<text class="col-f13">去使用</text><image src="/static/images/confirm-order/next.png" mode="widthFix"></image>
								</view>
							</block>
							<block>
								<view class="next-icon dis-flex al-items-center">
									<view>无</view><image src="/static/images/confirm-order/next.png" mode="widthFix"></image>
								</view>
							</block>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="footer">
			<view class="goods">
				<text>总{{totalNum}}件，合计：</text>
				<text>{{totalPrice-cardPrice}}</text>
				<text>积分</text>
			</view>
			<view class="btn" @click="goExchange">
				去兑换
			</view>
		</view>
		<!-- 提示框 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" title="提示" content="确定兑换商品吗？" :duration="2000" :before-close="true" @close="close"
			 @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 消息提示 -->
		<mpopup ref="msgPopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import mpopup from 'components/xuan-popup/xuan-popup.vue';
	export default {
		components: {
			uniPopup,
			uniPopupDialog,
			mpopup
		},
		data() {
			return {
				// 图片路径
				imageUrl: "",
				goodsId: "",
				goodsNum: "",
				modelId: "",
				addressId: 0,
				address: {},
				goodsList: [],
				pageName: "",
				totalPrice: "",
				totalNum: "",
				cardId: "",
				cardPrice: 0,
				shopCarIds: [],
				price: "",
				orderids: "",
				isHasAddress:"",
				countCouponRecord:"",
				ordernumber:""
			}
		},
		onLoad(options) {
			console.log('options=>', options);
			// 详情跳转数据初始化
			if (options.currentPage == "goodsDetail") {
				this.goodsId = options.goodsId;
				this.goodsNum = options.goodsNum;
				this.modelId = options.modelId;
				this.pageName = options.currentPage;
			}
			console.log("this.goodsId", this.goodsId)
			// 购物车跳转数据初始化
			let arr = []
			if (options.currentPage == "car") {
				var shopCarIds = options.shopCarIds;
				// console.log("options.shopCarIds=》", shopCarIds.split(','))
				this.shopCarIds = options.shopCarIds;
				this.goodsNum = options.goodsNum;
				this.price = options.price;
				this.pageName = options.currentPage;
			}
			console.log(this.shopCarIds)
			// 计算总价和总数量
			if (options.currentPage && options.currentPage == "goodsDetail") {
				this.totalNum = Number(options.goodsNum);
				this.totalPrice = Number(options.goodsNum) * Number(options.price);
			} else {
				this.totalNum = Number(options.goodsNum);
				this.totalPrice = Number(options.price);
			}
			// 地址管理->确认订单 数据缓存
			if (!options.addressId && !options.cardId) {
				this.setCache(options);
			}
			// 地址管理->确认订单 数据获取
			if (options.addressId) {
				this.addressId = options.addressId;
				this.pageName = options.currentPage;
				let cardData = uni.getStorageSync('cardData')
				if (cardData.cardId) {
					this.cardId = cardData.cardId;
					this.cardPrice = cardData.cardPrice;
				}
				// 存储地址相关数据
				uni.setStorage({
					key: 'addressData',
					data: {
						addressId: options.addressId
					}
				})
				this.getCache(this.pageName);

			} else if (options.cardId) {
				this.cardId = options.cardId;
				this.cardPrice = options.cardPrice;
				this.pageName = options.currentPage;
				// 存储卡劵相关数据
				uni.setStorage({
					key: 'cardData',
					data: {
						cardId: options.cardId,
						cardPrice: options.cardPrice
					}
				})
				this.getCache(this.pageName);
			} else {

			}
			// 初始化数据
			this.initOrderData();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			// 设置缓存
			setCache: function(options) {
				console.log("option", options)
				const that = this;
				if (options.currentPage == "goodsDetail") {
					uni.setStorage({
						key: "goodsDetail",
						data: {
							goodsId: options.goodsId,
							goodsNum: options.goodsNum,
							modelId: options.modelId,
							pageName: options.currentPage,
							price: options.price
						}
					})
				} else {
					console.log('that.shopCarIds', that.shopCarIds)
					that.shopCarIds = options.shopCarIds
					uni.setStorage({
						key: "car",
						data: {
							shopCarIds: that.shopCarIds,
							goodsNum: options.goodsNum,
							price: options.price,
							pageName: options.currentPage
						}
					})
				}
			},
			// 获取缓存
			getCache: function(key) {
				const that = this;
				uni.getStorage({
					key: key,
					success: function(res) {
						console.log("获取缓存", res)
						if (key == "goodsDetail") {
							that.totalNum = Number(res.data.goodsNum);
							that.totalPrice = Number(res.data.goodsNum) * Number(res.data.price);
						} else {
							that.totalNum = Number(res.data.goodsNum);
							that.totalPrice = Number(res.data.price);
						}
					}
				})
			},
			// 数据初始化
			initOrderData: function() {
				const that = this;
				uni.getStorage({
					key: that.pageName,
					success: function(res) {
						if (res.errMsg == "getStorage:ok") {
							that.pageName = res.data.pageName;
							that.initOrderDataRequry(res.data)
						}
					}
				})
			},
			initOrderDataRequry: function(params) {
				console.log('params', params);
				const that = this;
				let data = {};
				let userid = uni.getStorageSync('wxUserInfo');
				if (that.pageName == "goodsDetail") {
					let addressData = uni.getStorageSync('addressData');
					if (addressData.addressId) {
						that.addressId = addressData.addressId;
					}
					data = {
						id: params.goodsId || that.goodsId,
						carNum: params.goodsNum || that.goodsNum,
						argid: params.modelId || that.modelId,
						addressId: that.addressId != 0 ? that.addressId : 0,
						userid: userid.id
					}
				} else {
					let addressData = uni.getStorageSync('addressData');
					if (addressData.addressId) {
						that.addressId = addressData.addressId;
					}
					data = {
						carNum: params.goodsNum || that.goodsNum,
						shopCarIds: params.shopCarIds || that.shopCarIds,
						addressId: that.addressId != 0 ? that.addressId : 0,
						userid: userid.id
					}
				}
				console.log("data=>", that.shopCarIds)
				this.$http('/commodity/getConfigOrder', data, 'post').then(function(res) {
					console.log("订单数据初始化=>", res);
					if (res.statusCode == 200) {
						uni.showLoading({
							title: '加载中'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 500);
						that.isHasAddress = res.data.isHasAddress;
						that.countCouponRecord = res.data.countCouponRecord
						that.address = res.data.usersAddressByList;
						that.goodsList = res.data.usersShopCarByList;
					}
				})
			},
			// 一键获取用户地址
			// getUserAddress: function() {
			// 	const that = this;
			// 	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			// 	let curRoute = routes[routes.length - 1].route //获取当前页面路由
			// 	let curParam = routes[routes.length - 1].options; //获取路由参数
			// 	// 拼接参数
			// 	let currentPageUrl = ''
			// 	for (let key in curParam) {
			// 	    currentPageUrl += '&' + key + '=' + curParam[key]
			// 	}
			// 	that.$http('/before/address/getConfig', {
			// 		"url": curRoute+currentPageUrl
			// 	}, 'post').then(function(data) {
			// 		wx.config({
			// 			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			// 			appId: data.appId, // 必填，公众号的唯一标识
			// 			timestamp: data.timestamp, // 必填，生成签名的时间戳
			// 			nonceStr: data.noncestr, // 必填，生成签名的随机串
			// 			signature: data.signature, // 必填，签名
			// 			jsApiList: ['openAddress'] // 必填，需要使用的JS接口列表
			// 		});
			// 		wx.openAddress({
			// 			success: function(res) {
			// 				var userName = res.userName; // 收货人姓名
			// 				var postalCode = res.postalCode; // 邮编
			// 				var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
			// 				var cityName = res.cityName; // 国标收货地址第二级地址（市）
			// 				var countryName = res.countryName; // 国标收货地址第三级地址（国家）
			// 				var detailInfo = res.detailInfo; // 详细收货地址信息
			// 				var nationalCode = res.nationalCode; // 收货地址国家码
			// 				var telNumber = res.telNumber; // 收货人手机号码
			// 			}
			// 		});
			// 	})
			// },
			//去兑换
			goExchange: function() {
				const that = this;
				if(that.isHasAddress==1){
				    let userid = uni.getStorageSync('wxUserInfo');
				    let data = {
				    	orderarg: {
				    		area: that.address.addressArea,
				    		provinct: that.address.addressProvice,
				    		city: that.address.addressCity,
				    		provinctcode: that.address.addressProviceCode,
				    		citycode: that.address.addressCityCode,
				    		areacode: that.address.addressAreaCode,
				    		freightprice: 100,
				    		totalscore: that.totalPrice,
				    		freescore: that.cardPrice,
				    		payscore: Number(that.totalPrice) - Number(that.cardPrice),
				    		address: that.address.addressDetail,
				    		username: that.address.addressUsername,
				    		userphone: that.address.addressPhone,
				    		usersShopCarByList: that.goodsList,
				    		userid: userid.id,
				    		couponid: that.cardId
				    	}
				    }
				    // 保存订单
				    that.$http('/order/saveOrder', data, 'post').then(function(res) {
				    	console.log("保存订单", res);
				    	if (res.statusCode == 200) {
				    		switch (res.data.status) {
				    			case "nouser":
				    				that.$refs.msgPopup.open({
				    					type: 'warn',
				    					content: '亲，您还没有登入哦！',
				    					timeout: 3000,
				    					isClick: false
				    				});
				    				break;
				    			case "noscore":
				    				that.$refs.msgPopup.open({
				    					type: 'warn',
				    					content: '亲，您积分不足，请立即充值哦！',
				    					timeout: 3000,
				    					isClick: false
				    				});
				    				break;
				    			default:
				    				that.orderids = res.data.orderids;
									that.ordernumber = res.data.ordernumber;
				    				that.$refs.popup.open()
				    		}
				    	}
				    })	
				}else{
					that.$refs.msgPopup.open({
						type: 'err',
						content: '亲，您还没有添加地址哦！',
						timeout: 3000,
						isClick: false
					});
				}
			},
			close(done) {
				uni.redirectTo({
					url:"/pages/order/index?id=1"
				})
				done()
			},
			confirm(done) {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				// 确认订单
				let data = {
					orderNumber:that.ordernumber,
					orderids: that.orderids,
					orderBelongUserid: userid.id,
					orderPayMoney: that.totalPrice - that.cardPrice
				}
				that.$http('/order/updateOrder', data, 'post').then(function(res) {
					console.log("确认订单", res);
					if (res.statusCode == 200) {
						// 清除卡劵/地址/购物车/商品详情缓存数据
						uni.removeStorageSync('cardData');
						uni.removeStorageSync('addressData');
						uni.removeStorageSync('goodsDetail');
						uni.removeStorageSync('car');
						that.$refs.msgPopup.open({
							type: 'success',
							content: '亲，兑换商品成功！',
							timeout: 1500,
							isClick: false
						});
						setTimeout(function() {
							uni.redirectTo({
								url: "/pages/order/index?id=2"
							})
						}, 1500)
					}
				})
				done()
			},
			// 地址跳转
			addressJump: function() {
				uni.redirectTo({
					url: "/pages/address/index?pageName=" + this.pageName + '&goodsId=' + this.goodsId
				})
			},
			// 优惠卷跳转
			cardJump: function() {
				let arr = [];
				for (let i = 0; i < this.goodsList.length; i++) {
					for (let x = 0; x < this.goodsList[i].commoditylist.length; x++) {
						let id = this.goodsList[i].commoditylist[x].id;
						arr.push(id)
					}
				}
				if (this.pageName == "goodsDetail") {
					uni.redirectTo({
						url: '/pages/card/index?commodityIds=' + arr + '&pageName=' + this.pageName + '&totalPrice=' + this.totalPrice +
							'&goodsId=' + this.goodsId
					})
				} else {
					uni.redirectTo({
						url: '/pages/card/index?commodityIds=' + arr + '&pageName=' + this.pageName + '&totalPrice=' + this.totalPrice
					})
				}
			}
		},
		// 监听导航返回按钮
		onBackPress(e) {
			console.log(e);
			const that = this;
			console.log("A", that.goodsId)
			if (e.from == 'backbutton') {
				uni.showModal({
					title: '提示',
					content: '亲，您确定取消该订单吗？',
					success: function(res) {
						if (res.confirm) {
							// 清除卡劵/地址/购物车/商品详情缓存数据
							uni.removeStorageSync('cardData');
							uni.removeStorageSync('addressData');
							uni.removeStorageSync('goodsDetail');
							uni.removeStorageSync('car');
							// 返回相应页面
							console.log(that.pageName)
							if (that.pageName == "goodsDetail") {
								uni.redirectTo({
									url: '/pages/goodsDetail/index?id=' + that.goodsId
								})
							} else {
								uni.redirectTo({
									url: '/pages/car/index'
								})
							}
						} else if (res.cancel) {
							return true;
						}
						uni.navigateBack({
							delta: 1
						});
					}
				});
				return true; //阻止默认返回行为
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
			padding: 22rpx 33rpx;
			padding-bottom: 150rpx;

			.user-msg {
				box-sizing: border-box;
				width: 100%;
				background-color: #ffffff;
				border-radius: 15rpx;
				padding: 33rpx 22rpx;
				margin-bottom: 22rpx;
				position: relative;

				.cover {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 1;
				}

				.top {
					display: flex;
					align-items: center;

					.name {
						font-size: 28rpx;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
						font-weight: bolder;
					}

					.phone {
						font-size: 24rpx;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #afafaf;
						margin: 0 21rpx;
					}

					.state {
						font-size: 26rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #ffffff;
						padding: 4rpx 13rpx;
						background-color: #f1351b;
						border-radius: 14rpx;
					}
				}

				.bottom {
					width: 100%;
					margin-top: 21rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.address {
						font-size: 24rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 33.333rpx;
						letter-spacing: 0rpx;
						color: #1a1a1a;
					}

					.next-icon {
						// width: 10rpx;
						// height: 18rpx;

						image {
							display: block;
							width: 10rpx;
							height: 18rpx;
						}
					}
				}
			}
            .get-user-address{
				justify-content: center;
				position: relative;
				.cover{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
				image{
					width: 50rpx;
					height: 50rpx;
					margin-right: 22rpx;
				}
			}
			.order-wrapper {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 32rpx;
				margin-bottom: 22rpx;

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

						.business-logo {
							width: 297rpx;

							image {
								display: block;
								width: 100%;
							}
						}

					}

					.goods {
						box-sizing: border-box;
						width: 100%;
						margin-top: 33rpx;
						padding: 33rpx 37rpx 0 66rpx;
						display: flex;
						justify-content: space-between;

						.goods-icon {
							width: 182rpx;
							height: 182rpx;
							border-radius: 10rpx;
							overflow: hidden;

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

							.integral-num {
								width: 100%;
								overflow: hidden;


								.num {
									margin-top: 59rpx;
									width: 44rpx;
									height: 44rpx;
									float: right;
									background-color: #f5f5f5;
									text-align: center;
									border-radius: 5rpx;
									font-size: 26rpx;
									font-weight: normal;
									font-stretch: normal;
									line-height: 40rpx;
									letter-spacing: 0rpx;
									color: #afafaf;
								}
							}
						}
					}
				}

				.order-item:first-child .goods:first-child {
					border: none;
				}
			}

			.order-msg {
				box-sizing: border-box;
				width: 100%;
				background-color: #fff;
				padding: 33rpx 24rpx;
				border-radius: 15rpx;

				.fle {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 33.333rpx;
					letter-spacing: 0rpx;
					color: #1a1a1a;
					font-weight: bold;

				}

				.freight {
					margin: 66rpx 0;
				}

				.activity {
					width: 100%;

					.right {
						display: flex;
						align-items: center;

						.activity-val {
							color: #f1351b;
							margin-right: 44rpx;
						}

						.next-icon {
							// width: 10rpx;
							// height: 18rpx;

							image {
								display: block;
								width: 10rpx;
								height: 18rpx;
								margin-left: 10rpx;
							}
						}
					}
				}
			}
		}

		.footer {
			box-sizing: border-box;
			padding: 16rpx 33rpx;
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				color: #1a1a1a;

				text:first-child+text {
					color: #f1351b;
					margin: 0 10rpx 0 20rpx;
				}

				text:first-child+text+text {
					color: #f1351b;
					font-size: 20rpx;
				}
			}

			.btn {
				width: 250rpx;
				height: 88rpx;
				background-color: #f1351b;
				border-radius: 44rpx;
				font-size: 30rpx;
				line-height: 88rpx;
				text-align: center;
				color: #ffffff;
			}
		}
	}
</style>
