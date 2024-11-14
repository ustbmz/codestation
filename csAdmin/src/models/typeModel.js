import { getTypes } from '@/services/TypeController';

export default {
  namespace: 'type',
  state: {
    typeList: [],
  },
  reducers: {
    initTypeList(state, { payload }) {
      const newState = { ...state };
      newState.typeList = payload;
      return newState;
    },
    // addAdmin(state, { payload }) {
    //   const newState = { ...state };
    //   newState.adminList.push(payload);
    //   return newState;
    // },
    // delAdmin(state, { payload }) {
    //   const newState = { ...state };
    //   const index = newState.adminList.indexOf(payload);
    //   const arr = [...newState.adminList];
    //   arr.splice(index, 1);
    //   newState.adminList = arr;
    //   return newState;
    // },
    // editAdmin(state, { payload }) {
    //   const newState = { ...state };
    //   console.log(
    //     '🦊 > file: adminModel.js:25 > editAdmin > newState:',
    //     newState,
    //   );
    //   newState.adminList.forEach((item) => {
    //     for (const key in payload) {
    //       if (item._id === payload._id) {
    //         item[key] = payload[key];
    //       }
    //     }
    //   });
    //   return newState;
    // },
  },
  effects: {
    *_initTypeList(_, { put, call }) {
      // 和服务器通讯
      const { data } = yield call(getTypes);
      console.log(
        '🦊 > file: adminModel.js:21 > *_initAdminList > data:',
        data,
      );
      // 调用reducer更新本地仓库
      yield put({
        type: 'initTypeList',
        payload: data,
      });
    },

    // *_deleteAdmin({ payload }, { put, call }) {
    //   // 和服务器通讯
    //   yield call(delAdmin, payload._id);
    //   // 调用reducer更新本地仓库
    //   yield put({
    //     type: 'delAdmin',
    //     payload,
    //   });
    // },
    // *_editAdmin({ payload }, { put, call }) {
    //   // 和服务器通讯
    //   yield call(editAdmin, payload);
    //   // 调用reducer更新本地仓库
    //   yield put({
    //     type: 'editAdmin',
    //     payload,
    //   });
    // },
    // *_addAdmin({ payload }, { put, call }) {
    //   // 和服务器通讯
    //   const { data } = yield call(addAdmin, payload);
    //   // 调用reducer更新本地仓库
    //   yield put({
    //     type: 'addAdmin',
    //     payload: data,
    //   });
    // },
  },
};
