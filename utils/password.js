const bcrypt = require('bcryptjs');

const hashPass = async (text, size = 12) => {
    try {
        const salt = await bcrypt.genSalt(size);
        const hash = await bcrypt.hash(text, salt);

        return hash;
    } catch(error) {
        console.log(error)
    }
}

module.exports = { 
    hashPass
};

