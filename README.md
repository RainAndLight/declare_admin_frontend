启动项目

``` cmd
npm i   // 安装依赖
```

``` cmd
npm run serve
```





# declare_admin_frontend 设计文档



## login页面

- 点击登录 ， 后台判断账号密码是否正确，如果正确再判断是否有权限登录
- 如果没有注册过 ， 提示没该账号信息，请去注册
- 注册页面 ， 需要提供企业名称 ， 一个企业只能注册一个账号
- 如果账号没有通过审核进不了系统 
- 忘记密码——发送消息给管理员账户
- 如果该账户未注册，提醒该账号未注册是否注册登录
- 登录成功提示，已经发送审核请求给管理员





## 主页

- 申报

  - 申报时间设置（管理员权限）
  - 物流企业季度表申报
  - 物流企业年度表申报
  - 各企业申报状态（管理员权限）

- 基本信息

  - 企业基本情况表

- 各企业基本信息（管理员权限）

  



1. 所有表单填报人必须是已经审核通过的账号，那么刚刚注册但是并未通过审核的，可以写，但是不能提交，会提示还没有通过审核
2. 人工设定申报时间
   1. 在操作中，展示历史设定。
   2. 设定时间，操作历史中展示，并且可以编辑和删除
3. 申报 提交时判断是否在时间段内





vue.config.js 配置

![1592556368741](README.assets/1592556368741.png)



axios 基本设置

![1592557222761](README.assets/1592557222761.png)





读取文件的方法

![1592558136387](README.assets/1592558136387.png)





解析excel

![1592559752347](README.assets/1592559752347.png)







# 接口需求

默认URL头 ： `baseURL = " http://192.168.1.111:8090 "`

> 接口顺序 ,  登录页面  =>     企业信息 =>   待办    =>      申报  =>  账号管理

## 登录页面

### 注册接口

| 项目        | 描述     |
| ----------- | -------- |
| 接口描述    | 点击注册 |
| HTTP Header |          |
| Method      |          |
| 请求参数    | data     |
| 请求地址    | /api/    |



``` js
// 请求参数
data {
    company: '',  //公司名称
    user: '',     //用户名
    password: '',  //密码 md5加密
    code: '',          // 验证码
    captchaIdentity: '' // 正确的验证码
}
// 返回数据
1. 成功
2. 失败 
3. 失败 该公司已注册过账号
```



### 登录接口

| 项目        | 描述     |
| ----------- | -------- |
| 接口描述    | 点击登录 |
| HTTP Header |          |
| Method      |          |
| 请求参数    | data     |
| 请求地址    | /api/    |

``` js
// 传参
data {
    user: '',     //用户名
    password: '',  //密码 md5加密
    code: '',          // 验证码
    captchaIdentity: '' // 正确的验证码
}
// 返回数据
data {
    token,
    refresh_token,
    routerList:[] // 该账号对应的路由有哪儿些 ， 格式如下
    <--!
        [
            {
                index: '/home',
                title: '首页',
                icon: 'el-icon-s-home'
            },
            {
                index: '1',
                title: '企业信息',
                icon: 'el-icon-s-custom'
                children: [
                    {
                        index: '/home/account',
                        title: '账户信息'
                    },
                    {
                        index: '/home/userInfo',
                        title: '企业单位基本情况'
                    }
                ]
            },
    ]
        
        -->
}
```

#### 路由的完整列表

``` js
    routes: [
        {
            index: '/home',
            title: '首页',
            icon: 'el-icon-s-home'
        },
        {
            index: '1',
            title: '企业信息',
            icon: 'el-icon-s-custom'
            children: [
                {
                    index: '/home/account',
                    title: '账户信息'
                },
                {
                    index: '/home/userInfo',
                    title: '企业单位基本情况'
                }
            ]
        },
        {
            index: '2',
            title: '申报'
            icon: 'el-icon-document',
            children: [
                {
                    index: '/home/declarationOperate',
                    title: '操作'
                },
                {
                    index: '/home/declarationSchedule',
                    title: '申报进度'
                }
            ]
        },
        {
            index: '3',
            title: '账号管理',
            icon: 'el-icon-user'
            children: [
                {
                    index: '/home/user/userAudit',
                    title: '账号审核'
                },
                {
                    index: '/home/user/userManage',
                    title: '账号列表'
                }
            ]
        },
        {
            index: '/home/todoCenter',
            title: '待办',
            icon: 'el-icon-edit-outline'
        }
    ]
```

