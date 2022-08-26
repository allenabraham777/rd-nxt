import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import SubredditRow from "../components/SubredditRow";
import { GET_SUBREDDIT_LIST_WITH_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
  const { data: topCommunitiesData } = useQuery(GET_SUBREDDIT_LIST_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });

  const topCommunities: Subreddit[] =
    topCommunitiesData?.getSubredditListWithLimit;
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit NextJS - Clone</title>
      </Head>

      {/* Post box */}
      <PostBox />

      <div className="flex">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {topCommunities?.map((community, index) => (
              <SubredditRow key={community.id} topic={community.topic} index={index}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
