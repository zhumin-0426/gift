<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- 状态栏 -->
		<view class="order-status">
			<view :class="currentVal-1==index?'status-item-active':'order-status-item'" v-for="(item,index) in orderStatusList"
			 :key="index" :data-id="index" @click="tabChange">
				{{item.title}}
			</view>
		</view>
		<view class="main">
			<block v-if="orderList.length>0">
			    <block v-for="(item,index) in orderList" :key="index">
			    	<view class="order-wrapper">
			    		<block v-for="(businessItem,businessIndex) in item.supplierlist" :key="businessIndex">
			    			<view class="order-item">
			    				<view class="business">
			    					<view class="business-logo">
			    						<image :src="imageUrl+businessItem.supplierShowPic" mode="widthFix"></image>
			    					</view>
			    					<view class="coupon">
			    						<block v-if="currentVal==1">
			    							等待买家兑换
			    						</block>
			    						<block v-else-if="currentVal==2">
			    							等待商家发货
			    						</block>
			    						<block v-else-if="currentVal==3">
			    							待收货
			    						</block>
			    						<block v-else-if="currentVal==4">
			    							待评价
			    						</block>
			    						<block v-else>
			    							<block v-if="item.orderDeliverStatus==0">
												待兑换
											</block>
											<block v-else-if="item.orderDeliverStatus==1">
												待发货
											</block>
											<block v-else-if="item.orderDeliverStatus==2">
												已发货
											</block>
											<block v-else-if="item.orderDeliverStatus==3">
												待评价
											</block>
											<block v-else>
												已评价
											</block>
			    						</block>
			    					</view>
			    				</view>
			    				<block v-for="(goodsItem,goodIndex) in businessItem.orderdetallist" :key="goodIndex">
									<view class="goods">
										<view class="cover" @click="jumpOrderDel" :data-id="item.id"></view>
										<view class="goods-icon">
											<image :src="imageUrl+goodsItem.detailPic" mode="widthFix"></image>
										</view>
										<view class="goods-msg">
											<view class="title">{{goodsItem.detailName}} {{goodsItem.detailArgName}}</view>
										    <view class="integral fon-30 col-e61 mg-t-10 mg-b-10">积分：{{goodsItem.detailScore}}</view>
											<view class="num fon-28 col-aea">数量：{{goodsItem.detailNumber}}</view>
										</view>
									</view>
									<block v-if="currentVal==1">
										<view class="btn" :data-idx="index" @click="exchange">
										  立即兑换	
										</view>
									</block>
									<block v-else-if="currentVal==2">
										
									</block>
									<block v-else-if="currentVal==3">
										<view class="btn" :data-orderId="item.id" @click="confirmGetGoods">
										  确认收货
										</view>
									</block>
									<block v-else-if="currentVal==4">
										<view :data-img="goodsItem.detailPic" :data-orderId="item.id" :data-id="goodsItem.commodityVO.id" class="btn" @click="jumpEvaluate">
										  立即评价
										</view>
									</block>
								</block>
			    			</view>
			    		</block>
			    	</view>
			    </block>
			</block>
			<block v-else>
				<view class="no-content">
					<image src="../../static/images/no_content.png" mode=""></image>
					<view class="txt">亲,暂无相关数据哦!</view>
				</view>
			</block>
			<!-- 提示框 -->
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="input" title="提示" content="确定兑换商品吗？" :duration="2000" :before-close="true" @close="close"
				 @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
			<mpopup ref="mpopup" :isdistance="true"></mpopup>
		</view>
	</view>
</template>

