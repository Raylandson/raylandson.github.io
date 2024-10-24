from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from enum import Enum
from pydantic import BaseModel
from bson import ObjectId
from backend.classes.task import *
from backend.db.session import get_db

app = FastAPI()
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
"""

db = get_db()

print(db)
@app.get("/")
async def root():
    print('torrr')
    return{"message": "bolsonara é norte"}


@app.post("/add_task")
async def add_task(task: TaskCreate):
    
    result = db.tasks.insert_one({
        "message": task.message,
        "state": State.TODO.value
    })

    task_id = str(result.inserted_id)

    return {'message': 'Tarefa adicionada com sucesso', 'tarefa':
             {"_id": task_id, "message": task.message, "state": State.TODO.value}}


@app.put("/update")
async def update_task(task: Task):
    pass

@app.put("/update_task")
async def update_task_state(task: TaskUpdate):
    #print(task._id)
    print(task)
    try:
        task_obj_id = ObjectId(task.task_id)

    except Exception:
        raise HTTPException(status_code=400, detail="ID inválido")

    searched_task = db.tasks.find_one({"_id": task_obj_id})

    if searched_task is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    update_fields = {}

    if task.message:
        update_fields["message"] = task.message
    
    if task.state:
        update_fields["state"] = task.state.value


    db.tasks.update_one(
        {"_id": task_obj_id},
        {"$set": update_fields})
    
    return {"message": "Estado da tarefa atualizado com sucesso", "task_id": task.task_id,
             "new_state": task.state.value}


@app.get("/get_all_tasks")
async def get_all_tasks():
    try:
        tasks = list(db.tasks.find())

        for task in tasks:
            task["_id"] = str(task["_id"])
            task["state"] = State(task["state"])

        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter tarefas: {str(e)}")


@app.delete("/delete_task/{task_id}")
async def delete_task(task_id: str):
    task_obj_id = ObjectId(task_id)
    searched_task = db.tasks.find_one({"_id": task_obj_id})

    if searched_task is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    db.tasks.delete_one(searched_task)
    #searched_task["_id"] = str(searched_task["_id"])
    #searched_task["state"] = State(searched_task["state"])

    return 'deletado'

