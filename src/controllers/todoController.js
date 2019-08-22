import { TodoModel } from '../models';
import { UserModel } from '../models';

function create(data, userId) {
     return TodoModel.create({ data, userId });
}

function get(id) {
    return TodoModel.findById({ _id: id });
}

async function getAll(user_id){
    let user_role = await UserModel.find({_id:user_id},{ role: 1, _id: 0 });
    if(user_role.length > 0){
        if(user_role[0].role === "admin"){
            // console.log("admin");
          return TodoModel.find()      
        } else{
            // console.log("user")
           var query = {userId : user_id}
          return TodoModel.find(query)
        }
  
    }
}

function update(id, data) {
    return TodoModel.findOneAndUpdate({ _id: id }, data, { new: true });
}

function remove(id) {
    // TODO
    return TodoModel.findByIdAndRemove({ _id: id });
}
export {
    create,
    get,
    getAll,
    update,
    remove
};