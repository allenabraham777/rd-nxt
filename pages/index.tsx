import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reddit NextJS - Clone</title>
      </Head>

      {/* Post box */}
      <PostBox/>
    </div>
  )
}

export default Home
