import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Comment, Form, Button, List, Tooltip } from 'antd'
import { Editor } from '@toast-ui/react-editor'
import { getIssueComment } from '../api/comment'
import { formatDate} from '../utils'

function Discuss(props) {
  console.log('🐤 ≂ props:', props)
  const { userInfo, isLogin } = useSelector((state) => state.user)
  const [commenList, setCommentList] = useState([])
  const editorRef = useRef()
  let avatar = null
  if (isLogin) {
    avatar = (
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN8c2Ssyje5l-n4AYBloG2sjM-v3Rf8vmzVA&s" />
    )
  } else {
    avatar = (
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUem1ykMgZrm7P2GNRhID1fnipTWf1kQ1dA&s" />
    )
  }

  useEffect(() => {
    async function fetchData() {
      if (props.targetId) {
        const { data } = await getIssueComment(props.targetId)
        console.log('🐤 getIssueComment ≂ result:', data)
        setCommentList(data?data:[])
      }
    }
    fetchData()
  }, [props.targetId])

  return (
    <div>
      <Comment
        avatar={avatar}
        content={
          <>
            <Form.Item>
              <Editor
                initialValue=""
                previewStyle="vertical"
                height="300px"
                initialEditType="wysiwyg"
                language={'zh-CN'}
                useCommandShortcut={true}
                ref={editorRef}
              />
            </Form.Item>
            <Form.Item>
              <Button disabled={isLogin ? false : true} type="primary">
                提交评论
              </Button>
            </Form.Item>
          </>
        }
      ></Comment>
      {commenList.length > 0 && (
        <List
          header="当前评论"
          dataSource={commenList}
          renderItem={(item) => (
            <Comment
              avatar={avatar}
              author={item.userInfo.nickname}
              content={
                <div
                  dangerouslySetInnerHTML={{ __html: item.commentContent }}
                ></div>
              }
              datetime={
                <Tooltip title={formatDate(item.commentDate)}>
                  <span>{formatDate(item.commentDate)}</span>
                </Tooltip>
              }
            />
          )}
        ></List>
      )}
    </div>
  )
}

export default Discuss
