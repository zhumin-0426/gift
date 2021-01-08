<template>
	<view class="price display-flex align-end">
		<view class="current display-flex text-primary-color font-maxx" :class="isCurrentBold?'font-bold':''">
			<view class="text-primary-color font-mini">
				￥
			</view>
			{{currentPrice}}
		</view>
		<view class="original display-flex text-else-color" v-if="originalPrice">
			<view class="text-else-color">
				￥
			</view>
			{{originalPrice}}
		</view>
	</view>
</template>

<script>
	export default {
		// props:["currentPrice","originalPrice"],
		props:{
			currentPrice:String,
			originalPrice:String,
			isCurrentBold:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.current{
	margin-right: 10upx;
}
</style>

