/*
* 通过mutations间接更新state的多个方法的对象
* */

import {
  RECEVIE_ADDRESS,
  RECEVIE_CATEGORYS,
  RECEVIE_SHOPS,
  RECEVIE_USER_INFO,
  RESET_USER_INFO,
  RECEVIE_SHOP_INFO,
  RECEVIE_SHOP_RATINGS,
  RECEVIE_SHOP_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  EMPTY_CART,
  RECEVIE_SEARCH_SHOP
} from './mutations-types'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings,
  reqSearchShops
} from '../api'
export default {
  //异步获取地址
  async getAddress({commit,state}){
    //发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude

    const result = await reqAddress(geohash)
    //提交一个mutation
    if(result.code === 0){
        const address = result.data
        commit(RECEVIE_ADDRESS,{address})
    }
  },

  //异步获取食品列表
  async getCategorys({commit}){
    //发送异步ajax请求
    const result = await reqCategorys()
    //提交一个mutation
    if(result.code === 0){
      const categorys = result.data
      commit(RECEVIE_CATEGORYS,{categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit,state}){
    //发送异步ajax请求
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    //提交一个mutation
    if(result.code === 0){
      const shops = result.data
      commit(RECEVIE_SHOPS,{shops})
    }
  },

  //同步记录用户信息
  recordUserInfo({commit},userInfo){
    commit(RECEVIE_USER_INFO,{userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      const userInfo = result.data
      commit(RECEVIE_USER_INFO,{userInfo})

    }
  },

  //异步登出
  async logout({commit}){
    const result = await reqLogout()
    if(result.code === 0){
      commit(RESET_USER_INFO)

    }
  },


  //异步获取商家信息
  async getShopInfo({commit},fn){
    const result = await reqShopInfo()
    if(result.code === 0){
      const shopInfo = result.data
      commit(RECEVIE_SHOP_INFO,{shopInfo})
      //数据更新后通知组件
      fn && fn()
    }
  },
  //异步获取商家评价数组
  async getShopRatings({commit},fn){
    const result = await reqShopRatings()
    if(result.code === 0){
      const shopRatings = result.data
      commit(RECEVIE_SHOP_RATINGS,{shopRatings})
      //数据更新后通知组件
      fn && fn()
    }
  },
  //异步获取商家食品数组
  async getShopGoods({commit},fn){
    const result = await reqShopGoods()
    if(result.code === 0){
      const shopGoods = result.data
      commit(RECEVIE_SHOP_GOODS,{shopGoods})
      //数据更新后通知组件
      fn && fn()
    }
  },

  //同步更新food里count值
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})

    }else {
      commit(DECREMENT_FOOD_COUNT,{food})

    }
  },

  //清空购物车
  emptyCart({commit}){
    commit(EMPTY_CART)
  },

  //搜索商家
  async searchShops({commit,state},shopName){
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShops(geohash,shopName)
    if(result.code === 0){
      const searchShops = result.data
      commit(RECEVIE_SEARCH_SHOP,{searchShops})
    }
  }

}
