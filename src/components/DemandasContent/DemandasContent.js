import axios from "axios";
import { useEffect, useRef, useState } from "react";
import HeaderDemandas from "../HeaderDemandas/HeaderDemandas";
import styles from './DemandasContent.module.css'

const DemandasContent = () =>{
    return(
        <div className={styles.content}>
            <HeaderDemandas/>
        </div>
    )
}

export default DemandasContent;