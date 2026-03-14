import { useEffect, useState } from "react"
import { api } from "@/app/services/api"
import { useToast } from "@/app/components/Toast/Toast"
import { ProductTable } from "./ProductTable"
import { EditProductCategoryModal } from "./EditProductCategoryModal"

export type ProductItem = {
    _id: string
    name: string
    sku?: string
    erpCategoryId?: string
    erpCategoryName?: string
    meliCategoryId?: string | null
    meliCategoryName?: string | null
}

export function ProductCategoryLinkScreen() {
    const { pushToast } = useToast()

    const [products, setProducts] = useState<ProductItem[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)

    const fetchProducts = async () => {
        try {
            setLoading(true)

            const { data } = await api.get<ProductItem[]>("/product/list")

            setProducts(Array.isArray(data) ? data : [])
        } catch (err: any) {
            console.error(err)
            pushToast(
                "error",
                err?.response?.data?.message || "Erro ao listar produtos."
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleOpenEdit = (product: ProductItem) => {
        setSelectedProduct(product)
    }

    const handleCloseEdit = () => {
        setSelectedProduct(null)
    }

    const handleProductUpdated = (updatedProduct: ProductItem) => {
        setProducts((prev) =>
            prev.map((item) => (item._id === updatedProduct._id ? updatedProduct : item))
        )
        setSelectedProduct(updatedProduct)
    }

    return (
        <>
            <ProductTable
                products={products}
                loading={loading}
                onEdit={handleOpenEdit}
            />

            {selectedProduct && (
                <EditProductCategoryModal
                    product={selectedProduct}
                    onClose={handleCloseEdit}
                    onUpdated={handleProductUpdated}
                />
            )}
        </>
    )
}