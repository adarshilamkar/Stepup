import bcrypt from 'bcrypt'

const hashPassword=async(password)=>{
    try {
        const saltRounds=10;
        const salt =await bcrypt.genSaltSync(saltRounds);
        const hash =await bcrypt.hashSync(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}
const comparePassword=async(password,passwordHash)=>{
    try {
        const match = await bcrypt.compare(password,passwordHash);
        return match;
    } catch (error) {
        
    }
}
export {comparePassword,hashPassword};