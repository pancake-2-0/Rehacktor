import { createContext, useEffect, useState } from "react";
import { supabase } from "../database/supabase";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const getUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (session) {
      const { user } = session;
      setUser(() => user ?? null);
      let { data: profiles } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);
      setProfile(profiles[0]);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const signUp = async (newUser) => {
    await supabase.auth.signUp(newUser);
    await getUser();
  };

  const login = async (loggedUser) => {
    await supabase.auth.signInWithPassword(loggedUser);
    await getUser();
  };
  return (
    <UserContext.Provider
      value={{ user, profile, signOut, signUp, login, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
