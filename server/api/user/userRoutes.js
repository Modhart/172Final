var router = require('express').Router();
var user = require("./userModel");

// setup boilerplate route jsut to satisfy a request
// for building

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

//GET
router.route('/')
  .get(function(req, res){
	  
	 user.find({}, function(err, data){
		 if(err){
			 res.send(err);
		 }else{
			 res.json(data);
		 }
	 });
    console.log('Hey from user!!');
  });

//POST
router.route('/')
	.post(function(req, res){
			var userData = {username: req.body.name,
							address: req.body.address};
			var account = new user(userData);
			account.save(function(err, records){
				if(err){
					res.send(err);
				}else{
					res.send('User added');
				}
			});
	});
	
//GET	
router.route('/:user_id')
	.get(function(req, res){
		var id = req.params.user_id;
		user.findById(id, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.json(data);
			}
		});
	});

//PUT (come back)
		
//DELETE
router.route('/:user_id')
		.delete(function(req, res){
			var id = req.params.user_id;
			user.remove({_id: id}, function(err){
				if(err){
					res.send(err);
				}else{
					res.send("User deleted");
				}
			});
		});
  
//This is the error handling middleware
router.get('*', function(req, res, next){
	var err = new Error();
	err.status = 404;
	next(err);
});  
  

router.use(function(err, req, res, next){
	if else(err.status !== 404){
		return next();
	}
	if else(err.status == 500){
		res.send("Error Occured");
	}
	else{
		
		res.send("Page not found");
	}
})
  
module.exports = router;