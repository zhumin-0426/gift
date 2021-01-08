<template>
	<view class="container">
		<view class="index container">
				<!-- 商品内容 -->
				<!-- <detriment :detriment="detriment"></detriment> -->
				<view class="">
					<view style="margin-bottom: 20rpx;overflow: hidden;width: 100%;display: flex;" v-for="(item,index) in detriment"  >
						<!-- 单选 -->
						<checkbox-group class="check" @change="changeitem(item)">
							<checkbox value="item" :checked="item.flag"></checkbox>
						</checkbox-group>
						<!-- 左侧图片 -->
						<div class="left">
							<image :src="item.src"></image>
						</div>
						<!-- 右侧商品介绍 -->
						<div class="message display-flex flex-column justify-between">
							<!-- 商品名称 -->
							<view class="bigTitle font-bold font-max">
								{{item.bigTitle}}
							</view>
							<!-- 商品价格 -->
							<orginPrice :currentPrice="item.currentPrice" :originalPrice="item.originalPrice"></orginPrice>
							<!-- 限购10件 -->
							<view class="littleTitle font-middle text-else-color">
								{{item.littleTitle}}
							</view>
							<view class="shoppingNumber display-flex justify-between">
								<label class="minute" @click="btn_minute(index)">-</label>
								<input class="input"  v-model="item.num" />
								<label class="add" @click="btn_add(index)">+</label>
							</view>
						</div>
						<!-- 删除商品按钮 -->
						<view class="deletebtn" @click="del(item,index)">
							<image src="../../static/images/address/address-icon.png" mode=""></image>
						</view>
					</view>
				</view>
				
				<!-- 底部 -->
				<view class="btn display-flex justify-between width-100">
					<!-- 全选按钮 -->
					<view>
						<checkbox-group class="allBtn" @change="allchange">
							<checkbox value="cg"  :checked="allchecked" />全选/取消
						</checkbox-group>
					</view>
					<!-- 总价 -->
					<view class="amount">
						<text>总数:</text>
						{{num}}
					</view>
					<view class="Settlement-btn display-flex">
						<span class="display-flex">
							<view class="display-flex gross">
								总计:
								<view class="text-primary-color font-mini">
									￥
								</view>
								<view style="color:#e45700; font-size: 18px;">{{allprice}}</view>
							</view>
						</span>
					</view>
				</view>
			</view>
        <orginPrice></orginPrice>
	</view>
</template>

