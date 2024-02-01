<template>
	<z-paging
		class="c-pages"
		ref="paging"
		v-model="dataList"
		use-cache
		cache-key="goodsList"
		@query="queryList"
		loading-more-no-more-text="THE END"
	>
		<template #top>
			<!-- 时间 -->
			<div class="timer">
				<div class="his-day" @click="showStartTime = true">
					<!-- <div class="sel-name">{{ StartTime }}</div> -->
					<u-input readonly border="surround" placeholder="开始查询时间" v-model="StartTime"></u-input>
				</div>
				<span>-</span>
				<div class="his-day" @click="showEndTime = true">
					<!-- <div class="sel-name">{{ EndTime }}</div> -->
					<u-input readonly border="surround" placeholder="结束查询时间" v-model="EndTime"></u-input>
				</div>
				<div class="sousuo"><u-button type="primary" icon="search" text=" " @click="toGetList()"></u-button></div>
			</div>
		</template>
		<!-- <div class="comments" v-for="i in rows" :key="i.id"> -->
		<div class="comments" v-for="(i, index) in dataList" :key="index">
			<div class="dynamic">
				<div class="title">
					<span class="des-name">匿名用户</span>
					<div class="des-more"><u-rate allowHalf :value="i.string"></u-rate></div>
					<div class="des-more">{{ i.createTime }}</div>
				</div>
			</div>
			<!-- 文本内容 -->
			<div class="content">
				<div class="content-c">{{ i.content }}</div>
				<div class="content-i"><u-album :urls="i.mediaContent" singleSize="500rpx" multipleSize="222rpx" keyName="url"></u-album></div>
			</div>
		</div>
		<div class="footer">
			<!-- <van-pagination
				v-model="query.pageNum"
				:total-items="total"
				:show-page-size="3"
				force-ellipses
				:items-per-page="query.pageSize"
				@change="getList()"
			/> -->
		</div>
		<!-- 选时间1 -->
		<u-datetime-picker :show="showStartTime" mode="date" @cancel="showStartTime = false" @confirm="selectStartTime"></u-datetime-picker>
		<!-- 选时间2 -->
		<u-datetime-picker :show="showEndTime" mode="date" @cancel="showEndTime = false" @confirm="selectEndTime"></u-datetime-picker>
	</z-paging>
</template>

<script>
import { reviewsPage } from '@/api/evaluate.js';
export default {
	data() {
		return {
			total: 0,
			// query: {
			// 	pageSize: 20,
			// 	pageNum: 1,
			// 	StartTime: null,
			// 	EndTime: null
			// },
			StartTime: '',
			EndTime: '',
			showStartTime: false,
			showEndTime: false,
			dataList: []
		};
	},
	onLoad() {
		this.queryList();
	},
	methods: {
		queryList(pageNo, pageSize) {
			reviewsPage({ pageNo, pageSize, StartTime: this.StartTime, EndTime: this.EndTime })
				.then(({ data }) => {
					this.dataList = data.list;
					this.$refs.paging.complete(data.list);
				})
				.catch(res => {
					this.$refs.paging.complete(false);
				});
		},
		// async getList() {
		// 	let res = await article(this.query);
		// 	if (res.code === 401) {
		// 		uni.navigateTo({
		// 			url: '/pages/login/login'
		// 		});
		// 	}
		// 	if (res.code === 401 && res.code !== 200) {
		// 		uni.showToast({
		// 			title: res.msg,
		// 			icon: 'none',
		// 			duration: 2000
		// 		});
		// 		this.rows = [];
		// 		return;
		// 	}
		// 	this.rows = [];
		// 	this.total = res.total;
		// 	this.rows = res.rows;
		// 	for (var i = 0; i < res.rows.length; i++) {
		// 		let arr1 = res.rows[i].creationTime.split(' ')[0];
		// 		let arr2 = res.rows[i].creationTime
		// 			.split(' ')[1]
		// 			.split('-')
		// 			.join(':');
		// 		this.$set(this.rows[i], 'creationTime', arr1 + ' ' + arr2);
		// 	}
		// },
		selectStartTime(e) {
			const timeFormat = uni.$u.timeFormat;
			this.StartTime = timeFormat(e.value, 'yyyy-mm-dd');
			console.log(this.StartTime);
			// this.$set(this.query, 'StartTime', this.StartTime);
			this.showStartTime = false;
		},
		selectEndTime(e) {
			const timeFormat = uni.$u.timeFormat;
			this.EndTime = timeFormat(e.value, 'yyyy-mm-dd');
			// this.$set(this.query, 'EndTime', this.EndTime);
			this.showEndTime = false;
		}
	}
};
</script>

<style lang="less" scoped>
.c-pages {
	width: 750rpx;
}
.timer {
	padding: 20rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	.his-day {
		// position: relative;
		// width: 216rpx;
		// height: 70rpx;
		// line-height: 70rpx;
		// border: 2rpx solid #a3a3a4;
		// border-radius: 10rpx;
		// padding: 0 20rpx;
		margin: 0 20rpx;
	}
}
.dynamic {
	display: flex;
	width: 100%;
	height: 164rpx;
	align-items: center;
	padding: 0 20rpx;
	box-sizing: border-box;
	img {
		background-color: #ccc;
		width: 114rpx;
		height: 114rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		overflow: hidden;
	}
	.title {
		flex: 1;
		color: #000000;
		line-height: 46rpx;
		.des-name {
			font-size: 42rpx;
		}
		.des-more {
			font-size: 30rpx;
			line-height: 1.4;
			color: #c7c7c7;
		}
	}
}
.content {
	font-size: 32rpx;
	overflow: hidden;
	.content-c {
		margin: 10rpx 20rpx;
		word-break: break-all;
		font-size: 36rpx;
		line-height: 1.4;
		white-space: pre-line; //遇到回车换行
	}
	.content-i {
		margin: 10rpx 20rpx;
	}
}
.footer {
	margin: 20rpx 0 30rpx;
}
</style>
