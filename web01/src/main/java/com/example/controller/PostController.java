package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.dao.PostDAO;
import com.example.domain.PostVO;

@Controller
@RequestMapping("/posts")
public class PostController {
	@Autowired
	PostDAO dao;
	
	@GetMapping("/insert")
	public String insert(Model model) {
		model.addAttribute("pageName", "posts/insert");
		return "home";
	}
	
	@GetMapping("/read")
	public String read(Model model, int pid) {
		model.addAttribute("pid", pid);
		model.addAttribute("pageName", "posts/read");
		return "home";
	}
	
	@GetMapping("")
	public String list(Model model) {
		model.addAttribute("pageName", "posts/list");
		model.addAttribute("posts", dao.list());
		return "home";
	}
	
	@ResponseBody
	@GetMapping("/list.json")
	public List<HashMap<String, Object>> list(){
		return dao.list();
	}
	
	@ResponseBody
	@GetMapping("/read.json") //localhost:8080/posts/read.json?pid=6
	public HashMap<String, Object> read(int pid){
		return dao.read(pid);
	}
	
	@PostMapping("/insert")
	@ResponseBody
	public void insert(PostVO vo) {
		dao.insert(vo);
	}
	
	@PostMapping("/delete")
	@ResponseBody
	public void delete(int pid) {
		dao.delete(pid);
	}
}
