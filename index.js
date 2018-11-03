var bcrypt = require('bcrypt-nodejs')
const saltRounds = 10;


const getSalt = () => {
   return new Promise((resolve,reject) => {
    
            bcrypt.genSalt(saltRounds, (err,salt)=>{
                if(err){
                    reject(err)
                }
                resolve(salt)
            })
     
   })
   
}

const getSaltedPassword = (plainTextpassword,salt) => {
	return new Promise((resolve,reject)=>{
		bcrypt.hash(plainTextpassword, salt, null, function(err, hash) {
		    // Store hash in your password DB.
		    if(err){
		    	return reject(err)
		    }
		    resolve(hash)
		})
	})
}

const checkPasswordHash = (password,hash_password) => {
	return new Promise((resolve,reject)=>{
		bcrypt.compare(password,hash_password,(err,res)=>{
			if(err){
				reject(err)
			}
			resolve(res)
		})
	})
}

const myCrypto = async() => {
     const salt = await getSalt();
     const pass = await getSaltedPassword("sahilkanojia",salt);
     const res =  await checkPasswordHash("sahilkanojia",pass)
     console.log(res)
}

myCrypto();