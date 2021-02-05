<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="top">
				<view class="title">
					个人中心
				</view>
				<block v-if="userData.idNum">
					<view class="vip-ID">
						会员ID：{{userData.idNum}}
					</view>
				</block>
			</view>
			<view class="middle">
				<block v-if="userData.wxHeadPortrait">
					<view class="user-pic">
						<image :src="userData.wxHeadPortrait" mode="widthFix"></image>
						<view class="vip-icon">
							v{{userData.leavel}}
						</view>
					</view>
				</block>
				<block v-else>
					<view class="user-pic">
						<image src="../../static/images/user/user-pic.png" mode="widthFix"></image>
					</view>
					<view class="login-btn txt-center fon-30 w100 mg-t-30 col-aea" @click="login">
						立即登入
					</view>
				</block>
			</view>
			<block v-if="userData.userNinkname">
				<view class="bottom">
					<view class="user-name">
						{{userData.userNinkname}}
					</view>
					<view class="user-set" style="display: none;">
						<image src="../../static/images/user/set-icon.png" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
		<view class="content">
			<!-- 活动模块 -->
			<view class="activity-module">
				<view class="left">
					<view class="integral">
						<view class="integral-icon">
							<image src="../../static/images/user/integral-icon.png" mode="widthFix"></image>
						</view>
						<text>积分</text>
						<block v-if="'userScore' in userData">
							<text>{{userData.userScore}}</text>
						</block>
						<block v-else>
							<text>0</text>
						</block>
					</view>
					<view class="coupon">
						<view class="cover" data-pageurl="card" :data-idx="index+1" @click="onTargetJump"></view>
						<block v-if="userid!=''">
							<view class="num">
								{{couponCount}}
							</view>
						</block>
						<block v-else>
							<view class="num">
								0
							</view>
						</block>
						<view class="txt">
							优惠卷
						</view>
					</view>
				</view>
				<view class="right">
					<view class="cover" data-pageurl="topUp" @click="onTargetJump"></view>
					<view class="top-up-icon">
						<image src="/static/images/user/top-up.png" mode="widthFix"></image>
					</view>
					<view class="txt">
						积分充值
					</view>
				</view>
			</view>
			<!-- 订单状态模块 -->
			<view class="order-module">
				<view class="top">
					<view class="title">
						我的订单
					</view>
					<view class="all-order">
						<view class="cover" data-pageurl="order" :data-idx="5" @click="onTargetJump"></view>
						<view>全部订单</view>
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<!-- 状态栏 -->
				<view class="order-state">
					<view class="order-state-item">
						<view class="cover" data-pageurl="order" :data-idx="1" @click="onTargetJump"></view>
						<view class="state-item-icon">
							<image src="../../static/images/user/order-item-icon1.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待兑换
						</view>
						<block v-if="statusList[0].orderDeliverStatus!=0">
							<view class="num fon-24 bg-f13 col-fff">
								{{statusList[0].orderDeliverStatus}}
							</view>
						</block>
					</view>
					<view class="order-state-item">
						<view class="cover" data-pageurl="order" :data-idx="2" @click="onTargetJump"></view>
						<view class="state-item-icon">
							<image src="../../static/images/user/order-item-icon2.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待发货
						</view>
						<block v-if="statusList[1].orderDeliverStatus!=0">
							<view class="num fon-24 bg-f13 col-fff">
								{{statusList[1].orderDeliverStatus}}
							</view>
						</block>
					</view>
					<view class="order-state-item">
						<view class="cover" data-pageurl="order" :data-idx="3" @click="onTargetJump"></view>
						<view class="state-item-icon">
							<image src="../../static/images/user/order-item-icon3.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待收货
						</view>
						<block v-if="statusList[2].orderDeliverStatus!=0">
							<view class="num fon-24 bg-f13 col-fff">
								{{statusList[2].orderDeliverStatus}}
							</view>
						</block>
					</view>
					<view class="order-state-item">
						<view class="cover" data-pageurl="order" :data-idx="4" @click="onTargetJump"></view>
						<view class="state-item-icon">
							<image src="../../static/images/user/order-item-icon4.png" mode="widthFix"></image>
						</view>
						<view class="state-item-txt">
							待评价
						</view>
						<block v-if="statusList[3].orderDeliverStatus!=0">
							<view class="num fon-24 bg-f13 col-fff">
								{{statusList[3].orderDeliverStatus}}
							</view>
						</block>
					</view>
				</view>
			</view>
			<!-- 广告 -->
			<view class="adversing">
				<swiper :autoplay="true" :interval="3000" :duration="1000" style="height:180rpx">
					<swiper-item>
						<image src="../../static/images/user/adversing.png" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 链接栏 -->
			<view class="nav-bar">
				<view class="nav-bar-item">
					<view class="cover" :data-integral="userData.userScore" data-pageurl="integral" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon1.png" mode="widthFix"></image>
						</view>
						<view class="title">
							面对面送积分
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="cover" :data-integral="userData.userScore" data-pageurl="sendIntegral" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon2.png" mode="widthFix"></image>
						</view>
						<view class="title">
							输入ID号送积分
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="cover" data-pageurl="integralTopUpHis" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon3.png" mode="widthFix"></image>
						</view>
						<view class="title">
							积分充值记录
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="cover" data-pageurl="integralCashHistory" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon4.png" mode="widthFix"></image>
						</view>
						<view class="title">
							积分收付记录
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="cover" data-pageurl="car" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon5.png" mode="widthFix"></image>
						</view>
						<view class="title">
							我的购物车
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="cover" data-pageurl="myPointTo" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon6.png" mode="widthFix"></image>
						</view>
						<view class="title">
							我的关注
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="cover" data-pageurl="footprint" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon7.png" mode="widthFix"></image>
						</view>
						<view class="title">
							我的足迹
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="nav-bar-item">
					<view class="cover" data-pageurl="address" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon8.png" mode="widthFix"></image>
						</view>
						<view class="title">
							收货地址管理
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<!-- <view class="nav-bar-item" style="margin-bottom: 23rpx;">
						<view class="cover" data-pageurl="userset" @click="onTargetJump"></view>
						<view class="left">
							<view class="icon">
								<image src="/static/images/user/nav-bar-item-icon9.png" mode="widthFix"></image>
							</view>
							<view class="title">
								会员资料设置
							</view>
						</view>
						<view class="right">
							<image src="../../static/images/user/next.png" mode="widthFix"></image>
						</view>
					</view> -->
				<view class="nav-bar-item">
					<view class="cover" data-pageurl="collec" @click="onTargetJump"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon10.png" mode="widthFix"></image>
						</view>
						<view class="title">
							收藏
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view>
				<!-- <view class="nav-bar-item">
					<view class="cover" @click="service"></view>
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/nav-bar-item-icon11.png" mode="widthFix"></image>
						</view>
						<view class="title">
							客服电话
						</view>
					</view>
					<view class="right">
						<image src="../../static/images/user/next.png" mode="widthFix"></image>
					</view>
				</view> -->
			</view>
		</view>
		<!-- 提示框 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" title="提示" content="亲,您还没有登入哦!确定登入吗？" :duration="2000" :before-close="true" @close="close"
			 @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 消息提示 -->
		<mpopup ref="msgPopup" :isdistance="true"></mpopup>
		<!-- 底部导航 -->
		<tabBar :tabBarActive="tabBarActive"></tabBar>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import tabBar from '../../components/footer.vue';
	import mpopup from 'components/xuan-popup/xuan-popup.vue';
	export default {
		components: {
			tabBar,
			mpopup,
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				userData: {},
				couponCount: "",
				orderStatus: [],
				// 底部导航
				tabBarActive: {
					state: 5,
					roundLeft: "614rpx",
					mulchLeft: "614rpx",
					elementLeft: "646rpx",
				},
				userid: "",
				statusList: []
			}
		},
		onShow() {
			this.initUserData();
		},
		methods: {
			initUserData: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				this.userid = userid.id;
				that.$http('/users/getUserCenter', {
					id: userid.id
				}, 'post').then(function(res) {
					console.log("个人中心", res);
					if (res.data.status == "success") {
						that.userData = res.data.getuser;
						that.couponCount = res.data.countcoupon;
						that.orderStatus = res.data.getuser.orderStatus;
						that.statusList = res.data.getuser.orderStatus
					}
				})
			},
			// 导航跳转
			onTargetJump: function(e) {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				// if (userid.id) {
				let pageUrl = e.target.dataset.pageurl;
				let idx = e.target.dataset.idx;
				let integral = e.target.dataset.integral;
				let urls = {
					card: "/pages/card/index",
					topUp: "/pages/topUp/index?",
					order: "/pages/order/index?id=" + idx,
					sendIntegral: "/pages/sendIntegral/index?integral=" + integral,
					integralTopUpHis: "/pages/integralTopUpHis/index",
					integralCashHistory: "/pages/integralCashHistory/index",
					car: "/pages/car/index",
					myPointTo: "/pages/myPointTo/index",
					footprint: "/pages/footprint/index",
					address: "/pages/address/index",
					collec: "/pages/collec/index",
					integral:"/pages/integral/index?integral=" + integral,
				}
				uni.navigateTo({
					url: urls[pageUrl]
				})
				// } else {
				// 	that.$refs.popup.open()
				// }
			},
			close(done) {
				done()
			},
			confirm(done) {
				window.location.href = "http://lipinhui.28888753.cn/before/users/getUserCode";
				done()
			},
			// 立即登入
			login: function() {
				window.location.href = "http://lipinhui.28888753.cn/before/users/getUserCode";
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
			padding: 46rpx 22rpx;
			width: 100%;
			height: 387rpx;
			background-image: url(../../static/images/user/herder-pic.png);
			background-position: 0 0;
			background-repeat: no-repeat;
			background-size: 100% 250rpx;
			background-color: #fff;

			.top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 28.06rpx;
					color: #ffffff;
				}

				.vip-ID {
					padding: 10rpx 20rpx;
					background-color: rgba(0, 0, 0, 0.3);
					border-radius: 40rpx;
					font-size: 24rpx;
					color: #ffffff;
				}
			}

			.middle {
				width: 100%;
				margin-top: 15rpx;
				background-image: url(../../static/images/user/rund.png);
				background-repeat: no-repeat;
				background-position: 560rpx 70rpx;
				background-size: 103rpx 15rpx;

				.user-pic {
					width: 168rpx;
					height: 168rpx;
					border: solid 5rpx #f6f6f6;
					border-radius: 50%;
					margin: 0 auto;
					position: relative;
					background-color: #FFFFFF;

					image {
						display: block;
						width: 168rpx;
						height: 168rpx;
						border-radius: 50%;
					}

					.vip-icon {
						position: absolute;
						top: 0;
						right: -28rpx;
						border-radius: 50%;
						z-index: 999;
						width: 45rpx;
						height: 45rpx;
						background-color: #000000;
						border: solid 3rpx #ffca57;
						font-size: 20rpx;
						line-height: 40rpx;
						text-align: center;
						line-height: 45rpx;
						color: #ffc74e;
					}
				}
			}

			.bottom {
				text-align: center;
				position: relative;
				top: 23rpx;

				.user-name {
					font-size: 28rpx;
					line-height: 32rpx;
					letter-spacing: -0.3rpx;
					color: #1a1a1a;
				}

				.user-set {
					width: 30rpx;
					height: 26rpx;
					position: absolute;
					top: 5rpx;
					right: 0;

					image {
						display: block;
						max-width: 100%;
						max-height: 100%;
					}
				}
			}
		}

		.content {
			box-sizing: border-box;
			width: 100%;
			padding: 22rpx 33rpx;
			padding-bottom: 120rpx;

			.activity-module {
				box-sizing: border-box;
				width: 100%;
				padding: 0 0 0 21rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 15rpx;

				.left {
					box-sizing: border-box;
					width: 75%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-right: 1rpx #f5f5f5 solid;

					.integral {
						display: flex;
						align-items: center;

						.integral-icon {
							width: 40rpx;
							height: 40rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						text {
							display: block;
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #afafaf;
							margin: 0 42rpx 0 13rpx;
						}

						text:last-child {
							margin: 0;
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #f1351b;
							font-weight: bold;
						}
					}

					.coupon {
						padding: 26rpx 44rpx 32rpx 0;
						position: relative;

						.cover {
							position: absolute;
							top: 0;
							left: 0;
							bottom: 0;
							right: 0;
							z-index: 1;
						}

						.num {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #f1351b;
							font-weight: bold;
							text-align: center;
							margin-bottom: 25rpx;
						}

						.txt {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #afafaf;
						}
					}
				}

				.right {
					width: 25%;
					padding: 32rpx 0;
					text-align: center;
					position: relative;

					.cover {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						z-index: 1;
					}

					.top-up-icon {
						width: 30rpx;
						height: 30rpx;
						margin: 0 auto;
						margin-bottom: 25rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}

					.txt {
						font-size: 28rpx;
						line-height: 32rpx;
						letter-spacing: -0.3rpx;
						color: #afafaf;
					}
				}
			}

			.order-module {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin: 22rpx 0 47rpx 0;

				.top {
					box-sizing: border-box;
					width: 100%;
					padding: 32rpx 22rpx 20rpx 22rpx;
					border-bottom: solid 1rpx #f5f5f5;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.title {
						font-size: 28rpx;
						line-height: 32rpx;
						letter-spacing: -0.3rpx;
						color: #1a1a1a;
					}

					.all-order {
						font-size: 24rpx;
						line-height: 32rpx;
						letter-spacing: -0.2rpx;
						color: #1a1a1a;
						display: flex;
						align-items: center;
						position: relative;

						.cover {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							z-index: 1;
						}

						image {
							display: block;
							width: 10rpx;
							height: 18rpx;
							margin-left: 11rpx;
						}
					}
				}

				.order-state {
					box-sizing: border-box;
					width: 100%;
					padding: 22rpx 27rpx 33rpx 22rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.order-state-item {
						position: relative;

						.cover {
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							z-index: 1;
						}

						.state-item-icon {
							width: 41rpx;
							height: 41rpx;
							margin: 0 auto;
							margin-bottom: 20rpx;

							image {
								display: block;
								max-width: 100%;
							}
						}

						.state-item-txt {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #1a1a1a;
						}

						.num {
							width: 35rpx;
							height: 35rpx;
							position: absolute;
							top: -10rpx;
							right: 0;
							border-radius: 50%;
							text-align: center;
							line-height: 35rpx;

						}
					}
				}
			}

			.adversing {
				width: 684rpx;
				height: 180rpx;
				border: solid 1rpx #fff;
				border-radius: 15rpx;
				margin-bottom: 44rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.nav-bar {
				width: 100%;

				.nav-bar-item {
					box-sizing: border-box;
					width: 100%;
					padding: 27rpx 23rpx 27rpx 19rpx;
					background-color: #fff;
					border-radius: 15rpx;
					margin-bottom: 15rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					position: relative;

					.cover {
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						top: 0;
						z-index: 1;
					}

					.left {
						display: flex;
						align-items: center;

						.icon {
							width: 41rpx;
							height: 41rpx;
							margin-right: 17rpx;

							image {
								display: block;
								max-width: 100%;
							}
						}

						.title {
							font-size: 28rpx;
							line-height: 32rpx;
							letter-spacing: -0.3rpx;
							color: #1a1a1a;
						}
					}

					.right {
						width: 10rpx;
						height: 18rpx;

						image {
							display: block;
							max-width: 100%;
						}
					}
				}
			}
		}
	}
</style>
