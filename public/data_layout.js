登录成功后获取csrf, rnd



// 获取弹幕
POST `https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory`
    roomid='14798635'

{
    data: 
    {
        admin: []
        room: 
        [
            {
                text: '习喵喵偷偷说喵窝号是：461245039', 
                nickname: '习习家尽梨了的答谢姬',
                uid: 3108839,
                timeline: '2020-04-20 14:12:51',
                isadmin: 1,                             // 房管
                vip: 1,                                 // 红色爷
                svip: 0,                                // 金色爷
                medal: [
                    20,                                 // 主播牌子等级
                    '口粮o',                            // 主播牌子名称
                    '翊Yoko',                           // 主播名称
                    14798635,
                    16752445
                ],
                user_level: [
                    43,                                 // UL值
                    0,
                    16746162,
                    17138                               // 用户排名('>50000')
                ],
                rnd: 1587363171,
                guard_level: 3
            },
            {
                                                        // 一次获取十条
            }
        ]
    }
}

// 发送弹幕
POST `https://api.live.bilibili.com/msg/send`
    color=16777215
    fontsize=25
    msg='666'
    roomid=14798635
    csrf='6430f9b9b50939690eebacd6df0a9d1e'             // cookie bili_jct
    rnd=1587363141                                      // session Hm_Ipvt_


// 礼物榜
GET `https://api.live.bilibili.com/xlive/app-room/v1/guardTab/topList?page=1&ruid=5988102&page_size=29`

{
    data: 
    {
        info: 
        {
            num: 114                                    // 舰长数量
            page: 4                                     
            now: 1                                      // url参数page
            achievement_level: 2
        }
        list: 
        [
            {
                uid: 203760,
                ruid: 5988102,
                rank: 1,
                username: '流星夜捩',
                face: 'http://i0.hdslb.com/bfs/face/fd9ab36bd3d80b019318532369bf61f9e72cb29c.jpg',
                is_alive: 0,
                guard_level: 2
            },
            {
                                                        // url参数page_size
            }
        ]
        top3: 
        [
            {
                uid: 5949114,
                ruid: 5988102,
                rank: 1,
                username: '水水不想被迫害',
                face: 'http://i0.hdslb.com/bfs/face/6be8ea965733a034eda68d28a8e627890b95aa57.jpg',
                is_alive: 1,
                guard_level: 2
            },
            {
                                                        // 在榜首的三人
            }
        ]
    }
}