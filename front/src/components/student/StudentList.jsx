import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner, Table, InputGroup, Form, Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Pagination.css'
import { useLocation, useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const navi = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const size = 3;
    const [key, setKey] = useState(search.get("key") ? search.get("key") : "sname");
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/stu/list.json?page=${page}&size=${size}&key=${key}&query=${query}`);
        //console.log(res);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])

    const onChangePage = (page) =>{
        navi(`/stu/list?page=${page}&key=${key}&query=${query}`);
        //alert(page);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/stu/list?page=1&key=${key}&query=${query}`);
    }

    if(loading) return <div className='text-center'><Spinner className='my-5'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>학생목록</h1>
            <Row className='mb-2'>
                <Col>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Select onChange={(e)=>setKey(e.target.value)}>
                                <option value="scode" selected={key==="year" && true}>학생번호</option>
                                <option value="sname" selected={key==="sname" && true}>학생이름</option>
                                <option value="dept" selected={key==="dept" && true}>학생학과</option>
                                <option value="pname" selected={key==="pname" && true}>지도교수</option>
                            </Form.Select>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)} value={query} placeholder='검색' className='ms-2'/>
                            <Button>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                    <span>검색 결과:{total}명</span>
                </Col>
            </Row>
            {total > 0 ?
            <Table striped hover bordered variant='dark'>
                <thead>
                    <tr className='text-center'>
                        <th>학번</th>
                        <th>이름</th>
                        <th>학과</th>
                        <th>학년</th>
                        <th>지도교수</th>
                        <th>생년월일</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=>
                        <tr className='text-center' key={s.scode}>
                            <td>{s.scode}</td>
                            <td>{s.sname}</td>
                            <td>{s.dept}</td>
                            <td>{s.year}</td>
                            <td>{s.pname}</td>
                            <td>{s.birthday}</td>
                        </tr>    
                    )}
                </tbody>
            </Table>
            :
            <div className='text-center my-5'><h3>검색 자료가 없습니다.</h3></div>
            }
            {total > size &&
            <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={ onChangePage }/>
            }
        </div>
    )
}

export default StudentList