import { UserContext } from '../context';
import { useContext } from 'react';
import ParallaxBG from '../components/cards/ParallaxBG';
import axios from 'axios';
// import { posts } from '../../server/controllers/post';
import Post from '../components/cards/Post';
import Head from 'next/head';
import Title from 'antd/lib/skeleton/Title';

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

  const head = () => {
    <Head>
      <title> KONEKT - Fashion Evolution For MineCraft </title>
      <meta name='description' content='dekh lenge baad me' />
      <meta property='og:description' content='dekh lenge baad me' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='KONEKT' />
      <meta property='og:url' content='http://konekt.com' />
      <meta
        property='og:image:secure_url'
        content='http://konekt.com/images/default.jpg'
      />
    </Head>;
  };
  return (
    <>
      {head()}
      <ParallaxBG url='/images/default.jpg' />
      {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
      <div className='container'>
        <div className='row pt-5 '>
          {posts.map((post) => (
            <div className='col-md-4'>
              <Post key={post._id} post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get('/posts');
  //   console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
