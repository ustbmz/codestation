import React from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/Issue.module.css'
import { useEffect, useState } from 'react'
import { getIssues } from '../api/issues'
import IssueItem from '../components/IssueItem'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'
import TypeSelect from '../components/TypeSelect'

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
  const { issueTypeId } = useSelector((state) => state.type)

  useEffect(() => {
    async function fetchData() {
      let searchParams = {
        page: pageInfo.currentPage,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      }
      if (issueTypeId !== 'all') {
        searchParams.typeId = issueTypeId
        searchParams.page = 1
      } else {
        searchParams = {
          page: pageInfo.currentPage,
          pageSize: pageInfo.pageSize,
          issueStatus: true,
        }
      }

      const { data } = await getIssues(searchParams)
      setIssues(data.data)
      setTotal(data.total)
    }
    fetchData()
  }, [pageInfo.currentPage, pageInfo.pageSize, issueTypeId])

  let IssueItemList = []
  issues.forEach((item) => {
    IssueItemList.push(<IssueItem key={item._id} issueInfo={item} />)
  })

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
      <PageHeader title="问答列表">
        <TypeSelect />
      </PageHeader>
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}>
          {IssueItemList}
          {issues.length === 0 ? (
            <div className={styles.noIssue}>暂无相关问答</div>
          ) : (
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
          )}
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
