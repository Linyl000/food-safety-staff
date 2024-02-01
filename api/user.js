import {
	post,
	get,
	put,
	del
} from '@/api/api.js'

//获得基本信息
export function userGet(query) {
	return get('/member/user/get', query)
}
//修改基本信息
export function userGetUpdat(data) {
	return put('/member/user/update', data)
}
