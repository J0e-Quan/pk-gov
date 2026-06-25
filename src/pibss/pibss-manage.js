import { supabase } from "./pibss-common.js";

// check if user is authenticated immediately
checkUserAuthentication()

async function checkUserAuthentication() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    // No active session found, user is redirected the login page immediately
    window.location.href = '/pibss/login/'
  } else {
    // User is authorized
  }
}