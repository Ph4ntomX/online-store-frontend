import { AppBar } from "@/components/app-bar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getOrders, updateOrder, deleteOrder } from "@/lib/order-api";
import type { Order } from "@/types/skill";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Cart() {

  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])

  const processUpdate = (order: Order) => {
    updateOrder(order).then((data) => {
      if (data) {
        toast.success('Order updated successfully')

        setOrders(orders.map((item) => item.billplz_id === order.billplz_id ? order : item))
      } else {
        toast.error('Order update failed')
      }
    })
  }

  const processDelete = (order: Order) => {
    deleteOrder(order.billplz_id).then((data) => {
      if (data) {
        toast.success('Order deleted successfully')

        setOrders(orders.filter((item) => item.billplz_id !== order.billplz_id))
      } else {
        toast.error('Order delete failed')
      }
    })
  }

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data)
      console.log(data)
    })
  }, [])

  return (
    <>
      <AppBar />

      <main className="container mx-auto py-8 px-6 lg:px-32">
        <h2 className="text-2xl font-semibold mb-6 text-center">Orders</h2>

        <Table>
          {orders.length === 0 && (
            <TableCaption>No orders found.</TableCaption>
          )}

          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.billplz_id}>
                <TableCell>{order.customerName} ({order.customerEmail})</TableCell>
                <TableCell>{order.products.map((product) => <div key={product._id}>{product.name}</div>)}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) => processUpdate({ ...order, status: value as Order['status']  })}
                    disabled={order.status === 'pending'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending" disabled>Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{order.paid_at}</TableCell>
                <TableCell>
                  {order.status === 'pending' && (
                    <Button className="text-red-500 hover:text-red-600" variant="outline" onClick={() => processDelete(order)}>Delete</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}