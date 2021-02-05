<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="line"></view>
			<view class="balance">
				<text>余额</text>
				<text>{{balance}}</text>
			</view>
		</view>
		<view class="content">
			<form @submit="formSubmit">
				<view class="get-integral dis-flex">
					<view class="fon-28">
						接收会员ID
					</view>
					<input @input="userRetrieve" class="fon-20" type="text" v-model="userId" placeholder="请输入ID" placeholder-class="ipt-pls" />
				</view>
				<block v-if="userName!=''||userPhone!=''">
					<view class="get-integral dis-flex">
						<view class="fon-28">
							用户电话
						</view>
						<input class="fon-20" type="text" v-model="userPhone" placeholder="请输入接受用户电话号码" placeholder-class="ipt-pls" />
					</view>
					<view class="get-integral dis-flex">
						<view class="fon-28">
							用户昵称
						</view>
						<input class="fon-20" type="text" v-model="userName" placeholder="请输入接受用户昵称" placeholder-class="ipt-pls" />
					</view>
				</block>
				<view class="send-integral dis-flex">
					<view class="fon-28">
						赠送积分
					</view>
					<input class="fon-20" type="text" v-model="integral" placeholder="0" placeholder-class="ipt-pls" />
				</view>
				<button class="confirm" form-type="submit">确定</button>
				<button class="concel" @click="goBack">返回</button>
			</form>
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
				userId: "",
				balance: "",
				userPhone: "",
				userName: ""
			}
		},
		onLoad(options) {
			this.balance = options.integral;
		},
		methods: {
			// 用户检索
			userRetrieve: function(e) {
				const that = this;
				that.$http('/users/getUser', {
					idNum: e.detail.value
				}, 'post').then(function(res) {
					console.log("res=>",res)
					if (res.data.status == 'success') {
						that.userPhone = res.data.getuser.usersPhone;
						that.userName = res.data.getuser.usersName;
					} else {
						that.userPhone = "";
						that.userName = "";
					}
				})
			},
			// 赠送积分
			formSubmit: function() {
				const that = this;
				if (that.userId == "") {
					this.$refs.msgPopup.open({
						type: 'warn',
						content: '亲，赠送用户id不能没有哦',
						timeout: 3000,
						isClick: false
					});
				} else if (that.integral == "") {
					this.$refs.msgPopup.open({
						type: 'warn',
						content: '亲，赠送积分不能为0哦！',
						timeout: 3000,
						isClick: false
					});
				} else {
					let userid = uni.getStorageSync('wxUserInfo');
					that.$http('/score/giveScore', {
						payValue: that.integral,
						idNum: that.userId,
						userid: userid.id,
					}, 'post').then(function(res) {
						console.log("赠送积分", res)
						if (res.statusCode == 200) {
							let statusVal = res.data.status;
							switch (statusVal) {
								case "nopayusers":
									that.$refs.msgPopup.open({
										type: 'err',
										content: '亲，支付用户不存在哦！',
										timeout: 3000,
										isClick: false
									});
									break;
								case "nogetusers":
									that.$refs.msgPopup.open({
										type: 'err',
										content: '亲，接收用户不存在哦！',
										timeout: 3000,
										isClick: false
									});
									break;
								case "nogetusers":
									that.$refs.msgPopup.open({
										type: 'err',
										content: '亲，接收用户不存在哦！',
										timeout: 3000,
										isClick: false
									});
									break;
								default:
									that.$refs.msgPopup.open({
										type: 'success',
										content: '亲，赠送积分成功哦！',
										timeout: 1500,
										isClick: false
									});
									setTimeout(function() {
										uni.redirectTo({
											url: "/pages/user/index"
										})
									}, 1500)
							}
						}
					})
				}
			},
			goBack: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="less">
	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.herder {
			width: 100%;

			.line {
				width: 100%;
				height: 22rpx;
				background-color: #d8b072;
			}

			.balance {
				box-sizing: border-box;
				width: 100%;
				padding: 65rpx 0 31rpx 33rpx;
				border: solid 1rpx #f5f5f5;

				text {
					font-size: 28rpx;
					letter-spacing: 0rpx;
					color: #1a1a1a;
					margin-right: 33rpx;
				}

				text:last-child {
					font-size: 28rpx;
					line-height: 40rpx;
					letter-spacing: 0rpx;
					color: #f1351b;
				}
			}
		}

		.content {
			box-sizing: border-box;
			width: 100%;
			padding: 44rpx 33rpx;

			.get-integral {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #1a1a1a;
				margin-bottom: 30rpx;

				input {
					box-sizing: border-box;
					width: 485rpx;
					height: 66rpx;
					padding-left: 34rpx;
					background-color: #ffffff;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
				}
			}

			.send-integral {
				color: #1a1a1a;
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					box-sizing: border-box;
					width: 485rpx;
					height: 66rpx;
					padding-left: 34rpx;
					background-color: #ffffff;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
				}
			}

			button::after {
				border: none;
			}

			button.confirm {
				width: 100%;
				height: 66rpx;
				background-image: linear-gradient(#e1b97b,
					#e1b97b),
					linear-gradient(#00e39b,
					#00e39b);
				background-blend-mode: normal,
					normal;
				border-radius: 15rpx;
				font-size: 32rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 66rpx;
				letter-spacing: 0rpx;
				color: #ffffff;
				margin-top: 65rpx;
			}

			button.concel {
				background-color: white;
				border: none !important;
				font-size: 28rpx;
				line-height: 66rpx;
				letter-spacing: 0rpx;
				color: #afafaf;
			}
		}
	}
</style>
