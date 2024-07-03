import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditingTask(index);
    setEditingText(tasks[index].text);
  };

  const saveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editingText;
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditingText("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <p className="mb-6">Manage your tasks efficiently</p>
      <div className="flex gap-2 mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <Card key={index} className="flex items-center justify-between">
            <CardContent className="flex items-center gap-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleComplete(index)}
              />
              {editingTask === index ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-grow"
                />
              ) : (
                <span className={task.completed ? "line-through" : ""}>
                  {task.text}
                </span>
              )}
            </CardContent>
            <CardFooter className="flex gap-2">
              {editingTask === index ? (
                <Button onClick={() => saveTask(index)}>Save</Button>
              ) : (
                <Button variant="outline" onClick={() => editTask(index)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
              <Button variant="outline" onClick={() => deleteTask(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;