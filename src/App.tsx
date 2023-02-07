import { useEffect, useState } from "react";
import ILogin from "./interfaces/ILogin";
import { Login } from "./pages/Login";
import { Routes } from "./Routes";
import { getUser } from "./services/user";
import "./App.css"

function App() {

  const [user, setUser] = useState<ILogin | null>(null);

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
