import {
	post,
	get,
	put,
	del
} from '@/api/api.js'

//获取小程序用户手机号
export function getWeChatMobile(query) {
	return get('app-api/member/auth/getWeChatMobile', query)
}
