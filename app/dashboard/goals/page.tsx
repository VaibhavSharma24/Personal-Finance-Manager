"use client"

import { useState } from "react"
import { CalendarIcon, Edit, Plus, Target, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

// Mock data for savings goals
const mockGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 5000,
    current: 2500,
    date: "2023-12-31",
    description: "Build a safety net for unexpected expenses",
  },
  {
    id: 2,
    name: "Vacation",
    target: 2000,
    current: 800,
    date: "2023-09-30",
    description: "Summer trip to the beach",
  },
  {
    id: 3,
    name: "New Laptop",
    target: 1500,
    current: 1200,
    date: "2023-08-15",
    description: "Replace my old computer",
  },
  {
    id: 4,
    name: "Home Down Payment",
    target: 20000,
    current: 5000,
    date: "2024-06-30",
    description: "Save for a house down payment",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(mockGoals)
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "0",
    date: new Date().toISOString().split("T")[0],
    description: "",
  })
  const [editGoal, setEditGoal] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.date) return

    const newGoalObj = {
      id: Date.now(),
      name: newGoal.name,
      target: Number.parseFloat(newGoal.target),
      current: Number.parseFloat(newGoal.current) || 0,
      date: format(selectedDate, "yyyy-MM-dd"),
      description: newGoal.description,
    }

    setGoals([...goals, newGoalObj])
    setNewGoal({
      name: "",
      target: "",
      current: "0",
      date: new Date().toISOString().split("T")[0],
      description: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditGoal = () => {
    if (!editGoal || !editGoal.name || !editGoal.target) return

    setGoals(
      goals.map((goal) =>
        goal.id === editGoal.id
          ? {
              ...editGoal,
              target: Number.parseFloat(editGoal.target),
              current: Number.parseFloat(editGoal.current) || 0,
            }
          : goal,
      ),
    )
    setEditGoal(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const openEditDialog = (goal) => {
    setEditGoal({ ...goal })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Savings Goals</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Savings Goal</DialogTitle>
              <DialogDescription>Create a new financial goal to track your progress.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Vacation Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Target Amount ($)</Label>
                <Input
                  id="target"
                  type="number"
                  placeholder="0.00"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="current">Current Amount ($)</Label>
                <Input
                  id="current"
                  type="number"
                  placeholder="0.00"
                  value={newGoal.current}
                  onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Target Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Brief description of your goal"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100
          const remainingAmount = goal.target - goal.current
          const targetDate = new Date(goal.date)
          const daysLeft = Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24))

          return (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <CardTitle>{goal.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(goal)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{goal.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-medium">${goal.current.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-medium">${goal.target.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Remaining</p>
                    <p className="font-medium">${remainingAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target Date</p>
                    <p className="font-medium">{new Date(goal.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {daysLeft > 0 ? `${daysLeft} days left to reach your goal` : "Goal date has passed"}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Savings Goal</DialogTitle>
            <DialogDescription>Update the details of your financial goal.</DialogDescription>
          </DialogHeader>
          {editGoal && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Goal Name</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g., Vacation Fund"
                  value={editGoal.name}
                  onChange={(e) => setEditGoal({ ...editGoal, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-target">Target Amount ($)</Label>
                <Input
                  id="edit-target"
                  type="number"
                  placeholder="0.00"
                  value={editGoal.target}
                  onChange={(e) => setEditGoal({ ...editGoal, target: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-current">Current Amount ($)</Label>
                <Input
                  id="edit-current"
                  type="number"
                  placeholder="0.00"
                  value={editGoal.current}
                  onChange={(e) => setEditGoal({ ...editGoal, current: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Target Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editGoal.date}
                  onChange={(e) => setEditGoal({ ...editGoal, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Input
                  id="edit-description"
                  placeholder="Brief description of your goal"
                  value={editGoal.description}
                  onChange={(e) => setEditGoal({ ...editGoal, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

