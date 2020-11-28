<template>
	<main>
		<h1>Todo</h1>
		<form @submit.prevent="addTodo">
			<textarea type="text" placeholder="New todo item" v-model="newTodo" name="newTodo" />
			<input type="submit" value="Add new todo" />
		</form>
		<button @click="markAllDone">Mark all done</button>
		<button @click="clearTodos">Clear all todos</button>
		<ul>
			<li v-for="(todo, index) in todos" :key="todo.id" class="todo">
				<h3 :class="{ done: todo.done }" @click="toggleDone(todo)">{{ todo.task }}</h3>
				<br />
				<button @click="removeTodo(index)">Remove</button>
			</li>
		</ul>
	</main>
	<footer>
		<ul>
			<li><a href="#" @click.prevent="toggleTheme">Theme</a></li>
			<li><a href="https://github.com/EpokTarren/VueTodo">GitHub</a></li>
		</ul>
	</footer>
</template>

<script lang="ts">
require('@/assets/main.css');

import { ref, defineComponent } from 'vue';

document.title = "Tarren's Todo App";

interface Todo {
	task: string;
	done: boolean;
	id: number;
}

export default defineComponent({
	name: 'todo',
	setup() {
		const newTodo = ref('');
		const todos = ref<Todo[]>(JSON.parse(window.localStorage.getItem('todos') || '[]'));

		let theme = localStorage.getItem('theme');

		if (theme === 'dark') document.body.classList.add('dark');

		function toggleTheme() {
			if (localStorage.getItem('theme') == 'light') {
				document.body.classList.add('dark');
				localStorage.setItem('theme', 'dark');
				theme = 'dark';
			} else {
				document.body.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}
		}

		function save() {
			window.localStorage.setItem('todos', JSON.stringify(todos.value));
		}

		function addTodo() {
			todos.value.push({
				task: newTodo.value,
				done: false,
				id: Date.now()
			});
			newTodo.value = '';
			save();
		}

		function toggleDone(todo: Todo) {
			todo.done = !todo.done;
			save();
		}

		function removeTodo(index: number) {
			todos.value.splice(index, 1);
			save();
		}

		function markAllDone() {
			for (const todo of todos.value) {
				todo.done = true;
			}
			save();
		}

		function clearTodos() {
			todos.value = [];
			save();
		}

		return {
			toggleTheme,
			newTodo,
			addTodo,
			todos,
			toggleDone,
			removeTodo,
			markAllDone,
			clearTodos
		};
	}
});
</script>
