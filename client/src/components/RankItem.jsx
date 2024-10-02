import React from 'react'
import styles from '../css/ScoreItem.module.css'
import { Avatar } from 'antd'

function RankItem(props) {
  const { rank } = props

  let rankDiv = <div className="rank">{props.rank + 1}</div>
  switch (rank) {
    case 0:
      rankDiv = (
        <div className="iconfont icon-jiangbei" style={{ color: 'Gold' }}></div>
      )
      break
    case 1:
      rankDiv = (
        <div
          className="iconfont icon-jiangbei"
          style={{ color: 'Silver' }}
        ></div>
      )
      break
    case 2:
      rankDiv = (
        <div
          className="iconfont icon-jiangbei"
          style={{ color: 'Copper' }}
        ></div>
      )
      break
    default:
      break
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
              <div style={{
            width: '22px',
            height: '30px',
            lineHeight: '30px',
            textAlign: 'center',
        }}>{rankDiv}</div>
        <div className={styles.avatar}>
          <Avatar size="small" src={props.rankInfo.avatar} />
        </div>
        <div className={styles.nickName}>{props.rankInfo.nickname}</div>
      </div>
      <div className={styles.right}>{props.rankInfo.points}</div>
    </div>
  )
}

export default RankItem
