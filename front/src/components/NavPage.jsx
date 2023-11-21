import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Route, Routes } from 'react-router-dom';
import StudentList from './student/StudentList';
import ProfessorList from './professor/ProfessorList';
import ProfessorRead from './professor/ProfessorRead';
import ProfessorInsert from './professor/ProfessorInsert';
const NavPage = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme='dark'>
                <Container fluid>
                    <Navbar.Brand href="#">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll
                        >
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/pro/list">교수관리</NavLink>
                            <NavLink to="/stu/list">학생관리</NavLink>
                            <NavLink to="/cou/list">강좌관리</NavLink>
                        </Nav>
                        <Nav>
                            <NavLink to="/login">로그인</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/stu/list' element={<StudentList/>}/>
                <Route path='/pro/list' element={<ProfessorList/>}/>
                <Route path='/pro/read/:pcode' element={<ProfessorRead/>}/>
                <Route path='/pro/insert' element={<ProfessorInsert/>}/>
            </Routes>
        </>
    )
}

export default NavPage