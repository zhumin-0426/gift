<template>
	<view class="container">
		<form @submit="formSubmit">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<!-- 收货人 -->
			<view class="get-goods-user address-moudle">
				<view class="title">
					<view>
						收货人
					</view>
				</view>
				<view class="warpper">
					<view class="name block">
						<text>姓名</text>
						<input type="text" value="" name="name" placeholder="请输入您的姓名" />
					</view>
					<view class="phone block">
						<text>电话</text>
						<input type="text" value="" name="phone" placeholder="请输入您的电话号码" />
					</view>
				</view>
			</view>
			<!-- 收获地址 -->
			<view class="get-goods-address address-moudle">
				<view class="title">
					收获地址
				</view>
				<view class="warpper">
					<view class="scope block" @tap="openAddres">
						<view class="scope-editor">
							<text>地区信息</text>
							<input type="text" :value="address" name="address" disabled="true" placeholder="请选择省市区" />
						</view>
						<view class="address-icon">
							<image src="../../static/images/address/address-icon.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="detail-address block">
						<text>详细地址</text>
						<input type="text" value="" name="detailAddress" placeholder="请输入您的详细地址" />
					</view>
					<view class="address-default block">
						<text>默认地址</text>
						<switch name="defaultAddress" />
					</view>
				</view>
			</view>
			<button class="btn" form-type="submit">保存并使用</button>
			<!-- 省,市,区 三级联动-->
			<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		</form>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		components: {
			simpleAddress
		},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				address: "",
				addressMsg: {},
			}
		},
		methods: {
			// 省，市，区
			openAddres() {
				this.cityPickerValueDefault = [0, 0, 0]
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				console.log(e);
				this.addressMsg = e;
				this.address = e.label;

			},
			// 表单提交
			formSubmit: function(e) {
				const that = this;
				let formdata = e.detail.value;
				console.log(formdata)
				if (formdata.name == '') {
					uni.showModal({
						title: '提示',
						content: '请输入您的收货姓名！',
					});
					return;
				} else if (formdata.phone == '') {
					uni.showModal({
						title: '提示',
						content: '请输入您的手机号！',
					});
					return;
				} else if (formdata.address == '') {
					uni.showModal({
						title: '提示',
						content: '请选择省,市,区！',
					});
					return;
				} else if (formdata.detailAddress == '') {
					uni.showModal({
						title: '提示',
						content: "请输入您的详细地址",
					});
					return;
				} else {
					this.$http("/address/saveUsersAddress", {
						addressDetail: formdata.detailAddress,
						addressPhone: formdata.phone,
						addressUsername: formdata.name,
						addressProvice: that.addressMsg.label.split("-")[0],
						addressCity: that.addressMsg.label.split("-")[1],
						addressArea: that.addressMsg.label.split("-")[2],
						addressProviceCode: that.addressMsg.areaCode,
						addressCityCode: that.addressMsg.cityCode,
						addressAreaCode: that.addressMsg.provinceCode,
						addressIsDefault: formdata.defaultAddress ? "1" : "2",
					}, "post").then(function(res) {
						console.log("保存地址",res);
					})
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

		.address-moudle {
			box-sizing: border-box;
			width: 100%;
			padding: 33rpx;

			.title {
				width: 100%;
				font-size: 24rpx;
				color: #999;
				margin-bottom: 22rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.delete {
					color: #d8b072;
				}
			}

			.warpper {
				box-sizing: border-box;
				width: 100%;
				padding: 22rpx;
				background-color: #fff;
				border-radius: 15rpx;

				.block {
					display: flex;
					align-items: center;
					color: #333;
					padding-bottom: 22rpx;
					border-bottom: solid 1rpx #F5F5F5;
					margin-bottom: 22rpx;

					text {
						font-size: 30rpx;
						margin-right: 100rpx;
					}

					input {
						font-size: 26rpx;
					}
				}

				.scope {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.scope-editor {
						display: flex;
						align-items: center;
					}

					.address-icon {
						width: 40rpx;
						height: 40rpx;
						float: right;

						image {
							width: 100%;
						}
					}
				}
			}
		}

		.btn {
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

		.btn::after {
			border: none;
		}
	}
</style>
