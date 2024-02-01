<template>
	<view class="pages">
		<u-input placeholder="" border="none" inputAlign="right" fontSize="18">
			<u-icon slot="prefix" name="account" color="#333" size="30" label="姓名"></u-icon>
		</u-input>
		<!-- <u-input placeholder="" border="none" readonly inputAlign="right" fontSize="18">
			<u-icon slot="prefix" name="fingerprint" color="#333" size="30" label="角色"></u-icon>
		</u-input> -->
		<u-input placeholder="" border="none" readonly inputAlign="right" fontSize="18">
			<u-icon slot="prefix" name="phone" color="#333" size="30" label="手机号码"></u-icon>
		</u-input>
		<u-input placeholder="" border="none" inputAlign="right" fontSize="18">
			<u-icon slot="prefix" name="reload" color="#333" size="30" label="移交主体"></u-icon>
		</u-input>
		<div class="btn2"><u-button type="primary" text="保存"></u-button></div>
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
.pages {
	padding: 0 32rpx;
}
/deep/ .u-input {
	margin-top: 26rpx;
}
</style>
