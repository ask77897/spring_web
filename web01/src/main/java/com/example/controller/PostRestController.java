package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.PostDAO;
import com.example.domain.PostVO;
import com.example.service.PostService;

@RestController
@RequestMapping("/posts")
public class PostRestController {
	@Autowired
	PostDAO dao;
	
	@Autowired
	PostService service;
	
	@GetMapping("/list.json") //localhost:8080/posts/list.json
	public List<HashMap<String, Object>> list(){
		return dao.list();
	}
	
	@GetMapping("/list1.json") //localhost:8080/posts/list1.json?page=1&size=3
	public List<HashMap<String, Object>> list1(int page, int size, String key, String query){
		return dao.list1(page, size, key, query);
	}
	
	@GetMapping("/total")
	public int total(String key, String query){
		return dao.total(key, query);
	}
	
	@GetMapping("/read.json") //localhost:8080/posts/read.json?pid=4
	public HashMap<String, Object> read(int pid){
		return service.read(pid);
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody PostVO vo) {
		System.out.println(vo.toString());
		dao.insert(vo);
	}
	
	@PostMapping("/delete")
	public void delete(@RequestBody int pid) {
		dao.delete(pid);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody PostVO vo) {
		dao.update(vo);
	}
}
