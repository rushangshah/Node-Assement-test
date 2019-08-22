import bcrypt from 'bcrypt';

import { UserModel } from '../models';

function create(data) {
    data['role'] = "user"
    return UserModel.create(data);
}

async function getByEmail(email, password) {
    const user = await UserModel.findOne({ email: email });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return user;
        }
    
        throw new Error('Invalid email/password combinations');
    }

    throw new Error('User Not Found!');
}

function updateUser(id, data) {
    return UserModel.findOneAndUpdate({ _id: id }, data, { new: true });
}

export {
    create,
    getByEmail,
    updateUser
};