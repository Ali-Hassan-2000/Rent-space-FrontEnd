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
    offeringOptions: [],
    ApartmentCity: '',
    ApartmentImg: [],
  });

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
    const { name, value, checked, files } = e.target;

    if (name.startsWith("ApartmentImg")) {
      
      const index = Number(name.replace("ApartmentImg", "")) - 1;

      const updated = [...formData.ApartmentImg];

      updated[index] = files[0];

      setFormData({ ...formData, ApartmentImg: updated });
      
      return;
    }
    if (name === "offeringOptions") {
      setFormData(prev => {
        
        let updatedOptions;
        if (checked) {
          updatedOptions = [...prev.offeringOptions, value];
        } else {
          updatedOptions = prev.offeringOptions.filter(opt => opt !== value);
        }
        return { ...prev, offeringOptions: updatedOptions};
      });
      
      return;
    }
      
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
     
      const data = new FormData();

      data.append("ApartmentName", formData.ApartmentName);
      data.append("ApartmentPrice", formData.ApartmentPrice);
      data.append("ApartmentDescription", formData.ApartmentDescription);

      if (Array.isArray(formData.offeringOptions)) {// if no option made do nothing (empty [])
        formData.offeringOptions.forEach((opt) => {
          data.append("ApartmentOffering", opt);
        });
      }

      data.append("ApartmentCity", formData.ApartmentCity);


      Array.from(formData.ApartmentImg).forEach((img) => {
        data.append("ApartmentImg", img);
        console.log(img)
      });
      console.log(formData.ApartmentImg)
      console.log(data)
      
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

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <label htmlFor="ApartmentName">Apartment name:</label>
      	<input 
          type="text" 
          id="ApartmentName" 
          name="ApartmentName"
          value={formData.ApartmentName}
          onChange={handleChange}
          required
        />

        <label htmlFor="ApartmentPrice">Item price:</label>
      	<input 
          type="number" 
          id="ApartmentPrice" 
          name="ApartmentPrice"
          step="0.01" 
          value={formData.ApartmentPrice}
          onChange={handleChange}
          required
        />

        <label htmlFor="ApartmentDescription">Item description:</label>
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
                name="offeringOptions"
                onChange={handleChange}
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


          <label htmlFor="ApartmentImg1">Apartment img 1:</label>
          <input type="file" id="ApartmentImg1" name="ApartmentImg1" accept="image/*" onChange={handleChange} />

          <label htmlFor="ApartmentImg2">Apartment img 2:</label>
          <input type="file" id="ApartmentImg2" name="ApartmentImg2" accept="image/*" onChange={handleChange}/>

          <label htmlFor="ApartmentImg3">Apartment img 3:</label>
          <input type="file" id="ApartmentImg3" name="ApartmentImg3" accept="image/*" onChange={handleChange}/>

          <label htmlFor="ApartmentImg4">Apartment img 4:</label>
          <input type="file" id="ApartmentImg4" name="ApartmentImg4" accept="image/*" onChange={handleChange}/>

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