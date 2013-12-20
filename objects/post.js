var Post = function(){
	return this.super.constructor.call(this); 
}

exports.model = {
	constructor: Post, 
	name: "blog.post",
	// title, content and short description are stored in properties
	fields: {
		id: {
			type: "integer", 
			autoIncrement: true, 
			primaryKey: true
		}, 
		name: "string", 
		author: {
			type: "integer",
			referencesTable: "res.user", 
			referencesField: "id"
		}, 
		post_date: "date", 
		status: "string", 
		comment_status: "string"
	}, 
	index: ["post_name"]
}
