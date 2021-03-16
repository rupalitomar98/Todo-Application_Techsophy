package com.example.todo.list.TodoList.todoFiles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoJpadaoService {
	@Autowired
	private TodoJpaRepository services;
	public List<Todo> getList() {
		return services.findAll();
	}
	public Todo getOne(Long id) {
		return services.findById(id).get();
	}
	
	public void addTodo(Todo todo) {
		services.save(todo);
	}
	public void updatetodo(Todo todo) {
		services.save(todo);
	}
	public Todo deleteById(Long id) {
		Todo data = services.findById(id).get();
		services.delete(data);
		return data;
	}
}
