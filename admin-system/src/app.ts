// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '疯狂的吉吉' };
}

export const layout = () => {
  return {
    logo: 'https://s2.loli.net/2024/10/28/xMDcGBypClXItV8.png ',
    menu: {
      locale: false,
    },
  };
};
