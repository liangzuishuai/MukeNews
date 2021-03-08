'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event;
	const userinfo = await db.collection('user').doc(user_id).get();
	const article_id_ids = userinfo.data[0].article_likes_ids;
	let dbCmdFuns = null;

	if (article_id_ids.includes(article_id)) {
		dbCmdFuns = dbCmd.pull(article_id) //删除
	} else {
		dbCmdFuns = dbCmd.addToSet(article_id) //添加
	}
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFuns //赋值
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: "操作成功",
		data: userinfo.data[0],
	}
};
