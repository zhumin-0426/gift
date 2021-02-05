<template>
	<view class="container">
		<view class="search-wrapper">
			<view class="top w100 bg-fff dis-flex al-items-center jf-bw box-sz bd-r-14">
				<view class="icon">
					<image class="w100" src="../../static/images/all-classify/search-icon.png" mode="widthFix"></image>
				</view>
				<input class="ipt fon-28 col-333" type="text" @input="onInput" placeholder="请输入您要搜索的商品!"/>
				<view class="btn fon-30 col-fff bg-ff4 txt-center" @click="jumpGoodsList">搜索</view>
			</view>
			<view class="history">
				<view class="title dis-flex al-items-center jf-bw">
					<view class="fon-30 col-1a1">最近搜索</view>
					<image src="../../static/images/search/delete.png" @click="deleteHistory" mode="widthFix"></image>
				</view>
				<view class="history-wrapper dis-flex flx-w">
					<block v-if="recentSearch.length>0">
					    <block v-for="item in recentSearch">
							<view class="item bd-r-60 mg-r-10 mg-b-16" @click="historyJump(item)">
								{{item}}
							</view>
						</block>
					</block>
					<block v-else>
						<view class="w100 txt-center fon-30 col-aea">
							暂无搜索记录
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iptVal: "",
				recentSearch: []
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getHistory()
		},
		methods: {
			onInput: function(e) {
				this.iptVal = e.detail.value;
			},
			getHistory: function() {
				// 获取记录
				let recentSearch = wx.getStorageSync('recentSearch');
				this.recentSearch = recentSearch;
				console.log(this.recentSearch)
			},
			jumpGoodsList: function() {
				const that = this;
				if (that.iptVal) {
					// 记录最近搜索
					let recentSearch = wx.getStorageSync('recentSearch') || [];
					recentSearch.unshift(that.iptVal);
					wx.setStorageSync('recentSearch', recentSearch)
					uni.navigateTo({
						url: '/pages/goodsList/index?id=' + that.iptVal+'&pageName=search'
					})
				}
			},
			// 记录跳转
			historyJump:function(his){
				uni.navigateTo({
					url: '/pages/goodsList/index?id=' + his+'&pageName=search'
				})
			},
			// 删除记录
			deleteHistory:function(){
				uni.removeStorageSync('recentSearch');
				this.getHistory()
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}

	.search-wrapper {
		padding: 32rpx 22rpx;

		.top {
			.icon {
				width: 33rpx;
				padding: 10rpx;
			}

			.ipt {
				width: 80%;
			}

			.btn {
				width: 140rpx;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 0 14rpx 14rpx 0;
			}
		}

		.history {
			margin-top: 30rpx;

			.title {
				margin-bottom: 30rpx;

				image {
					width: 28rpx;
				}
			}

			.item {
				padding: 5rpx 30rpx;
				background-color: #FFFFFF;
				border: solid 1rpx #DCDCDC;
			}
		}
	}
</style>
