const checkRoleVisitor = (role) => {
    if (role == 'visitor') {
        return 1
    } else { return 0 }
}

const checkRoleArtist = (role) => {
    if (role == 'artist') {
        return 1
    } else { return 0 }
}

const checkRoleAdmin = (role) => {
    if (role == 'admin') {
        return 1
    } else { return 0 }
}

module.exports = {
    checkRoleVisitor,
    checkRoleArtist,
    checkRoleAdmin
}