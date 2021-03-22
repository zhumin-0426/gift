<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="service">
			<view class="msg-box">
				<view class="service-people">
					<image src="../../static/images/found/1.png" mode="widthFix"></image>
					<view class="msg">
						<view class="msg-cover">
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
						</view>
					</view>
				</view>
				<view class="service-people">
					<image src="../../static/images/found/1.png" mode="widthFix"></image>
					<view class="msg">
						<view class="msg-cover">
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
						</view>
					</view>
				</view>
				<view class="service-people">
					<image src="../../static/images/found/1.png" mode="widthFix"></image>
					<view class="msg">
						<view class="msg-cover">
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
						</view>
					</view>
				</view>
				<view class="service-people">
					<image src="../../static/images/found/1.png" mode="widthFix"></image>
					<view class="msg">
						<view class="msg-cover">
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
						</view>
					</view>
				</view>
				<view class="user-people">
					<image src="../../static/images/found/1.png" mode="widthFix"></image>
					<view class="msg">
						<view class="msg-cover">
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
						</view>
					</view>
				</view>
				<view class="user-people">
					<image src="../../static/images/found/1.png" mode="widthFix"></image>
					<view class="msg">
						<view class="msg-cover">
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
							爱上的好卡是大叔的喀什到喀什到卡上
						</view>
					</view>
				</view>
			</view>
			<view class="send-box">
				<input class="ipt" type="text" v-model="msg" placeholder="请输入内容" />
				<view class="btn" type="default">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: ""
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}

	.container {
		box-sizing: border-box;

		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.service {
			box-sizing: border-box;
			width: 100vw;
			height: calc(100vh - 88rpx);
			display: flex;
			flex-direction: column;

			.msg-box {
				box-sizing: border-box;
				width: 100%;
				flex: 1;
				padding: 40rpx 20rpx;
				overflow-y: scroll;

				.service-people {
					display: flex;
					margin-bottom: 20rpx;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.msg {
						width: 70%;
						background-color: #FFFFFF;
						color: #999999;
						position: relative;
						margin-left: 20rpx;
						border-radius: 8rpx;
						padding: 10rpx;

						&::before {
							content: "";
							position: absolute;
							width: 30rpx;
							height: 30rpx;
							background-color: #FFFFFF;
							transform: rotate(45deg);
							top: 15rpx;
							left: -8rpx;
						}

						.msg-cover {
							padding: 10rpx;
							z-index: 1;
							text-align: justify;
						}
					}
				}

				.user-people {
					display: flex;
					flex-direction: row-reverse;
					margin-bottom: 20rpx;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.msg {
						width: 70%;
						background-color: #f1351b;
						color: #FFFFFF;
						position: relative;
						margin-right: 20rpx;
						border-radius: 8rpx;
						padding: 10rpx;

						&::before {
							content: "";
							position: absolute;
							width: 30rpx;
							height: 30rpx;
							background-color: #f1351b;
							transform: rotate(45deg);
							top: 15rpx;
							right: -8rpx;
						}

						.msg-cover {
							padding: 10rpx;
							z-index: 1;
							text-align: justify;
						}
					}
				}
			}

			.send-box {
				box-sizing: border-box;
				width: 100%;
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				background-color: #FFFFFF;

				.ipt {
					border: none;
					background-color: #efefef;
					width: 80%;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 8rpx;
					padding-left: 20rpx;
				}

				.btn {
					width: 10%;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					color: #FFFFFF;
					border-radius: 8rpx;
					background-color: #f1351b;
					padding: 0 20rpx;
				}
			}
		}
	}
</style>
