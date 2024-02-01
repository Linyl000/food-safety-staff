<template>
	<view class="pages">
		<div class="logos">
			<img src="../../static/logos.png" alt="" />
			<span>榕食安</span>
		</div>
		<u-input placeholder="" border="none" readonly inputAlign="right" fontSize="18">
			<u-icon slot="prefix" color="#333" size="30" label="市场监管所"></u-icon>
		</u-input>
		<u-input placeholder="" border="none" readonly inputAlign="right" fontSize="18">
			<u-icon slot="prefix" color="#333" size="30" label="网格人员"></u-icon>
		</u-input>
		<u-input placeholder="" border="none" readonly inputAlign="right" fontSize="18">
			<u-icon slot="prefix" color="#333" size="30" label="联系方式"></u-icon>
		</u-input>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
/deep/ .u-input {
	margin-top: 26rpx;
}
.logos {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 48rpx;
	font-weight: 600;
	color: #333;
	line-height: 66rpx;
	letter-spacing: 4px;
	img {
		width: 170rpx;
		height: 170rpx;
		margin-top: 70rpx;
	}
}
</style>
