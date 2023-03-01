import { object, string } from 'yup';


export const userSchema= object({
    username: string().nullable().required(),
    email: string().email('Please provide a valid email address').nullable().required(),
    password: string().min(4).max(15).required(),
  });

  export const loginSchema=object({
    email: string().email('Please provide a valid email address').nullable().required(),
    password: string().min(4).max(15).required(),
  });


  export const postSchema=object({
    title: string().nullable().required(),
    desc: string().nullable("You can't submit empty post").max(255).required(),
  });