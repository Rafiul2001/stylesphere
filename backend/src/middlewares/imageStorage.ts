import multer from 'multer'
import fs from 'fs'

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/user_images'
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/product_images'
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

export const uploadUserImage = multer({ storage: userStorage })
export const uploadProductImage = multer({ storage: productStorage })