<script>
	import mpopup from 'components/xuan-popup/xuan-popup.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	export default {
		components: {
			mpopup,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				imageUrl:"",
				goodsNum: 1,
				startDate: "2018-05-02",
				endDate: "2022-09-20",
				defaultDate: "9",
				// 订单状态
				orderStatusList: [{
						title: "待兑换",
						params: "all"
					},
					{
						title: "待发货",
						params: ""
					},
					{
						title: "待收货",
						params: ""
					},
					{
						title: "待评价",
						params: ""
					},
					{
						title: "全部",
						params: ""
					}
					// {
					// 	title: "全部订单",
					// 	params: ""
					// }
				],
				orderList: [],
				currentVal:1,
				idx:0
				
			}
		},
		onLoad(options) {
			this.currentVal = options.id;
			this.orderDataInit();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			// 数据初始化
			orderDataInit: function() {
				let userid = uni.getStorageSync('wxUserInfo');
				if(this.currentVal<5){
					let prams = {
						orderBelongUserid: userid.id,
						status :Number(this.currentVal)
					}
					this.orderDataInitHttp(prams)
				}else{
					let prams = {
						orderBelongUserid:userid.id,
						status :0
					}
					this.orderDataInitHttp(prams)
				}
			},
			orderDataInitHttp:function(prams){
				const that = this;
				that.$http('/order/getOrderList', prams, 'post').then(function(res) {
					console.log("a", res);
					if (res.statusCode == 200) {
						that.orderList = res.data.commodityOrderByList
					}
				})
			},
			// 确认收货
			confirmGetGoods: function(e){
				const that = this;
				let id = e.target.dataset.orderid;
				that.$http('/order/configShop',{id:id},'post').then(function(res){
					console.log("确认收货",res);
					if(res.statusCode==200){
						uni.showToast({
						    title: '收货成功',
						    duration: 2000
						});
						that.orderDataInit()
					}
				})
			},
			// 立即兑换
			exchange:function(e){
				this.idx = e.target.dataset.idx
				this.$refs.popup.open()
			},
			confirm(done) {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				let idx = that.idx;
				let prams = {
					orderids:that.orderList[idx].id,
					orderBelongUserid:userid.id,
					orderPayMoney:that.orderList[idx].orderPayMoney,
					orderdetallist:that.orderList[idx].orderdetallist
				}
				that.$http('/order/updateOrder',prams,'post').then(function(res){
					console.log("res",res);
					if(res.statusCode==200){
						uni.showToast({
						    title: '兑换成功',
						    duration: 2000
						});
						that.orderDataInit()
					}
				})
				done()
			},
			close(done) {
				done()
			},
			tabChange:function(e){
				let id = e.target.dataset.id;
				console.log("id",id)
				this.currentVal = Number(id)+1;
				this.orderDataInit()
			},
			jumpOrderDel:function(e){
				let id = e.target.dataset.id;
				uni.navigateTo({
					url:"/pages/order/orderDetail?id="+id
				})
			},
			jumpEvaluate:function(e){
				let id =  e.target.dataset.id;
				let orderid = e.target.dataset.orderid;
				let img = e.target.dataset.img;
				uni.navigateTo({
					url:'/pages/evaluate/index?id='+id+'&orderid='+orderid+'&img='+img
				})
			},
			// 监听导航返回按钮
			onBackPress(e) {
				if (e.from == 'backbutton') {
					uni.redirectTo({
						url:"/pages/user/index"
					})
					return true; //阻止默认返回行为
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

		.order-status {
			box-sizing: border-box;
			width: 100%;
			padding: 0 33rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.order-status-item {
				font-size: 28rpx;
				padding: 22rpx 0;
			}

			.status-item-active {
				border-bottom: solid 4rpx rgb(255, 80, 0);
				color: rgb(255, 80, 0);
				padding-bottom:10rpx
			}
		}

		.main {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;

			.order-wrapper {
				width: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 32rpx;

				.order-item {
					box-sizing: border-box;
					width: 100%;
					padding: 22rpx 0;
					overflow: hidden;

					.business {
						box-sizing: border-box;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 22rpx;

						.business-logo {
							width: 297rpx;
                            height: 44rpx;
							image {
								display: block;
								width: 100%;
								height: 100%!important;
							}
						}

						.coupon {
							font-size: 26rpx;
							line-height: 40rpx;
							color: rgb(255, 80, 0);
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
							right: 0;
							bottom: 0;
							left:0;
							z-index: 1;
						}
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
						}
					}

					.btn {
						float: right;
						border: solid 1rpx rgb(255, 80, 0);
						font-size: 28rpx;
						color: rgb(255, 80, 0);
						padding: 5rpx 10rpx;
						border-radius: 30rpx;
						margin-right: 22rpx;
					}
				}

				.order-item:first-child .goods:first-child {
					border: none;
				}
			}
		}
	}
</style>
