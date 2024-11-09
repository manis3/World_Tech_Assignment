import { ICreateBlogProps } from '@/types/blogTypes';
import { useHandleModalAction } from '../useHandleModalAction';
import useAddNewlBLog from '@/query/BlogQuery/useAddNewlBLog';
import { useState } from 'react';
import useFetchBlogById from '@/query/BlogQuery/useFetchBlogById';
import useUpdateBlog from '@/query/BlogQuery/useUpdateBlog';

export default function useAddBlog() {
    const [updateBlogId, setUpdateBlogId] = useState<number>()
    const [updatedBlogData, setUpdatedBlogData] = useState<any>()
    const [ShowUpdateBlogModal, setShowUpdateBlogModal] = useState(false)
    const { openModal, closeModal, showModal } = useHandleModalAction()
    const { createNewBlog, isNewBlogBeingCreated } = useAddNewlBLog()
    const { updateBlog, IsBlogBeingUpdated } = useUpdateBlog();
    const { blogData } = useFetchBlogById(updateBlogId)

    const handleOpenAddBlogModal = () => {
        openModal()
    }

    const handleCloseAddBlogModal = () => {
        closeModal();
    }

    const handleOpenUpdateBlogModal = () => {

        setShowUpdateBlogModal(true)
    }

    const handleCloseUpdateBlogModal = () => {
        setShowUpdateBlogModal(false);
    }
    const handleAddNewBlog = async (data: ICreateBlogProps) => {
        try {
            await createNewBlog(data);
        }
        catch (err) {
            console.log(`Something went wrong`);
        }
    }

    const handleUpdateBlog = async (id: number) => {
        setUpdateBlogId(id)
        handleOpenUpdateBlogModal();
        console.log(blogData, "blog Data");

    }

    const handleSubmitUpdatedBlog = async (data: ICreateBlogProps) => {
        try {
            await updateBlog({ payload: data, id: updateBlogId });
        }
        catch (err) {
            console.log(err)
        }
    }

    return {
        handleOpenAddBlogModal,
        handleCloseAddBlogModal,
        showAddBlogModal: showModal,
        handleAddNewBlog,
        isNewBlogBeingCreated,
        handleUpdateBlog,
        handleCloseUpdateBlogModal,
        ShowUpdateBlogModal,
        handleSubmitUpdatedBlog,
        blogData

    }

}
