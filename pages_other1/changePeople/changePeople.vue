<template>
	<view class="pages">
		<u-form labelPosition="top" :model="form" ref="uForm" labelWidth="300">
			<u-form-item label="姓名">
				<div class="form-div">{{ from.ztmc }}</div>
			</u-form-item>
			<u-form-item label="年龄">
				<div class="form-div">{{ from.jylx }}</div>
			</u-form-item>
			<u-form-item label="电话号码">
				<div class="form-div">{{ from.ztdz }}</div>
			</u-form-item>
			<u-form-item label="身份证号">
				<div class="form-div">{{ from.jysj }}</div>
			</u-form-item>
			<u-form-item label="所属商户">{{ from.jj }}</u-form-item>
			<u-form-item label="职位">{{ from.jj }}</u-form-item>
			<u-form-item label="入职时间">{{ from.jj }}</u-form-item>
			<u-form-item label="健康证到期时间">{{ from.jj }}</u-form-item>
			<u-form-item label="健康证状态">{{ from.jj }}</u-form-item>

			<u-form-item label="健康证照片">
				<image
					mode="widthFix"
					style="width: 170rpx;"
					:src="'../../static/up-image.png'"
					@click="previewImage('../../static/up-image.png')"
				></image>
			</u-form-item>
		</u-form>
		<div style="height: 120rpx;"></div>
		<div class="supervise"><u-button type="primary" text="监管" @click="goSupDetails"></u-button></div>
	</view>
</template>

<script>
import { employeesUpdate, employeesCreate, employeesGet } from '@/api/people.js';
import Cropping from '@/components/cropping/cropping.vue';
import { ip } from '@/api/api.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	components: {
		Cropping,
		...mapState(['userInfo'])
	},
	data() {
		return {
			form: {},
			showAction: false,
			showZw: false,
			showRzsj: false,
			columnsZw: [],
			columnsRzsj: [],
			cardType: 'front',
			list: [{ name: '从手机相册选择' }, { name: '拍照' }],
			i: null,
			positionList: []
		};
	},
	onLoad(op) {
		console.log(op.i);
		if (op.i.id) {
			this.i = i;
			this.employeesGet();
		}
		this.getList();
		//商户id不可变
		this.$set(this.form, 'merchantId', this.userInfo.id);
	},
	computed: {
		linshiZw() {
			const item = this.positionList.find(item => item.id === this.form.positionId);
			return item ? item.key : '';
		}
	},
	methods: {
		employeesGet() {
			employeesGet({ id: this.i.id }).then(res => {
				if (!res.code === 0) {
					uni.$u.toast(res.msg);
					return;
				}
				this.form = ress.data;
			});
		},
		getAge() {
			const idCardNumber = this.form.idCardNumber;
			if (idCardNumber && idCardNumber.length === 18) {
				const birthYear = parseInt(idCardNumber.substr(6, 4));
				const currentYear = new Date().getFullYear();
				this.$set(this.form, 'age', parseInt(currentYear - birthYear));
			} else {
				this.$set(this.form, 'age', '错误');
			}
		},
		getList() {
			this.positionList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.columnsZw.push(this.positionList);
		},
		changeRzsj(e) {
			const date = new Date(e.value);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			this.$set(this.form, 'entryDate', `${year}-${month}-${day}`);
			this.showRzsj = false;
		},
		changeZw(e) {
			this.$set(this.form, 'positionId', e.value[0].id);
			this.showZw = false;
		},
		submit() {
			console.log(this.form);
			this.$refs.uForm
				.validate()
				.then(res => {
					if (this.i.id) {
						employeesUpdate(this.form).then(res => {
							if (!res.code === 0) {
								uni.$u.toast(res.msg);
								return;
							}
							uni.$u.toast('更新成功');
						});
					} else {
						employeesCreate(this.form).then(res => {
							if (!res.code === 0) {
								uni.$u.toast(res.msg);
								return;
							}
							uni.$u.toast('新建成功');
						});
					}
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		},
		//健康证
		async doUploadCard(rsp) {
			const result = await this.uploadFilePromise(rsp.path);
			this.$set(this.form, 'healthCertificatePhotoUrl', result.data);
		},

		async changeIDCard(url) {
			const result = await this.uploadFilePromise(url);
			this.$set(this.form, 'healthCertificatePhotoUrl', result.data);
		},
		goCropping2() {
			this.$refs.cropping2.fChooseImg(1, {
				selWidth: '632upx',
				selHeight: '400upx',
				inner: true
			});
		},
		goSupDetails() {
			uni.navigateTo({
				url: '/pages_other1/supDetails/supDetails'
			});
		},
		previewImage(i) {
			uni.previewImage({
				urls: [i]
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.supervise {
	position: fixed;
	display: flex;
	width: 600rpx;
	bottom: 0;
	margin: 0 auto;
	padding: 30rpx 42rpx;
}
</style>
