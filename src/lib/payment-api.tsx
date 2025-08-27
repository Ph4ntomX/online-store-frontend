import axios from "axios";
import { URL } from "./constants";

export const verifyPayment: (billplzId: string, billplzPaid: string, billplzPaidAt: string, billplzSignature: string) => Promise<boolean> = async (billplzId: string, billplzPaid: string, billplzPaidAt: string, billplzSignature: string) => {
    try {
        const response = await axios.post(`${URL}/payment`, {
            billplz_id: billplzId,
            billplz_paid: billplzPaid,
            billplz_paid_at: billplzPaidAt,
            billplz_x_signature: billplzSignature
        });
        return response.data;
    } catch (error) {}
};
