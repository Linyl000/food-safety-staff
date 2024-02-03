<template>
	<view class="pages">
		<div class="name">
			<div class="evaluate" style="color: #fff;">4.5</div>
			<image
				mode="widthFix"
				style="width: 170rpx;"
				:src="'../../static/up-image.png'"
				@click="previewImage('../../static/up-image.png')"
			></image>
			<div class="evaluate">4.5</div>
		</div>
		<u-tabs
			:list="list1"
			lineWidth="40"
			:itemStyle="{
				height: '100rpx'
			}"
			:activeStyle="{
				fontWeight: 'bold'
			}"
			lineHeight="5"
			@change="tabChange"
			:current="type"
		></u-tabs>
		<!-- 0 -->
		<u--form
			v-if="type === 0"
			labelPosition="left"
			:model="from"
			ref="uForm"
			labelWidth="100"
			:borderBottom="true"
			:labelStyle="{ padding: '0 0 6rpx 0' }"
		>
			<u-form-item label="主体名称">
				<div class="form-div">{{ from.ztmc }}</div>
			</u-form-item>
			<u-form-item label="经营类型">
				<div class="form-div">{{ from.jylx }}</div>
			</u-form-item>
			<u-form-item label="主体地址">
				<div class="form-div">{{ from.ztdz }}</div>
			</u-form-item>
			<u-form-item label="经营时间">
				<div class="form-div">{{ from.jysj }}</div>
			</u-form-item>
			<u-form-item label="简介">{{ from.jj }}</u-form-item>
			<u-form-item label="营业执照">
				<image
					mode="widthFix"
					style="width: 170rpx;"
					:src="'../../static/up-image.png'"
					@click="previewImage('../../static/up-image.png')"
				></image>
			</u-form-item>
			<u-form-item label="视频经营许可证">
				<image
					mode="widthFix"
					style="width: 170rpx;"
					:src="'../../static/up-image.png'"
					@click="previewImage('../../static/up-image.png')"
				></image>
			</u-form-item>
			<u-form-item label="食品安全等级管理">
				<image
					mode="widthFix"
					style="width: 170rpx;"
					:src="'../../static/up-image.png'"
					@click="previewImage('../../static/up-image.png')"
				></image>
			</u-form-item>
			<u-form-item label="门头照片">
				<image
					mode="widthFix"
					style="width: 170rpx;"
					:src="'../../static/up-image.png'"
					@click="previewImage('../../static/up-image.png')"
				></image>
			</u-form-item>
		</u--form>
		<!-- 1 -->
		<peoples v-if="type === 1" :usid="'q'"></peoples>
		<!-- 2 -->
		<evaluates v-if="type === 2" :usid="''"></evaluates>
		<div style="height: 120rpx;"></div>
		<div v-if="examine === 'yes'" class="examine">
			<u-button type="error" text="驳回" @click="showCause = true"></u-button>
			<div style="width: 40rpx;"></div>
			<u-button type="primary" text="通过"></u-button>
		</div>
		<div v-else class="supervise"><u-button type="primary" text="监管" @click="goSupDetails"></u-button></div>
		<u-modal :show="showCause" title="驳回理由" :showCancelButton="true" @confirm="showCause = false" @cancel="showCause = false">
			<view class="slot-content"><u--textarea v-model="cause" placeholder="请输入驳回理由" count></u--textarea></view>
		</u-modal>
	</view>
</template>

<script>
import evaluates from '@/components/evaluates/evaluates.vue';
export default {
	components: {
		evaluates
	},
	data() {
		return {
			list1: [
				{
					name: '基础信息'
				},
				{
					name: '人员信息'
				},
				{
					name: '企业评价'
				}
			],
			type: 0,
			examine: 'no',
			from: { ztmc: '1111111' },
			showCause: false,
			cause: ''
		};
	},

	onLoad(op) {
		console.log(op.j);
		this.examine = op.examine;
		this.type = op.type ? parseInt(op.type) : 0;

		if (this.examine === 'yes') {
			this.list1 = [
				{
					name: '基础信息'
				}
			];
		} else {
			this.list1 = [
				{
					name: '基础信息'
				},
				{
					name: '人员信息'
				},
				{
					name: '企业评价'
				}
			];
		}
	},
	methods: {
		tabChange({ index }) {
			this.type = index;
			// this.$refs.paging.reload();
		},
		previewImage(i) {
			uni.previewImage({
				urls: [i]
			});
		},
		goSupDetails() {
			uni.navigateTo({
				url: '/pages_other1/supDetails/supDetails'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding: 0 32rpx;
}
/deep/ .u-input {
	margin-top: 26rpx;
}
.name {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin: 50rpx 0 20rpx;
	.evaluate {
		padding: 0 40rpx;
		color: #3bb972;
	}
}

.examine {
	position: fixed;
	display: flex;
	width: 660rpx;
	bottom: 0;
	margin: auto;
	padding: 30rpx 0rpx;
}
.supervise {
	position: fixed;
	display: flex;
	width: 600rpx;
	bottom: 0;
	margin: 0 auto;
	padding: 30rpx 42rpx;
}
.slot-content {
	width: 100%;
}
</style>
