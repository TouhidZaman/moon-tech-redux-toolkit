import axiosInstance from "../../utils/axios.config"

export const fetchProducts = async () => {
    const data = await axiosInstance.get("products");
    return data.data.data
}
export const postProduct = async (product) => {
    const data = await axiosInstance.post("products", product);
    return data.data.data
}

export const deleteProduct = async (productId) => {
    const data = await axiosInstance.delete(`products/${productId}`);
    return data.data.data
}