#### 不同权限对应的路由展示

+ 所有人可以看到首页

+ 0 ， 未通过账号审核的 ， 路由为 `企业信息`

+ 1， 通过账号审核 ，也就是普通企业用户 ， 路由为 `企业信息` , `待办`

+ 2， 管理员 ， `申报`  ,  `账号管理`



## 用户信息接口

| 项目        | 描述                                         |
| ----------- | -------------------------------------------- |
| 接口描述    | 获取 用户的  公司    ，    账号 ， 头像URL等 |
| HTTP Header | Authorization:"`Bearer  token`"              |
| Method      |                                              |
| 请求参数    |                                              |
| 请求地址    | /api/                                        |

``` js
// 返回数据
data{
    id,
    company, // 公司
    user,  // 用户名
    photoUrl, // 用户头像URL
    auditStatus, // 账号是否通过审核 （0，未通过  1， 已通过）
}
```





## 企业单位基本情况接口

### 上传数据

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 获取用户企业单位基本信息        |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      | post                            |
| 请求参数    | data                            |
| 请求地址    | /api/                           |

``` js
// 请求参数
data{
	form
}
```

#### 字段表

``` js
uscCode: '', // 统一社会信用代码
ifCode: '', // 组织机构代码
principalName: '', // 负责人
company: '', // 公司名
companyTel: '', // 公司名传真
address: '', // 详细地址
email: '', // 电子信箱
postalCode: '', // 邮政编码
operational: '', // 主要业务活动
industryCode: '', // 行业代码
openingTime: '', // 开业时间
companyLoginType: '', // 企业登记注册类型
login_total: '', // 登记注册资本合计
county_total: '', // 国家合计
collective_total: '', // 集体合计
legalPerson_total: '', // 法人合计
self_total: '', // 个人合计
HMT_total: '', // 港澳台合计
foreign_total: '', // 外商资本合计
// 基础设施
theirOwn: '', // 自有仓储面积
rent: '', // 租用仓储面积
handlingEquipment: '', // 装卸设备
railway: '', // 铁路专用线
logisticsSystem: '', // 物流计算机信息管理系统
transportVehicle: '', // 运输车辆
trucksCar: '', // 货车
selfTrucksCar: '', // 专用货车
chillCar: '', // 冷藏车
containerCar: '', // 集装箱专用车
dangerCar: '', // 危险品专用车辆
returnTime: '', // 报出日期
companyPrincipal: '', // 单位负责人
preparer: '', // 填表人
phone: '' // 电话
list:[]   // 为下面的list ， 为json格式
```

从业人员情况的数据写在一个table表格中

``` js
list: [
    {
        targets: '1.年末从业人员合计（人）',
        womanTotal: '',
        total: ''
    },
    {
        targets: '  #物流从业人员合计',
        womanTotal: '',
        total: ''
    },
    {
        targets: '2.从业人员劳动报酬（万元）',
        womanTotal: '',
        total: ''
    },
    {
        targets: '#管理人员劳动报酬（万元）',
        womanTotal: '',
        total: ''
    },
    {
        targets: '3.从业人员文化程序（人）',
        womanTotal: '',
        total: ''
    },
    {
        targets: '#研究生及以上学历人员',
        womanTotal: '',
        total: ''
    },
    {
        targets: '大学本科学历人员',
        womanTotal: '',
        total: ''
    },
    {
        targets: '大学专科学历',
        womanTotal: '',
        total: ''
    },
    {
        targets: '高中及以下',
        womanTotal: '',
        total: ''
    },
    {
        targets: '4.专业技术职称（人）',
        womanTotal: '',
        total: ''
    },
    {
        targets: '#高级技术职称人员',
        womanTotal: '',
        total: ''
    },
    {
        targets: '中级技术职称人员',
        womanTotal: '',
        total: ''
    },
    {
        targets: '初级技术职称人员',
        womanTotal: '',
        total: ''
    },
    {
        targets: '5.专业技术等级（人）',
        womanTotal: '',
        total: ''
    },
    {
        targets: '#高级技师',
        womanTotal: '',
        total: ''
    },
    {
        targets: '技师',
        womanTotal: '',
        total: ''
    },
    {
        targets: '高级工',
        womanTotal: '',
        total: ''
    },
    {
        targets: '中级工',
        womanTotal: '',
        total: ''
    }
]
```

