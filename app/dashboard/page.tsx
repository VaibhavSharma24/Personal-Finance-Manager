"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Plus, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

// Mock data for the dashboard
const mockTransactions = [
  { id: 1, description: "Grocery Shopping", amount: -120.5, date: "2023-06-15", category: "Food" },
  { id: 2, description: "Salary Deposit", amount: 3000.0, date: "2023-06-01", category: "Income" },
  { id: 3, description: "Electricity Bill", amount: -85.2, date: "2023-06-10", category: "Utilities" },
  { id: 4, description: "Freelance Payment", amount: 500.0, date: "2023-06-20", category: "Income" },
  { id: 5, description: "Restaurant Dinner", amount: -65.3, date: "2023-06-18", category: "Food" },
]

const mockCategories = [
  { id: 1, name: "Food", color: "#FF6384" },
  { id: 2, name: "Income", color: "#36A2EB" },
  { id: 3, name: "Utilities", color: "#FFCE56" },
  { id: 4, name: "Transportation", color: "#4BC0C0" },
  { id: 5, name: "Entertainment", color: "#9966FF" },
]

const mockGoals = [
  { id: 1, name: "Emergency Fund", target: 5000, current: 2500, date: "2023-12-31" },
  { id: 2, name: "Vacation", target: 2000, current: 800, date: "2023-09-30" },
]

const mockChartData = [
  { name: "Food", value: 185.8, color: "#FF6384" },
  { name: "Utilities", value: 85.2, color: "#FFCE56" },
  { name: "Income", value: 3500.0, color: "#36A2EB" },
  { name: "Entertainment", value: 45.0, color: "#9966FF" },
]

export default function DashboardPage() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [categories, setCategories] = useState(mockCategories)
  const [goals, setGoals] = useState(mockGoals)
  const [chartData, setChartData] = useState(mockChartData)

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current balance across all accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total income this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total expenses this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Your expense distribution across categories</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-80">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.filter((item) => item.name !== "Income")}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {chartData
                        .filter((item) => item.name !== "Income")
                        .map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <ChartLegend className="mt-4" />
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>Track your progress towards financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ${goal.current} of ${goal.target}
                    </span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} />
                  <p className="text-xs text-muted-foreground">
                    Target date: {new Date(goal.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add New Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your most recent financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-2 ${transaction.amount > 0 ? "bg-emerald-100" : "bg-rose-100"}`}>
                    {transaction.amount > 0 ? (
                      <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                    </p>
                  </div>
                </div>
                <div className={`font-medium ${transaction.amount > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/transactions">
            <Button variant="outline">View All Transactions</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

