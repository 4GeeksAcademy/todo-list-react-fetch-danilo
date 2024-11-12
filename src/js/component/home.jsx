import React, { useState, useEffect } from "react";



//create your first component
const Home = () => {
	const [item, setItem] = useState("")
	const [toDos, setToDos] = useState([])
	

	const handleEnter = async (e) => {
		if (e.key === "Enter") {
			fetch("https://playground.4geeks.com/todo/todos/DanYP",{
				method: "POST",
				body: JSON.stringify({
					"label": item,
					"is_done": false
				  }),
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			  .then((res) => {
				if(res.ok) console.log("Tarea agregada correctamente")
			  })
			setItem("")
			await handleGetTodos()
		}
	}

	const handleGetTodos = async () => {
		try {
			const res = await fetch("https://playground.4geeks.com/todo/users/DanYP")
			const data = await res.json()
			if(res.ok) setToDos(data.todos)
		} catch (error) {
			console.log(error)
		}
		
		
			
		
	}

	const handleDelete = (id) => {
		fetch("https://playground.4geeks.com/todo/todos/"+id,
			{
				method: "DELETE"
			}
		)
		.then((res) => {
			if(res.ok) console.log("Tarea eliminada correctamente")
		  })
		
	}

	useEffect(() => {
		handleGetTodos()

	}, [handleDelete])

	return (
		<div className="container">
			<h1>Todos</h1>
			<div>
				<ul>
					<li><input type ="text" placeholder="Agregar nueva tarea" onChange={(e) => setItem(e.target.value)} value ={item} onKeyDown={(e) => handleEnter(e)}/></li>
					{toDos && toDos.map((item, index) => (
						<li key={index}> {item.label} <i className="fas fa-times" onClick={() => handleDelete(item.id)}></i></li>
					))}
					<li> {toDos.length} items faltantes</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
