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
				<block v-if="topUpHistory.length>0">
				    <block v-for="(item,index) in topUpHistory">
				    	<block v-if="item.usersVO.wxHeadPortrait==''">
				    		<view class="top">
				    			<view class="date">
				    				{{item.selDate}}
				    			</view>
				    			<view class="date-icon">
				    				<image src="/static/images/top-up-history/date-icon.png" mode="widthFix"></image>
				    			</view>
				    		</view>
				    	</block>
				    	<block v-else>
				    		<view class="history-warpper">
				    			<view class="history-item">
				    				<view class="left">
				    					<view class="user-pic">
				    						<image :src="item.usersVO.wxHeadPortrait" mode="widthFix"></image>
				    					</view>
				    					<view class="msg">
				    						<view class="name">
				    							{{item.usersVO.usersName}}
				    						</view>
				    						<view class="date">
				    							{{item.selDate}}
				    						</view>
				    					</view>
				    				</view>
				    				<view class="right">
				    					<view class="integral">
				    						+ {{item.changerValue}}
				    					</view>
				    					<view class="prompt">
				    						充值成功
				    					</view>
				    				</view>
				    			</view>
				    		</view>
				    	</block>
				    </block>
				</block>
				<block v-else>
					<view class="no-content">
						<image src="../../static/images/no_content.png" mode=""></image>
						<view class="txt">亲,暂无相关数据哦!</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topUpHistory: []
			}
		},
		onLoad() {
			this.topUp()
		},
		methods: {
			topUp: function() {
				const that = this;
				const userid = uni.getStorageSync('wxUserInfo');
				that.$http('/changer/getChangerRecordList', {
					belongUserid :userid.id
				}, 'post').then(function(res) {
					console.log('充值记录', res);
					if (res.statusCode == 200) {
						that.topUpHistory = res.data.changerRecordByList;
					}
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
