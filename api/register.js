import {
	put
} from '@/api/api.js'

//注册
export function userInsert(data) {
	return put('/member/user/insert', data)
}
