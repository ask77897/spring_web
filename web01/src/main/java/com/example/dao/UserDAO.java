package com.example.dao;

import java.util.HashMap;

import com.example.domain.UserVO;

public interface UserDAO {
	public HashMap<String, Object> read(String uid);
	public UserVO login(String uid);
	public void update(UserVO vo);
	public void update_photo(UserVO vo);
	public void update_password(UserVO vo);
	public void insert(UserVO vo);
}