<script>
	import orginPrice from '../../components/carTemplate.vue'
	export default {
		components: {
			orginPrice
		},
		data() {
			return {
				// 购物车数据
				detriment: [{
						src: "../../static/images/index/goods1.png",
						bigTitle: "米家空调",
						currentPrice: "2199",
						originalPrice: "2699",
						littleTitle: "限购10件",
						num: 1,
						selected: false
					},
					{
						src: "../../static/images/index/goods1.png",
						bigTitle: "米家空调",
						currentPrice: "2199",
						originalPrice: "2699",
						littleTitle: "限购10件",
						num: 1,
						selected: false
					},
					{
						src: "../../static/images/index/goods1.png",
						bigTitle: "米家空调",
						currentPrice: "2199",
						originalPrice: "2699",
						littleTitle: "限购10件",
						num: 1,
						selected: false
					},
					{
						src: "../../static/images/index/goods1.png",
						bigTitle: "米家空调",
						currentPrice: "2199",
						originalPrice: "2699",
						littleTitle: "限购10件",
						num: 1,
						selected: false
					},
					{
						src: "../../static/images/index/goods1.png",
						bigTitle: "米家空调",
						currentPrice: "2199",
						originalPrice: "2699",
						littleTitle: "限购10件",
						num: 1,
						selected: false
					},
					{
						src: "../../static/images/index/goods1.png",
						bigTitle: "米家空调",
						currentPrice: "2199",
						originalPrice: "2699",
						littleTitle: "限购10件",
						num: 1,
						selected: true
					},
					{
						src: "../../static/images/index/goods1.png",
						bigTitle: "米家空调",
						currentPrice: "2199",
						originalPrice: "2699",
						littleTitle: "限购10件",
						num: 1,
						selected: true
					},
				],
				// 全选
				allchecked: false,
				// 总价	
				allprice: 0,
				//总数
				num: 0,
			}
		},
		//初始化加载   显示总价总数量
		created: function() {
			var price = 0;
			var numb = 0;
			var detriment = this.detriment;
			for (var i = 0; i < detriment.length; i++) {
				if (detriment[i]) {
					price += detriment[i].num * detriment[i].currentPrice;
					numb += detriment[i].num;
				}
			}
			this.allprice = price;
			this.num = numb;
			// console.log(numb);
			// console.log(price);
		},
		methods: {
			// 单选
			changeitem(item) {
				console.log(item)
				item.flag = !item.flag
				if (item.flag) {
					let test = this.detriment.every(item => {
						return item.flag === true
					})
					if (test) {
						this.allchecked = true
					} else {
						this.allchecked = false
					}
				} else {
					this.allchecked = false
				}
			},
			// 删除商品
			del(item, index) {
				this.detriment.splice(index, 1)
				alert('删除成功')
			},
			//总价总数量方法   方便调用   再次多写了一次[可以跟初始化封装为一个方法]
			hh: function() {
				var price = 0;
				var numb = 0;
				var detriment = this.detriment;
				for (var i = 0; i < detriment.length; i++) {
					if (detriment[i]) {
						price += detriment[i].num * detriment[i].currentPrice;
						numb += parseInt(detriment[i].num);
					}
				}
				this.allprice = price;
				this.num = numb;
				// console.log(numb);
			},
			//减去
			btn_minute: function(index) {
				var detriment = this.detriment;
				var num = detriment[index].num;
				if (num > 1) {
					num = num - 1;
					detriment[index].num = num;
				} else {
					alert('再减就没有商品啦')
				}
				this.hh();
			},
			//添加
			btn_add: function(index) {
				var detriment = this.detriment;
				// 强转int类型
				var num = parseInt(detriment[index].num);
				if (num < 10) {
					num = num + 1;
					// console.log(num)
					detriment[index].num = num;
				} else {
					alert('商品仅限购买10件')
				}
				this.hh();
			},
			// 全选
			allchange() {
				this.allchecked = !this.allchecked
				// 如果 allcheckked 为真  全选被选中时，那么设置每一项都被选中
				if (this.allchecked) {
					this.detriment.map(item => {
						item.flag = true
					})
				} else {
					this.detriment.map(item => {
						item.flag = false
					})
				}
				for (var i = 0; i < this.detriment.length; i++) {
					if (this.allchecked) {
						this.detriment.flag = true
						// console.log('成功')
					} else {
						this.detriment.flag = false
						// console.log('失败')
					}
				}
			},
		}
	}
</script>

<style>
	/* 整体内容 */
	.index {
		margin-top: 40upx;
		width: 100%;
	}

	/* 内容 */
	.detriment {
		margin-bottom: 20upx;
		padding: 20upx;
		box-sizing: border-box;
	}

	/* 图片 */
	.left {
		margin-left: 50upx;
	}

	.left image {
		width: 250upx;
		height: 250upx;
		margin: 0 auto;
	}

	/* 右侧介绍 */
	.message {
		display: inline-block;
		margin-left: 40upx;
	}

	/* 删除按钮 */
	.deletebtn image {
		width: 35upx;
		height: 35upx;
		margin-top: 90upx;
		margin-left: 30upx;
	}

	/* 单选 */
	.check {
		width: 50upx;
		height: 50upx;
		margin-top: 90upx;
	}

	/* 数量加减 */
	.shoppingNumber {
		width: 250upx;
		height: 60upx;
		border: 1px solid #929292;
	}

	.shoppingNumber input {
		text-align: center;
	}

	/* 减去商品数量 */
	.minute {
		width: 80upx;
		text-align: center;
		line-height: 58upx;
		font-size: 18px;
		border-right: 1px solid #929292;
	}

	/*文本框*/
	.input {
		width: 80upx;
		text-align: center;
	}

	/* 添加商品数量 */
	.add {
		width: 80upx;
		border-left: 1px solid #929292;
		line-height: 58upx;
		text-align: center;
		font-size: 18px;
	}

	/* 底部全选、结算 */
	.btn {
		padding: 20upx;
		box-sizing: border-box;
		height: 200upx;
	}

	/* 全选 */
	.allBtn {
		width: 200upx;
		height: 100upx;
		line-height: 170upx;
	}

	.amount {
		height: 200upx;
		line-height: 170upx;
	}

	/* 总价、价格 */
	.Settlement-btn {
		height: 200upx;
	}

	.Settlement-btn>span .gross {
		width: 200upx;
		line-height: 170upx;
	}

	.Settlement-btn>span .gross view {
		line-height: 170upx;
	}
</style>