### 获取数据

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 获取用户企业单位基本信息        |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | id                              |
| 请求地址    | /api/                           |

``` js
// 返回数据

有数据
form：{}

没有数据：null
```



## 待办接口

### 获取管理员发布的申报列表

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 获取管理员发布的申报列表        |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | page                            |
| 请求地址    | /api/                           |

``` js
// 请求参数
page:{
    currentPage ,  // 请求页码
    pageSize ，  // 显示条数
}

// 返回数据
data : {
    total: 100, // 总条数
    list：[
        {
            id , 
            originPerson , // 申报发起人 管理员
            declarationType , // 申报类型 （ quarter 为季度 ， year 为年度 ）
            declarationDate , // 申报起止日期
            declartionStartEndTime , // 申报周期
            declarationStatus ， // 申报状态 (0 未申报 ， 1  申报已提交 ， 2 审核完成 ， 3 申报超时)
        }
    ]
}
```



### 提交申报接口

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 用户点击申报                    |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | data                            |
| 请求地址    | /api/                           |

``` js
// 请求参数
data :{
    declarationType,   // 申报类型
    list:[]    // 申报的数据  json格式
}
```

申报数据

``` js
[
    {
        targetName: '货运量',
        measureUnit: '吨',
        code: '01',
        current: '',
        YOY: ''
    },
    {
        targetName: '周转量',
        measureUnit: '吨公里',
        code: '02',
        current: '',
        YOY: ''
    },
    ......
]
```



## 申报

### 设置起止时间接口

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 管理员设置一条申报              |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | data                            |
| 请求地址    | /api/                           |



``` js
// 请求参数
data : {
    declartionType , // 申报类型
    declartionStartEndTime ， // 报表周期
    declartionWriteTime， // 申报起止时间
}
```





### 获取管理员设定的申报历史列表接口

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 获取管理员设定的申报历史列表    |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | page                            |
| 请求地址    | /api/                           |

``` js
// 请求参数
page:{
    currentPage ,  // 请求页码
    pageSize ，  // 显示条数
}

// 返回数据
ruturnData : {
    total: 100, // 总条数
	list:[
        	declarationType , // 申报类型
        	declartionStartEndTime ， // 报表周期
        	declartionWriteTime ， // 申报起止日期
        	declartionStatus ，  // 当前申报状态 '0': '申报未开始', '1': '申报正在进行中', '2': '申报已结束'
        	originPerson ， // 申报发起人
    ]
}
```





### 某一条申报进行修改的接口

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 对申报进行修改                  |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | id                              |
| 请求地址    | /api/                           |

``` js
// 请求参数
data : {
    id,
    declartionType , // 申报类型
    declartionStartEndTime ， // 报表周期
    declartionWriteTime， // 申报起止时间
}
// 返回数据

```



### 某一条申报进行删除的接口 （逻辑删除）

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 对申报进行删除                  |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | id                              |
| 请求地址    | /api/                           |





### 申报进度

#### 各单位申报进度列表接口

| 项目        | 描述                                       |
| ----------- | ------------------------------------------ |
| 接口描述    | 查看一条申报 ， 显示所有企业单位的申报情况 |
| HTTP Header | Authorization:"`Bearer  token`"            |
| Method      |                                            |
| 请求参数    | page ， id                                 |
| 请求地址    | /api/                                      |

