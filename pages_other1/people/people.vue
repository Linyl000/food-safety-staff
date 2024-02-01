<template>
	<z-paging
		class="pages"
		ref="paging"
		v-model="dataList"
		use-cache
		cache-key="goodsList"
		@query="queryList"
		loading-more-no-more-text="THE END"
	>
		<template #top>
			<div style="display: flex;padding: 10rpx;background-color: #fff;">
				<u-search
					v-model="name"
					:clearabled="true"
					:showAction="true"
					placeholder="查询姓名"
					actionText="搜索"
					:actionStyle="{ 'font-size': '18px' }"
					margin="0 20rpx 0 0"
					@change="searchSome"
				></u-search>
				<u-icon name="plus-circle" size="26" @click="goChangePeople"></u-icon>
			</div>
		</template>
		<div class="peo-box" v-for="(i, index) in dataList" :key="index">
			<div class="people">
				<div class="name">{{ i.name }}</div>
				<!-- <div style="color:#f29395">女</div>
				<div style="color:#4a8cfe">男</div> -->
				<div class="age">{{ i.age }}</div>
				<u-icon
					name="more-dot-fill"
					size="26"
					@click="
						showDo = true;
						i = i;
					"
				></u-icon>
			</div>
			<u-line></u-line>
			<div class="info">
				<div class="standing">{{ userInfo.nickname }} - {{ i.positionId | getPositionKey }}</div>
				<div class="tel">手机号：{{ i.phoneNumber }}</div>
				<div class="identification">身份证号：{{ i.idCardNumber }}</div>
				<div class="timer">入职时间：{{ i.createTime }}</div>
				<div class="health-status">
					健康证状态：
					<u-tag v-if="i.status === 1" text="正常" type="success"></u-tag>
					<u-tag v-if="i.status === 2" text="临期" type="warning"></u-tag>
					<u-tag v-if="i.status === 3" text="已过期" type="error"></u-tag>
				</div>
			</div>
		</div>
		<u-action-sheet
			:actions="list"
			title="请选择想进行的操作"
			:show="showDo"
			@select="selectClick"
			@close="showDo = false"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
		></u-action-sheet>
	</z-paging>
</template>

<script>
import { employeesPage, employeesDelete } from '@/api/people.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	components: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			name: '',
			showDo: false,
			i: null,
			list: [{ name: '修改' }, { name: '删除' }],
			dataList: [],
			positionList: []
		};
	},
	onLoad(op) {
		this.getList();
	},
	filters: {
		getPositionKey: function(positionId) {
			const position = this.filteredPositionList.find(item => item.id === positionId);
			return position ? position.key : '位置职位';
		}
	},
	methods: {
		getList() {
			this.positionList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
		},
		queryList(pageNo, pageSize) {
			employeesPage({ pageNo, pageSize, name: this.name })
				.then(({ data }) => {
					this.dataList = data.list;
					this.$refs.paging.complete(data.list);
				})
				.catch(res => {
					this.$refs.paging.complete(false);
				});
		},
		goChangePeople(i) {
			uni.navigateTo({
				url: '../changePeople/changePeople'
			});
		},
		selectClick(i) {
			if (i.name === '修改') {
				uni.navigateTo({
					url: '../changePeople/changePeople?i=' + this.i
				});
			} else if (i.name === '删除') {
				employeesDelete({ id: this.i.id }).then(res => {
					if (!res.code === 0) {
						uni.$u.toast(res.msg);
						return;
					}
					uni.$u.toast('删除成功');
					this.$refs.paging.reload();
					this.queryList();
				});
			}
		},
		searchSome({ index }) {
			this.$refs.paging.reload();
			this.queryList();
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	background-color: #e1e1e1;
	min-height: 100vh;
}
.peo-box {
	width: 710rpx;
	border-radius: 20rpx;
	background-color: #fff;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	margin: 30rpx auto;
	.people {
		display: flex;
		padding: 10rpx 20rpx;
		.name {
			font-weight: 600;
			margin-right: 30rpx;
		}
		.age {
			flex: 1;
			color: #888;
			margin: 0 30rpx;
		}
	}
	.info {
		padding: 10rpx 20rpx;
		.standing {
			padding: 40rpx 0;
		}
		.tel {
			padding: 10rpx 0;
		}
		.identification {
			padding: 10rpx 0;
		}
		.timer {
			padding: 10rpx 0;
		}
		.health-status {
			padding: 10rpx 0;
			display: flex;
		}
	}
}
</style>
