export class User {
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
        userImage = ""
    }: {
        userPhoneNumber?: string
        userEmail?: string
        userName: string
        userPassword: string
        userImage?: string
    }
    ) {
        this.userName = userName
        this.userPhoneNumber = userPhoneNumber
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.userImage = userImage
    }
}