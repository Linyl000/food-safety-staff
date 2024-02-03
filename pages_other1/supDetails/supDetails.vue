<template>
	<view class="pages">
		<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">下发信息</div>
		<u--form labelPosition="left" :model="form" ref="uForm" labelWidth="100" :borderBottom="true" :labelStyle="{ padding: '0 0 6rpx 0' }">
			<u-form-item label="监管主体"><u-input :border="false" placeholder="输入监管主体" v-model="form.jgzt"></u-input></u-form-item>
			<u-form-item label="工单类型" @click="showGdlx = true">
				<u-picker
					:show="showGdlx"
					:columns="columnsGdlx"
					keyName="key"
					immediateChange
					@cancel="showGdlx = false"
					@confirm="changeGdlx"
					title="工单类型"
				></u-picker>
				<u-input readonly :border="false" placeholder="点击选择工单类型" v-model="linshiGdlx"></u-input>
			</u-form-item>
			<u-form-item label="提示类型" @click="showTslx = true">
				<u-picker
					:show="showTslx"
					:columns="columnsTslx"
					keyName="key"
					immediateChange
					@cancel="showTslx = false"
					@confirm="changeTslx"
					title="提示类型"
				></u-picker>
				<u-input readonly :border="false" placeholder="点击选择提示类型" v-model="linshiTslx"></u-input>
			</u-form-item>
			<u-form-item label="过期证件" @click="showGqzj = true">
				<u-picker
					:show="showGqzj"
					:columns="columnsGqzj"
					keyName="key"
					immediateChange
					@cancel="showGqzj = false"
					@confirm="changeGqzj"
					title="过期证件"
				></u-picker>
				<u-input readonly :border="false" placeholder="点击选择过期证件" v-model="linshiGqzj"></u-input>
			</u-form-item>
			<u-form-item label="责令处理限期">
				<u-radio-group v-model="form.zlclxq" placement="row" size="24" labelSize="20">
					<u-radio v-for="(item, index) in zlclxqList" :key="index" :label="item.key" :name="item.id"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="下发附件信息" labelPosition="top" required>
				<!-- ffjx -->
				<u-upload
					:fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					multiple
					:maxCount="1"
					width="160rpx"
					height="160rpx"
				></u-upload>
			</u-form-item>
			<u-form-item label="补充说明" labelPosition="top" required>
				<u--textarea v-model="form.bcsm" placeholder="请输入内容" count></u--textarea>
			</u-form-item>
		</u--form>
		<div class="btn"><u-button type="primary" size="large" text="提交" @click="submit"></u-button></div>
	</view>
</template>

<script>
import { ip } from '@/api/api.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import form from '../../uni_modules/uview-ui/libs/config/props/form';
export default {
	data() {
		return {
			form: { jgzt: '', gdlx: '', tslx: '', gqzj: '', zlclxq: '1', fjxx: '', bcsm: '' },
			rules: {
				jgzt: [{ required: true, message: '请输入监管人员', trigger: 'blur' }],
				gdlx: [{ required: true, message: '请选择工单类型 ', trigger: 'blur' }],
				tslx: [{ required: true, message: '请选择提示类型 ', trigger: 'blur' }],
				zlclxq: [{ required: true, message: '请选择过期证件 ', trigger: 'blur' }],
				fjxx: [{ required: true, message: '请下发附件信息 ', trigger: 'blur' }],
				bcsm: [{ required: true, message: '请输入补充说明', trigger: 'blur' }]
			},
			fileList1: [],
			upMediaOrImg: false,
			showGdlx: false,
			showTslx: false,
			showGqzj: false,
			columnsGdlx: [],
			columnsTslx: [],
			columnsGqzj: [],
			gdlxList: [],
			tslxist: [],
			gqzjList: [],
			zlclxqList: []
		};
	},
	computed: {
		linshiGdlx() {
			const item = this.gdlxList.find(item => item.id === this.form.gdlx);
			return item ? item.key : '';
		},
		linshiTslx() {
			const item = this.tslxist.find(item => item.id === this.form.tslx);
			return item ? item.key : '';
		},
		linshiGqzj() {
			const item = this.gqzjList.find(item => item.id === this.form.gqzj);
			return item ? item.key : '';
		}
	},
	onLoad(op) {
		console.log(op.i);
		this.getList();
	},
	methods: {
		getList() {
			this.gdlxList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.tslxist = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.gqzjList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.zlclxqList = [
				{ key: '2小时', id: '1' },
				{ key: '6小时', id: '2' },
				{ key: '12小时', id: '3' },
				{ key: '24小时', id: '4' },
				{ key: '48小时', id: '5' },
				{ key: '72小时', id: '6' }
			];
			this.columnsGdlx.push(this.gdlxList);
			this.columnsTslx.push(this.tslxist);
			this.columnsGqzj.push(this.gqzjList);
		},
		previewImg(i, index) {
			uni.previewImage({
				current: i[index], // 当前显示图片的http链接
				urls: i // 需要预览的图片http链接列表
			});
		},
		submit() {
			const urls1 = this.fileList1.map(item => item.url);
			this.$set(this.form, 'fjjx', urls1[0]);
			console.log(this.form);
			// this.$refs.uFormUp
			// 	.validate()
			// 	.then(res => {
			// 		uni.$u.toast('校验通过');
			// uni.navigateBack();
			// 	})
			// 	.catch(errors => {
			// 		uni.$u.toast('校验失败');
			// 	});
		},
		// 上传相关
		async afterRead(event) {
			let lists = [].concat(event.file);
			let fileListLen = this[`fileList${event.name}`].length;
			lists.map(item => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				});
			});
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url);
				let item = this[`fileList${event.name}`][fileListLen];
				this[`fileList${event.name}`].splice(
					fileListLen,
					1,
					Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					})
				);
				fileListLen++;
			}
			//上传好的视频就是fileList 列表
			this.upMediaOrImg = false;
		},

		uploadFilePromise(url) {
			this.upMediaOrImg = true;
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: ip + 'app-api/infra/file/upload',
					filePath: url,
					name: 'file',
					success: res => {
						setTimeout(() => {
							resolve(JSON.parse(res.data));
						}, 1000);
					},
					fail(e) {
						this.upMediaOrImg = false;
						uni.showToast({
							title: e,
							icon: 'none'
						});
					}
				});
			});
		},
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
		},
		changeGdlx(e) {
			this.$set(this.form, 'gdlx', e.value[0].id);
			this.showGdlx = false;
		},
		changeTslx(e) {
			this.$set(this.form, 'tslx', e.value[0].id);
			this.showTslx = false;
		},
		changeGqzj(e) {
			this.$set(this.form, 'gqzj', e.value[0].id);
			this.showGqzj = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.form-div {
	text-align: right;
}
/deep/ .u-text__value {
	font-size: 32rpx !important;
	color: #333;
	line-height: 2 !important;
}
.slot-steps {
	display: flex;
	justify-content: space-between;
	color: #a2a2a2;
	font-size: 26rpx;
}

/deep/.u-radio-group {
	flex: 1 !important;
}
/deep/.u-radio-group--row {
	margin: 0 130rpx 0;
	justify-content: space-around;
	height: 120rpx;
}
</style>
