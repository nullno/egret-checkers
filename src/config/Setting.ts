/*
游戏设置
 */

class Setting {
      // static Language = Language.zh_CN;//语言设置
      static Debug = location.search.indexOf('dev') !== -1 ?true:false; //调试模式
      static env = location.search.indexOf('dev') !== -1 ? 'dev' : 'pro';   // 环境配置（开发环境时，url后加上?dev=1）
}