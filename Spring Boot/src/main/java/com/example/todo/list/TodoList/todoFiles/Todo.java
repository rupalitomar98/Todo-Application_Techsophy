package com.example.todo.list.TodoList.todoFiles;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Todo {
		@Id @GeneratedValue(strategy=GenerationType.AUTO)
		Long id;
		String description;
		Date date;
		boolean isCompleted;
		public Todo() {
		}
		public Todo(Long id, String description, Date date, boolean isCompleted) {
			super();
			this.id = id;
			this.description = description;
			this.date = date;
			this.isCompleted = isCompleted;
		}
		
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public Date getDate() {
			return date;
		}
		public void setDate(Date date) {
			this.date = date;
		}
		public boolean getIsCompleted() {
			return isCompleted;
		}
		public void setCompleted(boolean isCompleted) {
			this.isCompleted = isCompleted;
		}
}
