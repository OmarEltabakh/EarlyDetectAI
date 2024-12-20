import React from 'react';
import { useLocation } from 'react-router-dom';
import style from "./Answers.module.css";
import asnwerImage from "../../Assets/AnswerImage.png";
import Title from '../Title/Title';
import { diseaseGuidelines } from './Advices';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

export default function Answers() {
    const { state } = useLocation();

    const riskPercentage = state?.riskPercentage || 0;
    const userName = state.formData.الاسم || "الضيف";
    const address = state.formData.العنوان || "العنوان غير محدد";
    const diseaseType = state?.diseaseType || "غير محدد";
    const gender = state?.formData.الجنس || "غير محدد";
    const guidelines = diseaseGuidelines[diseaseType] || diseaseGuidelines.general;

    const exportToExcel = () => {
        const data = [
            ["اسم المريض", "العنوان", "نوع المرض", "النسبة المئوية للخطر", "نصائح"],
            [
                userName,
                address,
                diseaseType === "diabetes" ? "السكري" : diseaseType === "bloodPressure" ? "الضغط" : diseaseType === "cardiovascular" ? "القلب" : diseaseType === "joint" ? "كسور في العظام" : diseaseType === "immunology" ? "مناعي" : "غير محدد",
                `${riskPercentage}%`,
                guidelines.join(", ")
            ]
        ];

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "حالة المريض");
        XLSX.writeFile(wb, "حالة_المريض.xlsx");
    };

    return (
        <section className={`${style.answer}`}>
            <Title />
            <div className={`${style.answerContainer}  `}>

                {/* theAnswer=======================================================> */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut", delay: .3 }}
                    dir='rtl' className={`${style.theAnswer} shadow-lg`}>
                    <div className={`${style.answerMenu} `}>
                        <h2>{`${gender === "male" ? "عزيزي" : "عزيزتي"}`} {userName}، احتمالية إصابتك {`${diseaseType === "joint" ? "بـ" : "بمرض"}`} {diseaseType === "diabetes" ? "السكري" : diseaseType === "bloodPressure" ? "الضغط" : diseaseType === "cardiovascular" ? "القلب" : diseaseType === "joint" ? "كسور في العظام" : diseaseType === "immunology" ? " مناعي " : "غير محدد"}{riskPercentage < 30 ? " منخفضة" : riskPercentage < 50 ? " متوسطة" : " مرتفعة"} ({`${riskPercentage}%`})
                            .</h2>
                        {riskPercentage > 50 && <p className='m-0 text-center  alert alert-danger py-1 mb-2 '>يرجي التوجه الي اقرب وحده صحية التابعه لمدينة {address}</p>}
                        <p>  {riskPercentage > 50 && "أيضا"} يرجى اتباع النصائح التالية للحفاظ على صحتك  :</p>
                        <ul className='pe-4'>
                            {guidelines.map((guideline, index) => (
                                <li key={index}>{guideline}</li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={exportToExcel} className="btn btn-primary">
                        عرض النتيجة
                    </button>
                </motion.div>

                {/* theAnswer========================================================> */}
                <div className={`${style.answerImage}   text-end `}>
                    <motion.img
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeInOut", delay: .3 }}
                        className='w-80' src={asnwerImage} alt="" />
                </div>

            </div>
        </section>
    );
}
