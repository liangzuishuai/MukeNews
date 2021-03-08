'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		pageSize = 10,
		page = 1
	} = event;
	let list = await db.collection('article')
		.aggregate()
		.match({
			_id: article_id
		})
		.unwind('$comments')
		.project({
			_id: 0,
			comments: 1
		})
		.replaceRoot({
			newRoot: '$comments'
		})
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()
	return {
		code: 200,
		msg: "数据返回成功",
		data: list.data
	}
};
