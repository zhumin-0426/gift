<template>
	<view class="container">
		<view class="notice-wrapper box-sz w100">
			<block v-for="(item,index) in noticeList">
				<view class="notice-item bg-fff w100 box-sz bd-r-10">
					<view class="top dis-flex al-items-center jf-bw">
						<view class="left dis-flex al-items-center">
							<image src="../../static/images/notice/notice-icon.png" mode="widthFix"></image>
							<text class="fon-28 col-1a1">{{item.msgTitle}}</text>
						</view>
						<view class="date fon-26 col-b0a">
							{{item.getdate}}
						</view>
					</view>
					<view class="main fon-26 col-a09">
						{{item.msgDesc}}
					</view>
					<view class="more dis-flex al-items-center jf-bw">
						<view class="cover" @click="jumpDel" :data-id="item.id"></view>
						<view class="fon-26 col-a09">
							查看更多
						</view>
						<image src="../../static/images/confirm-order/next.png" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList: []
			}
		},
		onLoad() {
			this.initNoticeData()
		},
		methods: {
			initNoticeData: function() {
				const that = this;
				that.$http('/users/getUserMsg', {
					msgKind: 1
				}, 'post').then(function(res) {
					that.noticeList = res.data.userMessageByList;
				})
			},
			jumpDel:function(e){
				let id = e.target.dataset.id;
				uni.navigateTo({
					url:"/pages/notice/detail/index?id="+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}

	.notice-wrapper {
		padding: 33rpx;

		.notice-item {
			padding: 20rpx;
			margin-bottom: 30rpx;

			.left {
				image {
					width: 34rpx;
					margin-right: 18rpx;
				}
			}

			.main {
				padding: 22rpx 0;
				border-bottom: solid 1rpx #d7d5d5;
			}

			.more {
				padding: 28rpx 0 22rpx 0;
                position: relative;
				.cover{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
				image {
					width: 10rpx;
				}
			}
		}
	}
</style>
