<template>
	<view class="container">
		<block v-if="addressList.length>0">
			<block v-for="(item,index) in addressList" :key="index">
				<view class="address">
					<block v-if="pageName=='goodsDetail'||pageName=='car'">
						<!-- <navigator hover-class="none" class="w100 dis-flex al-items-center" :url="'/pages/confirmOrder/index?addressId='+item.id+'&currentPage='+pageName"> -->
						<block v-if="item.addressIsDefault==1">
							<view class="address-sel">
								<image class="w100" src="../../static/images/address/position1.png" mode="widthFix"></image>
							</view>
						</block>
						<block v-else>
							<view class="address-sel">
								<image class="w100" src="../../static/images/address/position.png" mode="widthFix"></image>
							</view>
						</block>
						<view class="address-main">
							<view class="cover" :data-addressId="item.id" @click="goBack"></view>
							<view class="user-msg">
								<view class="name">
									{{item.addressUsername}}
								</view>
								<view class="phone">
									{{item.addressPhone}}
								</view>
								<view class="default" v-if="item.addressIsDefault==1">
									[默认]
								</view>
							</view>
							<view class="address-txt">
								<text>{{item.addressProvice}}</text>
								<text>{{item.addressCity}}</text>
								<text>{{item.addressArea}}</text>
								<text>{{item.addressDetail}}</text>
							</view>
						</view>
						<!-- </navigator> -->
					</block>
					<block v-else>
						<block v-if="item.addressIsDefault==1">
							<view class="address-sel">
								<image class="w100" src="../../static/images/address/position1.png" mode="widthFix"></image>
							</view>
						</block>
						<block v-else>
							<view class="address-sel">
								<image class="w100" src="../../static/images/address/position.png" mode="widthFix"></image>
							</view>
						</block>
						<view class="address-main">
							<view class="user-msg">
								<view class="name">
									{{item.addressUsername}}
								</view>
								<view class="phone">
									{{item.addressPhone}}
								</view>
								<view class="default" v-if="item.addressIsDefault==1">
									[默认]
								</view>
							</view>
							<view class="address-txt">
								<text>{{item.addressProvice}}</text>
								<text>{{item.addressCity}}</text>
								<text>{{item.addressArea}}</text>
								<text>{{item.addressDetail}}</text>
							</view>
						</view>
					</block>
					<view class="editor">
						<navigator :url="'/pages/address/editor?id='+item.id" hover-class="none">
							<image src="/static/images/address/editor.png" mode="widthFix"></image>
						</navigator>
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
		<view class="get-address-btn" @click="getAddress">
			一键获取收货地址
		</view>
		<navigator url="/pages/address/add" hover-class="none">
			<view class="add-address-btn">
				添加地址
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageName: "",
				addressList: [],
				prevPageName: "",
				goodsId: "",
				// 保存微信地址参数
				wxAddressHttpPrams:{
					addressDetail:"",
					addressPhone:"",
					addressUsername:"",
					belongUserId:"",
					addressProvice:"",
					addressCity:"",
					addressArea:""
				},
				wxAddressList:[]
			}
		},
		onLoad(options) {
			this.pageName = options.pageName;
			this.goodsId = options.goodsId;
			// 保存微信地址参数
			if(options.addressDetail){
				this.pageName = options.currentPage;
			    this.wxAddressHttpPrams['addressDetail'] = options.addressDetail;
			    this.wxAddressHttpPrams['addressPhone'] = options.addressPhone;
			    this.wxAddressHttpPrams['addressUsername'] = options.addressUsername;
			    this.wxAddressHttpPrams['belongUserId'] = options.belongUserId;
			    this.wxAddressHttpPrams['addressProvice'] = options.addressProvice;
			    this.wxAddressHttpPrams['addressCity'] = options.addressCity;
			    this.wxAddressHttpPrams['addressArea'] = options.addressArea;	
			}
		},
		onShow() {
			this.initAddressData();
			if(this.wxAddressHttpPrams['addressDetail']!=''){
				this.saveWxAddress()
			}
		},
		methods: {
			initAddressData: function() {
				const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				that.$http("/address/getUsersAddressList", {
					belongUserId: userid.id
				}, "post").then(function(res) {
					console.log("地址列表", res)
					if (res.data.status == "success") {
						uni.showLoading({
							title: '加载中'
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 500);
						that.addressList = res.data.usersAddressByList;
					}
				})
			},
			// 保存微信地址
			saveWxAddress:function(){
				const that = this;
				const userid = uni.getStorageSync('wxUserInfo');
				let prams = {
					addressDetail:that.wxAddressHttpPrams.addressDetail, //详细地址
					addressPhone:that.wxAddressHttpPrams.addressPhone, //手机号
					addressUsername:that.wxAddressHttpPrams.addressUsername, //用户名
					belongUserId:userid.id, //所属用户
					addressProvice:that.wxAddressHttpPrams.addressProvice,//省
					addressCity:that.wxAddressHttpPrams.addressCity, //市
					addressArea:that.wxAddressHttpPrams.addressArea, //区
					addressIsDefault: 2
				}
				that.$http('/address/saveWXAddress',prams,'post').then(function(res){
					that.initAddressData();
				});
			},
			//一键获取地址
			getAddress:function(){
				let pageName = this.pageName;
				window.location.href = 'http://lipinhui.28888753.cn/IntegralShop/backstage/toAddress.jsp?currentPage='+ pageName ;
			},
			// 返回
			goBack: function(e) {
				let addressId = e.target.dataset.addressid;
				let pageName = this.pageName;
				uni.redirectTo({
					url: '/pages/confirmOrder/index?addressId=' + addressId + '&currentPage=' + pageName
				})
			},
		}
	}
</script>

<style lang="less">
	.container {
		.address {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;
			background-color: #eeeeee;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.address-sel {
				width: 30rpx;
				height: 30rpx;
			}

			.address-main {
				width: 80%;
				margin-left: 22rpx;
				position: relative;

				.cover {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}

				.user-msg {
					display: flex;
					align-items: center;
					color: #333;
					font-size: 28rpx;

					.phone {
						margin: 0 22rpx;
					}
				}

				.address-txt {
					color: #333;
					font-size: 28rpx;
					display: flex;

					text {
						margin-right: 11rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						word-break: break-all;
					}
				}
			}

			.editor {
				width: 40rpx;
				height: 40rpx;

				image {
					display: block;
					width: 100%;
				}

				;
			}
		}

		.get-address-btn {
			width: 90%;
			line-height: 80rpx;
			text-align: center;
			border-radius: 15rpx;
			position: fixed;
			bottom: 114rpx;
			left: 50%;
			margin-left: -45%;
			background-color: #e61010;
			font-size: 36rpx;
			color: #fff;
		}

		.add-address-btn {
			width: 90%;
			line-height: 80rpx;
			text-align: center;
			border-radius: 15rpx;
			position: fixed;
			bottom: 22rpx;
			left: 50%;
			margin-left: -45%;
			background-color: #d8b072;
			font-size: 36rpx;
			color: #fff;
		}
	}
</style>
