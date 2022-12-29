import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

//date fns
import {formatDistanceToNow} from 'date-fns'

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()

    const handleClick = async () => {
        const res = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'DELETE'
        })
        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
        
}

    return (
        <div className="workoutDetails">
            <h2>{workout.title}</h2>
            <p><strong>Load (kg) : </strong> {workout.load}</p>
            <p><strong>Reps : </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix:true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined delete" >delete</span>
        </div>
    )
}


export default WorkoutDetails