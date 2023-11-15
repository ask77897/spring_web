package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.ProDAO;
import com.example.domain.ProVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/pro")
public class ProRestController {
	@Autowired
	ProDAO dao;
	
	@GetMapping("/list.json")
	public List<HashMap<String, Object>> list(){
		return dao.list();
	}
	
	@GetMapping("/code")
	public int code(){
		return dao.code();
	}
	
	@GetMapping("/read.json")
	public HashMap<String, Object> read(String pcode){
		return dao.read(pcode);
	}
	
	@GetMapping("/stu/list.json")
	public List<HashMap<String, Object>> stu_list(String pcode){
		return dao.stu_list(pcode);
	}
	
	@GetMapping("/cou/list.json")
	public List<HashMap<String, Object>> cou_list(String pcode){
		return dao.cou_list(pcode);
	}
	
	@GetMapping("/slist.json")
	public List<HashMap<String, Object>> slist(QueryVO vo){
		return dao.slist(vo);
	}
	
	@GetMapping("/total")
	public int total(QueryVO vo){
		return dao.total(vo);
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody ProVO vo) {
		dao.insert(vo);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody ProVO vo) {
		dao.update(vo);
	}
}
