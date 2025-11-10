const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;
const  headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }

export const index = async () => {
   try {
    const res = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      // when the usuer sign in the const headers is null so there will be 401 error in [get users] side
      // headers changed here to fix the issue
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}