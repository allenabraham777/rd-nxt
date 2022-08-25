import type { NextPage } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import PostBox from "../components/PostBox";

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Toaster/>
      <Head>
        <title>Reddit NextJS - Clone</title>
      </Head>

      {/* Post box */}
      <PostBox />
    </div>
  );
};

export default Home;
