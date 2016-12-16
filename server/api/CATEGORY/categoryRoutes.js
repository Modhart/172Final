var router = require('express').Router();
var categories = require("./categoryModel");
// setup boilerplate route jsut to satisfy a request
// for building
//GET
router.route('/')
  .get(function(req, res){
	categories.find({}, function(err, data){
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});  
    console.log('Inside /api/categories');
  });
  
  //POST
  router.route('/')
	.post(function(req, res){
		var categoryData = {name: req.body.name};
		var newCategory = new categories(categoryData);
		newCategory.save(function(err, records){
			res.send("Category added");
		});
		
		
	});

//GET
router.route('/:category_id')
	.get(function(req, res){
		var id = req.params.category_id;
		categories.findById(id, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.json(data);
			}
		});
		
	});

//PUT
router.route('/:category_id')
	.put(function(req, res){
		var id = req.params.category_id;
		var updateData = {name: req.body.name};
		var updatedCategory = new categories(updateData);
		var upsertData = updatedCategory.toObject();
		delete upsertData._id;
		categories.update({_id: id}, upsertData, {upsert:true}, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send("Category updated");
			}			
		});
	});

//DELETE
router.route('/:category_id')
		.delete(function(req, res){
			var id = req.params.category_id;
			categories.remove({_id: id}, function(err){
				if(err){
					res.send(err);
				}else{
					res.send("Category deleted");
				}
				
			});
			
		});
		
 
router.get('*', function(req, res, next){
	var err = new Error();
	err.status = 404;
	next(err);
});  
  
//ERROR HANDLER
router.use(function(err, req, res, next){
	if(err.status !== 404){
		return next();
	}else{
		res.send("Page not found");
	}
})

module.exports = router;