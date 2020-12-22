<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="line"></view>
		</view>
		<view class="main">
			<!-- 记录模块 -->
			<view class="history">
				<view class="top">
					<view class="left">
						<view class="date">
							2020年7月
						</view>
						<view class="cash-all-history">
							支付 2600分 收取2800分
						</view>
					</view>
					<view class="date-icon">
						<image src="/static/images/top-up-history/date-icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="history-warpper">
					<view class="history-item">
						<view class="left">
							<view class="user-pic">
								<image src="/static/images/top-up-history/user-pic.jpeg" mode="widthFix"></image>
							</view>
							<view class="msg">
								<view class="name">
									走来走去
								</view>
								<view class="date">
									7月16日11:12
								</view>
							</view>
						</view>
						<view class="right">
							<view class="integral">
								+ 2000
							</view>
						</view>
					</view>
					<view class="history-item">
						<view class="left">
							<view class="user-pic">
								<image src="/static/images/top-up-history/user-pic.jpeg" mode="widthFix"></image>
							</view>
							<view class="msg">
								<view class="name">
									走来走去
								</view>
								<view class="date">
									7月16日11:12
								</view>
							</view>
						</view>
						<view class="right">
							<view class="integral" style="color: #1a1a1a;">
								- 2000
							</view>
						</view>
					</view>
				</view>
			</view>
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
		}

		.main {
			.history {
				width: 100%;

				.top {
					box-sizing: border-box;
					width: 100%;
					padding: 19rpx 33rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					background-color: #f5f5f5;

					.date {
						font-size: 26rpx;
						color: #818898;
					}
					.cash-all-history{
						font-size: 26rpx;
						color: #818898;
					}

					.date-icon {
						width: 28rpx;
						height: 28rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}

				.history-warpper {
					box-sizing: border-box;
					width: 100%;
					padding: 0 33rpx;

					.history-item {
						box-sizing: border-box;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 44rpx 0;
						border-bottom: solid 1rpx #ececec;

						.left {
							display: flex;
							align-items: center;

							.user-pic {
								width: 68rpx;
								height: 68rpx;
								border-radius: 50%;
								overflow: hidden;
								margin-right: 21rpx;

								image {
									display: block;
									width: 100%;
									height: 100%;
								}
							}

							.msg {
								.name {
									font-size: 28rpx;
									font-weight: normal;
									font-stretch: normal;
									line-height: 50rpx;
									letter-spacing: 1.4rpx;
									color: #333333;
								}

								.date {
									font-size: 22rpx;
									line-height: 50rpx;
									color: #a1a1a1;
								}
							}
						}

						.right {
							.integral {
								font-size: 30rpx;
								font-weight: bold;
								font-stretch: normal;
								line-height: 50rpx;
								letter-spacing: 0rpx;
								color: #ff7800;
							}

							.prompt {
								font-size: 22rpx;
								font-weight: normal;
								font-stretch: normal;
								line-height: 50rpx;
								letter-spacing: 0rpx;
								color: #a1a1a1;
							}
						}
					}
				}
			}
		}
	}
</style>
