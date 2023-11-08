package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.MysqlDAO;
import com.example.dao.PostDAO;
import com.example.domain.PostVO;

@SpringBootTest
public class MysqlTest {
	@Autowired
	MysqlDAO dao;
	
	@Autowired
	PostDAO pdao;
	
	@Test
	public void now() {
		System.out.println("NOW : " + dao.now());
	}
	
	@Test
	public void delete() {
		pdao.delete(2);
	}
	
	@Test
	public void list() {
		pdao.list();
	}
	
	@Test
	public void read() {
		pdao.read(4);
	}
	
//	@Test
//	public void insert() {
//		PostVO vo = new PostVO();
//		vo.setTitle("제목");
//		vo.setWriter("blue");
//		pdao.insert(vo);
//	}
	
//	@Test
//	public void update() {
//		PostVO vo = new PostVO();
//		vo.setTitle("수정된 제목");
//		vo.setBody("추가된 내용");
//		vo.setPid(4);
//		pdao.update(vo);
//	}
}
