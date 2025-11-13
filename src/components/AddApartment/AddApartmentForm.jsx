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

  const toggleOffering = (offer, checked) => {
    setFormData(prev => ({
      ...prev,
      ApartmentOffering: checked
        ? [...prev.ApartmentOffering, offer]
        : prev.ApartmentOffering.filter(o => o !== offer)
    }));
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
          formData[key].forEach((val) => data.append(key, val));
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

  if (!user || user.role !== 'Owner') {
    return <p>Only Owners can add apartments.</p>;
  }

  return (
    <div>
      <h2>Add New Apartment</h2>

      {error && <p> {error} </p>}
      {success && <p> {success} </p>}

      <form onSubmit={handleSubmit} enctype="multipart/form-data">

        <label for="ApartmentName">Apartment name:</label>
      	<input 
          type="text" 
          id="ApartmentName" 
          name="ApartmentName"
          value={formData.ApartmentName}
          onChange={handleChange}
          required
        />

        <label for="ApartmentPrice">Item price:</label>
      	<input 
          type="number" 
          id="ApartmentPrice" 
          name="ApartmentPrice"
          step="0.01" 
          value={formData.ApartmentPrice}
          onChange={handleChange}
          required
        />

        <label for="ApartmentDescription">Item description:</label>
      	<textarea 
          id="ApartmentDescription"
          name="ApartmentDescription"
          value={formData.ApartmentDescription}
          onChange={handleChange}
          required
        ></textarea>

        <label>Offerings</label>
        <div>
          {offeringOptions.map((offer) => (
            <label key={offer}>
              <input
                type="checkbox"
                value={offer}
                checked={formData.ApartmentOffering.includes(offer)}
                onChange={ (e) => toggleOffering(offer, e.target.checked) }
              />
              <span>{offer}</span>
            </label>
          ))}
        </div>


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


          <label for="ApartmentImg1">Apartment img 1:</label>
          <input type="file" id="ApartmentImg" accept="image/*" onChange={handleImageChange} required/>

          <label for="ApartmentImg2">Apartment img 2:</label>
          <input type="file" id="ApartmentImg2" accept="image/*" onChange={handleImageChange}/>

          <label for="ApartmentImg3">Apartment img 3:</label>
          <input type="file" id="ApartmentImg3" accept="image/*" onChange={handleImageChange}/>

          <label for="ApartmentImg4">Apartment img 4:</label>
          <input type="file" id="ApartmentImg4" accept="image/*" onChange={handleImageChange}/>

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