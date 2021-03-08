'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	const {
		user_id,
		author_id
	} = event;
	let msg = '';
	let state = 0;
	const user = await db.collection('user').doc(user_id).get();
	const author_likes_ids = user.data[0].author_likes_ids;
	let author_ids = null;
	if (author_likes_ids.includes(author_id)) {
		author_ids = dbCmd.pull(author_id);
		msg = '取消关注';
		state = 0;
	} else {
		author_ids = dbCmd.addToSet(author_id);
		msg = '添加关注';
		state = 1;
	}
	await db.collection('user').doc(user_id).update({
		author_likes_ids: author_ids
	})
	//返回数据给客户端
	return {
		code: 200,
		msg,
		state
	}
};
