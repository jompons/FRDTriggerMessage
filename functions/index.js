const functions = require('firebase-functions');

exports.sanitizePost = functions.database.ref('/message').onWrite(event => {
	const post = event.data.val()
	if( post.sanitized ){
		return
	}
	console.log("Sanitizeing new post "+event.params.pushId)
	console.log(post)
	post.sanitized = true
	post.title = sanitize(post.title)
	post.body = sanitize(post.body)
	return event.data.ref.set(post)
})

function sanitize(s) {
	var sanitizedText = s
	sanitizedText = sanitizedText.replace(/\bstupid\b/ig, "wonderful")
	return sanitizedText
}