const crypto = require('crypto')

const decrypt = (password) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.ENCRYPT_KEY, process.env.IV);
    password = decipher.update(password, 'hex', 'utf8');
    password += decipher.final('utf8');
    return password
}

module.exports = decrypt