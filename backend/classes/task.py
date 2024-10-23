from typing import Optional
from pydantic import BaseModel
from enum import Enum


class State(Enum):
    TODO = 0
    COMPLETED = 1


class TaskBase(BaseModel):
    message: str
    state: State = State.TODO


class TaskCreate(TaskBase):
    #state: State = State.TODO
    pass


class TaskUpdate(BaseModel):
    task_id: str # deu conflito de nome, paia paia
    message: Optional[str] = None
    state: Optional[State] = State.TODO

    class Config:
        from_attributes = True


class Task(TaskBase):
    _id: str
    