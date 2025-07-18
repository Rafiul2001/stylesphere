class User {
    userId?: string
    userEmail: string
    userPhoneNumber: string
    userPassword: string
    userName: string
    userImage: string

    constructor({
        userPhoneNumber = "",
        userEmail = "",
        userName,
        userPassword,
        userId,
        userImage = ""
    }: {
        userPhoneNumber?: string,
        userEmail?: string,
        userName: string,
        userPassword: string,
        userId?: string,
        userImage?: string
    }
    ) {
        if (userId) {
            this.userId = userId
        }
        this.userName = userName
        this.userPhoneNumber = userPhoneNumber
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.userImage = userImage
    }
}

const newUser = new User({
    userName: "Shah Md. Rafiul Kadir",
    userPassword: "1234",
    userId: "user1"
})

console.log(newUser)