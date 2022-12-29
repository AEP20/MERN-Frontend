import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error , setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([ ]);

  // create a async handleSubmit function with the parameter e and fetch the url
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const res = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });
    const json = await res.json();

    if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
        console.log("emptyFields" , emptyFields)
    }
    if (res.ok) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([]);
        console.log("added workout successfully", json)
        dispatch({type: "CREATE_WORKOUT", payload: json})
    }

};

  return (
    // create a form to get title , load and reps from the user
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h2>Add a New Workout</h2>

        <label>Excersize Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load (in kg)</label>
        <input
          type="text"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Reps</label>
        <input
          type="text"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;