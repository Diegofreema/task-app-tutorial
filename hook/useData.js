import { supabase } from '../lib/supabase';

const useData = async () => {
  try {
    const { data } = await supabase.from('tasks').select('*');
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default useData;
