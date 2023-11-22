import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Pagination.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PostList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const navi = useNavigate();
    console.log(page)
    const getList = async () => {
        setLoading(true);
        const res = await axios(`/posts/list1.json?page=${page}&size=5&key=title&query=`);
        //console.log(res.data);
        setList(res.data);
        const res1 = await axios(`/posts/total?key=title&query=`)
        setTotal(res1.data);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
        // eslint-disable-next-line
    },[location])

    if(loading) return <div className='text-center my-5'><Spinner/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글</h1>
            <Row>
                <Col>
                    <span>게시글 수 : {total}건</span>
                </Col>
            </Row>
            <Table variant='dark' striped hover bordered>
                <thead>
                    <tr className='text-center'>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(post=>
                    <tr key={post.pid}>
                        <td>{post.pid}</td>
                        <td><Link to={`/post/read/${post.pid}`}>{post.title} ({post.commcnt})</Link></td>
                        <td>{post.writer}</td>
                        <td>{post.viewcnt}</td>
                        <td>{post.fmtdate}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
            {total > 5 &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={5}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => {navi(`/post/list?page=${page}`)}} />
            }
        </div>
    )
}

export default PostList