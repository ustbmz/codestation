import { getAdminList } from '@/services/AdminController';

export default {
  namespace: 'admin',
  state: {
    adminList: [],
    adminInfo: {},
  },
  reducers: {
    initAdminList(state, { payload }) {
      console.log('🦊 > file: adminModel.js:11 > initAdminList > payload:', payload);
      const newState = { ...state };
      newState.adminList = payload;
      return newState
    },
  },
  effects: {
    *_initAdminList(_, { put, call }) {
      console.log('🦊 > file: adminModel.js:19 > *_initAdminList > call');
      // 和服务器通讯
      const { data } = yield call(getAdminList);
      console.log('🦊 > file: adminModel.js:21 > *_initAdminList > data:', data);
      // 调用reducer更新本地仓库
      yield put({
        type: 'initAdminList',
        payload: data,
      });
    },
  },
};
