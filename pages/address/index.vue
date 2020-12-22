<template>
	<view class="container">
		<view class="address">
			<view class="address-sel">
				
			</view>
			<view class="address-main">
				<view class="user-msg">
					<view class="name">
						朱敏
					</view>
					<view class="phone">
						18820854754
					</view>
					<view class="default">
						[默认]
					</view>
				</view>
				<view class="address-txt">
					江西省 九江市 修水县 李竹村17组
				</view>
			</view>
			<view class="editor">
				<image src="/static/images/address/editor.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="add-address-btn">
			添加地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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
			.address-sel{
				width: 30rpx;
				height: 30rpx;
				background-color: red;
				border-radius: 50%;
			}
			.address-main{
				.user-msg{
					display: flex;
					align-items: center;
					color: #333;
					font-size: 28rpx;
					.phone{
						margin: 0 22rpx;
					}
				}
				.address-txt{
					color: #333;
					font-size: 28rpx;
				}
			}
			.editor{
				width: 40rpx;
				height: 40rpx;
				image{
					display: block;
					width: 100%;
				};
			}
		}
		.add-address-btn{
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
