<template>
	<z-paging ref="paging" loading-more-no-more-text="THE END" v-model="list" @query="getList" class="page">
		<template #top>
			<view class="search-box">
				<u-search placeholder="搜索主体" v-model="courseName" @search="getList(1, 10)" @custom="getList(1, 10)"></u-search>
			</view>
		</template>

		<view class="container" v-for="j in 10" :key="j" @click="goUserInfo(j)">
			<video class="img-main" :src="j.taskVideo" :controls="false" :show-center-play-btn="false"></video>
			<view class="right-content">
				<view class="title">
					<div class="name">新鲜饭店</div>
					<div class="evaluate" @click.stop="goUserInfo(j, 2)">4.5</div>
				</view>
				<view class="details">
					<view class="detail-address">地址：xxxxxxxxxxxxxxxxxxxxxxxxxxxxx</view>
					<u-icon name="account-fill" size="26" @click="goUserInfo(j, 1)"></u-icon>
				</view>
			</view>
		</view>
	</z-paging>
</template>

<script>
// import { studyRecordList, studyRecordAdd, studyRecordUp } from '@/api/study-records.js';
export default {
	data() {
		return {
			list: [],
			courseName: ''
		};
	},
	filters: {
		getAllTime(data) {
			let totalSeconds = Math.floor(data / 1000);
			let totalMinutes = Math.floor(totalSeconds / 60);
			let totalHours = Math.floor(totalMinutes / 60);

			let minutes = totalMinutes % 60;
			let seconds = totalSeconds % 60;
			let milliseconds = data % 1000;
			return `${totalHours}小时${minutes}分钟${seconds}秒`;
		}
	},
	methods: {
		getList(page, limit) {
			// studyRecordList({ pageNum: page, pageSize: limit, courseName: this.courseName })
			// 	.then(res => {
			// 		this.list = res.data;
			// 		this.$refs.paging.complete(res.data);
			// 	})
			// 	.catch(res => {
			// 		this.$refs.paging.complete(false);
			// 	});
		},

		goUserInfo(j, type) {
			uni.navigateTo({
				url: '/pages_other1/userInfo/userInfo?j=' + j + '&&examine=no&&type=' + type
			});
		}
	}
};
</script>

<style scoped lang="scss">
.page,
page {
	background-color: rgba(248, 248, 248, 1);
}
.search-box {
	width: 686rpx;
	height: 72rpx;
	flex-direction: row;
	display: flex;
	justify-content: space-between;
	margin: 36rpx 0 0 32rpx;
}
.container {
	display: flex;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 16rpx;
	width: 686rpx;
	height: 176rpx;
	margin: 20rpx auto 0rpx;

	.img-main {
		width: 200rpx;
		height: 144rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.right-content {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20rpx;
	}
	.title {
		display: flex;
		width: 484rpx;
		height: 48rpx;
		overflow-wrap: break-word;
		font-size: 32rpx;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		.name {
			width: 50%;
		}
		.evaluate {
			width: 50%;
			font-weight: 500;
			color: #3bb972;
		}
	}
	.details {
		display: flex;
		justify-content: space-between;
		overflow-wrap: break-word;
		color: rgba(136, 136, 136, 1);
		font-size: 32rpx;
		.detail-address {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-right: 16rpx;
		}
	}
}
// /deep/ .u-search__content {
// 	border: 4rpx solid #c1c8d8 !important;
// 	border-radius: 10rpx !important;
// }
// /deep/.u-search__action {
// 	background-color: #5d4fdc;
// 	border: 4rpx solid #5d4fdc;
// 	border-radius: 10rpx;
// 	color: #fff;
// 	height: 64rpx;
// 	line-height: 64rpx;
// }
</style>
