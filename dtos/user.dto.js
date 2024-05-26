class UserDto {
    email;
    password;
    isActivated;
    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;
