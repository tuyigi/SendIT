const newId = (array) => {
    if (array.length > 0) {
        return array.length + 1
    } else {
        return 1
    }
}

module.exports={newId}