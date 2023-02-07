import IUser from "../interfaces/IUser";

function getUser(): IUser | null {
  const user = sessionStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
}

function setUser(user: IUser): void {
  sessionStorage.setItem("user", JSON.stringify(user));
}

function removeUser(): void {
  sessionStorage.removeItem("user");
}

export {
  getUser,
  setUser,
  removeUser
}