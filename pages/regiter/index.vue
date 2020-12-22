<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="line"></view>
			<view class="bottom">
				<view class="user-pic-txt">
					头像
				</view>
				<view class="user-pic">
					<image src="/static/images/regiter/user-pic.png" mode="widthFix"></image>
				</view>
				<input type="text" value="" placeholder="昵称" placeholder-class="ipt-pls" />
			</view>
		</view>
		<view class="content">
			<form @submit="">
				<view class="get-integral display-flex mar-32">
					<view class="fon-28">
						姓名
					</view>
					<view class="ipt-warpper">
						<input type="text" value="" placeholder="请输入您的姓名" placeholder-class="ipt-pls" />
						<view class="ipt-icon">
							<image src="/static/images/regiter/ipt-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="phone display-flex mar-32">
					<view class="fon-28">
						手机号
					</view>
					<view class="ipt-warpper">
						<input type="text" value="" placeholder="请输入您的手机号码" placeholder-class="ipt-pls" />
						<view class="ipt-icon">
							<image src="/static/images/regiter/ipt-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="send-integral display-flex mar-32">
					<view class="fon-28">
						微信号
					</view>
					<view class="ipt-warpper">
						<input type="text" value="" placeholder="请输入微信号" placeholder-class="ipt-pls" />
					</view>
				</view>
				<view class="date display-flex mar-32">
					<view class="fon-28">
						出生日期
					</view>
					<view class="ipt-warpper">
						<input type="text" value="" placeholder="请选择出生日期" placeholder-class="ipt-pls" />
						<view class="ipt-icon">
							<image src="/static/images/regiter/date-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="address display-flex mar-32">
					<view class="fon-28">
						所在城市
					</view>
					<view class="ipt-warpper">
						<input type="text" value="" placeholder="请选择所在城市" placeholder-class="ipt-pls" />
						<view class="ipt-icon">
							<image src="/static/images/regiter/address-icon.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<button class="confirm" form-type="submit">注册</button>
				<!-- <button class="concel">取消</button> -->
			</form>
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
				display: block;
			}

			.bottom {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				padding: 44rpx 0;
				padding-left: 34rpx;
				width: 100%;
				border-bottom: solid 1rpx #f5f5f5;

				.user-pic-txt {
					font-size: 28rpx;
					line-height: 40rpx;
					letter-spacing: 0rpx;
					color: #1a1a1a;
				}

				.user-pic {
					width: 135rpx;
					height: 135rpx;
					border: solid 4rpx #f5f5f5;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 65rpx;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}

				input {
					box-sizing: border-box;
					padding-left: 33rpx;
					width: 342rpx;
					height: 66rpx;
					background-color: #ffffff;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
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

				.ipt-warpper {
					box-sizing: border-box;
					color: #1a1a1a;
					width: 542rpx;
					height: 66rpx;
					padding-left: 34rpx;
					padding-right: 34rpx;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
					display: flex;
					align-items: center;
					justify-content: space-between;

					input {
						width: 80%;
						background-color: #ffffff;
					}

					.ipt-icon {
						width: 20rpx;
						height: 20rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			.mar-32 {
				margin-bottom: 32rpx;
			}

			.phone {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #1a1a1a;

				.ipt-warpper {
					box-sizing: border-box;
					color: #1a1a1a;
					width: 542rpx;
					height: 66rpx;
					padding-left: 34rpx;
					padding-right: 34rpx;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
					display: flex;
					align-items: center;
					justify-content: space-between;

					input {
						width: 80%;
						background-color: #ffffff;
					}

					.ipt-icon {
						width: 20rpx;
						height: 20rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			.send-integral {
				color: #1a1a1a;
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					box-sizing: border-box;
					width: 542rpx;
					height: 66rpx;
					padding-left: 34rpx;
					background-color: #ffffff;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
				}
			}

			.date {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #1a1a1a;

				.ipt-warpper {
					box-sizing: border-box;
					color: #1a1a1a;
					width: 542rpx;
					height: 66rpx;
					padding-left: 34rpx;
					padding-right: 34rpx;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
					display: flex;
					align-items: center;
					justify-content: space-between;

					input {
						width: 80%;
						background-color: #ffffff;
					}

					.ipt-icon {
						width: 28rpx;
						height: 28rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			.address {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #1a1a1a;

				.ipt-warpper {
					box-sizing: border-box;
					color: #1a1a1a;
					width: 542rpx;
					height: 66rpx;
					padding-left: 34rpx;
					padding-right: 34rpx;
					border-radius: 33rpx;
					border: solid 1rpx #afafaf;
					display: flex;
					align-items: center;
					justify-content: space-between;

					input {
						width: 80%;
						background-color: #ffffff;
					}

					.ipt-icon {
						width: 20rpx;
						height: 27rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			button::after {
				border: none;
			}

			button.confirm {
				width: 100%;
				height: 66rpx;
				background-image: linear-gradient(#fa9f03,
					#fa9f03),
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
		}
	}
</style>
