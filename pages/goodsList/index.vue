<template>
	<view class="container">
		<view class="search-wrapper dis-flex al-items-center jf-bw bg-fff">
			<view class="top w100 bg-fff dis-flex al-items-center box-sz bd-r-60">
				<view class="cover" @click="jumpSearch"></view>
				<view class="icon mg-r-14">
					<image class="w100 ds-b" src="../../static/images/all-classify/search-icon.png" mode="widthFix"></image>
				</view>
				<input class="ipt fon-28 col-333" type="text" value="搜索商品" />
			</view>
			<block v-if="styleBol">
				<image @click="styleChange" class="list-icon" src="../../static/images/goodsList/list2.png" mode="widthFix"></image>
			</block>
			<block v-else>
				<image @click="styleChange" class="list-icon" src="../../static/images/goodsList/list1.png" mode="widthFix"></image>
			</block>
		</view>
		<view class="tab dis-flex al-items-center jf-bw bg-fff">

			<view :class="currentVal==0?'tab-item-active':'tab-item'" data-id="0" data-prams="commodity.id desc" @click="tabChange">综合</view>
			<view :class="currentVal==1?'tab-item-active':'tab-item'" data-id="1" data-prams="commodity.sal_num desc" @click="tabChange">销量</view>
			<view :class="currentVal==2?'tab-item-active integral':'tab-item integral'">
				<view class="cover" data-id="2" @click="tabChange"></view>
				<view class="left">
					积分
				</view>
				<view class="right">
					<view :class="integralAct==false?'top-sj-active':'top-sj'"></view>
					<view :class="integralAct==true?'bottom-sj-active':'bottom-sj'"></view>
				</view>
			</view>
		</view>
		<view class="tab-obj w100 mg-t-30 mg-b-16 dis-flex flx-w jf-bw box-sz">
			<block v-if="goodsList.length>0">
				<block v-for="(item,index) in goodsList">
					<view :class="styleBol==false? 'goods':'goods-act'">
						<view class="cover" :data-id="item.id" @click="jumpGoodsDel"></view>
						<view class="goods-pic">
							<image :src="imageUrl+item.imgUrl" mode="widthFix"></image>
						</view>
						<view class="goods-title">
							{{item.commodityName}} {{item.commodityDescribe}}
						</view>
						<view class="goods-msg">
							<view class="left dis-flex al-items-center">
								<image class="mg-r-10" src="/static/images/index/integral-icon.png" mode="widthFix"></image>
								<text class="fon-26 col-ff8">{{item.defaultScore}}积分</text>
							</view>
							<view class="right fon-26 col-aea">
								{{item.salnum}}人兑换
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 图片路径
				imageUrl: "",
				tabList: [{
						txt: "综合"
					},
					{
						txt: "销量"
					},
					{
						txt: "积分"
					}
				],
				currentVal: 0,
				searchId: "",
				goodsList: [],
				styleBol: false,
				integralAct: null,
				goodsListPrams: "commodity.id desc",
				pageName:""
			}
		},
		onLoad(options) {
			console.log("options", options);
			this.searchId = options.id;
			this.pageName = options.pageName;
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
			this.goodsListDataInit();
		},
		methods: {
			// 属性切换
			tabChange: function(e) {
				this.currentVal = Number(e.target.dataset.id);
				if (this.currentVal == 2) {
					this.integralAct = !this.integralAct
				} else {
					this.integralAct = null
				}
				// 属性切换
				if (this.integralAct == true) {
					this.goodsListPrams = "commodity.default_score asc"
				} else if (this.integralAct == false) {
					this.goodsListPrams = "commodity.default_score desc"
				} else {
					this.goodsListPrams = e.target.dataset.prams;
				}
				this.goodsListDataInit()
			},
			// 数据初始化
			goodsListDataInit: function() {
				if(this.pageName=="search"){
					let prams = {
						searchLabel: this.searchId,
						orderby: this.goodsListPrams,
					}
					this.goodsListDataInitHttp(prams)
				}else{
					let prams = {
						orderby: this.goodsListPrams,
						iconid:this.searchId
					}
					this.goodsListDataInitHttp(prams)
				}
			},
			goodsListDataInitHttp:function(prams){
				uni.showLoading({
					title: '加载中'
				});
				const that = this;
				that.$http('/commodity/getCommodityList',prams, 'post').then(function(res) {
					console.log("商品列表数据", res);
					if (res.statusCode == 200) {
						that.goodsList = res.data.commodityByList;
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
			},
			// 跳转到搜索
			jumpSearch: function() {
				uni.redirectTo({
					url: '/pages/search/index'
				})
			},
			// 样式切换
			styleChange: function() {
				this.styleBol = !this.styleBol;
			},
			// 跳转商品详情
			jumpGoodsDel:function(e){
				let id = e.target.dataset.id
				uni.navigateTo({
					url:"/pages/goodsDetail/index?id="+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}

	.search-wrapper {
		border-top: solid 1rpx #DCDCDC;
		border-bottom: solid 1rpx #DCDCDC;
		padding: 32rpx 22rpx;

		.top {
			width: 90%;
			padding: 10rpx;
			background-color: #f6f6f6;
			position: relative;

			.icon {
				width: 33rpx;
			}

			.ipt {
				color: #999
			}

			.cover {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 999;
			}
		}

		.list-icon {
			width: 50rpx;
		}
	}

	.tab {
		border-bottom: solid 1rpx #DCDCDC;

		.tab-item {
			width: 33.333%;
			line-height: 60rpx;
			text-align: center;
			color: #333;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.left {
				margin-right: 10rpx;
			}

			.right {
				flex-direction: column;

				.top-sj {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/top-sj.png);
					background-repeat: no-repeat;
					background-size: 100%;
					background-position: 0 0;
					margin-bottom: -10rpx;
				}

				.top-sj-active {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/top-sj-active.png);
					background-repeat: no-repeat;
					background-size: 100%;
					background-position: 0 0;
					margin-bottom: -10rpx;
				}

				.bottom-sj {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/bottom-sj.png);
					background-repeat: no-repeat;
					background-size: 26rpx 26rpx;
					background-position: 0 0;
				}

				.bottom-sj-active {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/bottom-sj-active.png);
					background-repeat: no-repeat;
					background-size: 26rpx 26rpx;
					background-position: 0 0;
				}
			}
		}

		.tab-item-active {
			width: 33.333%;
			line-height: 60rpx;
			text-align: center;
			color: #ff4800;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.left {
				margin-right: 10rpx;
			}

			.right {
				flex-direction: column;

				.top-sj {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/top-sj.png);
					background-repeat: no-repeat;
					background-size: 100%;
					background-position: 0 0;
					margin-bottom: -10rpx;
				}

				.top-sj-active {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/top-sj-active.png);
					background-repeat: no-repeat;
					background-size: 100%;
					background-position: 0 0;
					margin-bottom: -10rpx;
				}

				.bottom-sj {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/bottom-sj.png);
					background-repeat: no-repeat;
					background-size: 26rpx 26rpx;
					background-position: 0 0;
				}

				.bottom-sj-active {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/goodsList/bottom-sj-active.png);
					background-repeat: no-repeat;
					background-size: 26rpx 26rpx;
					background-position: 0 0;
				}
			}
		}

		.integral {
			position: relative;

			.cover {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 999;
			}
		}
	}

	.tab-obj {
		padding: 0 22rpx;

		.goods {
			width: 345rpx;
			box-sizing: border-box;
			overflow: hidden;
			background-color: #FFFFFF;
			border-radius: 14rpx;
			margin-bottom: 22rpx;
			position: relative;

			.cover {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}

			.goods-pic {
				width: 100%;
				height: 346rpx;

				image {
					display: block;
					width: 100%;
					height: 100% !important;
					border-radius: 14rpx;
				}
			}

			.goods-title {
				line-height: 32rpx;
				letter-spacing: -0.2rpx;
				padding-right: 22rpx;
				padding-left: 22rpx;
				margin-bottom: 22rpx;
				margin-top: 22rpx;
				font-size: 28rpx;
				text-align: justify;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-break: break-all;

			}

			.goods-msg {
				box-sizing: border-box;
				padding-bottom: 22rpx;
				padding-left: 22rpx;
				padding-right: 22rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.left {
				image {
					max-width: 25rpx;
				}

				text {
					line-height: 36rpx;
				}
			}

			.right {
				line-height: 36rpx;
			}
		}

		.goods-act {
			width: 100%;
			margin-bottom: 22rpx;
			overflow: hidden;
			padding: 20rpx;
			border-radius: 14rpx;
			background-color: #FFFFFF;
			position: relative;

			.cover {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}

			.goods-pic {
				width: 35%;
				float: left;

				image {
					display: block;
					width: 220rpx;
					height: 220rpx !important;
					border-radius: 14rpx;
				}
			}

			.goods-title {
				line-height: 32rpx;
				letter-spacing: -0.2rpx;
				padding-right: 22rpx;
				padding-left: 22rpx;
				margin-bottom: 32rpx;
				margin-top: 22rpx;
				font-size: 28rpx;
				text-align: justify;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-break: break-all;

			}

			.goods-msg {
				box-sizing: border-box;
				padding-bottom: 22rpx;
				padding-left: 22rpx;
				padding-right: 22rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.left {
				image {
					max-width: 25rpx;
				}

				text {
					line-height: 36rpx;
				}
			}

			.right {
				line-height: 36rpx;
			}
		}
	}
</style>
