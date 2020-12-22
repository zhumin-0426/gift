1.	获取首页
请求路径：http://192.168.1.161:8080/IntegralShop/before/index/getIndexList
参数：无
Json数据：
bannerlis: 轮播图集合
bannerBelongCommodityId: 商品id  
		bannerPic:  图片路径
		
lconlist : 图标集合 
			iconurllist: 图标路径集合
			commodityKindlist: ,
				imgUrl: 图标片路径,
				urlLink: 图标,
				urlName:图标名称
     recommendlist :推荐集合
recommendColor：颜色代码
recommendPic：推荐图片
saleslist：促销集合
salesPic：促销图片
linklist：底部链接集合
title：标题
titleDesc：描述
commoditylist：商品集合
commodityName：商品名称
salnum：已兑换数
logo:商家logo
defaultScore:积分
2.	获取用户
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/getUser
参数：
idNum 用户账号
Json数据：
getuser: 用户对象
usersPhone 手机号码
3.	获取商品类型
请求路径：http://192.168.1.161:8080/IntegralShop/before/commodity/getAllCommodityKind
参数：
min:积分起点
max：积分止点
commodityName：积分购物
Json数据：
allKind：左边类别集合
urlName：名称
commodityKindlist：顶部列表集合
kindName：顶部名称
commoditylist：商品集合
commodityDescribe:商品描述
defaultScore：积分
salnum：已领	
maxNumber:限量
4.	获取商品详情
请求路径：http://192.168.1.161:8080/IntegralShop/before/commodity/getCommodity
参数：
id:商品id
Json数据：
commodityById：商品对象
Imglist：轮播图片集合
imgUrl：图片路径
commodityDescribe：商品描述
commodityDetail：商品详情（编辑内容）
kindName：顶部名称
commodityDescribe:商品描述
defaultScore：积分
salnum：已领	
maxNumber:限量
leftNum：剩余数量
总数：已领+剩余数量
5.	获取商品型号
请求路径：http://192.168.1.161:8080/IntegralShop/before/commodity/getCommodityModel
参数：
belongCommodityId:商品id
commoditydesc： 商品描述
Json数据：
modelList：商品型号集合
modelName：型号名称
childrenlist：子类型号集合
id:子型号id
modelName：子类型号名称
secondlist：参数集合
commodityArgVO:参数对象
score：积分
6.	获取用户收藏
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/getUserCollect
参数：无
Json数据：
status:success成功 ,nousers(用户不存在，异常) 
userCollectByList：商品收藏集合
isgood:用户是否已点赞（大于0是，小于等于0否）
commodityVO：商品对象
logo:商家logo
salnum：已领数
goodcount：已点赞人数
Imglist:图片集合
imgUrl:图片路径
7.	保存用户收藏
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/saveUserCollect
参数：
collectCommodityId:商品id
Json数据：
status:success
8.	保存用户点赞
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/setCollectGood
参数：
collectCommodityId:商品id
Json数据：
status:success
9.	获取用户足迹
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/getCommodityCollect
参数：无
Json数据：
status:success成功 ,nousers(用户不存在，异常) 
commodityCollectByList：用户足迹集合
supperLogo;//商家logo
supperName;//商家名称
commoditylist:商品集合
defaultScore:商品积分
commodityName:商品名
imglist:图片集合
imgUrl:图片路径
10.	获取用户关注
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/getUserFollow
参数：无
Json数据：
status:success成功 ,nousers(用户不存在，异常) 
usersFollowByList：用户足迹集合
supperLogo;//商家logo
supperName;//商家名称
commoditylist:商品集合
defaultScore:商品积分
commodityName:商品名
imglist:图片集合
imgUrl:图片路径
11.	关注商家
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/saveFollow
参数：followSupperId 商家id
Json数据：
status:success成功 ,nousers(用户不存在，异常) 
12.	获取用户地址列表
请求路径：http://192.168.1.161:8080/IntegralShop/before/address/getUsersAddressList
参数：无
Json数据：
status:success成功 ,nousers(用户不存在，异常) 
usersAddressByList：用户地址集合
Id: 地址id
addressDetail; 详细地址
	addressPhone; 手机号
	addressUsername; 用户名
	addressProvice; 省
	addressCity; 市
	addressArea; 区
	addressIsDefault; 是否默认（1是、2否）
13.	获取用户地址id
请求路径：http://192.168.1.161:8080/IntegralShop/before/address/getUsersAddressList
参数：id 地址id
Json数据：
status :success	(成功) 状态 
usersAddressById：用户地址(对象)
addressDetail; 详细地址
	addressPhone; 手机号
	addressUsername; 用户名
	addressProvice; 省
	addressCity; 市
	addressArea; 区
addressProviceCode; 省编号
	addressCityCode; 市编号
	addressAreaCode; 区编号
	addressIsDefault; 是否默认（1是、2否）
14.	保存/更新 用户地址
请求路径：http://192.168.1.161:8080/IntegralShop/before/address/saveUsersAddress
参数：id: 地址id（更新时用到，新添加不用到）
addressDetail; 详细地址
	  addressPhone; 手机号
	  addressUsername; 收货人名称
addressProvice; 省
	  addressCity; 市
	  addressArea; 区
addressProviceCode; 省编号
	  addressCityCode; 市编号
	  addressAreaCode; 区编号
  addressIsDefault; 是否默认（1是、2否）
Json数据：
status :success	(成功) nouser(用户不存在，异常)

15.	删除用户地址
请求路径：http://192.168.1.161:8080/IntegralShop/before/address/delUsersAddress
参数：id: 地址id
Json数据：
status :success	(成功) 状态
16.	购物车列表
请求路径：http://192.168.1.161:8080/IntegralShop/before/commodity/getShopCarList
参数：无
Json数据：
status :success	(成功) nouser(用户不存在，异常)
usersShopCarByList：
supperId:商家id
supperLogo：商家logo
supperName:商家名称
carnum:数量
Commoditylist
shopCarId ：购物车id
id:商品id
commodityName :商品名称
commodityDescribe ：描述
commodityType: 商品购买方式(1积分、2付款、3积分+付款)
carNum:购物车商品数量
commodityArgVO：参数对象
argmoney (价格/100)
modelname 选购产品型号
score:积分
imgUrl图片路径
promotelist:促销集合
promoteTitle :促销标题
promoteCondition:促销条件
promoteDiscount:促销优惠
17.	保存购物车
请求路径：http://192.168.1.161:8080/IntegralShop/before/commodity/saveShopCar
参数：belongCommodityId; //所属商品id
	  belongArgId; //规格参数id
	  belongSupperId; //商家id
Json数据：
status :success	(成功) nouser(用户不存在，异常)
18.	更新购物车数量
请求路径：http://192.168.1.161:8080/IntegralShop/before/commodity/updateShopCarNum
参数：
id; //购物车id
	  carNum; //数量
Json数据：
status :success	(成功) nouser(用户不存在，异常)
19.	充值记录列表 
请求路径：http://192.168.1.161:8080/IntegralShop/before/changer/getChangerRecordList
参数：
selDate 时间（选填）
Json数据：
status :success	(成功) nouser(用户不存在，异常)
changerRecordByList 记录列表
changerValue：金额
changerKind:充值类型（字段为空是首行月份）
selDate 日期
usersVO:用户对象
wx_head_portrait 用户头像
userNinkname 用户呢称
20.	积分记录列表
请求路径：http://192.168.1.161:8080/IntegralShop/before/score/getScoreRecordList
参数：
Json数据：
status :success	(成功) nouser(用户不存在，异常)
scoreRecordByList 积分记录列表
payValue支付积分
getValue 获取积分（有值的是首行月份）
user_heard:用户头像
getdate日期
21.	赠送/支付 积分
请求路径：http://192.168.1.161:8080/IntegralShop/before/score/giveScore
参数：
payValue 赠送/支付多少分的
fromUserid 赠送/支付给那个用户的id
Json数据：
status :success	(成功) nouser(用户不存在，异常)
22.	保存订单
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/saveOrder
参数：
{
"area":区名称,
"provinct":省名称,
"city":市名称,
"provinctcode":省编号,
"citycode":市编号,
"areacode":区编号,
"freightprice":运费*100,
"totalmoney":订单总金额*100,
“orderPayMoney”实际支付金额*100
“orderTotalScore”订单积分
“orderFreeMoney”优惠总金额*100
"address":详细地址
"username":用户名
"userphone":手机号
“supperid”商家id
commoditylist:[ //购买的商品集合
{"argname":选择型号名,
"argid":型号id
"belongcommodityid":商品id
"detailname":商品名称1
"detailnumber":购买的商品数量,
"detailPromoteId"：商品的促销id(选填)}
]
}  //json数据（按商家区分）
Json数据：
status :success	(成功) nouser(用户不存在，异常)
orderids 订单id（多个或一个id,逗号隔开）
23.	获取评论标签
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/getOrderLabelsList
参数：
labelType：星数（1-5）
Json数据：
status :success	(成功) ,nouser(用户不存在，异常)
24.	保存用户订单评论
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/saveOrderComment
参数：
commentLabelid 标签id,
commentPic 图片（base64格式，多张逗号隔开）
belongOrderId 所属订单id

