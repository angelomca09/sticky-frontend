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

function getToken(): string | null {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  return JSON.parse(token);
}

function setToken(token: string): void {
  sessionStorage.setItem("token", JSON.stringify(token));
}

function removeToken(): void {
  sessionStorage.removeItem("token");
}

function clearStorage() {
  sessionStorage.clear();
}

export {
  getUser,
  setUser,
  removeUser,
  getToken,
  setToken,
  removeToken,
  clearStorage
}