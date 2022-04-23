
import {createUser} from '../service/users.js'

 
export const saveUser = (req, res)=>{
    const user = req.body;
    const result = createUser(user)
    return res.json(result)
}

