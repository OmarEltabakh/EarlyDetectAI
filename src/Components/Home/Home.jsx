import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Home.module.css";
import homeImage from "../../Assets/HomeImage.png";
import Title from '../Title/Title';
import { motion } from 'framer-motion';


export let formData = {};

export default function Home() {

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        الاسم: '',
        العمر: '',
        الجنس: '',
        التخصصات: '',
        العنوان: '',
        الهاتف: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const isValid = Object.values(formValues).every(value => value !== '');
        setIsFormValid(isValid);
    }, [formValues]);

    const formInputs = [
        { name: "الاسم", type: "text" },
        { name: "العمر", type: "number" },
        { name: "الجنس", type: "select" },
        { name: "التخصصات", type: "select" },
        { name: "العنوان", type: "text" },
        { name: "الهاتف", type: "phone" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            formData = { ...formValues };
            navigate('/options', { state: { formData } });
        } else {
            setError('يرجى ملء جميع الحقول قبل الإرسال.');
        }
    };

    return (
        <header className={`${style.home} `}>
            <Title />

            <div className={`${style.homeContainer} overflow-hidden `}>
                <div className=''>
                    {/* formContainer */}
                    <div className={`${style.formContainer} d-flex align-items-center `}>

                        <motion.form
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeInOut", delay: .3 }}

                           dir='rtl' onSubmit={handleSubmit}>
                            {formInputs.map((input, index) => {
                                if (input.type === "select" && input.name === "الجنس") {
                                    return (
                                        <select
                                            key={index}
                                            className="form-control mt-3 px-1"
                                            name="الجنس"
                                            value={formValues[input.name]}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>الجنس</option>
                                            <option value="male">ذكر</option>
                                            <option value="female">أنثى</option>
                                        </select>
                                    );
                                }

                                if (input.type === "select" && input.name === "التخصصات") {
                                    return (
                                        <select
                                            key={index}
                                            className="form-control mt-3 px-1"
                                            name="التخصصات"
                                            value={formValues[input.name]}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>التخصص</option>
                                            <option value="InternalDiseases">الباطنه</option>
                                            <option value="cardiovascular">القلب والاوعية الدموية</option>
                                            <option value="joint">جراحة العظام والمفاصل</option>
                                            <option value="immunology">المناعة وامراض الدم</option>
                                        </select>
                                    );
                                }

                                return (
                                    <input
                                        key={index}
                                        className={`form-control ${input.name === "الاسم" ? "mt-0" : "mt-3"}`}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.name}
                                        value={formValues[input.name]}
                                        onChange={handleChange}
                                    />
                                );
                            })}

                            {error && <p className="text-danger alert alert-danger py-2 text-center my-3 mt-2">{error}</p>}

                            <button type="submit" className='mt-3'>
                                إرسال
                            </button>

                        </motion.form>

                    </div>

                    {/* homeImageContainer */}
                    <div className={`${style.homeImageContainer} d-flex justify-content-center `}>
                        <motion.img
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeInOut", delay: .3 }}
                             src={homeImage} alt="" />
                    </div>

                </div>
            </div>
        </header>
    );
}
