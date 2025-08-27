import { useEffect, useState } from "react";
import { verifyPayment } from "@/lib/payment-api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CartProduct } from "@/types/skill";

export default function PaymentVerification() {
    const navigate = useNavigate()
    const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', [])

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search)

        const billplzId = searchParams.get('billplz[id]')
        const billplzSignature = searchParams.get('billplz[x_signature]')
        let billplzPaidAt = searchParams.get('billplz[paid_at]')
        let billplzPaid = searchParams.get('billplz[paid]')

        console.log(billplzPaid, "|", billplzId, "|", billplzPaidAt, "|", billplzSignature)

        if (!billplzId || !billplzSignature) {
            toast.error('Invalid payment details')
            navigate('/')
            return
        }

        if (!billplzPaid) {
            billplzPaid = 'false'
        }

        if (!billplzPaidAt) {
            billplzPaidAt = ''
        }

        verifyPayment(billplzId, billplzPaid, billplzPaidAt, billplzSignature).then((data) => {
            if (data) {
                setCart([])
                if (billplzPaid === 'true') {
                    toast.success('Payment verified successfully')
                } else {
                    toast.error('Cancelled payment')
                }
                navigate('/orders')
            } else {
                toast.error('Payment verification failed')
                navigate('/')
            }
        })
    }, [])

    return (
        <>
            <main className="flex items-center justify-center h-screen">
                <Spinner className="block mr-2 h-4 w-4" />
                <p className="text-center">Verifying payment</p>
            </main>
        </>
    )
}