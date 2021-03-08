'use strict'; // 获取数据库对象
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {

	//聚合操作： 更精细化的处理数据 求和  分组 指定返回字段
	const {
		user_id,
		value
	} = event;
	let matchObj = {};
	const userinfo = await db.collection('user').doc(user_id).get(); //获取用户列表
	const article_likes_ids = userinfo.data[0].article_likes_ids;
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like: $.in(['$_id', article_likes_ids])
		})
		.project({
			content: false
		}).match({
			title: new RegExp(value)
		}).end()
	//返回数据给客户端
	return {
		code: 200,
		msg: "数据请求成功",
		data: list.data
	}
};
