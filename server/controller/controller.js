var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res) => {
	// validate
	if(!req.body){
		res.status(400).send({ message: "Content cannot be empty"});
		return;
	}

	// new user
	const user = new Userdb({
		nome: req.body.nome,
		email: req.body.email,
	})

	// save in database
	user.save(user).then(data =>{
		// res.send(data)
		res.redirect('/');
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "Some error ocurred while creating an user"
		});
	});
}

// return all users / return one user

exports.find = (req,res) => {

	if(req.query.id){
		const id = req.query.id;

		Userdb.findById(id)
		.then(data =>{
			if(!data){
				res.status(404).send({message: "User not found, id: " + id})
			}else{
				res.send(data)
			}
		})
		.catch(err =>{
			res.tatus(500).send({message: "Error retrieving user with id "+ id})
		})
		
	}else{
	Userdb.find()
	.then(user => {
		res.send(user)
	})
	.catch(err =>{
		res.status[500].send({message: err.message || "Error ocurred while finding user's information"})
	})
	}	
}

// Update a new user by id
exports.update = (req,res) => {
	if(!req.body){
		return res
		.status(400)
		.send({message: "Data cannot be empty"})
	}

	const id = req.params.id;
	Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
	.then(data => {
		if(!data){
			res.status(404).send({message :'Cannot update user ' + id})
		}else{
			res.send(data)
		}
	})
	.catch(err => {
		res.status(500).send({message: 'Error Update User information'})
	})
}

// delete user
exports.delete = (req,res) =>{
	const id = req.params.id;

	Userdb.findByIdAndDelete(id)
	.then(data =>{
		if(!data){
			res.status(400).send({message: 'Cannot delete id: '+ id})
		}else {
			res.send({
				message: "User deleted with success!"
			})
		}
	})
	.catch(err =>{
		res.status(500).send({
			message: "Could not delete user with id: " + id
		});
	});
}