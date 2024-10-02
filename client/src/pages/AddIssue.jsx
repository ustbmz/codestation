import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Input, Select, message } from 'antd'
import styles from '../css/AddIssue.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTypeList } from '../redux/typeSlice'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { addIssue } from '../api/issues'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

function AddIssuePage(props) {
  const FormRef = useRef()
  const editorRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { typeList } = useSelector((state) => state.type)
  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
  }, [])

  const [issueInfo, setIssueInfo] = useState({
    issueTitle: '',
    typeId: '',
    userId: '123',
    issueContent: '',
  })

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
  }

  const onFinish = (data) => {
    console.log('🐤 ≂ data:', data.issueTitle)
    console.log('🐤 ≂ data:', data.typeId)

    console.log('editorRef', editorRef)
    const content = editorRef.current.getInstance().getHTML()
    let issue = {
      issueTitle: data.issueTitle,
      typeId: data.typeId,
      userId: userInfo._id,
      issueContent: content,
    }

    console.log('editorRef', issue)

    addIssue(issue).then((res) => {
      console.log('~ res', res)
      if (res) {
        navigate('/')
        message.success('您的问题已经提交，审核通过后，将会进行展示')
      }
    })
  }

  const onChange = (value, key) => {
    console.log('~ onChange', value)
    const newIssueInfo = { ...issueInfo, [key]: value }
    console.log('🐤 ≂ newIssueInfo:', newIssueInfo)
    // newIssueInfo[key] = value
    setIssueInfo(newIssueInfo)
  }

  const handleChange = (option) => {
    console.log('~ onChange', option)
    const newIssueInfo = { ...issueInfo }
    newIssueInfo.typeId = option
    console.log('🐤 ≂ newIssueInfo:', newIssueInfo)
    setIssueInfo(newIssueInfo)
  }

  let opetions = []

  if (typeList?.length) {
    typeList.map((item) =>
      opetions.push(
        <Option value={item._id} key={item._id}>
          {item.typeName}
        </Option>
      )
    )
  }

  return (
    <div className={styles.container}>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        ref={FormRef}
        style={{ maxWidth: 1200 }}
      >
        <Form.Item
          name={'issueTitle'}
          label="标题"
          rules={[{ required: true, message: 'Please input your Title!' }]}
        >
          <Input placeholder="请输入标题" size="large" />
        </Form.Item>
        <Form.Item
          name={'typeId'}
          label="问题分类"
          rules={[
            {
              required: true,
              message: 'Please choose your question type!',
            },
          ]}
        >
          <Select
            style={{
              width: '30%',
            }}
            size="large"
            // onChange={handleChange}
          >
            {opetions}
          </Select>
        </Form.Item>
        <Form.Item
          name={'content'}
          label="问题描述"
          rules={[
            {
              required: true,
              message: 'Please choose your question content!',
            },
          ]}
        >
          <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            language={'zh-CN'}
            useCommandShortcut={true}
            ref={editorRef}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
          <Button type="primary" htmlType="submit">
            提交问题
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddIssuePage
