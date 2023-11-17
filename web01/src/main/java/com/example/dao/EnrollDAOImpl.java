package com.example.dao;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EnrollDAOImpl implements EnrollDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.EnrollMapper";
	
	@Override
	public void delete(String scode, String lcode) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("lcode", lcode);
		map.put("scode", scode);
		session.delete(namespace + ".delete", map);
	}

	@Override
	public void persons(String lcode, int count) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("lcode", lcode);
		map.put("count", count);
		session.update(namespace + ".persons", map);
	}

	@Override
	public void insert(String scode, String lcode) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("lcode", lcode);
		map.put("scode", scode);
		session.insert(namespace + ".insert", map);		
	}

}
