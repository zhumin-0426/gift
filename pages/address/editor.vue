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
					<view class="delete" @click="delAddress">
						删除
					</view>
				</view>
				<view class="warpper">
					<view class="name block">
						<text>姓名</text>
						<input type="text" :value="name" name="name" placeholder="请输入您的姓名" />
					</view>
					<view class="phone block">
						<text>电话</text>
						<input type="text" :value="phone" name="phone" placeholder="请输入您的电话号码" />
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
						<input type="text" :value="detailAddress" name="detailAddress" placeholder="请输入您的详细地址" />
					</view>
					<view class="address-default block">
						<text>默认地址</text>
						<switch :checked="checked" name="defaultAddress" />
					</view>
				</view>
			</view>
			<button class="btn" form-type="submit">保存并使用</button>
			<!-- 省,市,区 三级联动-->
			<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		</form>
		<!-- 提示框 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" title="提示" content="确定删除该地址吗？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	export default {
		components: {
			simpleAddress,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				name: "",
				phone: "",
				detailAddress: "",
				checked: false,
				address: "",
				addressMsg: {},
				addressId: "",
			}
		},
		onLoad(options) {
			this.addressId = options.id;
			this.addressBackPlay();
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
			// 回显
			addressBackPlay: function() {
				const that = this;
				this.$http('/address/getUsersAddress', {
					id: that.addressId
				}, 'post').then(function(res) {
					console.log("回显", res);
					that.cityPickerValueDefault = [res.data.usersAddressById.addressProviceCode, res.data.usersAddressById.addressCityCode,
						res.data.usersAddressById.addressAreaCode
					];
					that.address = res.data.usersAddressById.addressProvice + '-' + res.data.usersAddressById.addressCity + '-' +
						res.data.usersAddressById.addressArea;
					that.name = res.data.usersAddressById.addressUsername;
					that.phone = res.data.usersAddressById.addressPhone;
					that.detailAddress = res.data.usersAddressById.addressDetail;
					that.checked = res.data.usersAddressById.addressIsDefault == 1 ? true : false;
				})
			},
			// 删除地址
			delAddress: function() {
				this.$refs.popup.open()
			},
			close(done) {
				done()
			},
			confirm(done) {
				const that = this;
				this.$http('/address/delUsersAddress', {
					id: that.addressId
				}, 'post').then(function(res) {
					uni.navigateBack({
						delta: 1
					});
				})
				done()
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
					let userid = uni.getStorageSync('wxUserInfo');
					this.$http("/address/saveUsersAddress", {
						id: that.addressId,
						belongUserId:userid.id,
						addressDetail: formdata.detailAddress,
						addressPhone: formdata.phone,
						addressUsername: formdata.name,
						addressProvice: that.address.split("-")[0],
						addressCity: that.address.split("-")[1],
						addressArea: that.address.split("-")[2],
						addressProviceCode: that.addressMsg.provinceCode,
						addressCityCode: that.addressMsg.cityCode,
						addressAreaCode: that.addressMsg.areaCode,
						addressIsDefault: formdata.defaultAddress ? "1" : "2",
					}, "post").then(function(res) {
						uni.navigateBack({
							delta: 1
						});
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