``` js
// 请求数据
page : {
    currentPage ,  // 请求页码
    pageSize ，  // 显示条数
    filterKey ,  // 筛选条件  0  未申报 ， 1  已提交  ， 2  超时 
}
    
// 返回数据
returnData: {
     total: 100, // 总条数
	 list : [
              	id,
     			company, // 企业单位
	 			declartionType， // 类型
     			declartionStatus， // 申报状态
     			declartionStartEndTime, // 报表周期
     			declartionWriteTime // 申报起止时间
     ]
}
```





#### 导出excel  (导出季度表 ， 年度表 ， 合并导出)

| 项目        | 描述                                       |
| ----------- | ------------------------------------------ |
| 接口描述    | 查看一条申报 ， 显示所有企业单位的申报情况 |
| HTTP Header | Authorization:"`Bearer  token`"            |
| Method      |                                            |
| 请求参数    | id  , declartionType                       |
| 请求地址    | /api/                                      |

``` js
// 返回数据

// 季度 ， 年度
returnData : {
	data : [
            {
                targetName: '货物购进总额',
                measureUnit: '万元',
                code: '01',
                current: '10',
                YOY: '5',
                last: '50%'
            },
            {
                targetName: '货物销售总额',
                measureUnit: '万元',
                code: '02',
                current: '10',
                YOY: '5',
                last: '50%'
            },
        ......
    ]
}
        
// 合并导出
returnData : {
    // 返回方式一： 一行数据则为一个公司的所有信息 ， 同比后台计算
	data : [
            [
          '2020-1-1','京东物流','货运量本期','货运量同期','货运量同比' ........
    	]
        ......
    ]
    // 返回方式二： 原数据返回 , 前台处理数据 ，  同比后台计算
    data: {
            {
                targetName: '货物购进总额',
                measureUnit: '万元',
                code: '01',
                current: '10',
                YOY: '5',
                last: '50%'
            }
        .......
    }
}
```







## 账号管理

### 账号审核接口

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 展示申请账号的列表              |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | page                            |
| 请求地址    | /api/                           |

``` js
// 请求数据
page : {
    currentPage ,  // 请求页码
    pageSize ，  // 显示条数
}

//返回数据
returnData：{
	total: 100, // 总条数
    list:[
		{
            id,
        	company, // 公司名称
    		user, //用户申请账号
			applyTime, // 申请时间
        }
    ]
}
```

### 申请账号同意与否

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 申请账号的点击同意和拒绝        |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | id , status    yes / no         |
| 请求地址    | /api/                           |



### 账号列表接口

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口描述    | 通过申请的用户的列表            |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | page                            |
| 请求地址    |                                 |

``` js
// 请求数据
page : {
    currentPage ,  // 请求页码
    pageSize ，  // 显示条数
}

//返回数据
returnData：{
	total: 100, // 总条数
    list:[
		{
            id,
        	company, // 公司名称
    		user, //用户申请账号
			applyTime, // 申请时间
			passTime, // 申请通过时间
        }
    ]
}
```



#### 查看接口

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口        | 查看用户的企业单位基本情况表    |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | id                              |
| 请求地址    |                                 |

``` js
//返回数据
returnData：{
    list: {
    	form,
        tableData
    }
}
```



#### 查看修改历史

| 项目        | 描述                                 |
| ----------- | ------------------------------------ |
| 接口        | 查看用户的企业单位基本情况表修改记录 |
| HTTP Header | Authorization:"`Bearer  token`"      |
| Method      |                                      |
| 请求参数    | id                                   |
| 请求地址    |                                      |

``` js
//返回数据
returnData：{
    data:{
        修改的字段名 ， 以及修改的内容
        table 修改的话 ， 直接返回全部table展示，
        修改年月，
        修改日期时间
        list:[
            {
                time:'2020-1-1',
                list:[
                    {
                        time:'2020-1-1 12:00'
                    }
                ]
            },
            {
             	time:'2020-1-2',
                list:[
                    {
                        time:'2020-1-2 12:00'
                    }
                ]
            }
        ]
    }
}
```

