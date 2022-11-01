import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import client from "../apollo";
import { GET_SUBREDDIT_BY_TOPIC, GET_POSTS } from "../graphql/queries";
import toast from "react-hot-toast";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type Props = {
  subreddit?: string;
};

const PostBox = ({ subreddit }: Props) => {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_POSTS, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const [imageBoxOpen, setImageBoxOpen] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    if (!session?.user?.name) {
      toast.error("Please login to continue!");
      return;
    }
    const notification = toast.loading("Creating new post...");
    try {
      // Query for subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const doSubredditExist = !!getSubredditListByTopic.length;
      let subredditId;

      if (!doSubredditExist) {
        // Create subreddit
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });
        subredditId = newSubreddit.id;
      } else {
        subredditId = getSubredditListByTopic[0].id;
      }

      const image = formData.postImage || "";

      const {
        data: { insertPost: newPost },
      } = await addPost({
        variables: {
          body: formData.postBody,
          image,
          subreddit_id: subredditId,
          title: formData.postTitle,
          username: session?.user?.name,
        },
      });

      // Reset the form
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subreddit", "");
      toast.success("New post created!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Oops! something went wrong");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-40 bg-white border rounded-md border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in p/${subreddit}`
                : "Create Post"
              : "Log in to post"
          }
          disabled={!session}
          className="rounded-md flex-1 bg-gray-50 p-2 pl-5 outline-none"
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 cursor-pointer text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("subreddit", { required: true })}
                type="text"
                placeholder="i.e. reactjs"
              />
            </div>
          )}
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("postImage")}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {/* Errors */}
          {!!Object.keys(errors).length && (
            <div className="space-y-2 p-2 text-red-500">
              {errors?.postTitle?.type === "required" && (
                <p>- A post title is required</p>
              )}
              {errors?.subreddit?.type === "required" && (
                <p>- Subreddit title is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
