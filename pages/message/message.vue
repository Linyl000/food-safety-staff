<template>
	<view>
		<z-paging ref="paging" v-model="dataList" use-cache cache-key="goodsList" @query="queryList" loading-more-no-more-text="THE END">
			<template #top>
				<u-tabs :list="list1" @click="tabChange" :scrollable="false"></u-tabs>
			</template>
			<u-cell-group :border="false">
				<u-cell :border="false" arrow-direction="right" v-for="i in 5" :key="i" isLink :url="`/pages_other1/supDetails/supDetails?i=${i}`">
					<view slot="title">
						<div class="title">
							【0124】资质证件过期监督提示
							<u-tag text="审核中" plain></u-tag>
							<u-tag text="已处理" type="success" plain></u-tag>
							<u-tag text="未处理" type="warning" plain></u-tag>
							<u-tag text="驳回" type="error" plain></u-tag>
						</div>
						<div class="plain">下发主体：新鲜饭店</div>
						<div class="plain">下发时间：2023-01-24 16:0</div>
					</view>
				</u-cell>
			</u-cell-group>
			<!-- 	<view class="item" v-for="(item, index) in dataList">
				
			</view> -->
		</z-paging>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list1: [
				{
					name: '全部'
				},
				{
					name: '未处理'
				},
				{
					name: '已处理'
				}
			],
			type: 1,
			dataList: []
		};
	},
	methods: {
		queryList(pageNo, pageSize) {
			// queryList({ pageNo, pageSize }).then(res => {
			// .then(({ rows }) => {
			// 	this.dataList = rows;
			// 	this.$refs.paging.complete(rows);
			// })
			// .catch(res => {
			// 	this.$refs.paging.complete(false);
			// });
			// });
		},
		tabChange({ index }) {
			this.type = index;
			this.$refs.paging.reload();
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	display: flex;
	align-items: center;
	font-size: 30rpx;
	font-weight: 600;
	line-height: 2.8;
}
.plain {
	font-size: 24rpx;
	font-weight: 400;
	line-height: 2.2;
}
</style>
