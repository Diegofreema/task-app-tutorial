import { supabase } from '../lib/supabase';

const useCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export default useCurrentUser;
