import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const StateForm = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            state: '',
            governor: '',
            deputy_name: '',
            lgac: '',
            governor_image: null,
            deputy_image: null,
            lgac_image: null
        },
        validationSchema: Yup.object({
            state: Yup.string().required('State name is required'),
            governor: Yup.string().required('Governor name is required'),
            deputy_name: Yup.string().required('Deputy name is required'),
            lgac: Yup.string().required('LGA Chair name is required')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                // Upload images to S3 (AWS details to be added later)
                const uploadedImages = await uploadImagesToS3(values);

                // Send data to backend
                const payload = {
                    state: values.state,
                    governor: values.governor,
                    deputy_name: values.deputy_name,
                    lgac: values.lgac,
                    governor_image: uploadedImages.governor_image,
                    deputy_image: uploadedImages.deputy_image,
                    lgac_image: uploadedImages.lgac_image
                };

                await axios.post('http://localhost:5000/api/states', payload);
                alert('State data saved successfully!');
            } catch (error) {
                console.error('Error saving state data:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    const handleImageChange = (event, fieldName) => {
        formik.setFieldValue(fieldName, event.target.files[0]);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="text" name="state" placeholder="State Name" onChange={formik.handleChange} value={formik.values.state} />
            <input type="text" name="governor" placeholder="Governor" onChange={formik.handleChange} value={formik.values.governor} />
            <input
                type="text"
                name="deputy_name"
                placeholder="Deputy Name"
                onChange={formik.handleChange}
                value={formik.values.deputy_name}
            />
            <input type="text" name="lgac" placeholder="LGA Chair Name" onChange={formik.handleChange} value={formik.values.lgac} />

            <input type="file" onChange={(e) => handleImageChange(e, 'governor_image')} />
            <input type="file" onChange={(e) => handleImageChange(e, 'deputy_image')} />
            <input type="file" onChange={(e) => handleImageChange(e, 'lgac_image')} />

            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save State'}
            </button>
        </form>
    );
};

export default StateForm;
