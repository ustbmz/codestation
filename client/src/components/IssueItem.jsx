import { useState, useEffect } from 'react'
import styles from '../css/IssueItem.module.css'
import { formatDate } from '../utils/index'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeList } from '../redux/typeSlice'
import { Tag } from 'antd'
import { getUserById } from '../api/user'
import { useNavigate } from 'react-router-dom'
function IssueItem(props) {
  const [userInfo, setUserIfno] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const typeList = useSelector((state) => state.type.typeList)
  const colorArr = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]

  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())

      const getUserInfo = async function () {
        let { data } = await getUserById(props.issueInfo.userId)
        setUserIfno(data)
      }

      getUserInfo()
    }
  }, [])

  const type = typeList?.find((item) => item._id === props.issueInfo.typeId)

  const hanldClick = (id) => {
    navigate(`/issues/${id}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.issueNum}>
        <div className={styles.commentNumber}>
          {props.issueInfo.commentNumber}
        </div>
        <div>回答</div>
      </div>
      <div className={styles.issueNum}>
        <div className={styles.scanNumber}>{props.issueInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      <div className={styles.issueContainer}>
        <div className={styles.top} onClick={()=>{
          hanldClick(props.issueInfo._id)
        }}>{props.issueInfo.issueTitle}</div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            {/* <Tag>{type.typeName}</Tag> */}
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
              {type ? type.typeName : null}
            </Tag>
          </div>
          <div className={styles.right}>
            <Tag color="blue">{userInfo.nickname}</Tag>
            <span>{formatDate(props.issueInfo.issueDate, 'year')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueItem
