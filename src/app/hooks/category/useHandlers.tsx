import { useToast } from "@/app/components/Toast/Toast"
import { CategoryLinkItem, MarketplaceKey } from "@/app/components/Announcement/_components/category/CategoryLinkScreen"
import { AnnouncementFieldConfig } from "@/app/components/Announcement/_components/category/EditCategoryLinkModal"
import { createCategoryLink, deleteCategoryLink, updateAnnouncementFields, updateCategoryLink } from "@/app/services/category/category.service"

export type BasicFieldKey = "title" | "description" | "price"

interface UseHandlersProps {
    onSaved: () => void
    link: CategoryLinkItem | null

    erpCategoryId: string
    erpCategoryName: string

    marketplace: MarketplaceKey | ""
    marketplaceCategoryId: string
    marketplaceCategoryName: string

    fieldConfig: AnnouncementFieldConfig

    setMarketplaceCategoryName: React.Dispatch<React.SetStateAction<string>>
    setSavingFieldConfig: React.Dispatch<React.SetStateAction<boolean>>
    setSaving: React.Dispatch<React.SetStateAction<boolean>>
    setFieldConfig: React.Dispatch<React.SetStateAction<AnnouncementFieldConfig>>
}

export const useHandlers = ({
    onSaved,
    link,
    erpCategoryId,
    erpCategoryName,
    marketplace,
    marketplaceCategoryId,
    marketplaceCategoryName,
    fieldConfig,
    setSavingFieldConfig,
    setSaving,
    setFieldConfig,
}: UseHandlersProps) => {
    const { pushToast } = useToast()

    const handleSave = async () => {
        if (!erpCategoryId) {
            pushToast("error", "Selecione a categoria ERP.")
            return
        }

        if (!marketplace) {
            pushToast("error", "Selecione o marketplace.")
            return
        }

        if (!marketplaceCategoryId) {
            pushToast("error", "Selecione a categoria do marketplace.")
            return
        }

        try {
            setSaving(true)

            const payload = {
                erpCategoryId,
                erpCategoryName,
                marketplace,
                marketplaceCategoryId,
                marketplaceCategoryName,
            }

            if (link?._id) {
                await updateCategoryLink(link._id, payload)
            } else {
                await createCategoryLink(payload)
            }

            pushToast("success", "Vínculo salvo com sucesso.")
            onSaved()
        } catch (err: any) {
            console.error(err)
            pushToast(
                "error",
                err?.response?.data?.message || "Erro ao salvar vínculo."
            )
        } finally {
            setSaving(false)
        }
    }

    const handleRemove = async () => {
        if (!link?._id) return

        try {
            setSaving(true)
            await deleteCategoryLink(link._id)
            pushToast("success", "Vínculo removido com sucesso.")
            onSaved()
        } catch (err: any) {
            console.error(err)
            pushToast(
                "error",
                err?.response?.data?.message || "Erro ao remover vínculo."
            )
        } finally {
            setSaving(false)
        }
    }

    const toggleBasicField = (field: BasicFieldKey) => {
        setFieldConfig((prev) => {
            const exists = prev.basicFields.includes(field)

            return {
                ...prev,
                basicFields: exists
                    ? prev.basicFields.filter((item) => item !== field)
                    : [...prev.basicFields, field],
            }
        })
    }

    const toggleOptionalField = (fieldId: string) => {
        setFieldConfig((prev) => {
            const requiredIds = prev.fieldsRequired.map((item) => item.id)

            if (requiredIds.includes(fieldId)) {
                return prev
            }

            const exists = prev.selectedOptionalFieldIds.some(
                (item) => item.id === fieldId
            )

            const field = prev.fieldsByCategory.find((item) => item.id === fieldId)

            if (!field) {
                return prev
            }

            return {
                ...prev,
                selectedOptionalFieldIds: exists
                    ? prev.selectedOptionalFieldIds.filter((item) => item.id !== fieldId)
                    : [
                        ...prev.selectedOptionalFieldIds,
                        {
                            ...field,
                            options: field.raw?.values ?? [],
                        },
                    ],
            }
        })
    }

    const handleSaveFieldConfig = async () => {
        if (!marketplace || !marketplaceCategoryId) {
            pushToast(
                "error",
                "Selecione o marketplace e a categoria antes de configurar os campos."
            )
            return
        }

        try {
            setSavingFieldConfig(true)

            const payload = {
                marketplace,
                marketplaceCategoryId,
                basicFields: fieldConfig.basicFields,
                fieldsRequired: fieldConfig.fieldsRequired,
                fieldsByCategory: fieldConfig.fieldsByCategory,
                selectedOptionalFieldIds: fieldConfig.selectedOptionalFieldIds,
            }

            await updateAnnouncementFields(payload)

            pushToast("success", "Configuração de campos salva com sucesso.")
        } catch (err: any) {
            console.error(err)
            pushToast(
                "error",
                err?.response?.data?.message ||
                "Erro ao salvar configuração de campos."
            )
        } finally {
            setSavingFieldConfig(false)
        }
    }

    return {
        handleSave,
        handleRemove,
        toggleBasicField,
        toggleOptionalField,
        handleSaveFieldConfig,
    }
}