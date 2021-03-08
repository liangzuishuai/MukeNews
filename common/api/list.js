import $http from '../http.js'
//获取tabs列表
export const get_labe = (data) => {
	return $http({
		url: 'get_labe',
		data
	})
};
//获取内容列表
export const get_list = (data) => {
	return $http({
		url: 'get_list',
		data
	})
};

//收藏内容接口
export const update_like = (data) => {
	return $http({
		url: 'updata_like',
		data
	})
}

//搜索内容接口
export const get_search = (data) => {
	return $http({
		url: 'get_search',
		data
	})
}

//更新标签
export const updata_label = (data) => {
	return $http({
		url: 'updata_label',
		data
	})
}

//内容详情接口
export const get_detail = (data) => {
	return $http({
		url: 'get_detail',
		data
	})
}

//内容详情评论发布
export const update_comment = (data) => {
	return $http({
		url: 'update_comment',
		data
	})
}

//内容详情评论获取
export const get_comments = (data) => {
	return $http({
		url: 'get_comments',
		data
	})
}

//关注/取消作者
export const update_author = (data) => {
	return $http({
		url: 'update_author',
		data
	})
}

//文章点赞
export const update_thumbsup = (data) => {
	return $http({
		url: 'update_thumbsup',
		data
	})
}

//已收藏的文章
export const get_follow = (data) => {
	return $http({
		url: 'get_follow',
		data
	})
}


//已收藏的作者
export const get_author = (data) => {
	return $http({
		url: 'get_author',
		data
	})
}


//获取用户信息
export const get_user = (data) => {
	return $http({
		url: 'get_user',
		data
	})
}

//获取我的文章
export const get_my_article = (data) => {
	return $http({
		url: 'get_my_article',
		data
	})
}

//获取我的文章
export const update_feedback = (data) => {
	return $http({
		url: 'update_feedback',
		data
	})
}
