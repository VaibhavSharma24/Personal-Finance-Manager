// "use client"

// import { useState } from "react"
// import { Edit, Plus, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"

// // Mock data for categories
// const mockCategories = [
//   { id: 1, name: "Food", color: "#FF6384", transactions: 12 },
//   { id: 2, name: "Income", color: "#36A2EB", transactions: 5 },
//   { id: 3, name: "Utilities", color: "#FFCE56", transactions: 8 },
//   { id: 4, name: "Transportation", color: "#4BC0C0", transactions: 6 },
//   { id: 5, name: "Entertainment", color: "#9966FF", transactions: 4 },
//   { id: 6, name: "Health", color: "#FF9F40", transactions: 3 },
//   { id: 7, name: "Shopping", color: "#C9CBCF", transactions: 9 },
//   { id: 8, name: "Education", color: "#7BC043", transactions: 2 },
// ]

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState(mockCategories)
//   const [newCategory, setNewCategory] = useState({ name: "", color: "#FF6384" })
//   const [editCategory, setEditCategory] = useState(null)
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

//   const handleAddCategory = () => {
//     if (!newCategory.name) return

//     const newCategoryObj = {
//       id: Date.now(),
//       name: newCategory.name,
//       color: newCategory.color,
//       transactions: 0,
//     }

//     setCategories([...categories, newCategoryObj])
//     setNewCategory({ name: "", color: "#FF6384" })
//     setIsAddDialogOpen(false)
//   }

//   const handleEditCategory = () => {
//     if (!editCategory || !editCategory.name) return

//     setCategories(categories.map((cat) => (cat.id === editCategory.id ? editCategory : cat)))
//     setEditCategory(null)
//     setIsEditDialogOpen(false)
//   }

//   const handleDeleteCategory = (id) => {
//     setCategories(categories.filter((cat) => cat.id !== id))
//   }

//   const openEditDialog = (category) => {
//     setEditCategory({ ...category })
//     setIsEditDialogOpen(true)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Categories</h1>
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Category
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Category</DialogTitle>
//               <DialogDescription>Create a new category to organize your transactions.</DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Category Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="e.g., Groceries"
//                   value={newCategory.name}
//                   onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="color">Color</Label>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     id="color"
//                     type="color"
//                     className="w-12 h-10 p-1"
//                     value={newCategory.color}
//                     onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
//                   />
//                   <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: newCategory.color }}></div>
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleAddCategory}>Add Category</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>All Categories</CardTitle>
//           <CardDescription>Manage your transaction categories</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {categories.map((category) => (
//               <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 rounded-full" style={{ backgroundColor: category.color }}></div>
//                   <div>
//                     <p className="font-medium">{category.name}</p>
//                     <p className="text-xs text-muted-foreground">{category.transactions} transactions</p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Edit Category Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Category</DialogTitle>
//             <DialogDescription>Update the details of this category.</DialogDescription>
//           </DialogHeader>
//           {editCategory && (
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="edit-name">Category Name</Label>
//                 <Input
//                   id="edit-name"
//                   placeholder="e.g., Groceries"
//                   value={editCategory.name}
//                   onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="edit-color">Color</Label>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     id="edit-color"
//                     type="color"
//                     className="w-12 h-10 p-1"
//                     value={editCategory.color}
//                     onChange={(e) => setEditCategory({ ...editCategory, color: e.target.value })}
//                   />
//                   <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: editCategory.color }}></div>
//                 </div>
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditCategory}>Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import axios from "axios"

const API_URL = "http://localhost:5000/categories" // Replace with your actual API endpoint

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState({ name: "", color: "#FF6384" })
  const [editCategory, setEditCategory] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL)
      setCategories(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.name) return

    try {
      const response = await axios.post(API_URL, newCategory)
      setCategories([...categories, response.data])
      setNewCategory({ name: "", color: "#FF6384" })
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding category:", error)
    }
  }

  const handleEditCategory = async () => {
    if (!editCategory || !editCategory.name) return

    try {
      await axios.put(`${API_URL}/${editCategory.id}`, editCategory)
      setCategories(categories.map((cat) => (cat.id === editCategory.id ? editCategory : cat)))
      setEditCategory(null)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating category:", error)
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setCategories(categories.filter((cat) => cat.id !== id))
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const openEditDialog = (category) => {
    setEditCategory({ ...category })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category to organize your transactions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Groceries"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    className="w-12 h-10 p-1"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  />
                  <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: newCategory.color }}></div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>Manage your transaction categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.transactions} transactions</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the details of this category.</DialogDescription>
          </DialogHeader>
          {editCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g., Groceries"
                  value={editCategory.name}
                  onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-color">Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="edit-color"
                    type="color"
                    className="w-12 h-10 p-1"
                    value={editCategory.color}
                    onChange={(e) => setEditCategory({ ...editCategory, color: e.target.value })}
                  />
                  <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: editCategory.color }}></div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

