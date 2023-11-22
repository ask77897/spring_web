import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const Login = () => {
    const [form, setForm] = useState({
        uid: '',
        upass: ''
    });
    const { uid/*, upass*/ } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/users/login', form);
        //console.log(res.data)
        if (res.data === 0) {
            alert("아이디가 존재하지 않습니다.")
        } else if (res.data === 2) {
            alert("비밀번호가 일치하지 않습니다.")
        } else {
            sessionStorage.setItem('uid', uid);
            if (sessionStorage.getItem("target")) {
                window.location.href = sessionStorage.getItem("target");
            } else {
                window.location.href = "/";
            }
        }
    }

    return (
        <Row className='my-5 justify-content-center'>
            <h1 className='text-center mb-5'>로그인</h1>
            <Col md={4}>
                <Card className='p-3'>
                    <form onSubmit={onSubmit}>
                        <Form.Control name='uid' onChange={onChange} placeholder='아이디' className='mb-2' />
                        <Form.Control name="upass" onChange={onChange} placeholder='비밀번호' className='mb-2' type='password' />
                        <Button className='w-100' type='submit'>로그인</Button>
                    </form>
                </Card>
            </Col>
        </Row>
    )
}

export default Login