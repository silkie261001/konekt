import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../../../components/forms/PostForm';
import PostList from '../../../components/cards/PostList';
import { toast } from 'react-toastify';

const EditPost = () => {
  const [post, setPost] = useState({});

  //state
  const [content, setContent] = useState('');
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  // console.log('router',router);
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit post to default",content , image);
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      if (data.err) {
        toast.error(data.err);
      } else {
        toast.success('Post updated');
        router.push('/user/dashboard');
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
  // console.log(_id);
  return (
    // <UserRoute>
    <div className='container-fluid'>
      <div className='row py-5 text-light bg-default-image'>
        <div className='col text-white text-center '>
          <h1 className='regg'>Fashion Feed</h1>
        </div>
      </div>
      <div className='row py-3'>
        <div className='col-md-8 offset-md-2'>
          <PostForm
            content={content}
            setContent={setContent}
            postSubmit={postSubmit}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
        </div>
      </div>
    </div>
    // </UserRoute>
  );
};

export default EditPost;
