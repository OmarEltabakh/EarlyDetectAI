import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from "./Options.module.css";
import { questions } from './Questions';
import questionsImage from "../../Assets/questionsImage.png";
import Title from '../Title/Title';
import { motion } from 'framer-motion';


export default function Options() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const { formData } = state || {};
    const [specialization] = useState(formData?.["التخصصات"] || "defaultSpecialization");
    const [handleSpecialization, setHandleSpecialization] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [answers, setAnswers] = useState(
        Array(
            (specialization === "InternalDiseases" && handleSpecialization
                ? questions?.InternalDiseases?.[handleSpecialization]?.length
                : questions?.[specialization]?.length) || 0
        ).fill(null)
    );

    const handleAnswerChange = (index, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);
        setWarningMessage("");
    };

    const handleSend = () => {
        if (answers.some(answer => answer === null)) {
            setWarningMessage("يجب عليك الإجابة على جميع الأسئلة قبل الإرسال.");
            return;
        }

        let selectedQuestions;

        if (specialization === "InternalDiseases" && handleSpecialization) {
            selectedQuestions = questions?.InternalDiseases?.[handleSpecialization];
        } else {
            selectedQuestions = questions?.[specialization];
        }

        if (!Array.isArray(selectedQuestions)) {
            console.error("الأسئلة المحددة غير صالحة:", selectedQuestions);
            return;
        }

        const totalPoints = selectedQuestions.reduce((sum, question, index) => {
            if (answers[index] === 'yes') {
                return sum + question.points;
            }
            return sum;
        }, 0);

        const maxPoints = selectedQuestions.reduce((sum, question) => sum + question.points, 0);
        const riskPercentage = Math.round((totalPoints / maxPoints) * 100);

        navigate('/Answers', { state: { riskPercentage, formData, diseaseType: handleSpecialization || specialization } });
    };


    return (
        <section className={`${style.options}`}>
            <Title />

            <div className='d-flex justify-content-center align-items-center'>
                {/* optionsContainer===========================================================> */}
                <div className={`${style.optionsContainer} overflow-hidden`}>


                    {/* questionsContainer=====================================================> */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeInOut", delay: .3 }}
                        dir='rtl' className={`${style.questionContainer} `}>
                        {specialization === "InternalDiseases" ? (
                            <>
                                <div className={`${style.buttonsContainer} d-flex pt-2 px-2 justify-content-between flex-wrap`}>
                                    <p className='p-2 rounded-2 shadow-sm cursorPointer' onClick={() => setHandleSpecialization("diabetes")}>
                                        شكوك حول مرض السكر
                                    </p>
                                    <p className='p-2 rounded-2 shadow-sm cursorPointer' onClick={() => setHandleSpecialization("bloodPressure")}>
                                        شكوك حول مرض الضغط
                                    </p>
                                </div>

                                {handleSpecialization && <>
                                    {questions.InternalDiseases[handleSpecialization]?.map((question, index) => (
                                        <div key={index} className={`${style.questionRow} my-3`}>
                                            <p>{question.text}</p>
                                            <div className={`${style.checkboxGroup}`}>
                                                <label className="mx-2">
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value="yes"
                                                        checked={answers[index] === 'yes'}
                                                        onChange={() => handleAnswerChange(index, 'yes')}
                                                    />
                                                    نعم
                                                </label>
                                                <label className="mx-2">
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value="no"
                                                        checked={answers[index] === 'no'}
                                                        onChange={() => handleAnswerChange(index, 'no')}
                                                    />
                                                    لا
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </>}
                            </>
                        ) : (
                            <>
                                {questions[specialization] ? (
                                    questions[specialization]?.map((question, index) => (
                                        <div key={index} className={`${style.questionRow} my-3`}>
                                            <p>{question.text}</p>
                                            <div className={`${style.checkboxGroup}`}>
                                                <label className="mx-2">
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value="yes"
                                                        checked={answers[index] === 'yes'}
                                                        onChange={() => handleAnswerChange(index, 'yes')}
                                                    />
                                                    نعم
                                                </label>
                                                <label className="mx-2">
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value="no"
                                                        checked={answers[index] === 'no'}
                                                        onChange={() => handleAnswerChange(index, 'no')}
                                                    />
                                                    لا
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>عذرًا، التخصص غير موجود.</div>
                                )}
                            </>
                        )}
                        {warningMessage && (
                            <div className="alert alert-danger py-2 text-center my-3">
                                {warningMessage}
                            </div>
                        )}

                        {(specialization !== "InternalDiseases" || handleSpecialization) && (
                            <button
                                className="mt-4"
                                onClick={handleSend}
                            >
                                إرسال
                            </button>
                        )}

                    </motion.div>

                    {/* optionsImage========================================================> */}
                    <div className={`${style.optionsImage} text-center`}>
                        <motion.img
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeInOut", delay: .3 }} className='w-90' src={questionsImage} alt="" />
                    </div>

                </div>

            </div>
        </section>
    );
}
