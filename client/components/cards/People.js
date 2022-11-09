import { Avatar, List } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { UserContext } from '../../context';
import { useContext } from 'react';

// import user from '../../../server/models/user';

const People = ({ people, handleFollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return '/images/default.jpg';
    }
  };
  return (
    <>
      <List
        itemLayout='horizontal'
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className='d-flex justify-content-between '>
                  {user.name}{' '}
                  <span
                    onClick={() => handleFollow(user)}
                    className='text-primary pointer'
                  >
                    Follow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
