"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for reports
const monthlyData = [
  { name: "Jan", income: 3500, expenses: 2800 },
  { name: "Feb", income: 3200, expenses: 2900 },
  { name: "Mar", income: 3800, expenses: 3000 },
  { name: "Apr", income: 4000, expenses: 3100 },
  { name: "May", income: 3900, expenses: 3200 },
  { name: "Jun", income: 4200, expenses: 3300 },
  { name: "Jul", income: 4100, expenses: 3400 },
  { name: "Aug", income: 4300, expenses: 3500 },
  { name: "Sep", income: 4400, expenses: 3600 },
  { name: "Oct", income: 4500, expenses: 3700 },
  { name: "Nov", income: 4600, expenses: 3800 },
  { name: "Dec", income: 4700, expenses: 3900 },
]

const categoryData = [
  { name: "Food", value: 1200, color: "#FF6384" },
  { name: "Utilities", value: 800, color: "#FFCE56" },
  { name: "Transportation", value: 600, color: "#4BC0C0" },
  { name: "Entertainment", value: 400, color: "#9966FF" },
  { name: "Shopping", value: 700, color: "#C9CBCF" },
  { name: "Health", value: 300, color: "#FF9F40" },
]

const savingsData = [
  { name: "Jan", amount: 700 },
  { name: "Feb", amount: 300 },
  { name: "Mar", amount: 800 },
  { name: "Apr", amount: 900 },
  { name: "May", amount: 700 },
  { name: "Jun", amount: 900 },
  { name: "Jul", amount: 700 },
  { name: "Aug", amount: 800 },
  { name: "Sep", amount: 800 },
  { name: "Oct", amount: 800 },
  { name: "Nov", amount: 800 },
  { name: "Dec", amount: 800 },
]

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState("monthly")
  const [year, setYear] = useState("2023")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income-expenses">Income & Expenses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48,200.00</div>
                <p className="text-xs text-muted-foreground">+12.5% from previous year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$39,700.00</div>
                <p className="text-xs text-muted-foreground">+8.2% from previous year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,500.00</div>
                <p className="text-xs text-muted-foreground">+35.8% from previous year</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Annual Overview</CardTitle>
              <CardDescription>Your financial summary for {year}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" fill="#36A2EB" name="Income" />
                      <Bar dataKey="expenses" fill="#FF6384" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Monthly comparison of your income and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#36A2EB"
                        activeDot={{ r: 8 }}
                        name="Income"
                        strokeWidth={2}
                      />
                      <Line type="monotone" dataKey="expenses" stroke="#FF6384" name="Expenses" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Income Breakdown</CardTitle>
                <CardDescription>Sources of income for {year}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Salary", value: 36000, color: "#36A2EB" },
                            { name: "Freelance", value: 8200, color: "#4BC0C0" },
                            { name: "Investments", value: 3000, color: "#FFCE56" },
                            { name: "Other", value: 1000, color: "#9966FF" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {[
                            { name: "Salary", value: 36000, color: "#36A2EB" },
                            { name: "Freelance", value: 8200, color: "#4BC0C0" },
                            { name: "Investments", value: 3000, color: "#FFCE56" },
                            { name: "Other", value: 1000, color: "#9966FF" },
                          ].map((entry, index) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Monthly Income Trend</CardTitle>
                <CardDescription>Income pattern throughout {year}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="income" fill="#36A2EB" name="Income" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Breakdown of your spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
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

          <Card>
            <CardHeader>
              <CardTitle>Category Comparison</CardTitle>
              <CardDescription>Monthly spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Jan",
                          Food: 100,
                          Utilities: 70,
                          Transportation: 50,
                          Entertainment: 30,
                          Shopping: 60,
                          Health: 25,
                        },
                        {
                          name: "Feb",
                          Food: 110,
                          Utilities: 65,
                          Transportation: 55,
                          Entertainment: 35,
                          Shopping: 55,
                          Health: 30,
                        },
                        {
                          name: "Mar",
                          Food: 120,
                          Utilities: 75,
                          Transportation: 45,
                          Entertainment: 40,
                          Shopping: 65,
                          Health: 20,
                        },
                        {
                          name: "Apr",
                          Food: 105,
                          Utilities: 70,
                          Transportation: 60,
                          Entertainment: 25,
                          Shopping: 70,
                          Health: 35,
                        },
                        {
                          name: "May",
                          Food: 95,
                          Utilities: 60,
                          Transportation: 50,
                          Entertainment: 45,
                          Shopping: 50,
                          Health: 25,
                        },
                        {
                          name: "Jun",
                          Food: 115,
                          Utilities: 65,
                          Transportation: 55,
                          Entertainment: 30,
                          Shopping: 60,
                          Health: 30,
                        },
                      ]}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Food" stackId="a" fill="#FF6384" />
                      <Bar dataKey="Utilities" stackId="a" fill="#FFCE56" />
                      <Bar dataKey="Transportation" stackId="a" fill="#4BC0C0" />
                      <Bar dataKey="Entertainment" stackId="a" fill="#9966FF" />
                      <Bar dataKey="Shopping" stackId="a" fill="#C9CBCF" />
                      <Bar dataKey="Health" stackId="a" fill="#FF9F40" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Savings Growth</CardTitle>
              <CardDescription>Your savings progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={savingsData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#4BC0C0"
                        activeDot={{ r: 8 }}
                        name="Savings"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Rate</CardTitle>
              <CardDescription>Percentage of income saved each month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData.map((item) => ({
                        name: item.name,
                        rate: (((item.income - item.expenses) / item.income) * 100).toFixed(1),
                      }))}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rate" fill="#4BC0C0" name="Savings Rate (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

