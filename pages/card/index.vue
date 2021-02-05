<template>
	<view class="container">
		<view class="tab">
			<block v-for="(item,index) in tabsVal" :key="index">
				<view :class="currentVal==item.currentVal?'tab-item-active':'tab-item'" :data-currentVal="item.currentVal" @click="tabChange($event)">
					{{item.txt}}
				</view>
			</block>
		</view>
		<view class="tab-obj">
			<block v-if="cardList.length>0">
				<block v-for="(cardItem,cardIndex) in cardList" :key="cardIndex">
					<view class="card-warpper">
						<view :class="currentVal==0||currentVal==3?'left-rund bd-ff4':'left-rund bd-dcd'">

						</view>
						<view :class="currentVal==0||currentVal==3?'right-rund bd-ff4':'right-rund bd-dcd'">

						</view>
						<view :class="currentVal==0||currentVal==3?'card bd-ff4':'card bd-dcd'">
							<view :class="currentVal==0||currentVal==3?'left bg-ff4':'left bg-DCD'">
								<view class="card-money">
									<text>¥</text>
									<text>{{cardItem.commodityCouponVO.couponMoney}}</text>
								</view>
								<view class="prompt">
									<view class="title">
										优惠卷
									</view>
									<view class="txt">
										满{{cardItem.commodityCouponVO.couponCondition}}元可用
									</view>
								</view>
							</view>
							<view class="right">
								<view :class="currentVal==0||currentVal==3?'btn bg-ff4':'btn bg-DCD'" @click="cardHandle(cardItem.commodityCouponVO.id,cardItem.commodityCouponVO.couponMoney,cardItem.commodityCouponVO.couponCondition)"
								 v-if="currentVal==0">
									使用
								</view>
								<view :class="currentVal==0||currentVal==3?'btn bg-ff4':'btn bg-DCD'" v-else-if="currentVal==1">
									已使用
								</view>
								<view :class="currentVal==0||currentVal==3?'btn bg-ff4':'btn bg-DCD'" v-else-if="currentVal==2">
									已过期
								</view>
								<view :class="currentVal==0||currentVal==3?'btn bg-ff4':'btn bg-DCD'" @click="cardHandle(cardItem.commodityCouponVO.id)"
								 v-else="currentVal==3">
									领取
								</view>
								<view :class="currentVal==0||currentVal==3?'date col-ff4800':'date col-dcd'">
									{{cardItem.commodityCouponVO.minDate}}-{{cardItem.commodityCouponVO.maxDate}}
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
				commodityIds: [],
				totalPrice: "",
				currentVal: 0,
				tabsVal: [{
						txt: "未使用",
						currentVal: 0
					},
					{
						txt: "已使用",
						currentVal: 1
					},
					{
						txt: "已过期",
						currentVal: 2
					},
					{
						txt: "未领取",
						currentVal: 3
					}
				],
				cardList: [],
				pageName: "",
				goodsId: ""
			}
		},
		onLoad(options) {
			console.log('options', options);
			this.pageName = options.pageName;
			this.commodityIds.push(options.commodityIds);
			this.totalPrice = options.totalPrice;
			this.goodsId = options.goodsId;
			this.initCardData()
		},
		methods: {
			// 卡劵数据初始化
			initCardData: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				that.$http('/coupon/getUserCouponRecordList', {
					belongUserid: userid.id,
					commodityIds: that.commodityIds,
					status: Number(that.currentVal) + 1
				}, "post").then(function(res) {
					console.log("卡劵列表", res);
					if (res.statusCode == 200) {
						that.cardList = res.data.couponRecordByList;
					}
				})
			},
			// tab切换
			tabChange: function(e) {
				let currentVal = e.target.dataset.currentval;
				this.currentVal = currentVal;
				this.initCardData();
			},
			// 优惠卷处理
			cardHandle: function(id, cardPrice, condition) {
				console.log("id", id)
				const that = this;
				let currentVal = Number(that.currentVal);
				let pageName = that.pageName;
				let goodsId = that.goodsId;
				let totalPrice = that.totalPrice;
				switch (currentVal) {
					case 0:
						if (totalPrice >= condition) {
							uni.redirectTo({
								url: '/pages/confirmOrder/index?cardId=' + id + '&currentPage=' + pageName + '&cardPrice=' + cardPrice +
									'&goodsId=' + goodsId
							});
						} else {
							that.$refs.msgPopup.open({
								type: 'err',
								content: '亲，您不满足领取条件哦！',
								timeout: 1000,
								isClick: false
							});
						}
						break;
					case 1:
						break;
					case 2:
						break;
					default:
						let userid = uni.getStorageSync('wxUserInfo');
						that.$http('/coupon/saveCouponRecord', {
							couponId: id,
							belongUserid: userid.id
						}, 'post').then(function(res) {
							console.log("用户领取优惠卷", res);
							if (res.data.status == "success") {
								that.$refs.msgPopup.open({
									type: 'success',
									content: '亲，领取优惠卷成功哦！',
									timeout: 1000,
									isClick: false
								});
								that.initCardData()
							}
						})
				}
			}
		},
	}
</script>

<style lang="less">
	.container {
		.tab {
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx 0 30rpx;
			border-bottom: solid 1rpx #cacaca;
			border-top: solid 1rpx #cacaca;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			color: #333;

			.tab-item {
				width: 25%;
				height: 100%;
				line-height: 100rpx;
				text-align: center;
			}

			.tab-item-active {
				width: 25%;
				height: 100%;
				line-height: 100rpx;
				text-align: center;
				border-bottom: solid 2rpx #ff4800;
				color: #ff4800;
			}
		}

		.tab-obj {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;

			.card-warpper {
				position: relative;
				overflow: hidden;
				margin-bottom: 33rpx;

				.left-rund {
					width: 20rpx;
					height: 20rpx;
					border-radius: 50%;
					position: absolute;
					left: -12rpx;
					top: 50%;
					margin-top: -10rpx;
					background-color: #fff;
					z-index: 999;
				}

				.right-rund {
					width: 20rpx;
					height: 20rpx;
					border-radius: 50%;
					position: absolute;
					right: -12rpx;
					top: 50%;
					margin-top: -10rpx;
					background-color: #fff;
					z-index: 999;
				}

				.card {
					border-radius: 14rpx;
					display: flex;
					overflow: hidden;
					position: relative;

					.left {
						box-sizing: border-box;
						width: 60%;
						padding: 22rpx 33rpx;
						display: flex;
						align-items: center;

						.card-money {
							color: #fff;

							text:first-child {
								font-size: 40rpx;
							}

							text:last-child {
								font-size: 60rpx;
								font-weight: bold;
								margin-right: 22rpx;
							}
						}

						.prompt {
							color: #fff;

							.title {
								font-size: 40rpx;
							}

							.txt {
								font-size: 24rpx;
							}
						}
					}

					.right {
						width: 40%;
						padding: 22rpx 0;
						text-align: center;

						.btn {
							width: 148rpx;
							height: 57rpx;
							line-height: 57rpx;
							text-align: center;
							color: #FFF;
							border-radius: 50rpx;
							font-size: 30rpx;
							margin: 0 auto;
							margin-bottom: 11rpx;
						}

						.date {
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
