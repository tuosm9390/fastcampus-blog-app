import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import { PostProps } from "./PostList";


export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null)
  // paramsType 지정 => id에 접근 불가
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id)
      const docSnap = await getDoc(docRef)

      setPost({ id: docSnap.id, ...docSnap.data() as PostProps })
    }
  }

  const handleDelete = () => {
    console.log('delete')
  }

  useEffect(() => {
    if (params?.id) getPost(params?.id)
  }, [params?.id])

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__profile"></div>
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__utils-box">
              <div className="post__delete" onClick={handleDelete}>삭제</div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
            </div>
            <div className="post__text post__text--pre-wrap">
              {post?.content}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  )
}