#### 用户账号编辑

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口        | 编辑用户的账号密码公司          |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | id , data                       |
| 请求地址    |                                 |

``` js
// 请求参数
id,
data:{
    company
    user
    password
}

// 返回数据

```

#### 用户账号删除

| 项目        | 描述                            |
| ----------- | ------------------------------- |
| 接口        | 删除用户的账号密码公司          |
| HTTP Header | Authorization:"`Bearer  token`" |
| Method      |                                 |
| 请求参数    | id                              |
| 请求地址    |                                 |

```js
// 请求参数
id

// 返回数据

```





# 关于权限控制路由

## 一个简单的方法

+ 用户输入账号密码  ，  如果后台对比正确  ， 返回该用户所拥有的权限路由
+ 对应三种情况
  + 未通过审核的用户
  + 审核通过的用户
  + 管理员

### 完整的路由表

``` js
let routerList = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '', 
                component: Home2
            },
            {
                path: 'account',
                component: () => import('@/views/account')
            },
            {
                path: 'userInfo',
                component: () => import('@/views/userInfo/userInfo')
            },
            {
                path: 'declarationOperate',
                component: () => import('@/views/declaration/declarationOperate')
            },
            {
                path: 'declarationSchedule',
                component: () => import('@/views/declaration/declarationSchedule')
            },
            {
                path: 'declaration',
                component: () => import('@/views/declaration/declaration')
            },
            {
                path: 'todoCenter',
                component: () => import('@/views/todoCenter')
            },
            {
                path: 'todoCenter/declaration',
                component: () => import('@/views/todoCenter/declaration')
            },
            {
                path: 'user/userAudit',
                component: () => import('@/views/user/userAudit')
            },
            {
                path: 'user/userManage',
                component: () => import('@/views/user/userManage')
            },
            {
                path: 'user/userManage/userinfo',
                component: () => import('@/views/user/user-info')
            }
        ]
    }
]
```

### 三种人对应不同的返回结果

1. 未通过审核的用户

``` js
let routerList = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '', 
                component: Home2
            },
            {
                path: 'account',
                component: () => import('@/views/account')
            },
            {
                path: 'userInfo',
                component: () => import('@/views/userInfo/userInfo')
            }
        ]
    }
]
```

2. 审核通过的用户

``` js
let routerList = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '', 
                component: Home2
            },
            {
                path: 'account',
                component: () => import('@/views/account')
            },
            {
                path: 'userInfo',
                component: () => import('@/views/userInfo/userInfo')
            },
            {
                path: 'todoCenter',
                component: () => import('@/views/todoCenter')
            }{
                path: 'todoCenter/declaration',
                component: () => import('@/views/todoCenter/declaration')
            }
        ]
    }
]
```

3. 管理员

``` js
let routerList = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '', 
                component: Home2
            },
            {
                path: 'user/userAudit',
                component: () => import('@/views/user/userAudit')
            },
            {
                path: 'user/userManage',
                component: () => import('@/views/user/userManage')
            },
            {
                path: 'user/userManage/userinfo',
                component: () => import('@/views/user/user-info')
            },
            ,
            {
                path: 'declarationOperate',
                component: () => import('@/views/declaration/declarationOperate')
            },
            {
                path: 'declarationSchedule',
                component: () => import('@/views/declaration/declarationSchedule')
            }
        ]
    }
]
```





+ 企业信息唯一码
+ 验证码
+ 点击申报返回上一个页面
+ 申报前端限制必填
+ 用户申报信息需要查看 不能只导出excel
+ 管理员查看用户的申报，需要添加一个驳回的按钮，把他的状态改为未申报
+ 待办上方告诉用户可以重复提交
+ 申报按钮换成在table中
+ 单选框不要了
+ 设定起止时间加一列 申报周期为第几季度
+ 设置申报  编辑删除 这个过了申报时间还可否点击
+ 

