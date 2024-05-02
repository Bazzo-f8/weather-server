import {City} from "../types/city";
import bcrypt from 'bcryptjs'; // For password hashing
import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import {User} from "../types/user";


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 8, // Enforce a minimum password length
    // },
    // favourites: {
    //     type: Array<City>
    // }
});

// UserSchema.pre('save', async function (next) {
//         if (this.isModified('password')) { // Only hash if password is modified
//             const saltRounds = 10; // Adjust salt rounds as needed
//             const hashedPassword = await bcrypt.hash(this.password, saltRounds);
//             this.password = hashedPassword;
//         }
//         next(); // Proceed with saving the document
//     });

UserSchema.plugin(passportLocalMongoose);

//const UserModel = mongoose.model<User>('User', UserSchema);
export default mongoose.model('User', UserSchema);

