<template>
	<view class="container">
		<view class="address" v-for="(item,index) in addressList" :key="index">
			<view class="address-sel">

			</view>
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
			<view class="editor">
				<navigator :url="'/pages/address/editor?id='+item.id" hover-class="none">
					<image src="/static/images/address/editor.png" mode="widthFix"></image>
				</navigator>
			</view>
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
				addressList: []
			}
		},
		onLoad() {
			this.getAddressList()
		},
		methods: {
			getAddressList() {
				const that = this;
				this.$http("/address/getUsersAddressList", {}, "post").then(function(res) {
					console.log("res", res);
					if (res.data.status == "success") {
						that.addressList = res.data.usersAddressByList
					}
				})
			}
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
				background-color: red;
				border-radius: 50%;
			}

			.address-main {
				width: 80%;
				margin-left: 22rpx;
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
					text{
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
