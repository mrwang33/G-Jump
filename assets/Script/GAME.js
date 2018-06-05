// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var HeroPlayer = require("HeroPlayer");
var MoveBg = require("BgMove");
cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        bg1: {
            default: null,
            type: cc.Node
        },
        bg2: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:


    start() {
        console.log("game start!");
    },

    setBgMoveCreate: function () {
        //如果背景1的坐标移出屏幕开始设置新的坐标
        if (this.bg1.getPositionY() < -400) {
            this.bg2.setPositionY(this.bg1.getPositionY() + this.bg1.getContentSize().height);
        }
        //如果背景2的坐标移出屏幕开始设置新的坐标
        if (this.bg2.getPositionY() < -400) {
            this.bg1.setPositionY(this.bg2.getPositionY() + this.bg2.getContentSize().height);
        }
    },


    // 添加事件监听
    setEventControl: function () {
        var self = this;
        var hero = self.player.getComponent(HeroPlayer);//角色绑定控件
        var bgScript1 = self.bg1.getComponent(MoveBg);//绑定背景控件
        var bgScript2 = self.bg2.getComponent(MoveBg);//绑定背景控件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {
                //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();
                // 获取事件所绑定的 target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                cc.log("当前点击坐标" + locationInNode);
                hero.node.runAction(hero.setJumpUpAction());//精灵移动
                //cc.log("跳跃：－－－－－－－－");
                return true;
            },
            onTouchMoved: function (touch, event) {            // 触摸移动时触发
            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理
                //  cc.log("跳跃后角色坐标：" + self.player.getPosition() );
                if (self.player.getPositionY() > 0) {
                    var height = self.player.getPositionY();//背景需要移动的高度
                    self.player.setPositionY(height / 2);//设置精灵的高度位置
                    bgScript1.node.runAction(bgScript1.setMoveAction(height));//背景实现向下滚动
                    bgScript2.node.runAction(bgScript2.setMoveAction(height));//背景实现向下滚动
                }
            }
        }, self.node);
    },

    onLoad: function () {
        this.setEventControl();
    },

    // update (dt) {},

    update: function () {
        this.setBgMoveCreate();
    }
});
