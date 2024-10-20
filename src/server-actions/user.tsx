'use server'

import { cookies } from 'next/headers';

export async function setUserCookie(address: string) {
  try {
    
    const cookieStore = cookies();
    cookieStore.set('userAddr', address, {
      path: '/', // Make it available across the app
      maxAge: 3600, // Expires in 1 hour
    });

    const res = {
      error: false,
      message: "cookie stored",
      action: "Success, your cookie has been created",
    };

    return res;

  } catch (err) {
    console.error('[ERROR ON STORE COOKIE]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured store your cookie.",
      actions: "Please try again",
    };
    return res;
  }
}