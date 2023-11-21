import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import ProfessorUpdate from './ProfessorUpdate';

const ProfessorRead = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [edit, setEdit] = useState(false);
    const params = useParams();
    const pcode = params.pcode;
    const getProfessor = async() => {
        setLoading(true);
        const res = await axios.get("/pro/read.json?pcode=" + pcode);
        console.log(res.data);
        setData(res.data);
        setLoading(false);
    }
                        
    const {pname, dept, fmtdate, fmtsalary, title} = data;

    useEffect(() => {
        getProfessor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[edit])

    if(loading) return <div className='text-center my-5'><Spinner/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수정보</h1>
            <Row>
                <Col>
                    {edit ? 
                        <ProfessorUpdate data={data} setEdit={setEdit}/>
                        :
                        <Card className='p-5'>
                            <div>교수이름 : {pname}({pcode})</div><hr/>
                            <div>교수직급 : {title}({dept})</div><hr/>
                            <div>교수급여 : {fmtsalary}</div><hr/>
                            <div>임용일자 : {fmtdate}</div><hr/>
                            <div className='text-center'>
                                <Button className='px-5' onClick={()=>setEdit(true)}>정보수정</Button>
                            </div>
                        </Card>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ProfessorRead