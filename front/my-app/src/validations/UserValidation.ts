import { object, string } from 'yup';


export const userSchema= object({
    username: string().nullable().required(),
    email: string().email('Please provide a valid email address').nullable().required(),
    password: string().min(4).max(15).required(),
  });