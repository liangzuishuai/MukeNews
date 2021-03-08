'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd= db.command
exports.main = async (event, context) => {
	const {
		user_id
	} = event;
	
	let userInfo=await db.collection('user').doc(user_id).get();
	userInfo= userInfo.data[0]
	
	let lists= await db.collection('article').aggregate()
					.addFields({
						is_like:$.in(['$_id',userInfo.article_likes_ids])
					}).match({
						id:dbCmd.in(userInfo.article_ids)
					}).end()

	//返回数据给客户端
	return {
		code:200,
		msg:'请求数据成功',
		data:lists.data
	}
};
