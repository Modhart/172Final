var router = require('express').Router();
var post = require("./postModel");

//GET
router.route('/')
  .get(function(req, res){
	post.find({})
	.populate('author')
	.populate('categories')
	.exec(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.json(data);
		}
	});
    console.log('Hey from post!!');
  });
  
  //POST
  router.route('/')
	.post(function(req,res){
		var postData = {title: req.body.title,
						text: req.body.text,
						author: req.body.author,
						categories: req.body.category}
		var userPost = new post(postData);
		userPost.save(function(err, records){
			if(err){
				res.send(err);
			}else{
				res.send("Post added");
			}
		});
	});

//POST (come back) updates
		

//DELETE
router.route('/:post_id')
	.delete(function(req, res){
		var id = req.params.post_id;
		post.remove({_id: id}, function(err){
			if(err){
				res.send(err);
			}else{
				res.send("Post deleted")
			}
		});
		
		
	});

//Error handlers		
router.get('*', function(req, res, next){
	var err = new Error();
	err.status = 404;
	next(err);
});  
  
router.use(function(err, req, res, next){
	if(err.status !== 404){
		return next();
	}else{
		
		res.send("Page not found");
	}
})

module.exports = router;