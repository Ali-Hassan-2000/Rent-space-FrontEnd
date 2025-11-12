import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { create } from '../../services/apartmentService';
import { UserContext } from '../../contexts/UserContext';

const AddApartmentForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ApartmentName: '',
    ApartmentPrice: '',
    ApartmentDescription: '',
    ApartmentOffering: [],
    ApartmentCity: '',
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const offeringOptions = [
    'Hair dryer', 'TV', 'Air conditioning', 'Smoke alarm', 'Fire extinguisher',
    'First aid kit', 'Wifi', 'Kitchen', 'Fire pit', 'Outdoor dining area',
    'BBQ grill', 'Free parking on premises', 'Pets allowed', 'Smoking allowed',
    'Self check-in', 'Smart lock', 'Exterior security cameras on property',
    'Washer', 'Dryer', 'Essentials', 'Carbon monoxide alarm', 'Heating', 'Hot water'
  ];

  const cityOptions = [
    'Manama', 'Muharraq', 'Riffa', 'Hamad Town', 'Aali', 'Isa Town', 'Sitra',
    'Budaiya', 'Jidhafs', 'Al-Malikiya', 'Adliya', 'Juffair', 'Seef',
    'Diplomatic Area', 'Amwaj Islands', 'Durrat Al Bahrain', 'Sanabis',
    'Tubli', 'Zallaq', 'Barbar'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOfferingChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, ApartmentOffering: selectedOptions }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = new FormData();

      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((val) => data.append(`${key}[]`, val));
        } else {
          data.append(key, formData[key]);
        }
      }
      
      images.forEach((img) => {
        data.append('ApartmentImg', img);
      });

      await create(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Only owners can access
  if (!user || user.role !== 'Owner') {
    return <p className="text-center text-red-500 mt-6">Only Owners can add apartments.</p>;
  }

  return (
    <div>
      <h2>Add New Apartment</h2>

      {error && <p> {error} </p>}
      {success && <p> {success} </p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ApartmentName"
          placeholder="Apartment Name"
          value={formData.ApartmentName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="ApartmentPrice"
          placeholder="Price"
          value={formData.ApartmentPrice}
          onChange={handleChange}
          required
        />

        <textarea
          name="ApartmentDescription"
          placeholder="Description"
          value={formData.ApartmentDescription}
          onChange={handleChange}
        ></textarea>

        <label>Offerings</label>
          <select
            multiple
            value={formData.ApartmentOffering}
            onChange={handleOfferingChange}
          >

            {offeringOptions.map((offer) => (
              <option key={offer} value={offer}>
                {offer}
              </option>
            ))}

          </select>

        <label>City / Village</label>
          <select
            name="ApartmentCity"
            value={formData.ApartmentCity}
            onChange={handleChange}
            required
          >

            <option value="">Select a City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          
          </select>

        <div>
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Add Apartment'}
        </button>
      </form>
    </div>
  );
};

export default AddApartmentForm;