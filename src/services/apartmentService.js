const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/apartments`;

//----------------- Apartment (CRUD) ----------------//

// Get all apartments
const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'GET',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to fetch apartments');
    }

    return data; // return apartments array
  } catch (err) {
    console.error('Error fetching apartments:', err);
    throw err;
  }
};


// Create new apartment
const create = async (formData) => {
  try {

    const token = localStorage.getItem('token');
    
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`},
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Failed to create apartment');
    
    return data;
    
  } catch (err) {
    console.error('Error creating apartment:', err);
    throw err;
  }
};

// Update apartment by ID
const update = async (apartmentId, formData) => {
  try {
    const headers = getAuthHeaders();

    const res = await fetch(`${BASE_URL}/apartment/${apartmentId}`, {
      method: 'PUT',
      headers: {
        ...headers,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Failed to update apartment');
    return data;
  } catch (err) {
    console.error('Error updating apartment:', err);
    throw err;
  }
};

// Delete apartment by ID
const destroy = async (apartmentId) => {
  try {
    const headers = getAuthHeaders();

    const res = await fetch(`${BASE_URL}/apartment/${apartmentId}`, {
      method: 'DELETE',
      headers,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Failed to delete apartment');
    return data;
  } catch (err) {
    console.error('Error deleting apartment:', err);
    throw err;
  }
};

//-------------Id routes-----------//

// Get apartment by ID
const show = async (apartmentId) => {
  try {
    const res = await fetch(`${BASE_URL}/apartment/${apartmentId}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Failed to fetch apartment');
    return data;
  } catch (err) {
    console.error('Error fetching apartment:', err);
    throw err;
  }
};

// Get apartments by city
const getByCity = async (city) => {
  try {
    const res = await fetch(`${BASE_URL}/city/${city}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.err || `Failed to fetch apartments in ${city}`);
    return data;
  } catch (err) {
    console.error('Error fetching city apartments:', err);
    throw err;
  }
};

export { 
    index, 
    create, 
    update, 
    destroy, 

    show,
    getByCity, 
};