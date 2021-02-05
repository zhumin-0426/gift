<template>
	<view class="tab-bar">
		<view class="tab-bar-warper">
			<view class="round" :style="'left:'+tabBarActive.roundLeft"></view>
			<view class="cover"></view>
			<view class="mulch" :style="'left:'+tabBarActive.mulchLeft"></view>
			<view class="tab-bar-nav-list">
				<block v-for="item in tabBarNavList" :key="item.element">
					<view :class="item.element" class="block" @click="jumpPage(item.url)">
							<view :class="item.element+'icon'" class="block-icon" :style="tabBarActive.state==item.id?'width:60rpx;position:absolute;top:4rpx;left:'+tabBarActive.elementLeft:''">
								<image :src="tabBarActive.state==item.id?item.iconActive:item.icon" mode="widthFix"></image>
							</view>
							<view class="txt" :style="tabBarActive.state==item.id?'margin-top:56rpx;':''">
								{{item.txt}}
							</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['tabBarActive'],
		data() {
			return {
				// 底部导航
				tabBarNavList: [{
						url: "/pages/index/index",
						element: "index",
						icon: "/static/images/tabBar/index-icon.png",
						iconActive: "/static/images/tabBar/index-icon-active.png",
						txt: "首页",
						id: 1,
					},
					{
						url: "/pages/classify/index",
						element: "classify",
						icon: "/static/images/tabBar/classify-icon.png",
						iconActive: "/static/images/tabBar/classify-icon-active.png",
						txt: "全部分类",
						id: 2
					},
					{
						url: "/pages/found/index",
						element: "found",
						icon: "/static/images/tabBar/found-icon.png",
						iconActive: "/static/images/tabBar/found-icon-active.png",
						txt: "发现好物",
						id: 3
					},
					{
						url: "/pages/car/index",
						element: "car",
						icon: "/static/images/tabBar/car-icon.png",
						iconActive: "/static/images/tabBar/car-icon-active.png",
						txt: "购物车",
						id: 4

					},
					{
						url: "/pages/user/index",
						element: "user",
						icon: "/static/images/tabBar/user-icon.png",
						iconActive: "/static/images/tabBar/user-icon-active.png",
						txt: "我的",
						id: 5
					}
				]
			};
		},
		methods:{
			jumpPage:function(url){
				uni.redirectTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="less">
	.tab-bar {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999999;

		.tab-bar-warper {
			width: 100%;
			position: relative;

			.round {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				position: absolute;
				// left: 14rpx;
				bottom: 22rpx;
				background-color: #fff;
				z-index: 99;
				box-shadow: inset 0rpx 2rpx 8rpx 0rpx rgba(208, 208, 208, 0.37),
					inset 0rpx 0rpx 20rpx 0rpx rgba(219, 219, 219, 0.15);
			}

			.cover {
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 9;
				width: 100%;
				height: 108rpx;
				padding-top: 15rpx;
				box-shadow: inset 0rpx 2rpx 8rpx 0rpx rgba(208, 208, 208, 0.37),
					inset 0rpx 0rpx 20rpx 0rpx rgba(219, 219, 219, 0.15);
				background-color: #fff;

			}

			.mulch {
				width: 120rpx;
				height: 120rpx;
				background-color: #fff;
				position: absolute;
				// left: 14rpx;
				bottom: -2rpx;
				z-index: 999;
			}

			.tab-bar-nav-list {
				// background-color: #fff;
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				z-index: 999;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.block {
					width: 20%;
					text-align: center;
					font-size: 24rpx;
					line-height: 32rpx;
					letter-spacing: -0.1rpx;
					color: #888888;
					padding: 16rpx 0;

					.block-icon {
						width: 35rpx;
						height: 35rpx;
						margin: 0 auto;
						margin-bottom: 20rpx;

						image {
							display: block;
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
