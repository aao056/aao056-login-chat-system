const users = require('./users.mongo')

async function registerNewUser(regsiterUsername,registerEmail,
                               registerPassword){
    try{
        await users.create({
           username: regsiterUsername,
           email: registerEmail,
           password: registerPassword
       })
    }catch(err){
        console.error(err);
    }
}

async function getUserByEmail(emailToSearch){
    const result = await users.findOne({
        email: emailToSearch
    },{
        username : 1, _id: 0
    })
    
    if(result===null) return null;

    return result.toJSON()
}

async function getPasswordByEmail(emailToSearch){
    const result = await users.findOne({
        email: emailToSearch
    },{
        password : 1, _id: 0
    })
    
    if(result===null) return null;

    return (result.toJSON()['password']).toString()
}

async function usernameAlreadyExists(usernameToSearch){
    const result = await users.exists({
        username: usernameToSearch
    },{})

    return result;
}

async function getUsernameById(_idToSearch){
    const result = await users.findOne({
        _id: _idToSearch
    },{})

    return (result.toJSON()['username']).toString()
}

module.exports = {getUserByEmail,
                 registerNewUser,
                 getPasswordByEmail,
                 usernameAlreadyExists,
                 getUsernameById};