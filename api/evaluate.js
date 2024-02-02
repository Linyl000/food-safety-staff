import {
	get
} from '@/api/api.js'

//获取评价
export function reviewsPage(query) {
	return get('app-api/app/reviews/page', query)
}
