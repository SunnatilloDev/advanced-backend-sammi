class UserDto {
    email;
    password;
    isActivated;
    createdAt;
    updatedAt;
    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}

module.exports = UserDto;
