var Tag = function(){
	return this.super.constructor.call(this); 
}

exports.model = {
	constructor: Tag, 
	name: "blog.tag",
	fields: {
		id: {
			type: "integer", 
			autoIncrement: true, 
			primaryKey: true
		}, 
		name: "string", 
	}, 
	index: ["name"]
}
