interface ILogin {
  success: boolean,
  access?: "basic" | "admin",
  profile?: {
    id: string,
    username: string,
    email: string,
    telephone: string
  },
  message?: string;
}

export default ILogin