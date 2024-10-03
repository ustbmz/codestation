import React, { useEffect, useState } from 'react'
import { getInterviewTitleAsync } from '../redux/interviewSlice'
import { getInterviewById } from '../api/interview'
import { getTypeList } from '../redux/typeSlice'
import styles from '../css/Interview.module.css'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { Tree, BackTop } from 'antd'
function Interviews(props) {
  const { interviewTitleList } = useSelector((state) => state.interview)
  const { typeList } = useSelector((state) => state.type)
  const [treeData, setTreeData] = useState([])
  const [interviewInfo, setInterViewInfo] = useState({})

  const dispath = useDispatch()

  const handleClick = (id) => {
    console.log('🐤 ≂ handleClick:', id)
    getInterviewById(id).then((res) => {
      console.log('🐤 ≂ res:', res)
      setInterViewInfo(res.data)
    })
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  useEffect(() => {
    if (!interviewTitleList.length) {
      dispath(getInterviewTitleAsync())
    }
    if (!typeList.length) {
      dispath(getTypeList())
    }
    if (typeList.length !== 0 && interviewTitleList.length !== 0) {
      const arr = []

      typeList.forEach((item, index) => {
        arr.push({
          title: <h3 style={{ fontWeight: '200' }}>{item.typeName}</h3>,
          key: index,
        })
      })
      console.log('🐤 ≂ interviewTitleList:', interviewTitleList)

      for (let i = 0; i < interviewTitleList.length; i++) {
        const childArr = []
        for (let j = 0; j < interviewTitleList[i].length; j++) {
          childArr.push({
            title: (
              <h4
                style={{ fontWeight: '200' }}
                onClick={() => {
                  handleClick(interviewTitleList[i][j]._id)
                }}
              >
                {interviewTitleList[i][j].interviewTitle}
              </h4>
            ),
            key: `${i}-${j}}`,
          })
        }
        arr[i].children = childArr
      }
      console.log('🐤 ≂ arr:', arr)
      setTreeData(arr)
    }
  }, [interviewTitleList, typeList])

  return (
    <div className={styles.container}>
      <PageHeader title="面试题大全" />
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          <div className={styles.interviewLeftTitle}>
            <Tree
              className="draggable-tree"
              showLine
              treeData={treeData}
              onSelect={onSelect}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <h1 className={styles.interviewRightTilte}>
              {interviewInfo.interviewTitle}
            </h1>
            <div styles={styles.contextContainer}>
              <div
                dangerouslySetInnerHTML={{
                  __html: interviewInfo.interviewContent,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <BackTop />
    </div>
  )
}

export default Interviews