Json数据：
status :success	(成功) 
25.	获取订单列表
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/getOrderList
参数：无
Json数据：
commodityOrderByList 订单列表
"id": 订单id,
"orderArea": 区名,
"orderCheckStatu": 审核状态（1待审核、2已通过、3未通过）,
"orderCity": 市名,
"orderDeliverStatus": 发货状态（1待发货、2已发货）,
"orderPayStatus":支付状态（1待支付(待兑换)、2已支付(已兑换),
"orderProvinct":省名,
"orderAddress": 订单详细地址,
"orderTotalMoney": 订单金额,
"orderTotalScore":订单支付积分,
"orderUserName":用户名,
"orderUserPhone": 手机,			
"orderPayMoney": 订单支付金额,		
orderdetallist 商品列表
commodityVO:商品对象
"commodityDescribe": 商品描述,
"id": 商品id,
"imglist": 图片集合
	"imgUrl": 图片路径,
promotelist 促销集合
promoteTitle 促销标题
promoteDiscount 促销金额
"detailArgName": 型号名称,
"detailBelongCommodityId": 商品id,
"detailName": "商品名称",
"detailNumber": 购物数量,
"detailPic": 型号图片,
status :success	(成功) nouser(用户不存在，异常)
26.	获取订单详情id
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/getOrder
参数：
Id: 订单id
Json数据：
commodityOrderById 订单对象
"id": 订单id,
"orderArea": 区名,
"orderCheckStatu": 审核状态（1待审核、2已通过、3未通过）,
"orderCity": 市名,
"orderDeliverStatus": 发货状态（1待发货、2已发货）,
"orderPayStatus":支付状态（1待支付(待兑换)、2已支付(已兑换),
"orderProvinct":省名,
"orderAddress": 订单详细地址,
"orderTotalMoney": 订单金额,
"orderTotalScore":订单支付积分,
"orderUserName":用户名,
"orderUserPhone": 手机,			
"orderPayMoney": 订单支付金额,		
orderdetallist 商品列表
commodityVO:商品对象
"id": 商品id,
"commodityDescribe": 商品描述,
"imglist": 图片集合
	"imgUrl": 图片路径,
promotelist 促销集合
promoteTitle 促销标题
promoteDiscount 促销金额
"detailArgName": 型号名称,
"detailBelongCommodityId": 商品id,
"detailName": "商品名称",
"detailNumber": 购物数量,
"detailPic": 型号图片,
status :success	(成功) nouser(用户不存在，异常)
27.	确认收货
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/configShop
参数：
id: 订单id，

Json数据：
commodityOrderById 订单对象
"id": 订单id,
"orderArea": 区名,
"orderCheckStatu": 审核状态（1待审核、2已通过、3未通过）,
"orderCity": 市名,
"orderDeliverStatus": 发货状态（1待发货、2已发货）,
"orderPayStatus":支付状态（1待支付(待兑换)、2已支付(已兑换),
"orderProvinct":省名,
"orderAddress": 订单详细地址,
"orderTotalMoney": 订单金额,
"orderTotalScore":订单支付积分,
"orderUserName":用户名,
"orderUserPhone": 手机,			
"orderPayMoney": 订单支付金额,		
orderdetallist 商品列表
commodityVO:商品对象
"id": 商品id,
"commodityDescribe": 商品描述,
"imglist": 图片集合
	"imgUrl": 图片路径,
promotelist 促销集合
promoteTitle 促销标题
promoteDiscount 促销金额
"detailArgName": 型号名称,
"detailBelongCommodityId": 商品id,
"detailName": "商品名称",
"detailNumber": 购物数量,
"detailPic": 型号图片,
status :success	(成功) nouser(用户不存在，异常)









28.	微信支付请求
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/jspaymoney
参数：
payjson：{
“orderid”:订单id（多个逗号隔开）,
“money”:金额*100
} //json参数
Json数据：
appId:微信appid
nonceStr 字符串
package 
signType
timeStamp
paySign
status 状态

29.	支付宝支付请求
请求路径：http://192.168.1.161:8080/IntegralShop/before/order/apiPayment
参数：
payjson：{
“orderid”:订单id（多个逗号隔开）,
“money”:金额*100
} //json参数
Json数据：
无
30.	获取优惠券
请求路径：http://192.168.1.161:8080/IntegralShop/before/coupon/getCouponList
参数：
couponBelongComid 商品id
Json数据：
commodityCouponByList：
couponName:优惠券名称,
couponCondition:满多少（条件）
couponMoney:优惠金额
couponMinDate;//优惠有效起始期
couponMaxDate;//优惠有效结束期





31.	用户获取优惠券
请求路径：http://192.168.1.161:8080/IntegralShop/before/coupon/saveCouponRecord
参数：
couponId 优惠券id
Json数据：
status{
success 成功
nouser 没有用户
} 

32.	用户中心
请求路径：http://192.168.1.161:8080/IntegralShop/before/users/getUserCenter
参数：
Json数据：
userNinkname 呢称
wxHeadPortrait 微信头像
leavel 会员等级
idNum 会员账号ID号
userScore 用户积分
orderStatus 订单状态（集合）
0（优惠券数）获取下标 
1（待兑换数）
2（待发货数）
3（待收货数）
4（待评价数）
5（退换修数）
orderDeliverStatus 












