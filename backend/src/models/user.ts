export class User {
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
        userPhoneNumber?: string
        userEmail?: string
        userName: string
        userPassword: string
        userId?: string
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