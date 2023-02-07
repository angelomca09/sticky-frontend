import { useEffect, useState } from "react";
import IUser from "./interfaces/IUser";
import { Login } from "./pages/Login";
import { Routes } from "./Routes";
import { getUser } from "./services/user";

function App() {

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  if (!user)
    return <Login />

  return (
    <Routes />
  );
}

export default App;
