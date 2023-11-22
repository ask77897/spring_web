import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Pagination.css'

const Comment = ({ pid }) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [body, setBody] = useState('');
    const size = 3;
    const getList = async () => {
        const res = await axios(`/comments/list.json?page=${page}&pid=${pid}&size=${size}`);
        //console.log(res.data);
        const data = res.data.map(c=>c && {...c, ellipsis:true, edit:false, text:c.body});
        setList(data);
        const res1 = await axios(`/comments/total?pid=${pid}`);
        setTotal(res1.data);
    }

    useEffect(() => {
        getList();
        // eslint-disable-next-line
    }, [page]);

    const onRegister = async () => {
        if(body===""){
            alert("댓글내용을 입력하세요")
        }else{
            const data = {pid, writer:sessionStorage.getItem("uid"), body}
            //console.log(data);
            await axios.post("/comments/insert", data);
            setBody("");
            getList();
        }
    }
    const onLogin = () => {
        sessionStorage.setItem("target", `/post/read/${pid}`);
        window.location.href="/login";
    }
    const onClickBody = (cid) => {
        //alert(cid)
        const data = list.map(c=>c.cid===cid ? {...c, ellipsis:!c.ellipsis} : c);
        setList(data);

    }
    const onDelete = async (cid) => {
        if(window.confirm(`${cid}번 댓글을 삭제합니다.`)){
            await axios(`/comments/delete?cid=${cid}`);
            getList();
        }
    }
    const onClickUpdate = (cid) =>{
        const data = list.map(c=>c.cid===cid ? {...c, edit:true} : c);
        setList(data);
    }
    const onCancel = (cid) =>{
        const data = list.map(c=>c.cid===cid ? {...c, edit:false, body:c.text} : c);
        setList(data);
    }
    const onChangeBody = (cid, e) => {
        const data = list.map(c=>c.cid===cid ? {...c, body:e.target.value} : c);
        setList(data)
    }
    const onClcikSave = async (cid, body, text) => {
        const data = {cid, body};
        //console.log(data);
        if(body===text){
            onCancel(cid);
        }else{
            if(window.confirm(`${cid}번 댓글을 수정하시겠습니까?`)){
                await axios.post("/comments/update", data);
                getList();
            }
        }
    }

    return (
        <div className='mt-5'>
            <div><span>댓글 수 : {total}</span></div>
            {sessionStorage.getItem("uid")?
            <div>
                <Form.Control as="textarea" onChange={(e)=>setBody(e.target.value)} rows={5} placeholder='내용을 입력하세요.' value={body}/>
                <div className='text-end mt-2'>
                    <Button className='px-5' onClick={onRegister}>등록</Button>
                </div>
            </div>
            :
            <Button className='w-100' onClick={onLogin}>로그인</Button>
            }
            {list.map(com=>
            <Row className='mb-3' key={com.cid}>
                <Col lg={1}>
                    <img src={com.photo ? `/display?file=${com.photo}` : "http://via.placeholder.com/40x40"} width="40px" alt='' className='photo'/>
                    <div><small>{com.uname}</small></div>
                </Col>
                <Col>
                    <div><small>{com.fmtdate}</small></div>
                    {!com.edit ?
                        <>
                            <div className={com.ellipsis && "ellipsis2"} style={{cursor:"pointer"}} onClick={()=>onClickBody(com.cid)}>
                                [{com.cid}] {com.text}
                            </div>
                            {sessionStorage.getItem("uid")===com.writer &&
                                <div className='text-end'>
                                    <Button className='btn-sm' onClick={()=>onClickUpdate(com.cid)}>수정</Button>
                                    <Button className='btn-sm ms-2' variant='danger' onClick={()=>onDelete(com.cid)}>삭제</Button>
                                </div>
                            }
                        </>
                        :
                        <div>
                            <Form.Control onChange={(e)=>onChangeBody(com.cid, e)} as="textarea" rows={5} value={com.body}></Form.Control>
                            <div className='text-end'>
                                <Button className='btn-sm' onClick={()=>onClcikSave(com.cid, com.body, com.text)}>저장</Button>
                                <Button className='btn-sm ms-2' variant='secondary' onClick={()=>onCancel(com.cid)}>취소</Button>
                            </div>
                        </div>
                    }
                </Col>
            </Row>
            )}
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => {setPage(page)}} />
            }
        </div>
    )
}

export default Comment