import React, { useState } from "react";

const Home = () => {
	const [task, setTask] = useState(""); // state which saves the current task

	const [listTask, setListTask] = useState([]); // task to add to the list of tasks

	const [error, setError] = useState(false) // The app starts w/o errors

	const handleChange = (event) => {
		setTask(event.target.value); //function setTask send the text entered to the input into task 
	}

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	const handleSaveTask = (event) => {
		if (event.key === "Enter") {
			if (task.trim() != "") {
				setListTask([...listTask, task]); // spread operator to add the task to the listTask
				setTask("")
				setError(false)
			} else {
				setError(true)
			}
		}
	}

	const deleteTask = (id) => {
		let newArray = listTask.filter((_, index) => index != id)
		setListTask(newArray)
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8">
					<h1 className="text-center">My ToDo List</h1>
					{error ? <div className="alert alert-danger">This field is required</div> : ""}
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							className="form-control"
							placeholder="Add a task..."
							name="label"
							value={task} //to synchronize the input with the state
							onChange={handleChange}
							onKeyDown={handleSaveTask}
						/>
						<ul>
							{listTask.map((item, index) => {
								return (
									<li
										className="mt-3"
										key={index}>
										{item}
										<span className="float-end">
											<i className="fas fa-trash" onClick={() => deleteTask(index)}></i>
										</span>
									</li>
								)
							})}
						</ul>
						<hr />
						<div>
							{listTask.length ? <p className="fs-3">{listTask.length} task(s)</p> : <p className="fs-3">Nothing to do!! <span><i class="far fa-smile-wink"></i></span></p>}
						</div>
					</form>
				</div>
			</div>
		</div >
	)
};

export default Home;