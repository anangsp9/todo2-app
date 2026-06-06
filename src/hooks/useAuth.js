import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        const currentUser = session?.user ?? null;

        setUser(currentUser);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
};