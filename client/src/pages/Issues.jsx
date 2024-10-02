import React from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/Issue.module.css'
import { useEffect, useState } from 'react'
import { getIssues } from '../api/issues'
import IssueItem from '../components/IssueItem'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'

import { Pagination, Button, message } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Issues(props) {
  const [issues, setIssues] = useState([])
  // 页码
  const [pageInfo, setPageInfo] = useState({
    currentPage: '1',
    pageSize: 10,
  })
  // 问答总数
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const { isLogin } = useSelector((state) => state.user)

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssues({
        page: pageInfo.currentPage,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      })
      console.log('🐤 ≂ data:', data)
      setIssues(data.data)
      setTotal(data.total)
    }
    fetchData()
  }, [pageInfo.currentPage, pageInfo.pageSize])

  let IssueItemList = []
  issues.forEach((item) => {
    IssueItemList.push(<IssueItem key={item._id} issueInfo={item} />)
  })

  // const onShowSizeChange = (current, pageSize) => {
  //   console.log(current, pageSize)
  //   setPageInfo({
  //     currentPage: current,
  //     pageSize: pageSize,
  //     issueStatus: true,
  //   })
  // }

  const onChange = (current, pageSize) => {
    console.log('~ onChange', current, pageSize)
    if (current !== pageInfo.currentPage || pageSize !== pageInfo.pageSize) {
      // setIssues([])
      setPageInfo({
        currentPage: current,
        pageSize: pageSize,
        issueStatus: true,
      })
    }
  }

  function AddIssue() {
    console.log('🐤 ≂ AddIssue:', isLogin)
    if (isLogin) {
      console.log('🐤 ≂ isLogin:', isLogin)
      navigate('/addIssue')
    } else {
      message.warn('请先登陆')
    }
  }

  return (
    <div className={styles.container}>
      <PageHeader title="问答列表" />
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}>
          {IssueItemList}
          <div className="paginationContainer">
            <Pagination
              current={pageInfo.currentPage}
              total={total}
              pageSize={pageInfo.pageSize}
              // onShowSizeChange={onChange}
              onChange={onChange}
              showSizeChanger
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <Button
            type="primary"
            size="large"
            style={{
              marginBottom: '30px',
              width: '100%',
            }}
            onClick={() => {
              AddIssue()
            }}
          >
            我要提问
          </Button>
          <Recommend />
          <ScoreRank />
        </div>
      </div>
    </div>
  )
}

export default Issues
