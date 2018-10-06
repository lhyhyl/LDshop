/*
直接更新state的多个方法的对象
* */
import {
  RECEVIE_ADDRESS,
  RECEVIE_CATEGORYS,
  RECEVIE_SHOPS,
  RECEVIE_USER_INFO,
  RESET_USER_INFO,
  RECEVIE_SHOP_GOODS,
  RECEVIE_SHOP_INFO,
  RECEVIE_SHOP_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  EMPTY_CART,
  RECEVIE_SEARCH_SHOP
} from './mutations-types'
import Vue from 'vue'
export default {
  [RECEVIE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEVIE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },
  [RECEVIE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEVIE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },

  //商家信息
  [RECEVIE_SHOP_INFO](state,{shopInfo}){
    state.shopInfo = shopInfo
  },
  //商家评价数组
  [RECEVIE_SHOP_RATINGS](state,{shopRatings}){
    state.shopRatings = shopRatings
  },
  //商家信息
  [RECEVIE_SHOP_GOODS](state,{shopGoods}){
    state.shopGoods = shopGoods
  },

  //增加count值
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){
      //food.count = 1 //新增属性，没有数据绑定
      Vue.set(food,'count',1)
      state.cartFoods.push(food)
      // Vue.set(state.cartFoods,'count',1)

    }else{
      food.count++
    }
  },
  //减少count值
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--
      //如果count为0,移除food
      if(food.count === 0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },

  //执行清空购物车
  [EMPTY_CART](state) {
    state.cartFoods.forEach((cartFood) => {
      // delete cartFood.count
      cartFood.count = 0
    })
    state.cartFoods = []

  },

  //搜索得到的商家
  [RECEVIE_SEARCH_SHOP](state,{searchShops}){
    state.searchShops = searchShops
  },
}
