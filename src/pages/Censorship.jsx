import React, { useEffect, useState } from 'react'
import { BarWave } from 'react-cssfx-loading/lib'
import { CensorshipLine } from '../component/censorship-line/CensorshipLine'
import Axios from 'axios'
import api from '../assets/JsonData/api.json'

export const Censorship = () => {
    const [newCourse, setnewCourse] = useState([])
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset-UTF-8',
            "Accept": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token-admin')}`
        }
    }
    const getnewCourse = () => {
        console.log('reload')
        Axios.get(api.find((e) => e.pages === "Tổng quan").api['get-course'], axiosConfig)
            .then(
                (res) => {
                    const data = res.data
                    setnewCourse(data)
                }
            )
    }
    useEffect(() => {
        getnewCourse()
    }, [])
    return (
        <div>
            <h2 className="page-header">Phê duyệt bài đăng</h2>
            <div className="card">
                {
                    newCourse.length > 0 ? <CensorshipLine bodyData={newCourse} tag={2} reload={ ()=>{getnewCourse()}} /> : <BarWave />
                }
            </div>
        </div>
    )
}