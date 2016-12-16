module.exports = {
	// disbable logging for testing
logging: false,
  db: {
        // the database url to connect!
        url: 'mongodb://localhost:27017/final-api-node'                                                                                                                                           
        //url: 'mongodb://ec2-54-212-235-149.us-west-2.compute.amazonaws.com:27017/finals-api-node'
        //couldnt get the aws db working correctly =(
    }
}