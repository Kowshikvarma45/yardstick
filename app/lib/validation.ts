import {z} from "zod"

export const userValidation = z.object({
    username:z.string().min(4),
    email:z.string().max(30),
    password:z.string().max(10)
})

export const signinValidation = z.object({
    email:z.string().max(30),
    password:z.string().max(10)
})

export const transactionValidation = z.object({
    amount:z.number().min(5,"amount invested should be atleast 5rupees"),
    date:z.date(),
    description:z.string()
})