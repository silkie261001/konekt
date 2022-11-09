import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';
import UserRoute from '../../components/routes/UserRoute';
import PostForm from '../../components/forms/PostForm';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostList from '../../components/cards/PostList';
import People from '../../components/cards/People';
import Link from 'next/Link';
import { Modal } from 'antd';
import CommentForm from '../../components/forms/CommentForm';
// import { imageSource } from '../../functions';
// import { findPeople } from '../../../server/controllers/auth';

const Home = () => {
  const [state, setState] = useContext(UserContext);
  //state
  const [content, setContent] = useState('');
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  //posts
  const [posts, setPosts] = useState([]);

  //people
  const [people, setPeople] = useState([]);

  //comments
  const [comment, setComment] = useState('');
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  //route
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      fashionFeed();
      findPeople();
    }
  }, [state && state.token]);

  const fashionFeed = async () => {
    try {
      const { data } = await axios.get('/fashion-feed');
      // console.log('user posts =>' ,data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async (req, res) => {
    try {
      const { data } = await axios.get('/find-people');
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault(); // so that page does not reload
    // console.log("post => ", content);
    try {
      const { data } = await axios.post('/create-post', { content, image });
      console.log('create data response => ', data);
      if (data.error) {
        toast.error(data.error);
      } else {
        fashionFeed();
        toast.success('Post Created');
        setContent('');
        setImage({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    // formData.append('content',content);
    // console.log([...formData]);
    setUploading(true);

    try {
      const { data } = await axios.post('/upload-image', formData);
      // console.log("uploaded image =>",data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm('Are you sure?');
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error('Post deleted');
      fashionFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    // console.log('add ', user);
    try {
      const { data } = await axios.put('/user-follow', { _id: user._id });
      // console.log('handle ', data);
      // update local strorage and update user
      let auth = JSON.parse(localStorage.getItem('auth'));
      auth.user = data;
      localStorage.setItem('auth', JSON.stringify(auth));

      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);

      // rerender the post
      fashionFeed();
      toast.success(`following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    // console.log('like this post ', _id);
    try {
      const { data } = await axios.put('/like-post', { _id });
      // console.log('liekd', data);
      fashionFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    // console.log('unlike this post ', _id);
    try {
      const { data } = await axios.put('/unlike-post', { _id });
      // console.log('unliekd', data);
      fashionFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log('add comment', currentPost._id);
    // console.log('comment', comment);
    try {
      const { data } = await axios.put('/add-comment', {
        postId: currentPost._id,
        comment,
      });
      console.log('add comment', data);
      setComment('');
      setVisible(false);
      fashionFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async () => {
    //
  };

  return (
    // <UserRoute>
    <div className='container-fluid'>
      <div className='row py-5 text-light bg-default-image'>
        <div className='col text-white text-center '>
          <h1 className='regg'>Fashion Feed</h1>
        </div>
      </div>
      <div className='row py-3'>
        <div className='col-md-8'>
          <PostForm
            content={content}
            setContent={setContent}
            postSubmit={postSubmit}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
          <br />
          <PostList
            posts={posts}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
          />
        </div>

        {/* <pre>{JSON.stringify(posts,null,4)} </pre> */}
        <div className='col-md-4'>
          {state && state.user && state.user.following && (
            <Link href={`/user/following`}>
              <a className='h6'>{state.user.following.length} Following</a>
            </Link>
          )}
          <People people={people} handleFollow={handleFollow} />
        </div>
      </div>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title='comment'
        footer={null}
      >
        <CommentForm
          comment={comment}
          setComment={setComment}
          addComment={addComment}
        />
      </Modal>
    </div>
    // </UserRoute>
  );
};

export default Home;
