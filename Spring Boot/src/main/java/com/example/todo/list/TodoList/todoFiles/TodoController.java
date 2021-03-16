package com.example.todo.list.TodoList.todoFiles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://127.0.0.1:5500")
@RestController
public class TodoController {
	@Autowired
	private TodoJpadaoService service;
	
	@GetMapping("/list")
	public List<Todo> getAll(){
		return service.getList();
	}
	@GetMapping("/list/{id}")
	public Todo getById(@PathVariable Long id) {
		return service.getOne(id);
	}
	@PostMapping("/list")
	public void addTodo(@RequestBody Todo todo) {
		service.addTodo(todo);
	}
	@PutMapping("/list/{id}")
	public void updateTodo(@RequestBody Todo todo) {
		service.updatetodo(todo);
	}
	@DeleteMapping("/list/{id}")
	public Todo deleteTodo(@PathVariable Long id)
	{
		return service.deleteById(id);
	}
}
