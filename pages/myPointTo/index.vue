<template>
	<view class="container">
		<view class="content">
			<!-- 关注动态 -->
			<block v-if="businessLogo!=[]">
				<view class="focus-state-module">
					<view class="title">
						我关注的品牌
					</view>
					<view class="main">
						<view class="brand">
							<block v-for="(item,index) in businessLogo" :key="index">
								<view class="brand-logo-item">
									<view class="brand-logo">
										<image :src="imageUrl+item.supplierLogo" mode="widthFix"></image>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view>
					暂无关注！
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 图片路径
				imageUrl: "",
				businessLogo:[]
			}
		},
		onLoad() {
			this.myPointData();
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods: {
			myPointData: function() {
				const that = this;
				this.$http('/users/getUserFollow', {}, 'post').then(function(res) {
					console.log('我的关注', res);
					if (res.statusCode == 200) {
						that.businessLogo = res.data.commoditySupplierByList;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}

	.container {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.content {
			box-sizing: border-box;
			width: 100%;
			padding: 38rpx 22rpx;

			.focus-state-module {
				box-sizing: border-box;
				width: 100%;
				padding: 22rpx;
				background-color: #fff;
				border-radius: 15rpx;

				.main {
					width: 100%;

					.title {
						font-size: 28rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 40rpx;
						letter-spacing: 0rpx;
						color: #000000;
					}

					.brand {
						box-sizing: border-box;
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						position: relative;
						margin-top: 33rpx;

						.brand-logo-item {
							width: 20%;
							margin-bottom: 27rpx;

							.brand-logo {
								width: 100rpx;
								height: 100rpx;
								border-radius: 50%;
								overflow: hidden;
								// margin: 0 auto;

								image {
									display: block;
									width: 100%;
									height: 100%;
								}
							}
						}

					}
				}
			}
		}
	}
</style>
