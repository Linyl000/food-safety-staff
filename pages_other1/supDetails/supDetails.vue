<template>
	<view class="pages">
		<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">下发信息</div>
		<u--form labelPosition="left" :model="from" ref="uForm" labelWidth="100" :borderBottom="true" :labelStyle="{ padding: '0 0 6rpx 0' }">
			<u-form-item label="下发单位">
				<div class="form-div">{{ from.xfdw }}</div>
			</u-form-item>
			<u-form-item label="下发人员">
				<div class="form-div">{{ from.xfry }}</div>
			</u-form-item>
			<u-form-item label="职位">
				<div class="form-div">{{ from.zw }}</div>
			</u-form-item>
			<u-form-item label="电话号码">
				<div class="form-div">{{ from.dhhm }}</div>
			</u-form-item>
			<u-form-item label="工单编码">{{ from.gdbm }}</u-form-item>
			<u-form-item label="工单类型">{{ from.dhlx }}</u-form-item>
			<u-form-item label="下发时间">{{ from.xfsj }}</u-form-item>
			<u-form-item label="过期证件">{{ from.gqzj }}</u-form-item>
			<u-form-item label="责令处理限期">{{ from.zlclsj }}</u-form-item>
			<u-form-item label="下发附件信息" labelPosition="top">
				<img src="../../static/up-image.png" @click="previewImg()" alt="" />
			</u-form-item>
			<u-form-item label="描述说明" labelPosition="top">
				<div>{{ from.mssm }}</div>
			</u-form-item>
			<u-form-item label="驳回理由" labelPosition="top">
				<div>{{ from.bhly }}</div>
			</u-form-item>
		</u--form>
		<u-line></u-line>
		<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">商户信息</div>
		<u--form
			labelPosition="left"
			:model="fromCustomer"
			ref="uFormCustomer"
			labelWidth="100"
			:borderBottom="true"
			:labelStyle="{ padding: '0 0 6rpx 0' }"
		>
			<u-form-item label="商户名称">
				<div class="form-div">{{ fromCustomer.shmc }}</div>
			</u-form-item>
			<u-form-item label="提交人姓名">
				<div class="form-div">{{ fromCustomer.tjrxm }}</div>
			</u-form-item>
			<u-form-item label="职位">
				<div class="form-div">{{ fromCustomer.zw }}</div>
			</u-form-item>
			<u-form-item label="电话号码">
				<div class="form-div">{{ fromCustomer.dhhm }}</div>
			</u-form-item>
		</u--form>
		<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">上传处理资料</div>
		<u--form
			labelPosition="left"
			:model="fromUp"
			ref="uFormUp"
			labelWidth="100"
			:borderBottom="true"
			:labelStyle="{ padding: '0 0 6rpx 0' }"
			:rules="rules"
		>
			<u-form-item label="上传附件信息" labelPosition="top" required>
				<!-- ffjx -->
				<u-upload
					:fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					multiple
					:maxCount="9"
					width="160rpx"
					height="160rpx"
					:accept="accept"
				></u-upload>
			</u-form-item>
			<u-form-item label="描述说明" labelPosition="top" required>
				<u--textarea v-model="fromUp.mssm" placeholder="请输入内容" count></u--textarea>
			</u-form-item>
		</u--form>
		<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">审批流程</div>
		<u-steps :current="3" direction="column" dot inactiveColor="#01B578" activeColor="#969799">
			<u-steps-item title="发起人">
				<div class="slot-steps" slot="desc">
					<span>周洁（打回）</span>
					<span>2023-10-30 23:55:56</span>
				</div>
			</u-steps-item>
			<u-steps-item title="提交人">
				<div class="slot-steps" slot="desc">
					<span>周洁（打回）</span>
					<span>2023-10-30 23:55:56</span>
				</div>
			</u-steps-item>
			<u-steps-item title="审核人">
				<div class="slot-steps" slot="desc">
					<span>周洁（打回）</span>
					<span>2023-10-30 23:55:56</span>
				</div>
			</u-steps-item>
			<u-steps-item>
				<div class="slot-steps" slot="desc"><span style="color:#01B578">当前节点：待提交</span></div>
			</u-steps-item>
		</u-steps>
		<div class="btn"><u-button type="primary" size="large" text="提交" @click="submit"></u-button></div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			from: { xfdw: '1111111' },
			fromCustomer: { dhhm: '1111111' },
			fromUp: {},
			rules: {
				fjxx: [{ required: true, message: '请上传附件信息 ', trigger: 'blur' }],
				sfzh: [{ required: true, message: '请输入描述说明', trigger: 'blur' }]
			},
			fileList1: [],
			upMediaOrImg: false
		};
	},
	onLoad(op) {
		console.log(op.i);
	},
	methods: {
		previewImg(i, index) {
			uni.previewImage({
				current: i[index], // 当前显示图片的http链接
				urls: i // 需要预览的图片http链接列表
			});
		},
		submit() {
			this.$set(this.form, 'fjjx', this.fileList1);
			// this.$refs.uFormUp
			// 	.validate()
			// 	.then(res => {
			// 		uni.$u.toast('校验通过');
			uni.navigateBack();
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
					url: ip + '/app/common/upload',
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
</style>
