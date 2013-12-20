var Comment = function(){
	return this.super.constructor.call(this); 
}

exports.model = {
	constructor: Comment, 
	name: "blog.comment",
	// title, content and short description are stored in properties
	fields: {
		id: {
			type: "integer", 
			autoIncrement: true, 
			primaryKey: true
		}, 
		post_id: {
			type: "integer",
			referencesTable: "blog.post", 
			referencesField: "id"
		}, 
		author_name: "string", 
		author_email: "string", 
		author_url: "string",
		comment_date: "date", 
		status: "string", 
	}
}
