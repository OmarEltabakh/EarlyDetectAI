import React from 'react';
import style from "./Title.module.css"
import { motion } from 'framer-motion';

export default function Title() {
    return <>
        <motion.h2
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
            className={`${style.title}`}>EarlyDetect AI</motion.h2>

    </>
}
