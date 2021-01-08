<template>
	<view class="container">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="herder">
			<view class="line"></view>
			<view class="balance">
				<text>余额</text>
				<text>26388</text>
			</view>
		</view>
		<view class="content">
			<form @submit="formSubmit">
				<view class="get-integral display-flex">
					<view class="fon-28">
						接收用户ID
					</view>
					<input type="text" value="" placeholder="请输入ID" placeholder-class="ipt-pls" />
				</view>
				<view class="phone display-flex">
					<view class="fon-28">
						手机号码
					</view>
					<input type="text" value="" placeholder="输入ID号自动匹配手机号" placeholder-class="ipt-pls" />
				</view>
				<view class="send-integral display-flex">
					<view class="fon-28">
						赠送积分
					</view>
					<input type="text" value="" placeholder="0" placeholder-class="ipt-pls" />
				</view>
				<button class="confirm" form-type="submit">确定</button>
				<button class="concel">取消</button>
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
			formSubmit: function() {
             
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

			.phone {
				margin: 32rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #1a1a1a;

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
