import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfessorInsert = () => {
    const navi = useNavigate();
    const [form, setForm] = useState({
        pcode: 'p001',
        pname: '이몽룡',
        dept: '전산',
        title: '정교수',
        hiredate: '2023-11-21',
        salary: 100000000
    });
    const { pcode, pname, dept, title, hiredate, salary } = form;
    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(window.confirm("새로운 교수를 등록하시겠습니까?")){
            await axios.post("/pro/insert", form)
            navi("/pro/list"); 
        }   
    }
    const getCode = async () => {
        const res = await axios("/pro/code");
        //console.log(res.data);
        setForm({
            ...form,
            pcode:res.data
        })
    }
    useEffect(()=>{
        getCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수등록</h1>
            <Card className='p-5'>
                <form onSubmit={onSubmit}>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>교수번호</InputGroup.Text>
                        <Form.Control value={pcode} name='pcode' readOnly />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>교수이름</InputGroup.Text>
                        <Form.Control value={pname} name='pname' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>교수학과</InputGroup.Text>
                        <Form.Select value={dept} name='dept' onChange={onChange}>
                            <option value="전산">전자계산학과</option>
                            <option value="전자">전자공학과</option>
                            <option value="건축">건축공학과</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>교수직금</InputGroup.Text>
                        <Form.Select value={title} name='title' onChange={onChange}>
                            <option value="정교수">정교수</option>
                            <option value="부교수">부교수</option>
                            <option value="조교수">조교수</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>교수급여</InputGroup.Text>
                        <Form.Control value={salary} name='salary' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>임용일자</InputGroup.Text>
                        <Form.Control value={hiredate} type='date' name='hiredate' onChange={onChange} />
                    </InputGroup>
                    <div className='text-center mt-2'>
                        <Button className='px-5' type='submit'>저장</Button>
                        <Button className='px-5 ms-2' variant='secondary' type='reset'>취소</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default ProfessorInsert