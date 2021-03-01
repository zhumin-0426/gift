<template>
	<view class="container pd-32">
		<view class="address bg-fff bd-r-14 mg-b-24">
			<view class="user-info dis-flex al-items-center">
				<view class="name fon-28 col-1a1 mg-r-22">{{addressMsg.orderUserName}}</view>
				<view class="phone fon-24 col-afa">{{addressMsg.orderUserPhone}}</view>
			</view>
			<view class="address-del fon-24 col-1a1 dis-flex al-items-center jf-bw">
				<view>{{addressMsg.orderProvinct}} {{addressMsg.orderCity}} {{addressMsg.orderArea}} {{addressMsg.orderAddress}}</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="order bg-fff w100 bd-r-14 w100 box-sz mg-b-24">
			<block v-for="(item,index) in orderMsg" :key="index">
				<view class="top">
					<image :src="imageUrl+item.supplierShowPic" mode="widthFix"></image>
				</view>
				<block v-for="(goodsItem,goodsIndex) in item.orderdetallist" key="goods">
					<view class="goods dis-flex al-items-center jf-bw w100">
						<view class="goods-icon">
							<image class="w100 bd-r-14" :src="imageUrl+goodsItem.detailPic" mode="widthFix"></image>
						</view>
						<view class="goods-msg">
							<view class="goods-name fon-28 txt-clamp-2">
								{{goodsItem.detailName}} {{goodsItem.detailArgName}}
							</view>
							<view class="goods-num fon-24 col-afa">
								x{{goodsItem.detailNumber}}
							</view>
						</view>
					</view>
				</block>
			</block>
			<view class="pay-info fon-28 col-1a1 fon-w-b">
				<view class="integral dis-flex al-items-center jf-bw">
					<view>
						兑换所需积分
					</view>
					<view>
						{{addressMsg.orderTotalScore}}积分
					</view>
				</view>
				<view class="freight dis-flex al-items-center jf-bw">
					<view>
						运费
					</view>
					<view>
						<block v-if="addressMsg.orderFreightPrice==0">
							0积分
						</block>
						<block v-else>
							{{addressMsg.orderFreightPrice}}积分
						</block>
					</view>
				</view>
				<view class="activity dis-flex al-items-center jf-bw">
					<view>
						优惠活动
					</view>
					<view :class="addressMsg.orderFreeMoney!=null?'col-f13':''">
						<block v-if="addressMsg.orderFreeMoney==null">
						    暂无优惠活动
						</block>
						<block v-else>
							满减{{addressMsg.orderFreeMoney}}
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-info w100 bg-fff bd-r-14 box-sz fon-28 col-1a1 fon-w-b">
			<view class="fon-28 col-1a1">
				订单信息
			</view>
			<view class="dis-flex al-items-center">
				<view style="margin-right: 64rpx;margin-top: 62rpx;margin-bottom: 62rpx;">
					订单编号:
				</view>
				<view>
					{{addressMsg.orderNumber}}
				</view>
			</view>
			<view class="dis-flex al-items-center">
				<view style="margin-right: 64rpx;">
					创建时间:
				</view>
				<view>
					{{addressMsg.orderdate}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 图片路径
				imageUrl: "",
				orderId: "",
				addressMsg:{},
				orderMsg:[]
			}
		},
		onLoad(options) {
			this.orderId = options.id;
			this.orderDelDataInit();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
            orderDelDataInit:function(){
				const that = this;
				that.$http('/order/getOrder',{id:that.orderId},'post').then(function(res){
					console.log("订单详情数据初始化",res)
					if(res.statusCode==200){
						that.addressMsg = res.data.commodityOrderById;
						that.orderMsg = res.data.commodityOrderById.supplierlist;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}

	.address {
		padding: 32rpx 20rpx;

		.address-del {
			margin-top: 10rpx;

			image {
				width: 10rpx;
			}
		}
	}

	.order {
		padding: 32rpx 20rpx;

		.top {
			margin-bottom: 32rpx;

			image {
				width: 280rpx;
				height: 44rpx!important;
			}
		}

		.goods {
			overflow: hidden;

			.goods-icon {
				width: 170rpx;
				margin-right: 32rpx;
			}

			.goods-num {
				width: 44rpx;
				height: 44rpx;
				text-align: center;
				line-height: 44rpx;
				float: right;
				background-color: #f5f5f5;
				border-radius: 5rpx;
				margin-top: 60rpx;
			}
		}

		.pay-info {
			margin-top: 100rpx;

			.freight {
				margin: 66rpx 0;
			}
		}
	}

	.order-info {
		margin-top: 26rpx;
		padding: 32rpx 20rpx;
	}
</style>
