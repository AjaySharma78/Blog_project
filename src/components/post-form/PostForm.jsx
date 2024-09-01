import React, { useCallback,useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        
        if (post) {
            setLoading(true)
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
            setLoading(false)
        } else { 
            setLoading(true)

            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
            setLoading(false)
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
      <form onSubmit={handleSubmit(submit)} className="md:flex flex-wrap ">
         {loading && (
          <div className="w-full absolute bg-white dark:bg-black h-screen flex items-start justify-center ">
            <img
              className="w-[30px]"
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            />{" "}
          </div>
        )}
          <div className="md:w-2/3 px-2">
              <Input
                  label="Title :"
                  placeholder="Title"
                  className=" mb-7 md:mb-4 rounded-sm md:rounded-lg"
                  {...register("title", { required: true })}
              />
              <Input
                  label="Slug :"
                  placeholder="Slug"
                  className="mb-7 md:mb-4 rounded-sm md:rounded-lg"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                      setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                  }}
              />
            
              <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")}/>
             
          </div>
          <div className=" w-full md:w-1/3 px-2 mt-7 md:mt-0">
              <Input
                  label="Featured Image :"
                  type="file"
                  className="mb-4 rounded-sm md:rounded-lg "
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
              />
              {post && (
                  <div className="w-full mb-4">
                      <img
                          src={appwriteService.getFilePreview(post.featuredImage)}
                          alt={post.title}
                          className="rounded-lg"
                      />
                  </div>
              )}
              <Select
                  options={["active", "inactive"]}
                  label="Status"
                  className="mb-4 rounded-sm md:rounded-lg"
                  {...register("status", { required: true })}
              />
              {/* <Select
                  options={["sport", "programming", "music", "lifestyle"]}
                  label="Category"
                  className="mb-4"
                  {...register("category", { required: true })}
              /> */}
              <Button type="submit" bgColor={post ? "bg-green-400 hover:bg-green-500" : "bg-orange-400 hover:bg-orange-500"} className="w-full mt-4 md:mt-6">
                  {post ? "Update" : "Submit"}
              </Button>
          </div>
      </form>
     
  );
}